import { expect } from '@playwright/test';

/** @typedef {import('@playwright/test').Page} Page */

/**
 * Create a trip from the dashboard.
 * @param {Page} page
 * @param {{ name: string, destination: string, startDate: string, endDate: string }} trip
 */
export async function createTrip(page, { name, destination, startDate, endDate }) {
  await page.getByRole('button', { name: /new trip/i }).click();
  await page.getByRole('textbox', { name: /trip name/i }).fill(name);
  await page.getByRole('textbox', { name: /destination/i }).fill(destination);
  await page.getByRole('textbox', { name: /start date/i }).fill(startDate);
  await page.getByRole('textbox', { name: /end date/i }).fill(endDate);
  await page.getByRole('button', { name: /done/i }).click();
}

/** @param {Page} page */
export const currentTripHeading = (page) => page.getByRole('heading', { name: /current trip:/i });

/** @param {Page} page @param {string} name */
export const tripButton = (page, name) => page.getByRole('button', { name, exact: true });

/** @param {Page} page */
export async function expectManualEntryEnabled(page) {
  await expect(page.getByRole('button', { name: /transportation/i })).toBeEnabled();
  await expect(page.getByRole('button', { name: /accommodations/i })).toBeEnabled();
  await expect(page.getByRole('button', { name: /activity/i })).toBeEnabled();
}

/** @param {Page} page */
export async function expectManualEntryDisabled(page) {
  await expect(page.getByRole('button', { name: /transportation/i })).toBeDisabled();
  await expect(page.getByRole('button', { name: /accommodations/i })).toBeDisabled();
  await expect(page.getByRole('button', { name: /activity/i })).toBeDisabled();
}
