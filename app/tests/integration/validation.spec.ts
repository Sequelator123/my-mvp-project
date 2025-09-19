import { test, expect } from '@playwright/test';
import { edgeCaseOrders, invalidOrders } from '../fixtures/test-data';

test.describe('Form Validation Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should validate required fields', async ({ page }) => {
    // Try to submit empty form
    await page.getByRole('button', { name: 'Submit Order', exact: true }).click();

    // Should focus on first required field (name)
    await expect(page.getByRole('textbox', { name: 'Your Name *' })).toBeFocused();

    // Fill name, try again
    await page.getByRole('textbox', { name: 'Your Name *' }).fill('Test User');
    await page.getByRole('button', { name: 'Submit Order', exact: true }).click();

    // Should focus on second required field (order)
    await expect(page.getByRole('textbox', { name: /What would you like to order/ })).toBeFocused();
  });

  test('should handle empty name field', async ({ page }) => {
    // Fill only order field
    await page.getByRole('textbox', { name: /What would you like to order/ }).fill('Test Order');
    await page.getByRole('button', { name: 'Submit Order', exact: true }).click();

    // Should focus on name field
    await expect(page.getByRole('textbox', { name: 'Your Name *' })).toBeFocused();
  });

  test('should handle empty order field', async ({ page }) => {
    // Fill only name field
    await page.getByRole('textbox', { name: 'Your Name *' }).fill('Test User');
    await page.getByRole('button', { name: 'Submit Order', exact: true }).click();

    // Should focus on order field
    await expect(page.getByRole('textbox', { name: /What would you like to order/ })).toBeFocused();
  });

  test('should accept optional dietary notes field empty', async ({ page }) => {
    // Fill required fields only
    await page.getByRole('textbox', { name: 'Your Name *' }).fill('Test User');
    await page.getByRole('textbox', { name: /What would you like to order/ }).fill('Test Order');

    // Submit should not focus on dietary notes (it's optional)
    await page.getByRole('button', { name: 'Submit Order', exact: true }).click();

    // Should either show success/error message or attempt submission
    await page.waitForTimeout(1000); // Brief wait for form processing
    const dietaryField = page.getByRole('textbox', { name: 'Dietary Notes (Optional)' });
    await expect(dietaryField).not.toBeFocused();
  });

  test('should handle special characters in input', async ({ page }) => {
    const specialOrder = edgeCaseOrders[0];

    await page.getByRole('textbox', { name: 'Your Name *' }).fill(specialOrder.employee_name);
    await page.getByRole('textbox', { name: /What would you like to order/ }).fill(specialOrder.order_item);
    await page.getByRole('textbox', { name: 'Dietary Notes (Optional)' }).fill(specialOrder.dietary_notes);

    // Values should be preserved correctly
    await expect(page.getByRole('textbox', { name: 'Your Name *' })).toHaveValue(specialOrder.employee_name);
    await expect(page.getByRole('textbox', { name: /What would you like to order/ })).toHaveValue(specialOrder.order_item);
    await expect(page.getByRole('textbox', { name: 'Dietary Notes (Optional)' })).toHaveValue(specialOrder.dietary_notes);
  });

  test('should handle very long input text', async ({ page }) => {
    const longOrder = edgeCaseOrders[1];

    await page.getByRole('textbox', { name: 'Your Name *' }).fill(longOrder.employee_name);
    await page.getByRole('textbox', { name: /What would you like to order/ }).fill(longOrder.order_item);
    await page.getByRole('textbox', { name: 'Dietary Notes (Optional)' }).fill(longOrder.dietary_notes);

    // Values should be preserved (no truncation in form fields)
    await expect(page.getByRole('textbox', { name: 'Your Name *' })).toHaveValue(longOrder.employee_name);
    await expect(page.getByRole('textbox', { name: /What would you like to order/ })).toHaveValue(longOrder.order_item);
    await expect(page.getByRole('textbox', { name: 'Dietary Notes (Optional)' })).toHaveValue(longOrder.dietary_notes);
  });

  test('should handle unicode characters', async ({ page }) => {
    const unicodeOrder = edgeCaseOrders[2];

    await page.getByRole('textbox', { name: 'Your Name *' }).fill(unicodeOrder.employee_name);
    await page.getByRole('textbox', { name: /What would you like to order/ }).fill(unicodeOrder.order_item);
    await page.getByRole('textbox', { name: 'Dietary Notes (Optional)' }).fill(unicodeOrder.dietary_notes);

    // Unicode should be preserved correctly
    await expect(page.getByRole('textbox', { name: 'Your Name *' })).toHaveValue(unicodeOrder.employee_name);
    await expect(page.getByRole('textbox', { name: /What would you like to order/ })).toHaveValue(unicodeOrder.order_item);
    await expect(page.getByRole('textbox', { name: 'Dietary Notes (Optional)' })).toHaveValue(unicodeOrder.dietary_notes);
  });

  test('should clear form when switching views', async ({ page }) => {
    // Fill form
    await page.getByRole('textbox', { name: 'Your Name *' }).fill('Test User');
    await page.getByRole('textbox', { name: /What would you like to order/ }).fill('Test Order');
    await page.getByRole('textbox', { name: 'Dietary Notes (Optional)' }).fill('Test Notes');

    // Switch to dashboard
    await page.getByRole('button', { name: '📊 View Dashboard' }).click();

    // Switch back to form
    await page.getByRole('button', { name: '📝 Submit Order' }).click();

    // Form should be cleared
    await expect(page.getByRole('textbox', { name: 'Your Name *' })).toHaveValue('');
    await expect(page.getByRole('textbox', { name: /What would you like to order/ })).toHaveValue('');
    await expect(page.getByRole('textbox', { name: 'Dietary Notes (Optional)' })).toHaveValue('');
  });

  test('should validate date field', async ({ page }) => {
    const dateInput = page.getByRole('textbox', { name: 'Order Date *' });

    // Should have today's date by default
    const today = new Date().toISOString().split('T')[0];
    await expect(dateInput).toHaveValue(today);

    // Should accept valid date changes
    await dateInput.fill('2025-12-25');
    await expect(dateInput).toHaveValue('2025-12-25');

    // Test invalid date formats (browser may handle this differently)
    await dateInput.fill('invalid-date');
    // Browser input[type="date"] will typically clear invalid values or ignore them
    const finalValue = await dateInput.inputValue();
    expect(finalValue === '' || finalValue === today || finalValue === '2025-12-25').toBeTruthy();
  });
});