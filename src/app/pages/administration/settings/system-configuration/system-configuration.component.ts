import { Component, OnInit } from '@angular/core';
import { Setting } from '../../@types/setting';
import { Form } from '../../../../@shared/components/form/@types/form';
import { settingsForms } from '../@forms/form';
import { SettingsService } from '../../@services/settings.service';
import { AppPermissionsService } from '../../../../@shared/services/app-permissions.service';
import { PermissionKey } from '../../../../@shared/@types/permission';

@Component({
  selector: 'app-system-configuration',
  templateUrl: './system-configuration.component.html',
  styleUrls: ['./system-configuration.component.scss'],
})
export class SystemConfigurationComponent implements OnInit {
  PK = PermissionKey;
  settingsForm: Form = settingsForms.general;
  isLoading = false;
  settings: Setting;
  loadingMessage = '';

  constructor(private settingsService: SettingsService, public perms: AppPermissionsService) {}

  ngOnInit(): void {
    this.getFormat();
    this.getTimeFormarts();
    this.getLocales();
    this.getZones();
    this.getSettings();
  }

  getSettings() {
    this.isLoading = true;
    this.settingsService.settings().subscribe(
      async ({ data }) => {
        this.settings = Object.assign({}, data.settings);

        this.settingsForm.groups.map((group) => {
          group.fields.map((field) => {
            field.value = this.settings[field.name];
          });
        });
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  saveSettings($event: any) {
    this.isLoading = true;
    this.settingsService.updateSetting($event).subscribe(
      async ({ data }) => {
        if (data) {
          console.log($event);
          localStorage.setItem('settings', JSON.stringify($event));
        }

        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  private getLocales() {
    const moment = require('moment/min/moment-with-locales');
    const locales = moment.locales();
    this.settingsForm.groups.map((group) => {
      group.fields.map((field) => {
        if (field.name === 'systemLocale') {
          field.options = locales.map((locale: string) => {
            return { value: locale, label: locale };
          });
        }
      });
    });
  }

  private getZones() {
    const momentTimeZone = require('moment-timezone');
    const zones = momentTimeZone.tz.names();
    this.settingsForm.groups.map((group) => {
      group.fields.map((field) => {
        if (field.name === 'systemTimezone') {
          field.options = zones.map((zone: string) => {
            return { value: zone, label: zone };
          });
        }
      });
    });
  }

  private getFormat() {
    const dateFormarts = [
      'YYYY-MM-DD',
      'YYYY-DD-MM',
      'DD-MM-YYYY',
      'MM-DD-YYYY',
      'YYYY.MM.DD',
      'YYYY.DD.MM',
      'DD.MM.YYYY',
      'MM.DD.YYYY',
      'YYYY/MM/DD',
      'YYYY/DD/MM',
      'DD/MM/YYYY',
      'MM/DD/YYY',
    ];
    this.settingsForm.groups.map((group) => {
      group.fields.map((field) => {
        if (field.name === 'dateFormat') {
          field.options = dateFormarts.map((zone: string) => {
            return { value: zone, label: zone };
          });
        }
      });
    });
  }

  private getTimeFormarts() {
    const dateFormarts = ['LT', 'LTS', 'L', 'I', 'LL', 'II', 'LLL', 'III', 'LLLL', 'IIII'];
    this.settingsForm.groups.map((group) => {
      group.fields.map((field) => {
        if (field.name === 'timeFormat') {
          field.options = dateFormarts.map((zone: string) => {
            return { value: zone, label: zone };
          });
        }
      });
    });
  }
}
