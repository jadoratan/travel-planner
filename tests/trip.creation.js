import { test, expect } from '@playwright/test';

async function signUpAndLogIn(page) {
    const username = `testuser_${Date.now()}`;
    const password = 'Test-password-123';

    await page.goto('/signup');
    await page.getByRole('textbox', { name: /firstName/i }).fill(`Test_${Date.now()}`);
    await page.getByRole('textbox', { name: /lastName/i }).fill('User');
    await page.getByRole('textbox', { name: /(date of birth)|dob/i }).fill('2000-01-01');
    await page.getByRole('textbox', { name: /username/i }).fill(username);
    await page.getByRole('textbox', { name: /password/i }).fill(password);
    await page.getByRole('button', { name: /sign up/i }).click();

    await page.goto('/login');
    await page.getByRole('textbox', { name: /username/i }).fill(username);
    await page.getByRole('textbox', { name: /password/i }).fill(password);
    await page.getByRole('button', { name: /log in/i }).click();
}


// a user without an existing trip open cannot open the transportation, accommodations,
// or activity manual entry options
test('user who has no existing trips is creating their first trip', async ({ page }) => {
    await signUpAndLogIn(page);
  
    await page.goto('/');

    // confirm that no trip is selected and manual entry options are disabled
    await expect(page.getByRole('textbox', { name: /current trip: /i })).toHaveText('Current Trip: none selected');
    await expect(page.getByRole('button', { name: /transportation/i })).toBeDisabled();
    await expect(page.getByRole('button', { name: /accommodations/i })).toBeDisabled();
    await expect(page.getByRole('button', { name: /activity/i })).toBeDisabled();

    // create the new trip
    await page.getByRole('button', { name: /new trip/i }).click();
    await page.getByRole('textbox', { name: /trip name/i }).fill('Spring Break Japan Trip');
    await page.getByRole('textbox', { name: /destination/i }).fill('Japan');
    await page.getByRole('textbox', { name: /start date/i }).fill('2027-04-01');
    await page.getByRole('textbox', { name: /end date/i }).fill('2027-04-15');
    await page.getByRole('button', { name: /done/i }).click();

    // expect new trip to be displayed
    await expect(page.getByRole('button', { name: /Spring Break Japan Trip/i })).toBeVisible();
    await expect(page.getByRole('textbox', { name: /current trip: /i })).toHaveText('Current Trip: Spring Break Japan Trip');
    await expect(page.getByRole('button', { name: /transportation/i })).toBeEnabled();
    await expect(page.getByRole('button', { name: /accommodations/i })).toBeEnabled();
    await expect(page.getByRole('button', { name: /activity/i })).toBeEnabled();
});