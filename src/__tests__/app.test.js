const request = require('supertest');
const fs = require('fs');
const os = require('os');
const path = require('path');
const app = require('../App');

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

describe('FHIR loading routes', () => {
  let tempDir;

  beforeEach(async () => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'spt-fhir-'));
    await request(app).post('/fhir/clear').send().expect(200);
    await request(app).post('/csv/clear').send().expect(200);
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  test('It should load bulk FHIR NDJSON into collections and clear FHIR rows', async () => {
    fs.writeFileSync(
      path.join(tempDir, 'Patient.ndjson'),
      `${JSON.stringify({
        resourceType: 'Patient',
        id: 'patient-1',
        name: [{ given: ['Jane'], family: 'Doe' }],
        gender: 'female',
        birthDate: '1980-01-01',
      })}\n`,
    );
    fs.writeFileSync(
      path.join(tempDir, 'Observation.ndjson'),
      `${JSON.stringify({
        resourceType: 'Observation',
        id: 'observation-1',
        status: 'final',
        subject: { reference: 'Patient/patient-1' },
        effectiveDateTime: '2024-01-01',
        code: { coding: [{ code: '1234-5', display: 'Example' }] },
        valueQuantity: { value: 7, unit: 'mg' },
      })}\n`,
    );

    await request(app)
      .post('/fhir/load')
      .send({ path: tempDir })
      .expect(200)
      .expect((res) => {
        expect(res.body.loadedFiles).toHaveLength(2);
        expect(res.body.resourceCount).toBe(2);
        expect(res.body.resourceCounts).toMatchObject({ Patient: 1, Observation: 1 });
      });

    await request(app)
      .get('/collection/patients?id=patient-1')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveLength(1);
        expect(res.body[0]).toMatchObject({
          id: 'patient-1',
          Id: 'patient-1',
          FIRST: 'Jane',
          LAST: 'Doe',
          sourceFormat: 'fhir',
        });
        expect(res.body[0].resource).toMatchObject({ resourceType: 'Patient' });
      });

    await request(app)
      .get('/collection/observations?patientId=patient-1')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveLength(1);
        expect(res.body[0]).toMatchObject({
          id: 'observation-1',
          PATIENT: 'patient-1',
          CODE: '1234-5',
          VALUE: '7',
          UNITS: 'mg',
          sourceFormat: 'fhir',
        });
      });

    await request(app).post('/fhir/clear').send().expect(200);

    await request(app)
      .get('/collection/patients?id=patient-1')
      .expect(200)
      .expect((res) => {
        expect(res.body).toStrictEqual([]);
      });
  });

  test('It should load FHIR Bundle JSON files', async () => {
    fs.writeFileSync(
      path.join(tempDir, 'patient-bundle.json'),
      JSON.stringify({
        resourceType: 'Bundle',
        entry: [
          {
            resource: {
              resourceType: 'Patient',
              id: 'patient-2',
              name: [{ given: ['John'], family: 'Smith' }],
            },
          },
          {
            resource: {
              resourceType: 'Condition',
              id: 'condition-1',
              subject: { reference: 'urn:uuid:patient-2' },
              code: { coding: [{ code: '888', display: 'Condition Example' }] },
            },
          },
        ],
      }),
    );

    await request(app)
      .post('/fhir/load')
      .send({ path: tempDir })
      .expect(200)
      .expect((res) => {
        expect(res.body.resourceCount).toBe(2);
      });

    await request(app)
      .get('/collection/conditions?patientId=patient-2')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveLength(1);
        expect(res.body[0]).toMatchObject({
          id: 'condition-1',
          CODE: '888',
          DESCRIPTION: 'Condition Example',
        });
      });
  });
});
