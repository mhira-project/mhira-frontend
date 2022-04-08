import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormattedPatient } from '@app/pages/patients-management/@types/formatted-patient';
import { PatientModel } from '@app/pages/patients-management/@models/patient.model';
import { environment } from '@env/environment';
import { ActivatedRoute } from '@angular/router';
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
  typeSelected: any = 'Informant Patient';
  dataToSelect: any = [];
  selectedInformant: any = null;
  noteValue: any = '';
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
      informantCaregiverId: [null],
      informationType: [null],
      deliveryDate: [null],
      expirationDate: [null],
      note: [null],
    });
    this.initAssessment();
    this.getPatient();
    this.getCaregivers();
    this.getUserDepartments();
  }

  public onSelectChange(event: any) {
    if (event === 'Informant Patient') {
      this.dataToSelect = [{ label: this.patient.firstName, value: this.patient.id }];
    } else if (event === `Departments User`) {
      this.dataToSelect = this.users.map((user) => ({ label: user.firstName, value: user.id }));
    } else if (event === `Patients Caregiver`) {
      this.dataToSelect = this.caregivers.map((caregiver) => ({
        label: caregiver.firstName,
        value: caregiver.id,
      }));
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
            console.log(_department);
            _department.users.map((user: any) => {
              const exists = this.users.some((user1) => user1.id === user.id);
              if (!exists) this.users.push(user);
            });
            console.log(this.users);
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
        const bytes = CryptoJS.AES.decrypt(params.profile, environment.secretKey);
        const patient = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        this.patient = PatientModel.fromJson(patient);
      }
    });
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
    const { informationType, informantPatient, ...rest } = this.formGroup.value;
    const newAssessmentData = {
      ...rest,
      informant: '',
      questionnaires,
      patientId: this.fullAssessment?.patientId ?? this.patient.id,
    };

    if (this.typeSelected === `Departments User`) {
      newAssessmentData.informantCaregiverId = null;
    }

    if (this.typeSelected === `Patients Caregiver`) {
      newAssessmentData.informantClinicianId = null;
    }

    if (this.typeSelected === 'Informant Patient') {
      newAssessmentData.informantClinicianId = null;
      newAssessmentData.informantCaregiverId = null;
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

    this.formGroup.setValue({
      name: this.fullAssessment.name,
      clinicianId: this.fullAssessment.clinician.id,
      // informant: { value: this.fullAssessment.informant, label: this.fullAssessment.informant },
      deliveryDate: this.fullAssessment.deliveryDate,
      informationType: '',
      informantPatient: this.fullAssessment.patient,
      informantClinicianId: {
        label: this.fullAssessment.informantClinician?.firstName,
        value: this.fullAssessment.informantClinician?.id,
      },
      informantCaregiverId: {
        label: this.fullAssessment.informantCaregiver?.firstName,
        value: this.fullAssessment.informantCaregiver?.id,
      },
      expirationDate: this.fullAssessment.expirationDate,
      note: '',
    });
    this.selectedClinician = this.fullAssessment.clinician;
    this.expireDate = this.fullAssessment.expirationDate;
    this.deliveryDate = this.fullAssessment.deliveryDate;
    this.selectedInformant = this.fullAssessment.informant;
    this.selectedQuestionnaires = this.fullAssessment.questionnaireAssessment.questionnaires;
    this.noteValue = this.fullAssessment.note;
    console.log(this.fullAssessment);
    if (this.fullAssessment.informantClinician) {
      this.typeSelected = `Department's User`;
    } else if (this.fullAssessment.informantCaregiver) {
      this.typeSelected = `Patient's Caregiver`;
    } else {
      this.typeSelected = 'Informant Patient';
    }
    console.log('TYPE', this.typeSelected);
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
