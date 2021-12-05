import { browser, element, by } from 'protractor';

export class DepartmentsPo {
  addButton = element(by.css('.ant-btn.ng-star-inserted'));
  departmentName = element(by.css('.ant-drawer-body [placeholder="enter permission name"]'));
  departmentStatus = element(by.css('.ant-drawer-body nz-select'));
  departmentActive = element(by.css('nz-option-item[title="Inactive"]'));
  departmentCreate = element(by.css('.ant-drawer-body .full-width button'));

  async createDepartment(name: string) {
    await this.addButton.click();
    await this.departmentName.sendKeys(name);
    await this.departmentStatus.click();
    await this.departmentActive.click();
    await browser.sleep(500);
    await this.departmentCreate.click();
    await browser.sleep(3000);
  }
}
