/*
 * Use the Page Object pattern to define the page under test.
 * See docs/coding-guide/e2e-tests.md for more info.
 */
import { browser, element, by, protractor } from 'protractor';

export class DepartmentsPo {
  administrationButton = element(by.css('[ng-reflect-translate="menu.administration"]'));
  departmentButton = element(by.css('[ng-reflect-translate="menu.departments"]'));
  addButton = element(by.css('[data-icon="plus"]'));
  departmentName = element(by.css('.ant-drawer-body [placeholder="enter permission name"]'));
  departmentStatus = element(by.css('.ant-drawer-body nz-select'));
  departmentActive = element(by.css('nz-option-item[title="Active"]'));
  departmentCreate = element(by.css('.ant-drawer-body .full-width button'));
  clickDelete = element(by.css('.ant-dropdown-menu > li:nth-of-type(2)'));
  confirmDelete = element(by.css('[ng-reflect-nz-danger="false"] > span'));

  async goToDepartment() {
    await this.administrationButton.click();
    await browser.sleep(1000);
    await this.departmentButton.click();
    await browser.sleep(1000);
    await this.administrationButton.click();
    await browser.sleep(1000);
  }

  async createDepartment(name: string) {
    await this.addButton.click();
    await this.departmentName.sendKeys(name);
    await this.departmentStatus.click();
    await this.departmentActive.click();
    await browser.sleep(2000);
    await this.departmentCreate.click();
    await browser.sleep(2000);
  }

  async deleteDepartment() {
    await browser
      .actions()
      .mouseMove(element.all(by.css('.ant-table-cell ')).last())
      .perform();
    await browser.actions().click(protractor.Button.RIGHT).perform();
    await browser.sleep(200);
    await this.clickDelete.click();
    await browser.sleep(200);
    await this.confirmDelete.click();
    await browser.sleep(2000);
  }
}
