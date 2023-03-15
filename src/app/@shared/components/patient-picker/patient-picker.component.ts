import { debounceTime, map } from 'rxjs/operators';
import { Component, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { Patient } from '@app/pages/patients-management/@types/patient';
import { NzSelectComponent } from 'ng-zorro-antd/select';
import { PatientsService } from '../../../pages/patients-management/@services/patients.service';
import { PatientModel } from '../../../pages/patients-management/@models/patient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-patient-picker',
  templateUrl: './patient-picker.component.html',
  styleUrls: ['./patient-picker.component.scss'],
})
export class PatientPickerComponent {
  @Output()
  public selectPatient = new EventEmitter<Patient>();

  @Output()
  public patientChanged = new EventEmitter<Patient>();

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
  public set selectedPatient(patient: Patient) {
    if (patient && !this.patients.find((p) => this.comparePatients(p, patient))) this.patients.push(patient);
    this._selectedPatient = patient;
    this.selectPatient.emit(patient);
  }
  public get selectedPatient(): Patient {
    return this._selectedPatient;
  }

  public patients: Patient[] = [];

  private _selectedPatient: Patient;

  private selectComponentSubscription: Subscription;

  constructor(private patientsService: PatientsService) {}

  public onSearch(q: string) {
    if (!q) {
      this.patients = [];
      return;
    }

    const filter = { or: this.createSearchFilter(q) };
    this.patientsService
      .patients({ filter })
      .pipe(map(({ data }) => (data?.patients?.edges ?? []).map((patient: any) => PatientModel.fromJson(patient.node))))
      .subscribe((patients) => (this.patients = patients));
  }

  public comparePatients(patientA: Patient, patientB: Patient): boolean {
    return patientA?.id && patientB?.id && patientA?.id === patientB?.id;
  }

  private createSearchFilter(searchString: string) {
    if (!searchString) return [];
    return [
      { firstName: { iLike: `%${searchString}%` } },
      { middleName: { iLike: `%${searchString}%` } },
      { lastName: { iLike: `%${searchString}%` } },
      { medicalRecordNo: { iLike: `%${searchString}%` } },
    ];
  }
}
