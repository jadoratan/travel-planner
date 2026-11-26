import { test, expect } from '@playwright/test';
import { signUpAndLogIn, logIn, logOut } from './helpers/auth';
import { createTrip } from './helpers/trips';
import { fillManualEntry, openPopup } from './helpers/manualEntry';

// Transportation, accommodations and activities all use the same ManualEntryPopup,
// so each test below runs once per entry type.
// Each type lists the form values to enter and the text its
// display card should show once the entry is saved.
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
    // TransportInfoDisplayCard: "<mode>: <from> -> <to>" and "ID: <confirmation>"
    savedText: ['Flight: LAX -> HND', 'ID: NH105'],
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
    // AccomodationInfoDisplayCard: one card for check-in and one for check-out
    savedText: ['Check In: Hotel Gracery', 'Check Out: Hotel Gracery'],
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
    // ActivityInfoDisplayCard: the name as the title and "at <location>"
    savedText: ['Fushimi Inari Hike', 'at Kyoto'],
  },
];

async function expectEntryShown(page, savedText) {
  for (const text of savedText) {
    await expect(page.getByText(text, { exact: true })).toBeVisible();
  }
}

// every test starts on the dashboard with one trip selected, since the manual
// entry buttons are disabled until a trip is open
let user;
test.beforeEach(async ({ page }) => {
  user = await signUpAndLogIn(page);
  await createTrip(page, {
    name: 'Spring Break Japan Trip',
    destination: 'Japan',
    startDate: '2027-04-01',
    endDate: '2027-04-15',
  });
  await expect(page.getByRole('heading', { name: /current trip:/i }))
    .toHaveText('Current Trip: Spring Break Japan Trip');
});

// for transportation, accommodations, and activities
for (const entry of entryTypes) {
  test.describe(`${entry.label} entry`, () => {

    // saving closes the popup and shows the new entry on the dashboard
    test('is created and displayed', async ({ page }) => {
      await page.getByRole('button', { name: entry.button }).click();
      await fillManualEntry(page, entry.values);

      await expect(openPopup(page)).toBeHidden();
      await expectEntryShown(page, entry.savedText);
    });

    // the entry was saved to the server, not just added to the page
    test('is still there after logging out and back in', async ({ page }) => {
      await page.getByRole('button', { name: entry.button }).click();
      await fillManualEntry(page, entry.values);
      await expectEntryShown(page, entry.savedText);

      await logOut(page);
      await logIn(page, user);

      await expectEntryShown(page, entry.savedText);
    });

    // the server rejects a cost that isn't a number, so the popup stays open with
    // an error and nothing is added to the dashboard
    test('shows an error and is not saved when the server rejects it', async ({ page }) => {
      await page.getByRole('button', { name: entry.button }).click();
      await fillManualEntry(page, { ...entry.values, cost: 'not a number' });

      await expect(openPopup(page).getByRole('alert')).toHaveText(/request failed/i);
      await expect(openPopup(page)).toBeVisible();
      for (const text of entry.savedText) {
        await expect(page.getByText(text, { exact: true })).toHaveCount(0);
      }
    });
  });
}
