import { test, expect } from '@playwright/test';

// The app switches pages with React state, not URLs, so every flow starts at '/'
// (the login page) and moves between pages by clicking buttons.
async function logIn(page, username, password) {
    await page.getByPlaceholder('enter username').fill(username);
    await page.getByPlaceholder('enter password').fill(password);
    await page.getByRole('button', { name: /log in/i }).click();
    await expect(page.getByRole('heading', { name: 'DASHBOARD PAGE' })).toBeVisible();
}

async function signUpAndLogIn(page) {
    // must pass the signup regex rules: letters-only names, MM/DD/YYYY dob, \w-only username/password
    const username = `testuser${Date.now()}`;
    const password = 'Testpassword123';

    await page.goto('/');
    await page.getByRole('button', { name: /sign up/i }).click();
    await expect(page.getByRole('heading', { name: 'SIGN UP PAGE' })).toBeVisible();

    await page.getByPlaceholder('enter firstName').fill('Test');
    await page.getByPlaceholder('enter lastName').fill('User');
    await page.getByPlaceholder('enter dob').fill('01/01/2000');
    await page.getByPlaceholder('enter username').fill(username);
    await page.getByPlaceholder('enter password').fill(password);
    await page.getByRole('button', { name: /sign up/i }).click();

    // wait for signup to finish before logging in
    await expect(page.getByRole('heading', { name: 'LOG IN PAGE' })).toBeVisible();
    await logIn(page, username, password);

    return { username, password };
}

async function logOut(page) {
    await page.getByRole('button', { name: /log out/i }).click();
    await expect(page.getByRole('heading', { name: 'LOG IN PAGE' })).toBeVisible();
}

async function createTrip(page, { name, destination, startDate, endDate }) {
    await page.getByRole('button', { name: /new trip/i }).click();
    await page.getByRole('textbox', { name: /trip name/i }).fill(name);
    await page.getByRole('textbox', { name: /destination/i }).fill(destination);
    await page.getByRole('textbox', { name: /start date/i }).fill(startDate);
    await page.getByRole('textbox', { name: /end date/i }).fill(endDate);
    await page.getByRole('button', { name: /done/i }).click();
}

const currentTripHeading = (page) => page.getByRole('heading', { name: /current trip:/i });
const tripButton = (page, name) => page.getByRole('button', { name, exact: true });

async function expectManualEntryEnabled(page) {
    await expect(page.getByRole('button', { name: /transportation/i })).toBeEnabled();
    await expect(page.getByRole('button', { name: /accommodations/i })).toBeEnabled();
    await expect(page.getByRole('button', { name: /activity/i })).toBeEnabled();
}


// a user without an existing trip open cannot open the transportation, accommodations,
// or activity manual entry options
test('user who has no existing trips is creating their first trip', async ({ page }) => {
    await signUpAndLogIn(page);

    // confirm that no trip is selected and manual entry options are disabled
    await expect(currentTripHeading(page)).toHaveText('Current Trip: none selected');
    await expect(page.getByRole('button', { name: /transportation/i })).toBeDisabled();
    await expect(page.getByRole('button', { name: /accommodations/i })).toBeDisabled();
    await expect(page.getByRole('button', { name: /activity/i })).toBeDisabled();

    await createTrip(page, {
        name: 'Spring Break Japan Trip',
        destination: 'Japan',
        startDate: '2027-04-01',
        endDate: '2027-04-15',
    });

    // expect new trip to be displayed and selected
    await expect(tripButton(page, 'Spring Break Japan Trip')).toBeVisible();
    await expect(currentTripHeading(page)).toHaveText('Current Trip: Spring Break Japan Trip');
    await expectManualEntryEnabled(page);
});


// a user whose saved trips load on login can add another trip, which becomes the
// current trip, without losing access to the trips they already had
test('user who has existing trips is creating another trip', async ({ page }) => {
    const { username, password } = await signUpAndLogIn(page);

    // setup: save a trip, then log out and back in so it loads from the server as an existing trip
    await createTrip(page, {
        name: 'Spring Break Japan Trip',
        destination: 'Japan',
        startDate: '2027-04-01',
        endDate: '2027-04-15',
    });
    await expect(tripButton(page, 'Spring Break Japan Trip')).toBeVisible();
    await logOut(page);
    await logIn(page, username, password);

    // the existing trip is listed and selected by default
    await expect(tripButton(page, 'Spring Break Japan Trip')).toBeVisible();
    await expect(currentTripHeading(page)).toHaveText('Current Trip: Spring Break Japan Trip');

    // create a second trip
    await createTrip(page, {
        name: 'Summer Italy Trip',
        destination: 'Italy',
        startDate: '2027-07-10',
        endDate: '2027-07-24',
    });

    // both trips are listed and the new one becomes the current trip
    await expect(tripButton(page, 'Spring Break Japan Trip')).toBeVisible();
    await expect(tripButton(page, 'Summer Italy Trip')).toBeVisible();
    await expect(currentTripHeading(page)).toHaveText('Current Trip: Summer Italy Trip');
    await expectManualEntryEnabled(page);

    // the original trip can still be selected
    await tripButton(page, 'Spring Break Japan Trip').click();
    await expect(currentTripHeading(page)).toHaveText('Current Trip: Spring Break Japan Trip');
});
