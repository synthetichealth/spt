const request = require('supertest');
const fs = require('fs');
const os = require('os');
const path = require('path');
const app = require('../app');

describe('Test the root path', () => {
  test('It should redirect to the frontend entry point', () => {
    return request(app).get('/').send().expect(302).expect('Location', '/spt');
  });
});

describe('CSV loading routes', () => {
  let tempDir;

  beforeEach(async () => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'spt-csv-'));
    await request(app).post('/csv/clear').send().expect(200);
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  test('It should load CSV files into collections and clear them', async () => {
    fs.writeFileSync(path.join(tempDir, 'patients.csv'), 'Id,FIRST,LAST\npatient-1,Jane,Doe\n');
    fs.writeFileSync(
      path.join(tempDir, 'observations.csv'),
      'DATE,PATIENT,ENCOUNTER,CODE,DESCRIPTION,VALUE,UNITS,TYPE\n' +
        '2024-01-01,patient-1,encounter-1,1234-5,Example,7,mg,numeric\n',
    );

    await request(app)
      .post('/csv/load')
      .send({ path: path.join(tempDir, 'patients.csv') })
      .expect(200)
      .expect((res) => {
        expect(res.body.loadedFiles).toHaveLength(2);
      });

    await request(app)
      .get('/collection/patients?Id=patient-1')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveLength(1);
        expect(res.body[0]).toMatchObject({ Id: 'patient-1', FIRST: 'Jane', LAST: 'Doe' });
      });

    await request(app)
      .get('/collection/observations?PATIENT=patient-1')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveLength(1);
        expect(res.body[0]).toMatchObject({ CODE: '1234-5', TYPE: 'numeric' });
      });

    await request(app).post('/csv/clear').send().expect(200);

    await request(app)
      .get('/collection/patients?Id=patient-1')
      .expect(200)
      .expect((res) => {
        expect(res.body).toStrictEqual([]);
      });
  });
});
