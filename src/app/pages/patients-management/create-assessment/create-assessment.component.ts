import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import { AssessmentAdministration } from '@app/pages/administration/@types/assessment-administration';
import { AssessmentAdministrationService } from '@app/pages/administration/@services/assessment-administration.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { LocationStrategy } from '@angular/common';
import { EmailTemplatesService } from '@app/pages/administration/@services/email-templates.service';
import { QuestionnaireBundlesService } from '@app/pages/questionnaire-management/@services/questionnaire-bundles.service';

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
  listOfBundles: any = [];
  listOfSelectedBundles: any = [];
  noteValue: any = '';
  patientEmail = '';
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
  public selectedAssessment: any = null;
  public assessmentAdministration: Partial<AssessmentAdministration>[];
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
  public emailTemplates: any[] = [];
  public assessmentUrl: URL;
  public selectedQuestionnaires: QuestionnaireVersion[] = [];
  public checked = false;
  public isUpdate: boolean;
  public hasEmail = false;

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
    private assessmentAdministrationService: AssessmentAdministrationService,
    private errorService: ErrorHandlerService,
    private departmentsService: DepartmentsService,
    private emailTemplatesService: EmailTemplatesService,
    private bundlesService: QuestionnaireBundlesService,
    private assessmentService: AssessmentService,
    private nzMessage: NzMessageService,
    private clipboard: Clipboard,
    private locationStrategy: LocationStrategy
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      assessmentTypeId: [null, Validators.required],
      clinicianId: [null, Validators.required],
      informantPatient: [null],
      informantClinicianId: [null],
      informantCaregiverRelation: [null],
      informantType: [null],
      deliveryDate: [null],
      expirationDate: [null],
      emailReminder: [null],
      receiverEmail: [this.patient?.email],
      mailTemplateId: [null],
      note: [null],
      dates: this.formBuilder.array([
        this.formBuilder.group({
          expirationDate: [null],
          deliveryDate: [null],
        }),
      ]),
    });
    this.getAssessmentTypes();
    this.userAutoSelect();
    this.initAssessment();
    this.getPatient();
    this.getBundles();
    this.getCaregivers();
    this.getUserDepartments({ paging: { first: 50 } });
    this.getPatientEmailTemplates(this.patient.id);
    this.hasEmail = environment.email;
  }

  get datesFieldAsFormArray(): FormArray {
    return this.formGroup.get('dates') as FormArray;
  }

  get dates(): FormArray {
    return this.formGroup.get('dates') as FormArray;
  }

  addControl(): void {
    this.datesFieldAsFormArray.push(
      this.formBuilder.group({
        expirationDate: [null],
        deliveryDate: [null],
      })
    );
  }

  remove(i: number): void {
    this.datesFieldAsFormArray.removeAt(i);
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

  public userAutoSelect() {
    const userLocalStorage = JSON.parse(localStorage.getItem('user')) as User;
    this.selectedClinician = userLocalStorage;
  }

  public onUserSelect(user: User) {
    this.formGroup.patchValue({ clinicianId: user?.id });
  }

  public copyAssessmentLink(url: any) {
    this.clipboard.copy(url);
  }

  getPatientEmailTemplates(id: number) {
    this.emailTemplatesService.getPatientEmailTemplates(id).subscribe((data: any) => {
      this.emailTemplates = data?.data?.getPatientEmailTemplates;
      if (this.editMode === true) {
        this.formGroup.patchValue({ mailTemplateId: this.emailTemplates[0]?.id });
      }
    });
  }

  public getUserDepartments(params?: { paging?: Paging; filter?: Filter; sorting?: Sorting[] }) {
    this.isLoading = true;
    this.departmentsService
      .departments({
        ...params,
        filter: {
          ...params?.filter,
          and: [{ patients: { id: { eq: this.fullAssessment?.patientId ?? this.patient?.id } } }],
        },
      })
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
        this.patientEmail = this.patient.email;
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
        if (this.isUpdate) {
          this.nzMessage.success('Assessment updated', { nzDuration: 3000 });
        } else {
          this.nzMessage.success('Assessment created', { nzDuration: 3000 });
        }
        this.editMode = false;
      },
      (err) => this.errorService.handleError(err, { prefix: 'Unable to create assessment ' })
    );
  }

  public async initAssessment(): Promise<void> {
    const data = this.activatedRoute.snapshot.queryParamMap.get('assessment');
    if (!data) {
      this.formGroup.removeControl('deliveryDate');
      this.formGroup.removeControl('expirationDate');
      this.isUpdate = false;
      return;
    }

    this.isUpdate = true;
    const bytes = CryptoJS.AES.decrypt(data, environment.secretKey);
    const assessment: FullAssessment = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    this.fullAssessment = assessment;
    this.assessmentUrl = new URL(this.generateAssessmentURL(this.fullAssessment?.uuid), window.location.origin);
    this.patient = this.fullAssessment.patient;
    this.editMode = false;
    this.formGroup.patchValue({
      assessmentTypeId: this.fullAssessment.assessmentType?.id,
      clinicianId: this.fullAssessment.clinician.id,
      deliveryDate: this.fullAssessment.deliveryDate,
      informantType: this.fullAssessment.informantType,
      mailTemplateId: this.fullAssessment.mailTemplateId,
      informantPatient: this.fullAssessment.patient,
      emailReminder: this.fullAssessment.emailReminder,
      receiverEmail: this.fullAssessment.receiverEmail,
      informantClinicianId: this.fullAssessment.informantClinician?.id || null,
      informantCaregiverRelation: this.fullAssessment.informantCaregiverRelation,
      expirationDate: this.fullAssessment.expirationDate,
      note: '',
    });
    this.dates.push(
      this.formBuilder.group({
        deliveryDate: this.fullAssessment.deliveryDate,
        expirationDate: this.fullAssessment.expirationDate,
      })
    );
    this.selectedClinician = this.fullAssessment.clinician;
    this.expireDate = this.fullAssessment.expirationDate;
    this.deliveryDate = this.fullAssessment.deliveryDate;
    this.selectedQuestionnaires = this.fullAssessment.questionnaireAssessment.questionnaires;
    this.noteValue = this.fullAssessment.note;
    this.patientEmail = this.patient.email;
    this.selectedAssessment = this.fullAssessment.assessmentType?.id;
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



 getBundles() {
    const departments = this.patient.departments.map((item) => {
      return item.id;
    });

    this.bundlesService
      .getQuestionnairesBundles({
        departmentIds: departments,
      })
      .subscribe((data: any) => {
        this.listOfBundles = data.data.getQuestionnaireBundles.edges;
      });
  }

  onBundleSelection() {
    this.selectedQuestionnaires = this.selectedQuestionnaires.concat(
      this.listOfSelectedBundles.map((bundle: any) => bundle.node.questionnaires).flat()
    );
    this.selectedQuestionnaires = this.filterUniqueQuestionnaires(this.selectedQuestionnaires);
    this.formGroup.patchValue({ questionnaires: this.selectedQuestionnaires });
  }

  filterUniqueQuestionnaires(questionnaires: any) {
    const uniqueQuestionnaires = [];
    const seenIds = new Set();

    for (const questionnaire of questionnaires) {
      const id = questionnaire._id;

      // Check if the _id has been seen before
      if (!seenIds.has(id)) {
        seenIds.add(id);
        uniqueQuestionnaires.push(questionnaire);
      }
    }
    return uniqueQuestionnaires;
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

  private getAssessmentTypes(): void {
    this.isLoading = true;
    this.assessmentAdministrationService
      .assessmentActive()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        ({ data }: any) => {
          this.assessmentAdministration = data.activeAssessmentTypes;
        },
        (err) => this.errorService.handleError(err, { prefix: 'Unable to load assessment type' })
      );
  }

  private generateAssessmentURL(assesmentUuid: string): string {
    const cryptoId = CryptoJS.AES.encrypt(assesmentUuid, environment.secretKey).toString();
    const tree = this.router.createUrlTree(['/assessment/overview'], { queryParams: { assessment: cryptoId } });
    return this.locationStrategy.prepareExternalUrl(this.router.serializeUrl(tree));
  }
}
