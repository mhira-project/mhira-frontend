/*
 * Use the Page Object pattern to define the page under test.
 * See docs/coding-guide/e2e-tests.md for more info.
 */

import { browser, element, by } from 'protractor';

export class ShellPage {
  welcomeText = element(by.css('app-root h1'));
  departmentText = element(by.css('[href="/mhira/administration/departments"]'));
  userText = element(by.css('[href="/mhira/user-management/user-form"]'));
  getParagraphText() {
    return this.welcomeText.getText();
  }

  getDepartmentText() {
    return this.departmentText.getText();
  }
}
