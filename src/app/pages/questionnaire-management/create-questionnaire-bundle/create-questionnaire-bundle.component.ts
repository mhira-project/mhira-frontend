import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { QuestionnaireVersion } from '../@types/questionnaire';
import { switchMap } from 'rxjs/operators';
import { QuestionnaireManagementService } from '../@services/questionnaire-management.service';

@Component({
  selector: 'app-create-questionnaire-bundle',
  templateUrl: './create-questionnaire-bundle.component.html',
  styleUrls: ['./create-questionnaire-bundle.component.scss']
})
export class CreateQuestionnaireBundleComponent implements OnInit {

  selectedQuestionnaires: QuestionnaireVersion[] = [];
  isUpdateMode = false;
  selectedId: number;
  bundle: any;
  bundleForm = this.fb.group({
    name: ['', Validators.required],
    questionnaires: []
  });

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private questionnaireService: QuestionnaireManagementService) { }

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      if(data.id){
        this.isUpdateMode = true;
        this.route.paramMap.pipe(
          switchMap((params) => {
            this.selectedId = Number(params.get('id'));
            return this.questionnaireService.getOneQuestionnaireBundle(this.selectedId)
          })
          // tslint:disable
        ).subscribe((data: any) => {
          this.bundle = data.data.getAllEmailTemplates.edges.filter((template: any) => template.node.id === this.selectedId);
          this.bundleForm.controls['name'].setValue(this.bundle[0]?.node.name);
          this.bundleForm.controls['subject'].setValue(this.bundle[0]?.node.subject);
        });
      }
    });
  }

  onFormSubmit(){
    if(!this.bundleForm.valid){
      console.log('Error!')
    }
    else{
      console.log(this.bundleForm.value);
    }
  }

  onFormUpdateSubmit(){
    if(!this.bundleForm.valid){
      console.log('Error!')
    }
    else{
      console.log(this.bundleForm.value);
    }
  }

  public onQuestionnaireSelected(questionnaires: QuestionnaireVersion[]): void {
    this.selectedQuestionnaires = questionnaires;
    this.bundleForm.patchValue({ questionnaires });
  }

}
