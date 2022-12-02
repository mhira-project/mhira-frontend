import { browser, by, element, ExpectedConditions as until, protractor } from 'protractor';
import { LoginPage } from './page-objects/login.po';
import { AppSharedPage } from './page-objects/app-shared.po';
import { ShellPage } from './page-objects/shell.po';
import { DepartmentsPo } from './page-objects/departments.po';
import { UsersPo } from './page-objects/users.po';
import { RolesPo } from './page-objects/roles.po';

describe('When the app loads', () => {
  const login = new LoginPage();
  const app = new AppSharedPage();
  const shell = new ShellPage();
  const department = new DepartmentsPo();
  const user = new UsersPo();
  const roles = new RolesPo();

  beforeAll(async () => {
    await app.navigateAndSetLanguage();
  });

  it('Should display the login page.', async () => {
    expect(await browser.getCurrentUrl()).toContain('/login');
    await browser.sleep(1000);
  });

  describe('and the user logs in', () => {
    beforeAll(async () => {
      await login.login();
    });

    it('Should display the "Welcome to MHIRA" Message.', async () => {
      await browser.wait(until.visibilityOf(shell.welcomeText), 5000, 'Element taking too long to appear');
      expect(await shell.getParagraphText()).toEqual('Welcome to MHIRA');
      await browser.sleep(3000);
    });
  });

  it('Should Send to Departments.', async () => {
    await department.goToDepartment();
  });

  it('should Create a Department.', async () => {
    await department.createDepartment(`TestDepartment` + Math.floor(Math.random() * 10000));
  });

  it('Should delete last DEPARTMENT, added from the test.', async () => {
    await department.deleteDepartment();
  });

  it('Should navigate to CREATE USER.', async () => {
    await user.goToUser();
  });

  it('Should Create a USER.', async () => {
    await user.createUser();
  });

  it('Should Chose a ROLE to create and view patients for created USER.', async () => {
    await user.addRoleToUser();
  });

  it('Should delete last USER, added from the test.', async () => {
    await user.deleteUser();
    await browser.sleep(3000);
  });

  it('Should navigate to ROLES', async () => {
    await roles.goToRoles();
  });

  it('Should create a ROLE', async () => {
    await roles.createRole();
  });

  it('Should delete created ROLE', async () => {
    await roles.deleteRole();
  });
});
