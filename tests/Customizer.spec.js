import { test, expect, describe, beforeEach } from '@playwright/test';

describe('Synthea Customizer', async function({ page }) {

  beforeEach(async function({ page }) {
    page.goto('http://127.0.0.1:3000/spt');
  });

  test('page has title', async function({ page }) {
    await expect(page.locator('h1')).toContainText('Synthea Customizer');
  });

  describe('guided mode', async function({ page }) {

    beforeEach(async function({ page }) {
      await page.getByRole('button', { name: 'Use Guided Mode' }).click();
    });

    /** TODO
        - for guided mode tests, assert visibility before and after the "I need" toggle buttons
        - for advance mode tests assert data entry
        - at the end assert clip board copy and file download
     */

    const EXPORT_FORMATS = {
      'HL7® FHIR® R4': /.*/,
      'FHIR® Bulk Data': /exporter\.fhir\.export\s*=\s*true/,
      'C-CDA': /exporter\.fhir\.export\s*=\s*true/,
      'CSV': /exporter\.csv\.export\s*=\s*true/,
      'JSON': /exporter\.csv\.export\s*=\s*true/,
      /* TODO: extended formats */
    };

    Object.entries(EXPORT_FORMATS).forEach(([format, argument]) => {
      test(`${format} export toggle appends the proper command`, async function({ page }) {
        await page.getByRole('button', { name: format }).click();
        await page.getByRole('button', { name: 'None' }).click();
        await page.getByRole('button', { name: 'Basic Setup' }).click();
        
        const command = page.getByRole('code').filter({ hasText: 'java -jar synthea-with-dependencies.jar' });
        await expect(command).toContainText(argument);
      });
    });

    const ARG_TOGGLES = {
      'patients that meet': '',
      'geographic': '',
      'population with': '',
      're-create': ''
    };
    
  }); // close describe guided mode
  
});
