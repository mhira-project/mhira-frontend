import { Injectable } from '@angular/core';

import { NzNotificationService } from 'ng-zorro-antd/notification';
import { SwUpdate } from '@angular/service-worker';
@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  constructor(private swUpdate: SwUpdate, private notification: NzNotificationService) {}

  checkForUpdates() {
    if (!this.swUpdate.isEnabled) {
      console.log('Nope 🙁');
      this.swUpdate.activateUpdate().then(() => {
        this.swUpdate.available.subscribe((evt) => {
          this.notification.create(
            'info',
            'New update Available',
            `There is a new  version of this application reload to update.<br/> <a nz-button nzType="link">Reload Test</a>`
          );
        });
      });
    } else {
      console.log('Yeeey');
      this.swUpdate.available.subscribe(
        (evt) => {
          console.log('here', evt);
          this.notification.create(
            'info',
            'New update Available',
            `There is a new  version of this application reload to update.<br/> <a nz-button nzType="link">Reload Test</a>`
          );
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}