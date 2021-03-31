import { debounceTime, map } from 'rxjs/operators';
import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Patient } from '@app/pages/patients-management/@types/patient';
import { NzSelectComponent } from 'ng-zorro-antd';
import { PatientsService } from '../../../pages/patients-management/@services/patients.service';
import { PatientModel } from '../../../pages/patients-management/@models/patient.model';

@Component({
  selector: 'app-patient-picker',
  templateUrl: './patient-picker.component.html',
  styleUrls: ['./patient-picker.component.scss'],
})
export class PatientPickerComponent implements OnInit {
  @Output()
  public selectPatient = new EventEmitter<Patient>();

  @ViewChild(NzSelectComponent, { static: true })
  public selectComponent: NzSelectComponent;

  public patients: Patient[] = [];

  public set selectedPatient(patient: Patient) {
    this._selectedPatient = patient;
    this.selectPatient.emit(patient);
  }
  public get selectedPatient(): Patient {
    return this._selectedPatient;
  }

  private _selectedPatient: Patient;

  constructor(private patientsService: PatientsService) {}

  public ngOnInit(): void {
    this.selectComponent.nzOnSearch.pipe(debounceTime(300)).subscribe((q) => this.onSearch(q));
  }

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
