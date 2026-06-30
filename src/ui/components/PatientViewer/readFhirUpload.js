import { gunzipSync, strFromU8, unzipSync } from 'fflate';
import * as tar from 'tar-stream';

const readFileAsBytes = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Unable to read the selected file.'));
    reader.onload = () => resolve(new Uint8Array(reader.result));
    reader.readAsArrayBuffer(file);
  });

const isZip = (fileName, bytes) => fileName.endsWith('.zip');

const isGzip = (fileName, bytes) => fileName.endsWith('.gz') && !fileName.endsWith('.tar.gz');

const isTarGzip = (fileName) => fileName.endsWith('.tar.gz') || fileName.endsWith('.tgz');

const isArchiveMetadataFile = (name) => {
  const parts = name.split('/');
  const baseName = parts[parts.length - 1];

  return parts[0] === '__MACOSX' || baseName.startsWith('._') || baseName === '.DS_Store';
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

const extractFirstTarFile = async (bytes) => {
  return new Promise((resolve, reject) => {
    const extractor = tar.extract();
    let foundFile = false;

    extractor.on('entry', (header, stream, next) => {
      const chunks = [];

      stream.on('data', (chunk) => chunks.push(new Uint8Array(chunk)));
      stream.on('error', reject);
      stream.on('end', () => {
        if (
          !foundFile &&
          (header.type === 'file' || header.type === 'contiguous-file') &&
          !isArchiveMetadataFile(header.name)
        ) {
          foundFile = true;
          resolve(concatBytes(chunks));
        }
        next();
      });

      stream.resume();
    });

    extractor.on('error', reject);
    extractor.on('finish', () => {
      if (!foundFile) {
        reject(new Error('The selected archive did not contain a file.'));
      }
    });

    extractor.end(bytes);
  });
};

const extractFirstZipFile = (bytes) => {
  const entries = unzipSync(bytes);
  const firstFileName = Object.keys(entries).find(
    (name) => !name.endsWith('/') && !isArchiveMetadataFile(name),
  );

  if (!firstFileName) {
    throw new Error('The selected archive did not contain a file.');
  }

  return entries[firstFileName];
};

const extractUploadPayload = async (fileName, bytes) => {
  if (isZip(fileName, bytes)) {
    return extractFirstZipFile(bytes);
  }

  if (isTarGzip(fileName)) {
    return extractFirstTarFile(gunzipSync(bytes));
  }

  if (isGzip(fileName, bytes)) {
    return gunzipSync(bytes);
  }

  return bytes;
};

export default async function readFhirUpload(file) {
  const fileName = file?.name?.toLowerCase() || '';
  const bytes = await readFileAsBytes(file);

  let payload;
  try {
    payload = await extractUploadPayload(fileName, bytes);
  } catch (_error) {
    throw new Error('Unable to extract the selected archive.');
  }

  try {
    return JSON.parse(strFromU8(payload).replace(/^\uFEFF/, ''));
  } catch (_error) {
    throw new Error('Unable to parse the selected file as JSON.');
  }
}
