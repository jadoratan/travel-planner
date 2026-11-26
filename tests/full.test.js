import { test, expect } from '@playwright/test';
import { newUser, signUp, logIn, openSignUpPage, submitSignUpForm } from './helpers/auth';

//new sign up and use credentials to log in
test('new signup and login', async ({ page }) => {
  const user = newUser({ firstName: 'Joe', lastName: 'Bruin', dob: '09/18/1919' });

  // signUp checks we end on the LOGIN page; logIn checks we end on the DASHBOARD page
  await signUp(page, user);
  await logIn(page, user);
});

//attempt to sign up twice w/ same username
test('repeat signup fails', async ({ page }) => {
  const user = newUser({ firstName: 'Snoopy', lastName: 'Beagle', dob: '10/04/1950' });

  // first signup succeeds and lands on the LOGIN page
  await signUp(page, user);

  // second signup with the same username stays on the SIGN UP page
  await openSignUpPage(page);
  await submitSignUpForm(page, user);
  await expect(page.getByRole('heading', { name: 'SIGN UP PAGE' })).toBeVisible();
});
