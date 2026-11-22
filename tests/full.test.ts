import { test, expect } from '@playwright/test';
import {randomLetters} from './helper'

//new sign up and use credentials to log in
test('new signup and login', async ({ page }) => {
  const username = randomLetters(5);
  const password = randomLetters(8);

  await page.goto('/');

  //click signup
  await page.getByRole('button', {name: /Sign up/i}).click();

  //check we're on right page
  await expect(page.getByRole('heading', { name: 'SIGN UP PAGE' })).toBeVisible();

  await page
    .getByPlaceholder('enter firstName')
    .fill('Joe')

  await page
    .getByPlaceholder('enter lastName')
    .fill('Bruin')

  
  await page
    .getByPlaceholder('enter dob')
    .fill('09/18/1919')
  

  await page
    .getByPlaceholder('enter username')
    .fill(username)

  await page
    .getByPlaceholder('enter password')
    .fill(password)

  //submit sign up form
  await page.getByRole('button', {name: /Sign up/i}).click();

  //check we're on LOGIN page
  await expect(page.getByRole('heading', { name: 'LOG IN PAGE' })).toBeVisible();

  await page
    .getByPlaceholder('enter username')
    .fill(username)

  await page
    .getByPlaceholder('enter password')
    .fill(password)

  //login
  await page.getByRole('button', {name: /Log in/i}).click();

  //check we're on DASHBOARD page
  await expect(page.getByRole('heading', { name: 'DASHBOARD PAGE' })).toBeVisible();
  
});

//attempt to sign up twice w/ same username
test('repeat signup fails', async ({ page }) => {
  const username = randomLetters(5);
  const password = randomLetters(8);
  
  await page.goto('/');

  //click signup
  await page.getByRole('button', {name: /Sign up/i}).click();

  //check we're on right sign up page
  await expect(page.getByRole('heading', { name: 'SIGN UP PAGE' })).toBeVisible();

  //fill out signup form
  await page
    .getByPlaceholder('enter firstName')
    .fill('Snoopy')

  await page
    .getByPlaceholder('enter lastName')
    .fill('Beagle')

  
  await page
    .getByPlaceholder('enter dob')
    .fill('10/04/1950')

  await page
    .getByPlaceholder('enter username')
    .fill(username)

  await page
    .getByPlaceholder('enter password')
    .fill(password)

  //submit sign up form
  await page.getByRole('button', {name: /Sign up/i}).click();

  //check we're on LOGIN page
  await expect(page.getByRole('heading', { name: 'LOG IN PAGE' })).toBeVisible();

  
  //click signup page
  await page.getByRole('button', {name: /Sign up/i}).click();
  await expect(page.getByRole('heading', { name: 'SIGN UP PAGE' })).toBeVisible();

   //fill out signup form
  await page
    .getByPlaceholder('enter firstName')
    .fill('Snoopy')

  await page
    .getByPlaceholder('enter lastName')
    .fill('Beagle')
  
  await page
    .getByPlaceholder('enter dob')
    .fill('10/04/1950')

  await page
    .getByPlaceholder('enter username')
    .fill(username)

  await page
    .getByPlaceholder('enter password')
    .fill(password)
  
  //submit sign up form
  await page.getByRole('button', {name: /Sign up/i}).click();
  await expect(page.getByRole('heading', { name: 'SIGN UP PAGE' })).toBeVisible();
  
  
});

