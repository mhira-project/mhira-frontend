import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { merge } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger } from '@core';
import { translationList } from '../translations/translation-list';
import { TranslationCode } from './@shared/@types/translation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

const log = new Logger('App');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
@UntilDestroy()
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    // Setup logger
    if (environment.production) {
      Logger.enableProductionMode();
    }

    log.debug('init');

    // Setup translations
    this.initStoredLang();

    // Change page title on navigation or language change, based on route data
    merge(
      this.translateService.onLangChange,
      this.router.events.pipe(filter((event) => event instanceof NavigationEnd))
    )
      .pipe(
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        switchMap((route) => route.data),
        map((event) => event?.breadcrumbI18nKey),
        filter((key) => !!key),
        untilDestroyed(this)
      )
      .subscribe((key) => this.titleService.setTitle(this.translateService.instant(key) + ' | MHIRA'));
  }

  private initStoredLang() {
    const lang = localStorage.getItem('currentLang');
    const browserLang = this.translateService.getBrowserLang();
    if (lang) {
      this.translateService.use(lang);
    } else {
      // using substr to move something like en_US to en
      if (translationList.some((trans) => trans.code === browserLang.substr(0, trans.code.length))) {
        this.translateService.use(browserLang);
      } else {
        this.translateService.use(TranslationCode.EN);
      }
    }
  }
}
