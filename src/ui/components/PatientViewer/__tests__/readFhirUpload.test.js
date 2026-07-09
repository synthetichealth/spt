/**
 * @jest-environment jsdom
 */
import { gzipSync, strToU8, zipSync } from 'fflate';
import readFhirUpload from '../readFhirUpload';

const bundle = (id) => ({
  resourceType: 'Bundle',
  entry: [{ resource: { resourceType: 'Patient', id } }],
});

const buildTar = (entries) => {
  const chunks = [];
  const encoder = new TextEncoder();

  entries.forEach(({ name, bytes }) => {
    const header = new Uint8Array(512);
    header.set(encoder.encode(name), 0);
    header.set(encoder.encode('0000644\0'), 100);
    header.set(encoder.encode('0000000\0'), 108);
    header.set(encoder.encode('0000000\0'), 116);
    header.set(encoder.encode(`${bytes.length.toString(8).padStart(11, '0')}\0`), 124);
    header.set(encoder.encode('00000000000\0'), 136);
    header.fill(0x20, 148, 156);
    header[156] = '0'.charCodeAt(0);
    header.set(encoder.encode(`ustar${'\0'}00`), 257);

    const checksum = header.reduce((sum, byte) => sum + byte, 0);
    header.set(encoder.encode(`${checksum.toString(8).padStart(6, '0')}\0 `), 148);

    chunks.push(header, bytes);

    const paddingLength = (512 - (bytes.length % 512)) % 512;
    if (paddingLength > 0) {
      chunks.push(new Uint8Array(paddingLength));
    }
  });

  chunks.push(new Uint8Array(1024));
  return concatBytes(chunks);
};

const concatBytes = (chunks) => {
  const totalLength = chunks.reduce((length, chunk) => length + chunk.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;

  chunks.forEach((chunk) => {
    result.set(chunk, offset);
    offset += chunk.length;
  });

  return result;
};

const jsonFile = (content, name) => new File([JSON.stringify(content)], name);
const byteFile = (bytes, name) => new File([bytes], name);

describe('readFhirUpload', () => {
  test('reads a plain JSON upload', async () => {
    await expect(readFhirUpload(jsonFile(bundle('plain'), 'patient.json'))).resolves.toEqual(
      bundle('plain'),
    );
  });

  test('reads the first file from a ZIP upload', async () => {
    const zip = zipSync({
      'first.json': strToU8(JSON.stringify(bundle('zip-first'))),
      'second.json': strToU8(JSON.stringify(bundle('zip-second'))),
    });

    await expect(readFhirUpload(byteFile(zip, 'patients.zip'))).resolves.toEqual(
      bundle('zip-first'),
    );
  });

  test('skips metadata files before the first JSON file in a ZIP upload', async () => {
    const zip = zipSync({
      '._first.json': strToU8('apple metadata'),
      '__MACOSX/first.json': strToU8('more apple metadata'),
      'first.json': strToU8(JSON.stringify(bundle('zip-first'))),
    });

    await expect(readFhirUpload(byteFile(zip, 'patients.zip'))).resolves.toEqual(
      bundle('zip-first'),
    );
  });

  test('reads a gzip-compressed JSON upload', async () => {
    const gz = gzipSync(strToU8(JSON.stringify(bundle('gzip'))));

    await expect(readFhirUpload(byteFile(gz, 'patient.json.gz'))).resolves.toEqual(bundle('gzip'));
  });

  test('reads the first file from a tar-gzip upload', async () => {
    const tar = buildTar([
      { name: 'first.json', bytes: strToU8(JSON.stringify(bundle('tgz-first'))) },
      { name: 'second.json', bytes: strToU8(JSON.stringify(bundle('tgz-second'))) },
    ]);
    const tgz = gzipSync(tar);

    await expect(readFhirUpload(byteFile(tgz, 'patients.tgz'))).resolves.toEqual(
      bundle('tgz-first'),
    );
  });

  test('skips metadata files before the first JSON file in a tar-gzip upload', async () => {
    const tar = buildTar([
      { name: '._first.json', bytes: strToU8('apple metadata') },
      { name: 'first.json', bytes: strToU8(JSON.stringify(bundle('tgz-first'))) },
    ]);
    const tgz = gzipSync(tar);

    await expect(readFhirUpload(byteFile(tgz, 'patients.tar.gz'))).resolves.toEqual(
      bundle('tgz-first'),
    );
  });
});
