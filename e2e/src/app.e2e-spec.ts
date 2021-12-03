import { browser, ExpectedConditions as until } from 'protractor';
import { LoginPage } from './page-objects/login.po';
import { AppSharedPage } from './page-objects/app-shared.po';
import { ShellPage } from './page-objects/shell.po';
import { DepartmentsPo } from './page-objects/departments.po';
import { UsersPo } from './page-objects/users.po';

describe('when the app loads', () => {
  const login = new LoginPage();
  const app = new AppSharedPage();
  const shell = new ShellPage();
  const department = new DepartmentsPo();
  const user = new UsersPo();

  beforeAll(async () => {
    await app.navigateAndSetLanguage();
  });

  it('should display the login page', async () => {
    expect(await browser.getCurrentUrl()).toContain('/login');
  });

  describe('and the user logs in', () => {
    beforeAll(async () => {
      await login.login();
    });

    it('should display the hello message', async () => {
      await browser.wait(until.visibilityOf(shell.welcomeText), 5000, 'Element taking too long to appear');
      expect(await shell.getParagraphText()).toEqual('Welcome to MHIRA');
    });
  });
  it('should send to departments', async () => {
    await browser.get('/mhira/administration/departments');
    await browser.wait(until.visibilityOf(shell.departmentText), 5000);
    await department.createDepartment('E2ETest2');
  });
  it('should create a user with the  permissions to create and view patients', async () => {
    await browser.get('/mhira/user-management/user-form');
    await user.createUser();
  });
});
