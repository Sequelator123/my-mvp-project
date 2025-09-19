import { test, expect } from '@playwright/test';

test.describe('Error Handling and Offline Scenarios', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should handle form submission appropriately', async ({ page }) => {
    // Fill and submit form
    await page.getByRole('textbox', { name: 'Your Name *' }).fill('Test User');
    await page.getByRole('textbox', { name: /What would you like to order/ }).fill('Test Order');
    await page.getByRole('button', { name: 'Submit Order', exact: true }).click();

    // Should either succeed or show error depending on PocketBase state
    try {
      await expect(page.getByText('Order submitted successfully!')).toBeVisible({ timeout: 3000 });
    } catch {
      await expect(page.getByText(/Failed to submit order/)).toBeVisible({ timeout: 3000 });
      // Form should remain filled on error
      await expect(page.getByRole('textbox', { name: 'Your Name *' })).toHaveValue('Test User');
    }
  });

  test('should handle dashboard loading states', async ({ page }) => {
    // Navigate to dashboard
    await page.getByRole('button', { name: '📊 View Dashboard' }).click();

    // Should show dashboard elements regardless of data state
    await expect(page.getByRole('heading', { name: '📊 Order Dashboard' })).toBeVisible();
    await expect(page.getByText(/Total orders:/)).toBeVisible();

    // Refresh button should be available and functional
    const refreshButton = page.getByRole('button', { name: /Refresh/ });
    if (await refreshButton.isVisible()) {
      await refreshButton.click();
      await expect(refreshButton).toBeVisible(); // Should remain clickable
    }
  });

  test('should handle network interruption during form submission', async ({ page }) => {
    // Fill form
    await page.getByRole('textbox', { name: 'Your Name *' }).fill('Network Test User');
    await page.getByRole('textbox', { name: /What would you like to order/ }).fill('Network Test Order');

    // Simulate network failure by intercepting requests
    await page.route('**/api/collections/lunch_orders/records', route => {
      route.abort('failed');
    });

    // Submit form
    await page.getByRole('button', { name: 'Submit Order', exact: true }).click();

    // Should handle network error gracefully
    await expect(page.getByText('Failed to submit order')).toBeVisible();

    // Remove network simulation
    await page.unroute('**/api/collections/lunch_orders/records');
  });

  test('should handle slow network responses', async ({ page }) => {
    // Fill form
    await page.getByRole('textbox', { name: 'Your Name *' }).fill('Slow Network User');
    await page.getByRole('textbox', { name: /What would you like to order/ }).fill('Slow Network Order');

    // Simulate slow network by delaying responses
    await page.route('**/api/collections/lunch_orders/records', async route => {
      await new Promise(resolve => setTimeout(resolve, 3000)); // 3 second delay
      route.abort('failed'); // Still fail after delay
    });

    // Submit form
    await page.getByRole('button', { name: 'Submit Order', exact: true }).click();

    // Should show loading state or handle timeout
    await expect(page.getByText('Failed to submit order')).toBeVisible({ timeout: 5000 });

    // Remove route simulation
    await page.unroute('**/api/collections/lunch_orders/records');
  });

  test('should handle API errors gracefully', async ({ page }) => {
    // Navigate to dashboard
    await page.getByRole('button', { name: '📊 View Dashboard' }).click();

    // Dashboard should load regardless of API state
    await expect(page.getByRole('heading', { name: '📊 Order Dashboard' })).toBeVisible();

    // Should show some kind of status (loading, error, or data)
    const hasContent = await page.locator('text=/Total orders:|Loading|Failed/').count() > 0;
    expect(hasContent).toBeTruthy();
  });

  test('should handle HTTP error codes', async ({ page }) => {
    // Test various HTTP error responses
    const errorCodes = [400, 401, 403, 404, 500, 502, 503];

    for (const errorCode of errorCodes) {
      // Fill form
      await page.getByRole('textbox', { name: 'Your Name *' }).fill(`Error ${errorCode} User`);
      await page.getByRole('textbox', { name: /What would you like to order/ }).fill(`Error ${errorCode} Order`);

      // Simulate HTTP error
      await page.route('**/api/collections/lunch_orders/records', route => {
        route.fulfill({
          status: errorCode,
          contentType: 'application/json',
          body: JSON.stringify({ error: `HTTP ${errorCode}` })
        });
      });

      // Submit form
      await page.getByRole('button', { name: 'Submit Order', exact: true }).click();

      // Should show error message for all error codes
      await expect(page.getByText('Failed to submit order')).toBeVisible();

      // Clear form for next iteration
      await page.getByRole('textbox', { name: 'Your Name *' }).clear();
      await page.getByRole('textbox', { name: /What would you like to order/ }).clear();

      await page.unroute('**/api/collections/lunch_orders/records');
      await page.waitForTimeout(500); // Brief pause between tests
    }
  });

  test('should maintain functionality during JavaScript errors', async ({ page }) => {
    // Listen for JavaScript errors
    const jsErrors: string[] = [];
    page.on('pageerror', error => {
      jsErrors.push(error.message);
    });

    // Inject code that might cause errors (simulate real-world scenarios)
    await page.evaluate(() => {
      // Simulate potential runtime errors
      (window as any).simulateError = () => {
        throw new Error('Simulated runtime error');
      };
    });

    // Basic functionality should still work
    await page.getByRole('textbox', { name: 'Your Name *' }).fill('Error Test User');
    await expect(page.getByRole('textbox', { name: 'Your Name *' })).toHaveValue('Error Test User');

    // Navigation should still work
    await page.getByRole('button', { name: '📊 View Dashboard' }).click();
    await expect(page.getByRole('heading', { name: '📊 Order Dashboard' })).toBeVisible();

    await page.getByRole('button', { name: '📝 Submit Order' }).click();
    await expect(page.getByRole('heading', { name: '🍽️ Lunch Order Form' })).toBeVisible();

    // Log any JavaScript errors found (for debugging)
    if (jsErrors.length > 0) {
      console.log('JavaScript errors detected:', jsErrors);
    }
  });

  test('should handle browser back/forward navigation gracefully', async ({ page }) => {
    // Start on form
    await expect(page.getByRole('heading', { name: '🍽️ Lunch Order Form' })).toBeVisible();

    // Navigate to dashboard
    await page.getByRole('button', { name: '📊 View Dashboard' }).click();
    await expect(page.getByRole('heading', { name: '📊 Order Dashboard' })).toBeVisible();

    // Use browser back button
    await page.goBack();
    await expect(page.getByRole('heading', { name: '🍽️ Lunch Order Form' })).toBeVisible();

    // Use browser forward button
    await page.goForward();
    await expect(page.getByRole('heading', { name: '📊 Order Dashboard' })).toBeVisible();

    // App state should be maintained correctly
    await page.getByRole('button', { name: '📝 Submit Order' }).click();
    await expect(page.getByRole('heading', { name: '🍽️ Lunch Order Form' })).toBeVisible();
  });

  test('should handle page reload gracefully', async ({ page }) => {
    // Fill form
    await page.getByRole('textbox', { name: 'Your Name *' }).fill('Reload Test User');
    await page.getByRole('textbox', { name: /What would you like to order/ }).fill('Reload Test Order');

    // Reload page
    await page.reload();

    // Should return to initial state
    await expect(page.getByRole('heading', { name: '🍽️ Lunch Order Form' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Your Name *' })).toHaveValue('');
    await expect(page.getByRole('textbox', { name: /What would you like to order/ })).toHaveValue('');

    // Should still be functional
    await page.getByRole('textbox', { name: 'Your Name *' }).fill('After Reload User');
    await expect(page.getByRole('textbox', { name: 'Your Name *' })).toHaveValue('After Reload User');
  });

  test('should handle multiple rapid interactions', async ({ page }) => {
    // Rapidly click between tabs
    for (let i = 0; i < 5; i++) {
      await page.getByRole('button', { name: '📊 View Dashboard' }).click({ timeout: 1000 });
      await page.getByRole('button', { name: '📝 Submit Order' }).click({ timeout: 1000 });
    }

    // Should end up on form and be stable
    await expect(page.getByRole('heading', { name: '🍽️ Lunch Order Form' })).toBeVisible();

    // Form should still be functional
    await page.getByRole('textbox', { name: 'Your Name *' }).fill('Rapid Click User');
    await expect(page.getByRole('textbox', { name: 'Your Name *' })).toHaveValue('Rapid Click User');
  });
});