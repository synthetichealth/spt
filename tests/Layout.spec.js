import { test, expect } from '@playwright/test';

test.describe('Layout', () =>{

  test.beforeEach(async ({page}) => {
    await page.goto('http://127.0.0.1:3000/spt');
  });

  test('top bar', async ({ page }) => {
    await expect(page.locator('header')).toContainText('Synthea Toolkit');

    await expect(page.getByTestId('GitHubIcon')).toBeVisible();
  });
    
  test('side navigation bar', async ({ page }) => {
    // Assert side navbar is open upon loading page
    await expect(page.getByRole('navigation')).toContainText('Patient Viewer');
    await expect(page.getByRole('navigation')).toContainText('Synthea Customizer');
    await expect(page.locator('.MuiDrawer-root')).toBeVisible();
    await expect(page.getByTestId('ChevronLeftIcon')).toBeVisible();

    // Collapse side navbar
    await page.getByTestId('ChevronLeftIcon').click();
    await page.waitForTimeout(500);

    // Assert side navbar is closed  
    await expect(page.getByTestId('Chevronlefticon')).not.toBeVisible();  

    // Re-open side navbar
    await page.getByRole('button', { name: 'open drawer' }).click();
    await expect(page.getByRole('navigation')).toContainText('Patient Viewer');
    await expect(page.getByRole('navigation')).toContainText('Synthea Customizer');
    await expect(page.locator('.MuiDrawer-root')).toBeVisible();
    await expect(page.getByTestId('ChevronLeftIcon')).toBeVisible();
  
  });
});
