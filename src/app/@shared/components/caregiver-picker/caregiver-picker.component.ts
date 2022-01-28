import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NzSelectComponent } from 'ng-zorro-antd/select';
import { debounceTime, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Caregiver } from '@app/pages/patients-management/@types/caregiver';
import { CaregiversService } from '@app/pages/patients-management/@services/caregivers.service';
import { CaregiverModel } from '@app/pages/patients-management/@models/caregiver.model';

@Component({
  selector: 'app-caregiver-picker',
  templateUrl: './caregiver-picker.component.html',
  styleUrls: ['./caregiver-picker.component.scss'],
})
export class CaregiverPickerComponent {
  @Input()
  public assignSelfOption = false;

  @Output()
  public selectCaregiver = new EventEmitter<Caregiver>();

  @ViewChild(NzSelectComponent, { static: false })
  public set selectComponent(component: NzSelectComponent) {
    if (component) {
      this.selectComponentSubscription = component.nzOnSearch
        .pipe(debounceTime(300))
        .subscribe((q) => this.onSearch(q));
    } else if (this.selectComponentSubscription) {
      this.selectComponentSubscription.unsubscribe();
    }
  }

  @Input()
  public readonly = false;

  @Input()
  public set selectedCaregiver(caregiver: Caregiver) {
    if (caregiver && !this.caregivers.find((c) => this.compareCaregivers(c, caregiver)))
      this.caregivers.push(caregiver);
    this._selectedCaregiver = caregiver;
    this.selectCaregiver.emit(caregiver);
  }
  public get selectedCaregiver(): Caregiver {
    return this._selectedCaregiver;
  }

  public caregivers: Caregiver[] = [];

  private _selectedCaregiver: Caregiver;

  private selectComponentSubscription: Subscription;
  constructor(private caregiversService: CaregiversService) {}
  public onSearch(q: string) {
    if (!q) {
      this.caregivers = [];
      return;
    }

    const filter = { or: this.createSearchFilter(q) };
    this.caregiversService
      .caregivers({ filter })
      .pipe(
        map(({ data }) =>
          (data?.caregivers?.edges ?? []).map((caregiver: any) => CaregiverModel.fromJson(caregiver.node))
        )
      )
      .subscribe((caregivers) => (this.caregivers = caregivers));
  }

  public compareCaregivers(caregiverA: Caregiver, caregiverB: Caregiver): boolean {
    return caregiverA?.id && caregiverB?.id && caregiverA?.id === caregiverB?.id;
  }

  private createSearchFilter(searchString: string) {
    if (!searchString) return [];
    return [
      { firstName: { iLike: `%${searchString}%` } },
      { middleName: { iLike: `%${searchString}%` } },
      { lastName: { iLike: `%${searchString}%` } },
      { phone: { iLike: `%${searchString}%` } },
    ];
  }
}
