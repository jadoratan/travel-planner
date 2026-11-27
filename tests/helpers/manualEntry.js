import { expect } from '@playwright/test';

/** @typedef {import('@playwright/test').Page} Page */

/**
 * The popup that's currently open. Every ManualEntryPopup renders a <dialog>, but
 * closed dialogs are hidden, so only the open one matches.
 * @param {Page} page
 */
export const openPopup = (page) => page.getByRole('dialog');

/**
 * Fill in the open manual entry popup and click Done.
 *
 * Fields are keyed by their form `name` (the same names as the database columns)
 * because the dropdowns have no label to find them by. Dropdowns are chosen with
 * selectOption; everything else is typed in.
 * @param {Page} page
 * @param {Record<string, string>} values e.g. { type: 'Flight', depart_location: 'LAX' }
 */
export async function fillManualEntry(page, values) {
  const popup = openPopup(page);
  await expect(popup).toBeVisible();

  for (const [name, value] of Object.entries(values)) {
    const field = popup.locator(`[name="${name}"]`);
    const tag = await field.evaluate((el) => el.tagName);
    if (tag === 'SELECT') {
      await field.selectOption(value);
    } else {
      await field.fill(value);
    }
  }

  await popup.getByRole('button', { name: /done/i }).click();
}

/**
 * The timeline card whose title or description is exactly `text`, e.g.
 * 'Flight: LAX -> HND'. An accommodation has two cards (check-in and check-out),
 * so pass the full title to pick one.
 * @param {Page} page
 * @param {string} text
 */
export const entryCard = (page, text) =>
  page.locator('.trip-item').filter({ has: page.getByText(text, { exact: true }) });

/**
 * Click Edit on an entry's card and wait for the edit popup to open.
 * @param {Page} page
 * @param {string} text exact title or description of the card to edit
 */
export async function openEditPopup(page, text) {
  await entryCard(page, text).getByRole('button', { name: 'Edit' }).click();
  await expect(openPopup(page).getByRole('heading', { name: 'Edit Entry' })).toBeVisible();
}
