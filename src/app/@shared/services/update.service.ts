import { Injectable } from '@angular/core';

import { NzNotificationService } from 'ng-zorro-antd/notification';
import { SwUpdate } from '@angular/service-worker';
@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  constructor(private swUpdate: SwUpdate, private notification: NzNotificationService) {}

  checkForUpdates() {
    this.swUpdate.available.subscribe((evt) => {
      this.notification.create(
        'info',
        'New update Available',
        `There is a new  version of this application reload to update.<br/> <a nz-button nzType="link">Reload</a>`
      );
    });
  }
}
