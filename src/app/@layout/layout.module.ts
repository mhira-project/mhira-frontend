import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { I18nModule } from '@app/i18n';
import { AuthLayoutComponent } from './auth/auth.layout.component';
import { VerticalLayoutComponent } from './vertical/vertical.layout.component';
import { HorizontalLayoutComponent } from './horizontal/horizontal.layout.component';
import { SideNavComponent } from './vertical/side-nav/side-nav.component';
import {
  NzBreadCrumbModule,
  NzLayoutModule,
  NzAvatarModule,
  NzMenuModule,
  NzListModule,
  NzIconModule,
  NzDropDownModule,
  NzBadgeModule,
  NzGridModule,
  NzTabsModule,
  NzModalModule,
} from 'ng-zorro-antd';
import { ThemeConstantService } from '@shared/services/theme-constant.service';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { HeaderComponent } from './vertical/header/header.component';
import { TabsComponent } from './vertical/header/tabs/tabs.component';
import { AuthModule } from '@app/auth/auth.module';
import { UpdateService } from '@shared/services/update.service';
import { ComponentsModule } from '@shared/components/components.module';
import { AppFormModule } from '@shared/components/form/app-form.module';

const antdModule = [
  NzBreadCrumbModule,
  NzLayoutModule,
  NzAvatarModule,
  NzMenuModule,
  NzListModule,
  NzIconModule,
  NzDropDownModule,
  NzBadgeModule,
  NzGridModule,
  NzTabsModule,
];

@NgModule({
  imports: [
    ...antdModule,
    CommonModule,
    TranslateModule,
    AppFormModule,
    NgbModule,
    AuthModule,
    I18nModule,
    RouterModule,
    PerfectScrollbarModule,
    NzModalModule,
    ComponentsModule,
  ],
  declarations: [
    AuthLayoutComponent,
    VerticalLayoutComponent,
    HorizontalLayoutComponent,
    SideNavComponent,
    HeaderComponent,
    TabsComponent,
  ],
  exports: [AuthLayoutComponent, VerticalLayoutComponent, HorizontalLayoutComponent],
  providers: [ThemeConstantService, UpdateService],
})
export class LayoutModule {}
