/*
 * Use the Page Object pattern to define the page under test.
 * See docs/coding-guide/e2e-tests.md for more info.
 */
import { browser, element, by, protractor } from 'protractor';

export class RolesPo {
  clickAdministration = element(by.css('[ng-reflect-translate="menu.administration"]'));
  clickRoles = element(by.css('[ng-reflect-router-link="administration/roles"]'));
  openRoleSidebar = element(by.css('[ng-reflect-nz-size="normal"] > span:nth-of-type(2)'));
  roleName = element(by.css('[placeholder="enter permission name"]'));
  roleHierarchy = element(by.css('.ant-input-number-input'));
  addButton = element(by.xpath('//button[contains(.,"Save Role")]'));
  deleteButton = element(by.xpath('//a[.="Delete Role"]'));
  allowDelete = element(by.xpath('//span[contains(.,"Delete")]'));

  async goToRoles() {
    await this.clickAdministration.click();
    await browser.sleep(1000);
    await this.clickRoles.click();
    await browser.sleep(3000);
  }

  async createRole() {
    await this.openRoleSidebar.click();
    await browser.sleep(1000);
    await this.roleName.sendKeys(`TestRole` + Math.floor(Math.random() * 1000));
    await browser.sleep(1000);
    await this.roleHierarchy.sendKeys(Math.floor(Math.random() * 1000));
    await browser.sleep(1000);
    await this.addButton.click();
    await browser.sleep(3000);
  }

  async deleteRole() {
    await browser
      .actions()
      .mouseMove(element.all(by.css('.ant-table-tbody > tr:nth-of-type(1) svg:nth-of-type(1) ')).last())
      .perform();
    await this.deleteButton.click();
    await browser.sleep(1000);
    await this.allowDelete.click();
    await browser.sleep(3000);
  }
}
