import { test, expect } from '@playwright/test';

test('signup', async ({ page }) => {
  await page.goto('/');

  //click signup
  await page.getByRole('button', {name: /Sign up/i}).click();

  //assert
  await expect(page.getByRole('heading', { name: 'SIGN UP PAGE' })).toBeVisible();

});
