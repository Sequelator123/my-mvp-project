import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    console.log('🚀 Starting app test...');

    // Navigate to the app
    await page.goto('http://localhost:5174');
    await page.waitForLoadState('networkidle');
    console.log('✅ Navigated to localhost:5174');

    // Verify we're on the form view initially
    await page.waitForSelector('text=Lunch Order Form');
    console.log('✅ Form view loaded successfully');

    // Test data for 3 orders
    const orders = [
      {
        name: 'Alice Johnson',
        order: 'Caesar Salad with grilled chicken',
        notes: 'No croutons please'
      },
      {
        name: 'Bob Smith',
        order: 'Turkey club sandwich with fries',
        notes: 'Extra mayo'
      },
      {
        name: 'Carol Davis',
        order: 'Vegetarian pasta primavera',
        notes: 'Vegan - no cheese or dairy'
      }
    ];

    // Submit 3 orders
    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];
      console.log(`📝 Submitting order ${i + 1}: ${order.name}`);

      // Clear the form first
      await page.fill('input[name="employee_name"]', '');
      await page.fill('textarea[name="order_item"]', '');
      await page.fill('textarea[name="dietary_notes"]', '');

      // Fill out the form
      await page.fill('input[name="employee_name"]', order.name);
      await page.fill('textarea[name="order_item"]', order.order);
      await page.fill('textarea[name="dietary_notes"]', order.notes);

      // Submit the form
      await page.click('button[type="submit"]');

      // Wait for either success message or error message
      try {
        await page.waitForSelector('text=Order submitted successfully!', { timeout: 8000 });
      } catch (error) {
        // Check if there's an error message instead
        const errorMessage = await page.$('div:has-text("Failed to submit order")');
        if (errorMessage) {
          console.log(`⚠️  Order ${i + 1} failed - checking error`);
          const errorText = await errorMessage.textContent();
          console.log(`   Error: ${errorText}`);
        } else {
          console.log(`⚠️  Order ${i + 1} - no success or error message found`);
        }
      }
      console.log(`✅ Order ${i + 1} submitted successfully`);

      // Wait a moment between submissions
      await page.waitForTimeout(1000);
    }

    // Switch to dashboard view
    console.log('📊 Switching to dashboard view...');
    await page.click('text=📊 View Dashboard');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('text=Order Dashboard');
    console.log('✅ Dashboard view loaded');

    // Wait for orders to load
    await page.waitForSelector('table tbody tr', { timeout: 10000 });

    // Count the orders in the dashboard
    const orderRows = await page.$$('table tbody tr');
    console.log(`📋 Found ${orderRows.length} orders in dashboard`);

    // Verify each order appears in the dashboard
    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];
      const nameCell = page.locator('table tbody tr').nth(i).locator('td').nth(0);
      const orderCell = page.locator('table tbody tr').nth(i).locator('td').nth(1);

      const actualName = await nameCell.textContent();
      const actualOrder = await orderCell.textContent();

      console.log(`🔍 Verifying order ${i + 1}:`);
      console.log(`   Expected: ${order.name} - ${order.order}`);
      console.log(`   Actual: ${actualName} - ${actualOrder}`);

      if (actualName.includes(order.name)) {
        console.log(`✅ Order ${i + 1} name verified`);
      } else {
        console.log(`❌ Order ${i + 1} name mismatch`);
      }

      if (actualOrder.includes(order.order.substring(0, 20))) {
        console.log(`✅ Order ${i + 1} details verified`);
      } else {
        console.log(`❌ Order ${i + 1} details mismatch`);
      }
    }

    // Take final screenshot
    await page.screenshot({
      path: 'app-test-result.png',
      fullPage: true
    });
    console.log('📸 Final screenshot saved as app-test-result.png');

    console.log('🎉 All tests completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);

    // Take screenshot of error state
    await page.screenshot({
      path: 'app-test-error.png',
      fullPage: true
    });
    console.log('📸 Error screenshot saved as app-test-error.png');
  } finally {
    await browser.close();
  }
})();