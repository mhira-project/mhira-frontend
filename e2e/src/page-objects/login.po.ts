/*
 * Use the Page Object pattern to define the page under test.
 * See docs/coding-guide/e2e-tests.md for more info.
 */

import { browser, element, by } from 'protractor';

export class LoginPage {
  usernameField = element(by.css('input[formControlName="identifier"]'));
  passwordField = element(by.css('input[formControlName="password"]'));
  loginButton = element(by.css('.login-form-button'));

  async login() {
    await this.usernameField.sendKeys('superadmin');
    await this.passwordField.sendKeys('Password@1');
    await this.loginButton.click();
  }
}
