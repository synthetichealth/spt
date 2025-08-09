import { test, expect, describe, beforeEach } from '@playwright/test';

describe('Synthea Customizer', () => {

  beforeEach(async ({ page }) => {
    await page.goto('http://127.0.0.1:3000/spt/#/customizer');
  });

  test('page has title', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Synthea Customizer');
  });

  test('shows initial mode selection', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Use Guided Mode' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Use Advanced Mode' })).toBeVisible();
  });

  describe('Guided Mode', () => {

    beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: 'Use Guided Mode' }).click();
    });

    test('shows export format selection', async ({ page }) => {
      await expect(page.locator('h3')).toContainText('Which data formats do you need?');
      await expect(page.getByRole('button', { name: 'HL7® FHIR® R4' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'FHIR® Bulk Data' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'C-CDA' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'CSV' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'JSON' })).toBeVisible();
    });

    test('shows less common options when requested', async ({ page }) => {
      await page.getByRole('button', { name: 'Show less common options' }).click();
      await expect(page.getByRole('button', { name: 'HL7® FHIR® STU 3' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'HL7® FHIR® DSTU 2' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Text' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'CPCDS' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'CMS BFD' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Symptoms' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'VA CDW' })).toBeVisible();
    });

    test('data requirements question appears after selecting export format', async ({ page }) => {
      await page.getByRole('button', { name: 'HL7® FHIR® R4' }).click();
      await expect(page.locator('h3')).toContainText('Which of the following data requirements apply to you?');
      
      await expect(page.getByRole('button', { name: /I need patients that meet certain clinical criteria/ })).toBeVisible();
      await expect(page.getByRole('button', { name: /I need a certain geographic location/ })).toBeVisible();
      await expect(page.getByRole('button', { name: /I need a population with specific demographics/ })).toBeVisible();
      await expect(page.getByRole('button', { name: /I need to re-create the same exact population/ })).toBeVisible();
      await expect(page.getByRole('button', { name: /None of these/ })).toBeVisible();
    });

    describe('Export Format Tests', () => {
      const EXPORT_FORMATS = [
        { name: 'HL7® FHIR® R4', configKey: 'exporter.fhir.export' },
        { name: 'FHIR® Bulk Data', configKey: 'exporter.fhir.bulk_data' },
        { name: 'C-CDA', configKey: 'exporter.ccda.export' },
        { name: 'CSV', configKey: 'exporter.csv.export' },
        { name: 'JSON', configKey: 'exporter.json.export' }
      ];

      EXPORT_FORMATS.forEach(({ name, configKey }) => {
        test(`${name} export generates correct command`, async ({ page }) => {
          // Select the export format
          await page.getByRole('button', { name }).click();
          
          // Select "None of these" for data requirements to get to command generation
          await page.getByRole('button', { name: /None of these/ }).click();
          
          // Select Basic Setup to generate the command
          await page.getByRole('button', { name: 'Basic Setup' }).click();
          
          // Check that the command contains the expected configuration
          const codeBlock = page.locator('pre').first();
          await expect(codeBlock).toBeVisible();
          
          // For bulk data, we need to check for both bulk_data and fhir export
          if (name === 'FHIR® Bulk Data') {
            await expect(codeBlock).toContainText('exporter.fhir.bulk_data=true');
            await expect(codeBlock).toContainText('exporter.fhir.export=true');
          } else {
            await expect(codeBlock).toContainText(`${configKey}=true`);
          }
        });
      });
    });

    describe('Data Requirements Flow', () => {
      beforeEach(async ({ page }) => {
        // Select an export format first
        await page.getByRole('button', { name: 'HL7® FHIR® R4' }).click();
      });

      test('selecting "keep" shows clinical criteria fields', async ({ page }) => {
        await page.getByRole('button', { name: /I need patients that meet certain clinical criteria/ }).click();
        
        // Should show basic settings
        await expect(page.locator('h5')).toContainText('Basic Settings');
        await expect(page.getByLabel('Population')).toBeVisible();
        
        // Should show keep module builder
        await expect(page.locator('h3')).toContainText('Keep Module Builder');
      });

      test('selecting "geographic" shows geographic fields', async ({ page }) => {
        await page.getByRole('button', { name: /I need a certain geographic location/ }).click();
        
        // Should show basic settings
        await expect(page.locator('h5')).toContainText('Basic Settings');
        
        // Should show geographic settings
        await expect(page.locator('h5')).toContainText('Geographic Settings');
        await expect(page.getByLabel('State')).toBeVisible();
        await expect(page.getByLabel('City')).toBeVisible();
      });

      test('selecting "demographic" shows demographic fields', async ({ page }) => {
        await page.getByRole('button', { name: /I need a population with specific demographics/ }).click();
        
        // Should show basic settings
        await expect(page.locator('h5')).toContainText('Basic Settings');
        
        // Should show demographic settings
        await expect(page.locator('h5')).toContainText('Demographic Settings');
        await expect(page.getByLabel('Gender')).toBeVisible();
        await expect(page.getByLabel('Age Min')).toBeVisible();
        await expect(page.getByLabel('Age Max')).toBeVisible();
      });

      test('selecting "reproducibility" shows reproducibility fields', async ({ page }) => {
        await page.getByRole('button', { name: /I need to re-create the same exact population/ }).click();
        
        // Should show basic settings
        await expect(page.locator('h5')).toContainText('Basic Settings');
        
        // Should show reproducibility settings
        await expect(page.locator('h5')).toContainText('Reproducibility Settings');
        await expect(page.getByLabel('Seed')).toBeVisible();
        await expect(page.getByLabel('Clinician Seed')).toBeVisible();
        await expect(page.getByLabel(/Reference Date/)).toBeVisible();
      });

      test('selecting "none" shows only basic fields', async ({ page }) => {
        await page.getByRole('button', { name: /None of these/ }).click();
        
        // Should show basic settings
        await expect(page.locator('h5')).toContainText('Basic Settings');
        await expect(page.getByLabel('Population')).toBeVisible();
        
        // Should not show other field groups
        await expect(page.locator('h5').filter({ hasText: 'Geographic Settings' })).not.toBeVisible();
        await expect(page.locator('h5').filter({ hasText: 'Demographic Settings' })).not.toBeVisible();
        await expect(page.locator('h5').filter({ hasText: 'Reproducibility Settings' })).not.toBeVisible();
      });
    });

    describe('Setup Mode Selection', () => {
      beforeEach(async ({ page }) => {
        // Select export format and data requirement to get to setup selection
        await page.getByRole('button', { name: 'HL7® FHIR® R4' }).click();
        await page.getByRole('button', { name: /None of these/ }).click();
      });

      test('shows setup mode options', async ({ page }) => {
        await expect(page.locator('h3')).toContainText('How do you want to run Synthea?');
        await expect(page.getByRole('button', { name: /Docker/ })).toBeVisible();
        await expect(page.getByRole('button', { name: /Basic Setup/ })).toBeVisible();
        await expect(page.getByRole('button', { name: /Developer Setup/ })).toBeVisible();
      });

      test('Docker setup generates docker command', async ({ page }) => {
        await page.getByRole('button', { name: /Docker/ }).click();
        
        const codeBlock = page.locator('pre').first();
        await expect(codeBlock).toBeVisible();
        await expect(codeBlock).toContainText('docker');
      });

      test('Basic setup generates jar command', async ({ page }) => {
        await page.getByRole('button', { name: /Basic Setup/ }).click();
        
        const codeBlock = page.locator('pre').first();
        await expect(codeBlock).toBeVisible();
        await expect(codeBlock).toContainText('java -jar synthea-with-dependencies.jar');
      });

      test('Developer setup generates gradle command', async ({ page }) => {
        await page.getByRole('button', { name: /Developer Setup/ }).click();
        
        const codeBlock = page.locator('pre').first();
        await expect(codeBlock).toBeVisible();
        await expect(codeBlock).toContainText('./gradlew');
      });
    });

    describe('Input Field Integration', () => {
      test('population input affects generated command', async ({ page }) => {
        await page.getByRole('button', { name: 'HL7® FHIR® R4' }).click();
        await page.getByRole('button', { name: /None of these/ }).click();
        
        // Fill in population
        await page.getByLabel('Population').fill('100');
        
        await page.getByRole('button', { name: /Basic Setup/ }).click();
        
        const codeBlock = page.locator('pre').first();
        await expect(codeBlock).toContainText('-p 100');
      });

      test('geographic inputs affect generated command', async ({ page }) => {
        await page.getByRole('button', { name: 'HL7® FHIR® R4' }).click();
        await page.getByRole('button', { name: /I need a certain geographic location/ }).click();
        
        // Fill in state
        await page.getByLabel('State').click();
        await page.getByRole('option', { name: 'California' }).click();
        
        // Fill in city
        await page.getByLabel('City').fill('Los Angeles');
        
        await page.getByRole('button', { name: /Basic Setup/ }).click();
        
        const codeBlock = page.locator('pre').first();
        await expect(codeBlock).toContainText('California');
        await expect(codeBlock).toContainText('Los Angeles');
      });

      test('demographic inputs affect generated command', async ({ page }) => {
        await page.getByRole('button', { name: 'HL7® FHIR® R4' }).click();
        await page.getByRole('button', { name: /I need a population with specific demographics/ }).click();
        
        // Fill in gender
        await page.getByLabel('Gender').click();
        await page.getByRole('option', { name: 'M' }).click();
        
        // Fill in age range
        await page.getByLabel('Age Min').fill('25');
        await page.getByLabel('Age Max').fill('65');
        
        await page.getByRole('button', { name: /Basic Setup/ }).click();
        
        const codeBlock = page.locator('pre').first();
        await expect(codeBlock).toContainText('-g M');
        await expect(codeBlock).toContainText('-a 25-65');
      });

      test('reproducibility inputs affect generated command', async ({ page }) => {
        await page.getByRole('button', { name: 'HL7® FHIR® R4' }).click();
        await page.getByRole('button', { name: /I need to re-create the same exact population/ }).click();
        
        // Fill in reproducibility fields
        await page.getByLabel('Seed', { exact: true }).fill('12345');
        await page.getByLabel('Clinician Seed').fill('67890');
        await page.getByLabel(/Reference Date/).fill('20240101');
        
        await page.getByRole('button', { name: /Basic Setup/ }).click();
        
        const codeBlock = page.locator('pre').first();
        await expect(codeBlock).toContainText('-s 12345');
        await expect(codeBlock).toContainText('-cs 67890');
        await expect(codeBlock).toContainText('-r 20240101');
      });
    });

    test('advanced configuration options are available', async ({ page }) => {
      await page.getByRole('button', { name: 'HL7® FHIR® R4' }).click();
      await page.getByRole('button', { name: /None of these/ }).click();
      
      // Check for advanced configuration accordion
      await expect(page.getByText('Advanced Configuration Options')).toBeVisible();
      
      // Expand the accordion
      await page.getByText('Advanced Configuration Options').click();
      
      // Should show config options
      await expect(page.locator('input[name*="exporter"]').first()).toBeVisible();
    });
  });

  describe('Advanced Mode', () => {

    beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: 'Use Advanced Mode' }).click();
    });

    test('shows all builder components', async ({ page }) => {
      await expect(page.locator('h3')).toContainText('Command-line Argument Builder');
      await expect(page.locator('h3')).toContainText('Config Builder');
      await expect(page.locator('h3')).toContainText('Keep Module Builder');
      await expect(page.locator('h3')).toContainText('Dockerfile Builder');
    });

    test('shows all argument groups', async ({ page }) => {
      await expect(page.locator('h5')).toContainText('Basic Settings');
      await expect(page.locator('h5')).toContainText('Geographic Settings');
      await expect(page.locator('h5')).toContainText('Demographic Settings');
      await expect(page.locator('h5')).toContainText('Reproducibility Settings');
    });

    test('all input fields are visible', async ({ page }) => {
      // Basic fields
      await expect(page.getByLabel('Population')).toBeVisible();
      
      // Geographic fields
      await expect(page.getByLabel('State')).toBeVisible();
      await expect(page.getByLabel('City')).toBeVisible();
      
      // Demographic fields
      await expect(page.getByLabel('Gender')).toBeVisible();
      await expect(page.getByLabel('Age Min')).toBeVisible();
      await expect(page.getByLabel('Age Max')).toBeVisible();
      
      // Reproducibility fields
      await expect(page.getByLabel('Seed')).toBeVisible();
      await expect(page.getByLabel('Clinician Seed')).toBeVisible();
      await expect(page.getByLabel(/Reference Date/)).toBeVisible();
    });

    test('command updates when inputs change', async ({ page }) => {
      // Fill in some values
      await page.getByLabel('Population').fill('50');
      await page.getByLabel('Seed', { exact: true }).fill('999');
      
      // Check command is updated
      const codeBlock = page.locator('pre').first();
      await expect(codeBlock).toContainText('-p 50');
      await expect(codeBlock).toContainText('-s 999');
    });

    test('config builder allows adding settings', async ({ page }) => {
      // Click on config dropdown
      await page.getByLabel('Choose Setting').click();
      
      // Select a config option
      await page.getByRole('option', { name: /exporter.csv.export/ }).click();
      
      // Add the config
      await page.getByRole('button', { name: 'Add Config' }).click();
      
      // Should show the config field
      await expect(page.locator('input[name="exporter.csv.export"]')).toBeVisible();
    });

    test('city field is disabled when no state is selected', async ({ page }) => {
      await expect(page.getByLabel('City')).toBeDisabled();
    });

    test('city field is enabled when state is selected', async ({ page }) => {
      await page.getByLabel('State').click();
      await page.getByRole('option', { name: 'California' }).click();
      
      await expect(page.getByLabel('City')).toBeEnabled();
    });
  });

  describe('Copy and Download Functionality', () => {
    
    test('copy button works in guided mode', async ({ page }) => {
      await page.getByRole('button', { name: 'Use Guided Mode' }).click();
      await page.getByRole('button', { name: 'HL7® FHIR® R4' }).click();
      await page.getByRole('button', { name: /None of these/ }).click();
      await page.getByRole('button', { name: /Basic Setup/ }).click();
      
      // Look for copy button in the code block
      const copyButton = page.locator('button[title="Copy"]');
      await expect(copyButton).toBeVisible();
    });

    test('copy button works in advanced mode', async ({ page }) => {
      await page.getByRole('button', { name: 'Use Advanced Mode' }).click();
      
      // Look for copy button in the code block
      const copyButton = page.locator('button[title="Copy"]');
      await expect(copyButton).toBeVisible();
    });

    test('config file download button is available', async ({ page }) => {
      await page.getByRole('button', { name: 'Use Advanced Mode' }).click();
      
      // Add a config setting first
      await page.getByLabel('Choose Setting').click();
      await page.getByRole('option', { name: /exporter.csv.export/ }).click();
      await page.getByRole('button', { name: 'Add Config' }).click();
      
      // Should show download button
      await expect(page.getByRole('button', { name: 'Download Config File' })).toBeVisible();
    });
  });

  describe('Mode Switching', () => {
    
    test('can switch from guided to advanced mode', async ({ page }) => {
      // Start in guided mode
      await page.getByRole('button', { name: 'Use Guided Mode' }).click();
      await expect(page.locator('h3')).toContainText('Which data formats do you need?');
      
      // Go back to mode selection (this would require a back button or similar navigation)
      // For now, we'll reload the page to simulate going back
      await page.reload();
      
      // Switch to advanced mode
      await page.getByRole('button', { name: 'Use Advanced Mode' }).click();
      await expect(page.locator('h3')).toContainText('Command-line Argument Builder');
    });

    test('can switch from advanced to guided mode', async ({ page }) => {
      // Start in advanced mode
      await page.getByRole('button', { name: 'Use Advanced Mode' }).click();
      await expect(page.locator('h3')).toContainText('Command-line Argument Builder');
      
      // Go back to mode selection
      await page.reload();
      
      // Switch to guided mode
      await page.getByRole('button', { name: 'Use Guided Mode' }).click();
      await expect(page.locator('h3')).toContainText('Which data formats do you need?');
    });
  });
});
