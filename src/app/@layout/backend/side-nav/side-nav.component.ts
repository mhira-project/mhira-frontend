import { Component, OnInit, Input } from '@angular/core';
import { MENU } from '@app/pages/pages.menu';
import { ThemeConstantService } from '@shared/services/theme-constant.service';
import { AppPermissionsService } from '@shared/services/app-permissions.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  isFolded: boolean;
  isSideNavDark: boolean;
  public menuItems = MENU;
  @Input() isCollapsed = false;

  constructor(private themeService: ThemeConstantService, public perms: AppPermissionsService) {}

  ngOnInit(): void {
    this.themeService.isMenuFoldedChanges.subscribe((isFolded) => (this.isFolded = isFolded));
    this.themeService.isSideNavDarkChanges.subscribe((isDark) => (this.isSideNavDark = isDark));
  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
