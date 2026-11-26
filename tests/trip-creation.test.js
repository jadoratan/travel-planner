import { test, expect } from '@playwright/test';
import {
    createTrip,
    currentTripHeading,
    tripButton,
    expectManualEntryEnabled,
    expectManualEntryDisabled,
} from './helpers/trips';
import { signUpAndLogIn, logIn, logOut } from './helpers/auth';


// a user without an existing trip open cannot open the transportation, accommodations,
// or activity manual entry options
test('user who has no existing trips is creating their first trip', async ({ page }) => {
    await signUpAndLogIn(page);

    // confirm that no trip is selected and manual entry options are disabled
    await expect(currentTripHeading(page)).toHaveText('Current Trip: none selected');
    await expectManualEntryDisabled(page);

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
    const user = await signUpAndLogIn(page);

    // setup: save a trip, then log out and back in so it loads from the server as an existing trip
    await createTrip(page, {
        name: 'Spring Break Japan Trip',
        destination: 'Japan',
        startDate: '2027-04-01',
        endDate: '2027-04-15',
    });
    await expect(tripButton(page, 'Spring Break Japan Trip')).toBeVisible();
    await logOut(page);
    await logIn(page, user);

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
