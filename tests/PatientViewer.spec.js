
import { test, expect, describe, beforeEach } from '@playwright/test';

const fs = require("fs");
const path = require("path");

const BUNDLE_FIXTURE = 'fixtures/output/fhir/Bo157_Schroeder447_013ba640-77dd-1136-b35e-2ff0b3c48ff5.json';
var bundle = JSON.parse(fs.readFileSync(path.resolve(__dirname, BUNDLE_FIXTURE), 'utf-8'));
var patient = bundle.entry[0].resource;

describe('PatientViewer', () => {
  beforeEach(async ({ page }) => {
    // go to root first to reset app
    await page.goto('http://127.0.0.1:3000/');
    await page.goto('http://127.0.0.1:3000/spt/#/record_viewer');

    await page.locator('input[type="file"]').setInputFiles(path.resolve(__dirname, BUNDLE_FIXTURE));
    await page.waitForTimeout(1000);
  });

  test('renders and uploads FHIR bundle successfully', async ({ page }) => {
    await expect(page.getByText('Drag & drop a FHIR JSON file here')).not.toBeVisible();
  });

  describe('patient section', () => {
    test('renders patient heading', async ({ page }) => {
      const patient_section = page.locator('[data-test-id="patient"]');

      await expect(patient_section).toContainText("Patient", { ignoreCase: true });
    });

    test('renders patient name', async ({ page }) => {
      const patient_section = page.locator('[data-test-id="patient"]');
      await expect(patient_section).toContainText(patient.name[0].family, { ignoreCase: true });
      for(const given_name of patient.name[0].given) {
        await expect(patient_section).toContainText(given_name, { ignoreCase: true });
      }
    });

    test('renders patient gender', async ({ page }) => {
      const patient_section = page.locator('[data-test-id="patient"]');
      await expect(patient_section).toContainText(patient.gender, { ignoreCase: true });
    });

    test('renders patient address', async ({ page }) => {
      const patient_section = page.locator('[data-test-id="patient"]');
      await expect(patient_section).toContainText(patient.address[0].line[0], { ignoreCase: true });
      await expect(patient_section).toContainText(patient.address[0].city, { ignoreCase: true });
      await expect(patient_section).toContainText(patient.address[0].state);
      await expect(patient_section).toContainText(patient.address[0].postalCode);
    });
  });

  describe('Resource Visibility', () => {
    const RESOURCES = [
      'Conditions',
      // 'Medications', TODO: fix bug where Medication header id has whitespace
      'Observations',
      'Reports',
      'CarePlans',
      'Procedures',
      'Encounters',
      // 'Allergies', TODO: find Synthea sample that is small but has all resources
      'Immunizations',
      'Documents',
      // 'Images' TODO: fins Synthea sample that is small but has all resources
    ];

    for(const resource of RESOURCES) {
      test(`renders ${resource} link`, async ({ page }) => {
        const link = page.getByRole('main').getByRole('link', { name: resource });
        await expect(link).toBeVisible();
        
        await link.click();

        await expect(page.locator(`#${resource}`)).toBeVisible();
      });
    }
  });

  // TODO: assign data-test-ids to resource tables and scan/count resource elements based on fixture
  
  // TODO: toggle by grouping tests
});
