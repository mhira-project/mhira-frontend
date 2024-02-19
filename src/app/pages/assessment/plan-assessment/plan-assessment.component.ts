import { Component, Input, OnInit } from '@angular/core';
import { AssessmentService } from '../@services/assessment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@env/environment';
import { QuestionnaireVersion } from '../../questionnaire-management/@types/questionnaire';
import { User } from '@app/pages/user-management/@types/user';
import { Patient } from '@app/pages/patients-management/@types/patient';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { FullAssessment } from '../@types/assessment';
import { PermissionKey } from '../../../@shared/@types/permission';
import { AppPermissionsService } from '../../../@shared/services/app-permissions.service';
import { ErrorHandlerService } from '../../../@shared/services/error-handler.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormattedPatient } from '@app/pages/patients-management/@types/formatted-patient';
import { SelectedCaregiver } from '@app/pages/patients-management/@types/caregiver';
import { PageInfo, Paging } from '@shared/@types/paging';
import { Filter } from '@shared/@types/filter';
import { Sorting } from '@shared/@types/sorting';
import { finalize } from 'rxjs/operators';
import { Convert } from '@shared/classes/convert';
import { DepartmentsService } from '@app/pages/administration/@services/departments.service';
import { Department } from '@app/pages/administration/@types/department';
import { AssessmentAdministrationService } from '@app/pages/administration/@services/assessment-administration.service';
import { AssessmentAdministration } from '@app/pages/administration/@types/assessment-administration';
import { LocationStrategy } from '@angular/common';
import { Clipboard } from '@angular/cdk/clipboard';
import { EmailTemplatesService } from '@app/pages/administration/@services/email-templates.service';
import { DEFAULT_PAGE_SIZE } from '@app/@shared/@modules/master-data/@types/list';
import { QuestionnaireBundlesService } from '@app/pages/questionnaire-management/@services/questionnaire-bundles.service';

const CryptoJS = require('crypto-js');

@Component({
  selector: 'app-plan-assessment',
  templateUrl: './plan-assessment.component.html',
  styleUrls: ['./plan-assessment.component.scss'],
})
export class PlanAssessmentComponent implements OnInit {
  public PK = PermissionKey;
  public selectedQuestionnaires: QuestionnaireVersion[] = [];
  public selectedAssessment: any = null;
  listOfBundles: any = [];
  listOfSelectedBundles: any = [];
  public typeSelected: any = 'PATIENT';
  public dataToSelect: any = [];
  public users: User[] = [];
  public assessmentUrl: URL;
  public data: Partial<AssessmentAdministration>[];
  public pageInfo: PageInfo;
  public selectedPatient: Patient;
  @Input() public patient: FormattedPatient;
  @Input() public caregivers: SelectedCaregiver[] = [];
  public selectedInformant: any = null;
  public selectedClinician: User;
  public fullAssessment: FullAssessment;
  public assessmentForm: FormGroup;
  public editMode = true;
  public isLoading = false;
  public departments: Department[] = [];
  public emailTemplates: any[] = [];
  public emailTemplatesRequestOptions: { paging: Paging; filter: Filter; sorting: Sorting[] } = {
    paging: { first: DEFAULT_PAGE_SIZE },
    filter: {},
    sorting: [],
  };
  public deliveryDate: any = null;
  public expireDate: any = null;
  public maxLength = 200;
  public checked = false;
  public isUpdate: boolean;
  public hasEmail = false;
  url: any = '';
  options = [
    {
      label: 'createAssessment.mother',
      value: 'Mother',
    },
    {
      label: 'createAssessment.father',
      value: 'Father',
    },
    {
      label: 'createAssessment.grandparent',
      value: 'Grandparent',
    },
    {
      label:'createAssessment.uncleAunt',
      value: 'Uncle/Aunt',
    },
    {
      label: 'createAssessment.extendedFamily',
      value: 'Extended Family',
    },
    {
      label: 'createAssessment.legalGuardian',
      value: 'Legal Guardian',
    },
    {
      label: 'createAssessment.familyDoctor',
      value: 'Family Doctor',
    },
    {
      label: 'createAssessment.externalPaediatrician',
      value: 'External Paediatrician',
    },
    {
      label: 'createAssessment.externalPsychotherapist',
      value: 'External Psychotherapist',
    },
    {
      label: 'createAssessment.externalPsychologist',
      value: 'External Psychologist',
    },
    {
      label: 'createAssessment.externalSocialWorker',
      value: 'External Social Worker',
    },
    {
      label: 'createAssessment.externalNurse',
      value: 'External Nurse',
    },
    {
      label: 'createAssessment.emergencyDepartment',
      value: 'Emergency Department',
    },
    {
      label: 'createAssessment.friend',
      value: 'Friend',
    },
    {
      label: 'createAssessment.neighbour',
      value: 'Neighbour',
    },
    {
      label: 'createAssessment.teacher',
      value: 'Teacher',
    },
    {
      label: 'createAssessment.schoolRepresentative',
      value: 'School Representative',
    },
    {
      label: 'createAssessment.advisor',
      value: 'Advisor',
    },
    {
      label: 'createAssessment.legalAdvisor',
      value: 'Legal Advisor',
    },
    {
      label: 'createAssessment.assistance',
      value: 'Assistance',
    },
    {
      label: 'createAssessment.supervisor',
      value: 'Supervisor',
    },
    {
      label: 'createAssessment.other',
      value: 'Other',
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private assessmentService: AssessmentService,
    private nzMessage: NzMessageService,
    private errorService: ErrorHandlerService,
    private activatedRoute: ActivatedRoute,
    private emailTemplatesService: EmailTemplatesService,
    private bundlesService: QuestionnaireBundlesService,
    private departmentsService: DepartmentsService,
    private assessmentAdministrationService: AssessmentAdministrationService,
    public perms: AppPermissionsService,
    private router: Router,
    private locationStrategy: LocationStrategy,
    private clipboard: Clipboard
  ) {}

  public ngOnInit(): void {
    this.getAssessmentTypes();
    this.initAssessment();
    this.userAutoSelect();
    this.hasEmail = environment.email;
    setTimeout(() => {
      console.log('FULL ASSESSMENT: ', this.fullAssessment);
    }, 1000);
  }

  get datesFieldAsFormArray(): FormArray {
    return this.assessmentForm.get('dates') as FormArray;
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

  public onSelectChange(event: any) {
    if (!this.editMode) {
      return;
    }
    console.log(this.patient);
    console.log(this.selectedPatient);
    if (event === 'PATIENT') {
      this.dataToSelect = [
        {
          label: this.patient?.firstName + ' ' + this.patient?.lastName + ' ' + this.patient?.medicalRecordNo,
          value: this.patient?.id,
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

  public userAutoSelect() {
    const userLocalStorage = JSON.parse(localStorage.getItem('user')) as User;
    this.selectedClinician = userLocalStorage;
  }

  public onSubmitAssessment() {
    if (this.assessmentForm.invalid) return;
    const questionnaires = this.selectedQuestionnaires.map((q) => q._id);
    const { informant, informantPatient, ...rest } = this.assessmentForm.value;
    const newAssessmentData = {
      ...rest,
      questionnaires,
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

    const action = this.fullAssessment?.id
      ? this.assessmentService.updateMongoAssessment({
          ...newAssessmentData,
          assessmentId: this.fullAssessment.id,
        })
      : this.assessmentService.createMongoAssessment(newAssessmentData);

    action.subscribe(
      () => {
        this.nzMessage.success('Assessment created', { nzDuration: 3000 });
        this.editMode = false;
        this.router.navigate(['/mhira/assessments/planned-assessments']);
      },
      (err) => this.errorService.handleError(err, { prefix: 'Unable to create assessment ' })
    );
  }

  public onQuestionnaireSelected(questionnaires: QuestionnaireVersion[]): void {
    this.selectedQuestionnaires = questionnaires;
    this.assessmentForm.patchValue({ questionnaires });
  }

  public onUserSelect(user: User) {
    this.assessmentForm.patchValue({
      clinicianId: user?.id,
    });
  }

  public onPatientSelect(patient: Patient) {
    this.assessmentForm.patchValue({
      patientId: patient?.id,
    });
    if (this.typeSelected !== 'PATIENT') {
      return;
    }
    this.patient = patient;
    this.selectedInformant = patient?.id;
    this.dataToSelect = [
      {
        label: patient?.firstName + ' ' + patient?.lastName + ' ' + patient?.medicalRecordNo,
        value: patient?.id,
      },
    ];
    this.users = [];

    if (this.fullAssessment?.patientId || this.patient?.id) {
      this.getUserDepartments({
        filter: { and: [{ patients: { id: { eq: this.fullAssessment?.patientId ?? this.patient?.id } } }] },
      });
    }

    this.emailTemplates = [];
    this.getPatientEmailTemplates(this.fullAssessment?.patientId || this.patient?.id);
  }

  goBack() {
    this.router.navigate(['/mhira/assessments/planned-assessments']);
  }

  public onChangeDelivery(result: Date): void {
    console.log(result?.toISOString());
  }

  public onChangeExpire(result: Date): void {
    console.log(result?.toISOString());
  }

  public getUserDepartments(params?: { paging?: Paging; filter?: Filter; sorting?: Sorting[] }) {
    this.isLoading = true;
    this.departmentsService
      .departments(params)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        ({ data }: any) => {
          const page = data.departments;
          this.departments = [];
          page.edges.map((departmentData: any) => {
            const _department = Convert.toDepartment(departmentData.node);
            this.departments.push(_department);
            _department.users.map((user: any) => {
              const exists = this.users.some((user1) => user1.id === user.id);
              if (!exists) this.users.push(user);
            });
          });

          this.getBundles();
        },
        (error) => this.errorService.handleError(error, { prefix: 'Unable to load departments' })
      );
  }

  getPatientEmailTemplates(id: number) {
    this.emailTemplatesService.getPatientEmailTemplates(id).subscribe((data: any) => {
      this.emailTemplates = data?.data?.getPatientEmailTemplates;
      if (this.editMode === true) {
        this.assessmentForm.patchValue({ mailTemplateId: this.emailTemplates[0]?.id });
      }
    });
  }

  getBundles() {
    const departmentIds = this.departments.map((el) => el.id);
    this.bundlesService.getQuestionnairesBundles({ departmentIds }).subscribe((data: any) => {
      this.listOfBundles = data.data.getQuestionnaireBundles.edges;
    });
  }

  onBundleSelection() {
    this.selectedQuestionnaires = this.selectedQuestionnaires.concat(
      this.listOfSelectedBundles.map((bundle: any) => bundle.node.questionnaires).flat()
    );
    this.selectedQuestionnaires = this.filterUniqueQuestionnaires(this.selectedQuestionnaires);
    this.assessmentForm.patchValue({ questionnaires: this.selectedQuestionnaires });
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

  get dates(): FormArray {
    return this.assessmentForm.get('dates') as FormArray;
  }

  private initAssessment() {
    let assessmentId: number;

    try {
      const raw = this.activatedRoute.snapshot.queryParamMap.get('assessment');
      const bytes = CryptoJS.AES.decrypt(raw, environment.secretKey);
      assessmentId = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)).id;

      this.isUpdate = true;

      this.assessmentForm = this.formBuilder.group({
        assessmentTypeId: [null, Validators.required],
        patientId: [null, Validators.required],
        clinicianId: [null, Validators.required],
        questionnaires: [null, Validators.required],
        informantType: [null],
        informantPatient: [null],
        informantClinicianId: [null],
        informantCaregiverRelation: [null],
        emailReminder: [null],
        receiverEmail: [null],
        mailTemplateId: [null],
        deliveryDate: [null],
        expirationDate: [null],
        dates: this.formBuilder.array([]),
        note: [null],
      });
    } catch {
      this.assessmentForm = this.formBuilder.group({
        assessmentTypeId: [null, Validators.required],
        patientId: [null, Validators.required],
        clinicianId: [null, Validators.required],
        questionnaires: [null, Validators.required],
        informantType: [null],
        informantPatient: [null],
        informantClinicianId: [null],
        informantCaregiverRelation: [null],
        emailReminder: [null],
        receiverEmail: [null],
        mailTemplateId: [null],
        dates: this.formBuilder.array([
          this.formBuilder.group({
            expirationDate: [null],
            deliveryDate: [null],
          }),
        ]),
        note: [null],
      });
      this.isUpdate = false;
      return;
    }

    this.assessmentService.getFullAssessment(assessmentId).subscribe(
      (assessment) => {
        this.editMode = false;
        this.fullAssessment = assessment;
        this.assessmentUrl = new URL(this.generateAssessmentURL(this.fullAssessment?.uuid), window.location.origin);
        this.assessmentForm.patchValue({
          emailReminder: this.fullAssessment.emailReminder,
          assessmentTypeId: {
            label: this.fullAssessment.assessmentType?.name,
            value: this.fullAssessment.assessmentType?.id,
          },
          informantType: this.fullAssessment.informantType,
          patientId: this.fullAssessment.patientId,
          clinicianId: this.fullAssessment.clinicianId,
          informantPatient: this.fullAssessment.patient,
          informantClinicianId: this.fullAssessment.informantClinician?.id || null,
          informantCaregiverRelation: this.fullAssessment.informantCaregiverRelation,
          deliveryDate: this.fullAssessment.deliveryDate,
          expirationDate: this.fullAssessment.expirationDate,
          receiverEmail: this.fullAssessment.receiverEmail,
          mailTemplateId: this.fullAssessment.mailTemplateId,
          note: this.fullAssessment.note,
          questionnaires: this.fullAssessment.questionnaireAssessment?.questionnaires,
        });
        // @ts-ignore
        this.dates.push(
          this.formBuilder.group({
            deliveryDate: this.fullAssessment.deliveryDate,
            expirationDate: this.fullAssessment.expirationDate,
          })
        );

        this.selectedQuestionnaires = this.fullAssessment.questionnaireAssessment?.questionnaires;
        this.selectedPatient = this.fullAssessment.patient;
        this.selectedClinician = this.fullAssessment.clinician;
        this.fullAssessment = this.fullAssessment;
        this.patient = this.fullAssessment.patient;
        this.selectedAssessment = this.fullAssessment.assessmentType?.id;
        this.typeSelected = this.fullAssessment.informantType;
        if (this.fullAssessment.informantClinician) {
          this.selectedInformant = this.fullAssessment.informantClinician.id;
          this.dataToSelect = [
            {
              label: this.fullAssessment.informantClinician.firstName,
              value: this.fullAssessment.informantClinician.id,
            },
          ];
        } else if (this.fullAssessment.informantCaregiverRelation) {
          this.selectedInformant = this.fullAssessment.informantCaregiverRelation;
          this.dataToSelect = [
            {
              label: this.fullAssessment.informantCaregiverRelation,
              value: this.fullAssessment.informantCaregiverRelation,
            },
          ];
        } else {
          this.selectedInformant = this.fullAssessment.patient.id;
          this.dataToSelect = [
            {
              label:
                this.fullAssessment.patient.firstName +
                ' ' +
                this.patient.lastName +
                ' ' +
                this.patient.medicalRecordNo,
              value: this.fullAssessment.patient.id,
            },
          ];
        }
      },
      (error) =>
        this.errorService.handleError(error, { prefix: `Unable to load the assessment with ID "${assessmentId}"` })
    );
  }

  // tslint:disable
  public copyAssessmentLink(url: any) {
    this.clipboard.copy(url);
  }

  private generateAssessmentURL(assesmentUuid: string): string {
    const cryptoId = CryptoJS.AES.encrypt(assesmentUuid, environment.secretKey).toString();
    const tree = this.router.createUrlTree(['/assessment/overview'], { queryParams: { assessment: cryptoId } });
    return this.locationStrategy.prepareExternalUrl(this.router.serializeUrl(tree));
  }

  private getAssessmentTypes(): void {
    this.isLoading = true;
    this.assessmentAdministrationService
      .assessmentActive()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        ({ data }: any) => {
          this.data = data.activeAssessmentTypes;
        },
        (err) => this.errorService.handleError(err, { prefix: 'Unable to load assessment type' })
      );
  }
}
