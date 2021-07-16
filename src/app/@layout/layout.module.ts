import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { I18nModule } from '@app/i18n';
import { AuthLayoutComponent } from './auth/auth.layout.component';
import { BackendLayoutComponent } from './backend/backend-layout.component';
import { AssessmentLayoutComponent } from './assessment/assessment-layout.component';
import { SideNavComponent } from './backend/side-nav/side-nav.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ThemeConstantService } from '@shared/services/theme-constant.service';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { HeaderComponent } from './backend/header/header.component';
import { AuthModule } from '@app/auth/auth.module';
import { UpdateService } from '@shared/services/update.service';
import { ComponentsModule } from '@shared/components/components.module';
import { AppFormModule } from '@shared/components/form/app-form.module';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
const antdModule = [
  NzBreadCrumbModule,
  NzLayoutModule,
  NzPageHeaderModule,
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
    BackendLayoutComponent,
    AssessmentLayoutComponent,
    SideNavComponent,
    HeaderComponent,
  ],
  exports: [AuthLayoutComponent, BackendLayoutComponent, AssessmentLayoutComponent],
  providers: [ThemeConstantService, UpdateService],
})
export class LayoutModule {}
