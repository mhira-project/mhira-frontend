/*
 * Use the Page Object pattern to define the page under test.
 * See docs/coding-guide/e2e-tests.md for more info.
 */
import { browser, element, by, protractor } from 'protractor';

export class UsersPo {
  newUser = element(by.css('[ng-reflect-translate="menu.newUser"]'));
  loginName = element(by.css('[placeholder="Enter Username"]'));
  ID = element(by.css('[placeholder="Enter work id"]'));
  firstName = element(by.css('[placeholder="Enter your first name"]'));
  lastName = element(by.css('[placeholder="Enter your last name"]'));
  password = element(by.css('[placeholder="Enter Password"]'));
  repeatPassword = element(by.css('[placeholder="Repeat password"]'));
  saveUser = element(by.css('.ant-btn-round'));
  userSettings = element(by.css('[aria-selected="false"]'));
  userRoleClick = element(by.xpath('//span[.="TestRole"]'));
  userManagement = element(by.css('[ng-reflect-translate="menu.userManagement"]'));
  userList = element(by.css('[ng-reflect-translate="menu.listUsers"]'));
  clickDelete = element(by.css('.ant-dropdown-menu-item'));
  confirmDelete = element(by.css('[ng-reflect-nz-danger="false"] > span'));

  async goToUser() {
    await this.userManagement.click();
    await browser.sleep(1000);
    await this.newUser.click();
    await browser.sleep(1000);
    await this.userManagement.click();
  }

  async createUser() {
    await this.loginName.sendKeys(`TestUser` + Math.floor(Math.random() * 1000));
    await browser.sleep(200);
    await this.ID.sendKeys(Math.floor(Math.random() * 1000));
    await browser.sleep(200);
    await this.firstName.sendKeys(`TestUser` + Math.floor(Math.random() * 1000));
    await browser.sleep(200);
    await this.lastName.sendKeys(`TestUser` + Math.floor(Math.random() * 1000));
    await browser.sleep(200);
    await this.password.sendKeys('E2ETest!123');
    await browser.sleep(200);
    await this.repeatPassword.sendKeys('E2ETest!123');
    await this.saveUser.click();
    await browser.sleep(200);
  }

  async addRoleToUser() {
    await this.userSettings.click();
    await this.userRoleClick.click();
    await browser.sleep(1000);
    await this.userManagement.click();
    await browser.sleep(1000);
  }

  async deleteUser() {
    await this.userList.click();
    await browser.sleep(1000);
    await browser
      .actions()
      .mouseMove(element.all(by.css('.ant-table-cell ')).last())
      .perform();
    await browser.actions().click(protractor.Button.RIGHT).perform();
    await browser.sleep(1000);
    await this.clickDelete.click();
    await browser.sleep(1000);
    await this.confirmDelete.click();
    await browser.sleep(1000);
    await console.log('Clicked!');
  }
}
