import { test, expect, describe, beforeEach } from '@playwright/test';

const fs = require("fs");
const path = require("path");

const BUNDLE_FIXTURE = 'fixtures/output/fhir/Bo157_Schroeder447_013ba640-77dd-1136-b35e-2ff0b3c48ff5.json';
var bundle = JSON.parse(fs.readFileSync(path.resolve(__dirname, BUNDLE_FIXTURE), 'utf-8'));

describe('PatientViewer', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://127.0.0.1:3000/spt/#/record_viewer'); 

    await page.locator('input[type="file"]').setInputFiles(path.resolve(__dirname, BUNDLE_FIXTURE));
    await page.waitForTimeout(5000); 
  });

  test('renders and uploads FHIR bundle successfully', async ({ page }) => {
    await expect(page.getByText('Drag & drop a FHIR JSON file here')).not.toBeVisible();
  });

  describe('patient section', () => {
    test('renders patient basic information', async ({ page }) => {
      var patient = bundle.entry[0].resource;
      var patient_section = page.locator('[data-test-id="patient"]');

      await expect(patient_section).toContainText(patient.name[0].family);
      patient.name[0].given.forEach(async (given_name) => {
        await expect(patient_section).toContainText(given_name);
      });

      expect(patient_section).toContainText(patient.gender);

      expect(patient_section).toContainText(patient.address[0].line);
      expect(patient_section).toContainText(patient.address[0].city);
    });
  });

  // describe('Resource Visibility', () => {
  //   const RESOURCES = [
  //     'Conditions',
  //     'Medications',
  //     'Observations',
  //     'Reports',
  //     'CarePlans',
  //     'Procedures',
  //     'Encounters',
  //     'Allergies',
  //     'Immunizations',
  //     'Documents',
  //     'Images'
  //   ];

  //   RESOURCES.forEach((resource) => {
  //     test(`renders ${resource} link`, async ({ page }) => {
  //       const link = await page.getByRole('link', { name: resource });
  //       await expect(link).toBeVisible();
        
  //       link.click();

  //       await expect(page.locator(`#${resource}`)).toBeVisible();
  //     });
  //   });
  // });

  // test('toggles grouping by encounter', async ({ page }) => {
  //   await expect(page.locator('text="Group by Encounter"')).toBeVisible();
  //   await page.locator('text="Group by Encounter"').click();
  //   await expect(page.locator('text="Ungroup"')).toBeVisible(); // Indicates successful toggle
  // });
});
