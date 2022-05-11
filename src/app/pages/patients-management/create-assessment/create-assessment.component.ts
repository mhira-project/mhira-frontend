import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormattedPatient } from '@app/pages/patients-management/@types/formatted-patient';
import { PatientModel } from '@app/pages/patients-management/@models/patient.model';
import { environment } from '@env/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseManagerFilter } from '@app/pages/patients-management/@types/case-manager-filter';
import { QuestionnaireVersion } from '@app/pages/questionnaire-management/@types/questionnaire';
import { User } from '@app/pages/user-management/@types/user';
import { finalize } from 'rxjs/operators';
import { SelectedCaregiver } from '@app/pages/patients-management/@types/caregiver';
import { PageInfo, Paging } from '@shared/@types/paging';
import { CaregiversPatientService } from '@app/pages/patients-management/@services/caregivers-patient.service';
import { Filter } from '@shared/@types/filter';
import { Sorting } from '@shared/@types/sorting';
import { Convert } from '@shared/classes/convert';
import { Department } from '@app/pages/administration/@types/department';
import { ErrorHandlerService } from '@shared/services/error-handler.service';
import { DepartmentsService } from '@app/pages/administration/@services/departments.service';
import { AssessmentService } from '@app/pages/assessment/@services/assessment.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FullAssessment } from '../../assessment/@types/assessment';

const CryptoJS = require('crypto-js');

@Component({
  selector: 'app-create-assessment',
  templateUrl: './create-assessment.component.html',
  styleUrls: ['./create-assessment.component.scss'],
})
export class CreateAssessmentComponent implements OnInit {
  formGroup: FormGroup;
  deliveryDate: any = null;
  expireDate: any = null;
  typeSelected: any = 'PATIENT';
  dataToSelect: any = [];
  selectedInformant: any = null;
  noteValue: any = '';
  options = [
    { label: 'Mother', value: 'Mother' },
    { label: 'Father', value: 'Father' },
    { label: 'Grandparent', value: 'Grandparent' },
    { label: 'Uncle/Aunt', value: 'Uncle/Aunt' },
    { label: 'Extended Family', value: 'Extended Family' },
    { label: 'Legal Guardian', value: 'Legal Guardian' },
    { label: 'Family Doctor', value: 'Family Doctor' },
    { label: 'External Paediatrician', value: 'External Paediatrician' },
    { label: 'External Psychotherapist', value: 'External Psychotherapist' },
    { label: 'External Psychologist', value: 'External Psychologist' },
    { label: 'External Social Worker', value: 'External Social Worker' },
    { label: 'External Nurse', value: 'External Nurse' },
    { label: 'Emergency Department', value: 'Emergency Department' },
    { label: 'Friend', value: 'Friend' },
    { label: 'Neighbour', value: 'Neighbour' },
    { label: 'Teacher', value: 'Teacher' },
    { label: 'School Representative', value: 'School Representative' },
    { label: 'Advisor', value: 'Advisor' },
    { label: 'Legal Advisor', value: 'Legal Advisor' },
    { label: 'Assistance', value: 'Assistance' },
    { label: 'Supervisor', value: 'Supervisor' },
    { label: 'Other', value: 'Other' },
  ];
  public fullAssessment: FullAssessment;
  public isLoading = false;
  public selectedClinician: User;
  public users: User[] = [];
  @Input() public patient: FormattedPatient;
  @Input() public caregivers: SelectedCaregiver[] = [];
  @Output() public selectionChange = new EventEmitter<QuestionnaireVersion[]>();
  filter: CaseManagerFilter;
  public data: Partial<SelectedCaregiver>[];
  public departments: Department[] = [];
  public editMode = true;
  public pageInfo: PageInfo;
  public selectedQuestionnaires: QuestionnaireVersion[] = [];

  get patientTitle(): string {
    const name = [this.patient?.firstName, this.patient?.middleName, this.patient?.lastName]
      .filter((s) => !!s)
      .join(' ');
    return [this.patient?.medicalRecordNo, name].filter((s) => !!s).join(' - ');
  }

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private caregiversPatientService: CaregiversPatientService,
    private errorService: ErrorHandlerService,
    private departmentsService: DepartmentsService,
    private assessmentService: AssessmentService,
    private nzMessage: NzMessageService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: [null, Validators.required],
      clinicianId: [null, Validators.required],
      informantPatient: [null],
      informantClinicianId: [null],
      informantCaregiverRelation: [null],
      informantType: [null],
      deliveryDate: [null],
      expirationDate: [null],
      note: [null],
    });
    this.initAssessment();
    this.getPatient();
    this.getCaregivers();
    this.getUserDepartments();
  }

  public goBack(patient: FormattedPatient): void {
    const dataString = CryptoJS.AES.encrypt(JSON.stringify(this.patient), environment.secretKey).toString();
    console.log(this.patient);
    this.router.navigate(['/mhira/case-management/profile'], {
      queryParams: {
        profile: dataString,
      },
    });
  }

  public onSelectChange(event: any) {
    if (!this.editMode) {
      return;
    }
    if (event === 'PATIENT') {
      this.dataToSelect = [
        {
          label: this.patient.firstName + ' ' + this.patient.lastName + ' ' + this.patient.medicalRecordNo,
          value: this.patient.id,
        },
      ];
      this.selectedInformant = this.patient?.id;
    } else if (event === `USER`) {
      this.dataToSelect = this.users.map((user) => ({
        label: user.firstName + ' ' + user.lastName,
        value: user.id,
      }));
      this.selectedInformant = this.users[0]?.id;
    } else if (event === `CAREGIVER`) {
      this.dataToSelect = this.options;
      this.selectedInformant = this.options[0].value;
    }
  }

  public onQuestionnaireSelected(questionnaires: QuestionnaireVersion[]): void {
    this.selectedQuestionnaires = questionnaires;
  }

  public onUserSelect(user: User) {
    this.formGroup.patchValue({ clinicianId: user?.id });
  }

  public getUserDepartments(params?: { paging?: Paging; filter?: Filter; sorting?: Sorting[] }) {
    this.isLoading = true;
    this.departmentsService
      .departments(params)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        ({ data }: any) => {
          const page = data.departments;
          page.edges.map((departmentData: any) => {
            const _department = Convert.toDepartment(departmentData.node);
            this.departments.push(_department);
            _department.users.map((user: any) => {
              const exists = this.users.some((user1) => user1.id === user.id);
              if (!exists) this.users.push(user);
            });
          });
        },
        (error) =>
          this.errorService.handleError(error, {
            prefix: 'Unable to load departments',
          })
      );
  }

  public getPatient() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.profile) {
        console.log('here');
        const bytes = CryptoJS.AES.decrypt(params.profile, environment.secretKey);
        const patient = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        console.log(PatientModel.fromJson(patient));
        this.patient = PatientModel.fromJson(patient);
      }
    });
    if (this.editMode) {
      this.selectedInformant = this.patient.id;
    }
  }

  public onChangeDelivery(result: Date): void {
    console.log(result?.toISOString());
  }

  public onChangeExpire(result: Date): void {
    console.log(result?.toISOString());
  }

  public onSubmitAssessment() {
    if (this.formGroup.invalid) return;

    const questionnaires = this.selectedQuestionnaires.map((q) => q._id);
    const { informant, informantPatient, ...rest } = this.formGroup.value;
    const newAssessmentData = {
      ...rest,
      questionnaires,
      patientId: this.fullAssessment?.patientId ?? this.patient.id,
    };

    if (this.typeSelected === `USER`) {
      newAssessmentData.informantCaregiverRelation = null;
    }

    if (this.typeSelected === `CAREGIVER`) {
      newAssessmentData.informantClinicianId = null;
    }

    if (this.typeSelected === 'PATIENT') {
      newAssessmentData.informantClinicianId = null;
      newAssessmentData.informantCaregiverRelation = null;
    }
    if (this.fullAssessment?.patientId) {
      newAssessmentData.note = this.noteValue;
    }
    const action = this.fullAssessment?.patientId
      ? this.assessmentService.updateMongoAssessment({
          ...newAssessmentData,
          assessmentId: this.fullAssessment.id,
        })
      : this.assessmentService.createMongoAssessment(newAssessmentData);

    action.subscribe(
      () => {
        this.nzMessage.success('Assessment created', { nzDuration: 3000 });
        this.editMode = false;
      },
      (err) => this.errorService.handleError(err, { prefix: 'Unable to create assessment ' })
    );
  }

  public async initAssessment(): Promise<void> {
    const data = this.activatedRoute.snapshot.queryParamMap.get('assessment');
    if (!data) return;

    const bytes = CryptoJS.AES.decrypt(data, environment.secretKey);
    const assessment: FullAssessment = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    this.fullAssessment = assessment;
    this.patient = this.fullAssessment.patient;
    this.editMode = false;
    this.formGroup.setValue({
      name: this.fullAssessment.name,
      clinicianId: this.fullAssessment.clinician.id,
      deliveryDate: this.fullAssessment.deliveryDate,
      informantType: '',
      informantPatient: this.fullAssessment.patient,
      informantClinicianId: {
        label:
          this.fullAssessment.informantClinician?.firstName + ' ' + this.fullAssessment.informantClinician?.lastName,
        value: this.fullAssessment.informantClinician?.id,
      },
      informantCaregiverRelation: {
        label: this.fullAssessment.informantCaregiverRelation,
        value: this.fullAssessment.informantCaregiverRelation,
      },
      expirationDate: this.fullAssessment.expirationDate,
      note: '',
    });
    this.selectedClinician = this.fullAssessment.clinician;
    this.expireDate = this.fullAssessment.expirationDate;
    this.deliveryDate = this.fullAssessment.deliveryDate;
    this.selectedQuestionnaires = this.fullAssessment.questionnaireAssessment.questionnaires;
    this.noteValue = this.fullAssessment.note;
    // this.formGroup.controls.note.disable();

    if (this.fullAssessment.informantClinician) {
      this.typeSelected = `USER`;
      this.selectedInformant = this.fullAssessment.informantClinician.id;
      this.dataToSelect = [
        {
          label: this.fullAssessment.informantClinician.firstName,
          value: this.fullAssessment.informantClinician.id,
        },
      ];
    } else if (this.fullAssessment.informantCaregiverRelation) {
      this.typeSelected = `CAREGIVER`;
      this.selectedInformant = this.fullAssessment.informantCaregiverRelation;
      this.dataToSelect = [
        {
          label: this.fullAssessment.informantCaregiverRelation,
          value: this.fullAssessment.informantCaregiverRelation,
        },
      ];
    } else {
      this.typeSelected = 'PATIENT';
      this.selectedInformant = this.fullAssessment.patient.id;
      this.dataToSelect = [
        {
          label:
            this.fullAssessment.patient.firstName + ' ' + this.patient.lastName + ' ' + this.patient.medicalRecordNo,
          value: this.fullAssessment.patient.id,
        },
      ];
    }
  }

  private getCaregivers(): void {
    this.isLoading = true;
    const options = {
      filter: {
        and: [{ patient: { id: { eq: this.fullAssessment?.patientId ?? this.patient.id } } }],
      },
    };
    this.caregiversPatientService
      .caregiversPatient(options)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((response) => {
        this.caregivers = response.data.patientCaregivers.edges
          .filter((e: any) => e.node.caregiver)
          .map((caregiver: any) => caregiver.node.caregiver);
        this.pageInfo = response.data.patientCaregivers.pageInfo;
      });
  }
}
