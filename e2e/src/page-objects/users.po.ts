import { browser, element, by } from 'protractor';

export class UsersPo {
  loginName = element(by.css('[placeholder="Enter Username"]'));
  ID = element(by.css('[placeholder="Enter work id"]'));
  firstName = element(by.css('[placeholder="Enter your first name"]'));
  lastName = element(by.css('[placeholder="Enter your last name"]'));
  password = element(by.css('[placeholder="Enter Password"]'));
  repeatPassword = element(by.css('[placeholder="Repeat password"]'));
  saveUser = element(by.css('.ant-btn-round'));
  userManagement = element(by.css(' li:nth-of-type(5) > .ant-menu-submenu-title'));
  userList = element(by.css('[ng-reflect-translate="menu.listUsers"]'));

  async createUser() {
    await this.loginName.sendKeys('E2EProve21');
    await this.ID.sendKeys('3555');
    await this.firstName.sendKeys('e2eProve21');
    await this.lastName.sendKeys('e2eProve21');
    await this.password.sendKeys('1234Er$');
    await this.repeatPassword.sendKeys('1234Er$');
    await this.saveUser.click();
    await this.userManagement.click();
    await browser.sleep(1000);
    await this.userList.click();
    await browser.sleep(3000);
  }
}
