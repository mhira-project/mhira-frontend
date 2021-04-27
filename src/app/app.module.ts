import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { environment } from '@env/environment';
import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from '@app/@layout/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GraphQLModule } from '@app/graphql.module';
import { AuthGuard } from '@app/auth/auth.guard';
import { PermissionGuard } from './permission.guard';
import { registerLocale as registerLocalCountry } from 'i18n-iso-countries';
import { registerLocale as registerLocaleLanguage } from '@cospired/i18n-iso-languages';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    NgbModule,
    LayoutModule,
    CoreModule,
    SharedModule,
    GraphQLModule,
    AppRoutingModule, // must be imported as the last module as it contains the fallback route
  ],
  declarations: [AppComponent],
  providers: [
    {
      provide: NZ_I18N,
      useValue: en_US,
    },
    AuthGuard,
    PermissionGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    registerLocalCountry(require('i18n-iso-countries/langs/en.json'));
    registerLocaleLanguage(require('@cospired/i18n-iso-languages/langs/en.json'));
  }
}
