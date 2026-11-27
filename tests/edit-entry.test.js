import { test, expect } from '@playwright/test';
import { signUpAndLogIn, logIn, logOut } from './helpers/auth';
import { createTrip, tripButton } from './helpers/trips';
import { fillManualEntry, openPopup, openEditPopup } from './helpers/manualEntry';

// Editing uses the same ManualEntryPopup as creating, opened from the Edit button
// on an entry's card, so each test below runs once per entry type.
// Each type lists the values to create the entry with, the card text that shows
// once it's saved, the fields to change, and the card text after the edit.
const entryTypes = [
  {
    label: 'transportation',
    button: /transportation/i,
    values: {
      type: 'Flight',
      depart_location: 'LAX',
      arrive_location: 'HND',
      depart_date: '2027-04-01',
      depart_time: '10:30',
      arrive_date: '2027-04-02',
      arrive_time: '14:45',
      cost: '850.00',
      confirmation: 'NH105',
    },
    savedText: ['Flight: LAX -> HND', 'ID: NH105'],
    // a text field, a dropdown, and the confirmation all change
    edits: { type: 'Train', arrive_location: 'NRT', confirmation: 'NH211' },
    editedText: ['Train: LAX -> NRT', 'ID: NH211'],
  },
  {
    label: 'accommodations',
    button: /accommodations/i,
    values: {
      name: 'Hotel Gracery',
      street_address: '1-19-1 Kabukicho',
      city: 'Tokyo',
      country: 'Japan',
      check_in: '2027-04-02',
      check_out: '2027-04-08',
      cost: '1200.00',
      confirmation: 'HG4821',
    },
    savedText: ['Check In: Hotel Gracery', 'Check Out: Hotel Gracery', 'at Tokyo'],
    // one accommodation shows as two cards, so both must pick up the edit
    edits: { name: 'Park Hyatt', city: 'Kyoto' },
    editedText: ['Check In: Park Hyatt', 'Check Out: Park Hyatt', 'at Kyoto'],
  },
  {
    label: 'activity',
    button: /activity/i,
    values: {
      name: 'Fushimi Inari Hike',
      location: 'Kyoto',
      date: '2027-04-05',
      start_time: '08:00',
      end_time: '11:00',
      cost: '0',
    },
    savedText: ['Fushimi Inari Hike', 'at Kyoto'],
    edits: { name: 'Nara Deer Park', location: 'Nara' },
    editedText: ['Nara Deer Park', 'at Nara'],
  },
];

// accommodations repeat "at <city>" on both cards, so check the first match
async function expectEntryShown(page, texts) {
  for (const text of texts) {
    await expect(page.getByText(text, { exact: true }).first()).toBeVisible();
  }
}

async function expectEntryNotShown(page, texts) {
  for (const text of texts) {
    await expect(page.getByText(text, { exact: true })).toHaveCount(0);
  }
}

// every test starts on the dashboard with one trip open and one saved entry to edit
let user;
test.beforeEach(async ({ page }) => {
  user = await signUpAndLogIn(page);
  await createTrip(page, {
    name: 'Spring Break Japan Trip',
    destination: 'Japan',
    startDate: '2027-04-01',
    endDate: '2027-04-15',
  });
  await expect(tripButton(page, 'Spring Break Japan Trip')).toBeVisible();
});

// for transportation, accommodations, and activities
for (const entry of entryTypes) {
  test.describe(`edit ${entry.label} entry`, () => {

    test.beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: entry.button }).click();
      await fillManualEntry(page, entry.values);
      await expect(openPopup(page)).toBeHidden();
      await expectEntryShown(page, entry.savedText);
    });

    // the edit popup opens with the entry's current values already filled in
    test('opens with the saved values filled in', async ({ page }) => {
      await openEditPopup(page, entry.savedText[0]);

      // dates and times come back from the server in a longer format than they were
      // typed in, so only compare the fields that are stored exactly as entered
      const exactFields = Object.entries(entry.values)
        .filter(([name]) => !/date|time|check_in|check_out|cost/.test(name));
      for (const [name, value] of exactFields) {
        await expect(openPopup(page).locator(`[name="${name}"]`)).toHaveValue(value);
      }
    });

    // saving closes the popup and the card shows the new values in place of the old
    test('updates the card', async ({ page }) => {
      await openEditPopup(page, entry.savedText[0]);
      await fillManualEntry(page, entry.edits);

      await expect(openPopup(page)).toBeHidden();
      await expectEntryShown(page, entry.editedText);
      await expectEntryNotShown(page, entry.savedText);
    });

    // an edit changes the existing entry instead of adding a second one
    test('does not create a duplicate entry', async ({ page }) => {
      const cards = page.locator('.trip-item');
      const cardCount = await cards.count();

      await openEditPopup(page, entry.savedText[0]);
      await fillManualEntry(page, entry.edits);
      await expect(openPopup(page)).toBeHidden();

      await expectEntryShown(page, entry.editedText);
      await expect(cards).toHaveCount(cardCount);
    });

    // the edit was saved to the server, not just changed on the page
    test('is still edited after logging out and back in', async ({ page }) => {
      await openEditPopup(page, entry.savedText[0]);
      await fillManualEntry(page, entry.edits);
      await expectEntryShown(page, entry.editedText);

      await logOut(page);
      await logIn(page, user);

      await expectEntryShown(page, entry.editedText);
      await expectEntryNotShown(page, entry.savedText);
    });

    // the server rejects a cost that isn't a number, so the popup stays open with
    // an error and the card keeps its original values
    test('shows an error and keeps the original when the server rejects it', async ({ page }) => {
      await openEditPopup(page, entry.savedText[0]);
      await fillManualEntry(page, { ...entry.edits, cost: 'not a number' });

      // only check that an error is shown, since its wording may get more descriptive
      await expect(openPopup(page).getByRole('alert')).toBeVisible();
      await expect(openPopup(page)).toBeVisible();

      await openPopup(page).getByRole('button', { name: 'Close' }).click();
      await expect(openPopup(page)).toBeHidden();
      await expectEntryShown(page, entry.savedText);
      await expectEntryNotShown(page, entry.editedText);
    });

    // closing the popup without saving throws the changes away
    test('is unchanged when the popup is closed without saving', async ({ page }) => {
      await openEditPopup(page, entry.savedText[0]);
      for (const [name, value] of Object.entries(entry.edits)) {
        const field = openPopup(page).locator(`[name="${name}"]`);
        if ((await field.evaluate((el) => el.tagName)) === 'SELECT') {
          await field.selectOption(value);
        } else {
          await field.fill(value);
        }
      }
      await openPopup(page).getByRole('button', { name: 'Close' }).click();

      await expect(openPopup(page)).toBeHidden();
      await expectEntryShown(page, entry.savedText);
      await expectEntryNotShown(page, entry.editedText);
    });
  });
}
