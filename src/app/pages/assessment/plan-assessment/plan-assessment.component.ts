import { Component, OnInit } from '@angular/core';
import { AssessmentService } from '../@services/assessment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@env/environment';
import { QuestionnaireVersion } from '../../questionnaire-management/@types/questionnaire';
import { User } from '@app/pages/user-management/@types/user';
import { Patient } from '@app/pages/patients-management/@types/patient';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FullAssessment } from '../@types/assessment';
import { PermissionKey } from '../../../@shared/@types/permission';
import { AppPermissionsService } from '../../../@shared/services/app-permissions.service';
import { ErrorHandlerService } from '../../../@shared/services/error-handler.service';
import { NzMessageService } from 'ng-zorro-antd/message';

const CryptoJS = require('crypto-js');

@Component({
  selector: 'app-plan-assessment',
  templateUrl: './plan-assessment.component.html',
  styleUrls: ['./plan-assessment.component.scss'],
})
export class PlanAssessmentComponent implements OnInit {
  public PK = PermissionKey;
  public selectedQuestionnaires: QuestionnaireVersion[] = [];
  public selectedPatient: Patient;
  public selectedClinician: User;
  public fullAssessment: FullAssessment;
  public assessmentForm: FormGroup;
  public editMode = true;

  constructor(
    private formBuilder: FormBuilder,
    private assessmentService: AssessmentService,
    private nzMessage: NzMessageService,
    private errorService: ErrorHandlerService,
    private activatedRoute: ActivatedRoute,
    public perms: AppPermissionsService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.assessmentForm = this.formBuilder.group({
      name: [null, Validators.required],
      informant: [null, Validators.required],
      patientId: [null, Validators.required],
      clinicianId: [null, Validators.required],
      questionnaires: [null, Validators.required],
    });

    this.initAssessment();
  }

  public onSubmitAssessment() {
    if (this.assessmentForm.invalid) return;

    const action = this.fullAssessment?.id
      ? this.assessmentService.updateMongoAssessment({
          ...this.assessmentForm.value,
          questionnaires: this.selectedQuestionnaires.map((q) => q._id),
          assessmentId: this.fullAssessment.id,
        })
      : this.assessmentService.createMongoAssessment({
          ...this.assessmentForm.value,
          questionnaires: this.selectedQuestionnaires.map((q) => q._id),
        });

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
    this.assessmentForm.patchValue({ clinicianId: user?.id });
  }

  public onPatientSelect(patient: Patient) {
    this.assessmentForm.patchValue({ patientId: patient?.id });
  }

  goBack() {
    this.router.navigate(['/mhira/assessments/planned-assessments']);
  }

  private initAssessment() {
    let assessmentId: number;
    let uuid: string;
    try {
      const raw = this.activatedRoute.snapshot.queryParamMap.get('assessment');
      const bytes = CryptoJS.AES.decrypt(raw, environment.secretKey);
      const { assessmentId: id, uuid: uid } = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      assessmentId = +id;
      uuid = uid;
    } catch {
      return;
    }

    this.assessmentService.getFullAssessment(assessmentId, uuid).subscribe(
      (assessment) => {
        this.assessmentForm.setValue({
          name: assessment.name,
          informant: assessment.informant,
          patientId: assessment.patientId,
          clinicianId: assessment.clinicianId,
          questionnaires: assessment.questionnaireAssessment?.questionnaires,
        });

        this.selectedQuestionnaires = assessment.questionnaireAssessment?.questionnaires;
        this.selectedPatient = assessment.patient;
        this.selectedClinician = assessment.clinician;
        this.fullAssessment = assessment;
        this.editMode = false;
      },
      (error) =>
        this.errorService.handleError(error, { prefix: `Unable to load the assessment with ID "${assessmentId}"` })
    );
  }
}
