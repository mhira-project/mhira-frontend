import { Component, OnInit } from '@angular/core';
import { Form } from '@shared/components/form/@types/form';
import { settingsForms } from '@app/pages/administration/settings/@forms/form';
import { SettingsService } from '@app/pages/administration/@services/settings.service';
import { Setting } from '@app/pages/administration/@types/setting';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  settingsForm: Form = settingsForms.general;
  isLoading = false;
  settings: Setting;
  loadingMessage = '';
  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.getSettings();
  }

  getSettings() {
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
    this.settingsService.updateSetting($event).subscribe(
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
}
