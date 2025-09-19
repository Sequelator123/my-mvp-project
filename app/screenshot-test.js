import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Navigate to the app
    await page.goto('http://localhost:5174');

    // Wait for the page to load
    await page.waitForLoadState('networkidle');

    // Take screenshot of the form view
    await page.screenshot({
      path: 'app-form-screenshot.png',
      fullPage: true
    });
    console.log('✅ Form screenshot saved as app-form-screenshot.png');

    // Click on dashboard tab
    await page.click('text=📊 View Dashboard');
    await page.waitForLoadState('networkidle');

    // Take screenshot of the dashboard view
    await page.screenshot({
      path: 'app-dashboard-screenshot.png',
      fullPage: true
    });
    console.log('✅ Dashboard screenshot saved as app-dashboard-screenshot.png');

  } catch (error) {
    console.error('❌ Error taking screenshot:', error.message);
  } finally {
    await browser.close();
  }
})();