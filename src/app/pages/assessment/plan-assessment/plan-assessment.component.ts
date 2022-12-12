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
  public deliveryDate: any = null;
  public expireDate: any = null;
  public maxLength: number = 200;
  public checked: boolean = false;
  options = [
    {
      label: 'Mother',
      value: 'Mother',
    },
    {
      label: 'Father',
      value: 'Father',
    },
    {
      label: 'Grandparent',
      value: 'Grandparent',
    },
    {
      label: 'Uncle/Aunt',
      value: 'Uncle/Aunt',
    },
    {
      label: 'Extended Family',
      value: 'Extended Family',
    },
    {
      label: 'Legal Guardian',
      value: 'Legal Guardian',
    },
    {
      label: 'Family Doctor',
      value: 'Family Doctor',
    },
    {
      label: 'External Paediatrician',
      value: 'External Paediatrician',
    },
    {
      label: 'External Psychotherapist',
      value: 'External Psychotherapist',
    },
    {
      label: 'External Psychologist',
      value: 'External Psychologist',
    },
    {
      label: 'External Social Worker',
      value: 'External Social Worker',
    },
    {
      label: 'External Nurse',
      value: 'External Nurse',
    },
    {
      label: 'Emergency Department',
      value: 'Emergency Department',
    },
    {
      label: 'Friend',
      value: 'Friend',
    },
    {
      label: 'Neighbour',
      value: 'Neighbour',
    },
    {
      label: 'Teacher',
      value: 'Teacher',
    },
    {
      label: 'School Representative',
      value: 'School Representative',
    },
    {
      label: 'Advisor',
      value: 'Advisor',
    },
    {
      label: 'Legal Advisor',
      value: 'Legal Advisor',
    },
    {
      label: 'Assistance',
      value: 'Assistance',
    },
    {
      label: 'Supervisor',
      value: 'Supervisor',
    },
    {
      label: 'Other',
      value: 'Other',
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private assessmentService: AssessmentService,
    private nzMessage: NzMessageService,
    private errorService: ErrorHandlerService,
    private activatedRoute: ActivatedRoute,
    private departmentsService: DepartmentsService,
    private assessmentAdministrationService: AssessmentAdministrationService,
    public perms: AppPermissionsService,
    private router: Router,
    private locationStrategy: LocationStrategy,
    private clipboard: Clipboard
  ) {}

  public ngOnInit(): void {
    this.assessmentForm = this.formBuilder.group({
      assessmentTypeId: [null, Validators.required],
      patientId: [null, Validators.required],
      clinicianId: [null, Validators.required],
      questionnaires: [null, Validators.required],
      informantType: [null],
      informantPatient: [null],
      informantClinicianId: [null],
      informantCaregiverRelation: [null],
      deliveryDate: [null],
      expirationDate: [null],
      emailReminder: [null],
      // New:
      roles: this.formBuilder.array([]),
      // notes: [null]
    });
    
    this.getAssessmentTypes();
    this.getUserDepartments();
    this.initAssessment();
    this.userAutoSelect();

    setTimeout(() => {
      this.assessmentUrl = new URL(this.generateAssessmentURL(this.fullAssessment?.uuid), window.location.origin);
    }, 500);

    setTimeout(() => {
      console.log('Full Assessment: ', this.fullAssessment)      
    }, 1000);
  }

  get rolesFieldAsFormArray(): any {
    return this.assessmentForm.get('roles') as FormArray;
  }

  role(): any {
    return this.formBuilder.group({
      role: this.formBuilder.control(''),
    });
  }

  addControl(): void {
    this.rolesFieldAsFormArray.push(this.role());
  }

  remove(i: number): void {
    this.rolesFieldAsFormArray.removeAt(i);
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
          page.edges.map((departmentData: any) => {
            const _department = Convert.toDepartment(departmentData.node);
            this.departments.push(_department);
            _department.users.map((user: any) => {
              const exists = this.users.some((user1) => user1.id === user.id);
              if (!exists) this.users.push(user);
            });
          });
        },
        (error) => this.errorService.handleError(error, { prefix: 'Unable to load departments' })
      );
  }

  private initAssessment() {
    let assessmentId: number;

    try {
      const raw = this.activatedRoute.snapshot.queryParamMap.get('assessment');
      const bytes = CryptoJS.AES.decrypt(raw, environment.secretKey);
      assessmentId = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)).id;
    } catch {
      // console.log('Catch!')
      return;
    }

    this.assessmentService.getFullAssessment(assessmentId).subscribe(
      (assessment) => {
        this.editMode = false;
        this.fullAssessment = assessment;
        this.assessmentForm.setValue({
          emailReminder: this.fullAssessment.emailReminder,
          assessmentTypeId: {
            label: this.fullAssessment.assessmentType?.name,
            value: this.fullAssessment.assessmentType?.id,
          },
          informantType: this.fullAssessment.informantType,
          patientId: this.fullAssessment.patientId,
          clinicianId: this.fullAssessment.clinicianId,
          informantPatient: this.fullAssessment.patient,
          informantClinicianId: {
            label:
              this.fullAssessment.informantClinician?.firstName +
              ' ' +
              this.fullAssessment.informantClinician?.lastName,
            value: this.fullAssessment.informantClinician?.id,
          },
          informantCaregiverRelation: {
            label: this.fullAssessment.informantCaregiverRelation,
            value: this.fullAssessment.informantCaregiverRelation,
          },
          deliveryDate: this.fullAssessment.deliveryDate,
          expirationDate: this.fullAssessment.expirationDate,

          questionnaires: this.fullAssessment.questionnaireAssessment?.questionnaires,
        });
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
        console.log('Test', this.fullAssessment);
      },
      (error) =>
        this.errorService.handleError(error, { prefix: `Unable to load the assessment with ID "${assessmentId}"` })
    );
  }

  public copyAssessmentLink(url: any) {
    this.clipboard.copy(url);
  }

  private generateAssessmentURL(assesmentUuid: string): string {
    const cryptoId = CryptoJS.AES.encrypt(assesmentUuid, environment.secretKey).toString();
    const tree = this.router.createUrlTree(['/assessment/overview'], { queryParams: { assessment: cryptoId } });
    console.log('What is this', this.locationStrategy.prepareExternalUrl(this.router.serializeUrl(tree)));
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
          console.log('this.data', data);
        },
        (err) => this.errorService.handleError(err, { prefix: 'Unable to load assessment type' })
      );
  }
}
