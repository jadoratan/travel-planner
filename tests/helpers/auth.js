import { expect } from '@playwright/test';
import { randomLetters } from './random';

// The app switches pages with React state, not URLs, so every flow starts at '/'
// (the login page) and moves between pages by clicking buttons. Each helper ends by
// checking which page it landed on, so a failure points at the step that broke.

/** @typedef {import('@playwright/test').Page} Page */
/** @typedef {{ firstName: string, lastName: string, dob: string, username: string, password: string }} User */

/**
 * A new user that passes the signup regex rules: letters-only names, MM/DD/YYYY dob,
 * \w-only username/password. Random letters keep usernames unique across parallel tests.
 * @param {Partial<User>} overrides
 * @returns {User}
 */
export function newUser(overrides = {}) {
  return {
    firstName: 'Test',
    lastName: 'User',
    dob: '01/01/2000',
    username: `user${randomLetters(8)}`,
    password: randomLetters(12),
    ...overrides,
  };
}

/** Go from the login page to the signup page. @param {Page} page */
export async function openSignUpPage(page) {
  await page.getByRole('button', { name: /sign up/i }).click();
  await expect(page.getByRole('heading', { name: 'SIGN UP PAGE' })).toBeVisible();
}

/**
 * Fill in and submit the signup form. Doesn't check the result, so tests can
 * assert on success or failure themselves.
 * @param {Page} page
 * @param {User} user
 */
export async function submitSignUpForm(page, user) {
  await page.getByPlaceholder('enter firstName').fill(user.firstName);
  await page.getByPlaceholder('enter lastName').fill(user.lastName);
  await page.getByPlaceholder('enter dob').fill(user.dob);
  await page.getByPlaceholder('enter username').fill(user.username);
  await page.getByPlaceholder('enter password').fill(user.password);
  await page.getByRole('button', { name: /sign up/i }).click();
}

/**
 * Sign up a new user from scratch and end on the login page.
 * @param {Page} page
 * @param {User} user
 * @returns {Promise<User>}
 */
export async function signUp(page, user = newUser()) {
  await page.goto('/');
  await openSignUpPage(page);
  await submitSignUpForm(page, user);
  await expect(page.getByRole('heading', { name: 'LOG IN PAGE' })).toBeVisible();
  return user;
}

/**
 * Log in from the login page and end on the dashboard.
 * @param {Page} page
 * @param {{ username: string, password: string }} credentials
 */
export async function logIn(page, { username, password }) {
  await page.getByPlaceholder('enter username').fill(username);
  await page.getByPlaceholder('enter password').fill(password);
  await page.getByRole('button', { name: /log in/i }).click();
  await expect(page.getByRole('heading', { name: 'DASHBOARD PAGE' })).toBeVisible();
}

/**
 * Sign up a new user and log in as them, ending on the dashboard.
 * @param {Page} page
 * @param {User} user
 * @returns {Promise<User>}
 */
export async function signUpAndLogIn(page, user = newUser()) {
  await signUp(page, user);
  await logIn(page, user);
  return user;
}

/** Log out from the dashboard and end on the login page. @param {Page} page */
export async function logOut(page) {
  await page.getByRole('button', { name: /log out/i }).click();
  await expect(page.getByRole('heading', { name: 'LOG IN PAGE' })).toBeVisible();
}
