import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { EmailTemplatesService } from '../@services/email-templates.service';
import { finalize, switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { DepartmentsService } from '@app/pages/patients-management/@services/departments.service';
import { DEFAULT_PAGE_SIZE } from '@app/@shared/@modules/master-data/@types/list';
import { Filter } from '@app/@shared/@types/filter';
import { Paging } from '@app/@shared/@types/paging';
import { Sorting } from '@app/@shared/@types/sorting';
import { Convert } from '@app/@shared/classes/convert';
import { ErrorHandlerService } from '@app/@shared/services/error-handler.service';

@Component({
  selector: 'app-create-email-template',
  templateUrl: './create-email-template.component.html',
  styleUrls: ['./create-email-template.component.scss']
})
export class CreateEmailTemplateComponent implements OnInit {

  selectedId: number = null;
  emailTemplate: any;
  checked: false;
  listOfDepartments: [] = [];
  public departmentsRequestOptions: { paging: Paging; filter: Filter; sorting: Sorting[] } = {
    paging: { first: 50 },
    filter: {},
    sorting: [],
  };
  selectedDepartments: [] = [];
  customStyles = {height: '250px', width: '100%'}
  isUpdateMode = false;
  allDepartments = false;
  editorConfig: AngularEditorConfig = {
    minHeight: '200px',
    editable: true,
    sanitize: false
  }
  emailForm = this.fb.group({
    name: '',
    subject: '',
    body: `<div><span style="background-color: transparent; font-size: 1rem;">Greetings!</span><br></div>
    <div>MHIRA is sending you an assessment.&nbsp;<br></div>
    <div><span style="background-color: transparent; font-size: 1rem;">Please click the link below to start the assessment!&nbsp;</span><br></div>
    <div><br></div>
    <a href="{{link}}" style="background-color:#007BFF; color: #fff; display: inline-block; padding: 10px 20px; border-radius: 5px; text-decoration: none;">Go to assessment</a>
    <div><br></div>
    <div><span style="background-color: transparent; font-size: 1rem;">If the button does not work, you can also copy this url to your browser to start the assessment.&nbsp;</span><br></div>
    <div><br></div>
    <div>{{link}}<br></div>`,
    status: '',
    module: 'ASSESSMENT',
    isPublic: false,
    departmentIds: []
  });

  constructor(
     private emailTemplatesService: EmailTemplatesService,
     private fb: FormBuilder, 
     private nzMessage: NzMessageService, 
     private router: Router, 
     private route: ActivatedRoute,
     private translate: TranslateService,
     private departmentsService: DepartmentsService,
     private errorService: ErrorHandlerService,
  ) { }

  ngOnInit(): void {
    this.getDepartments();
    this.route.params.subscribe((data) => {
      if(data.id){
        this.isUpdateMode = true;
        this.route.paramMap.pipe(
          switchMap((params) => {
            this.selectedId = Number(params.get('id'));
            return this.emailTemplatesService.getOneEmailTemplate(this.selectedId);
          })
          // tslint:disable
        ).subscribe((data: any) => {
          this.emailTemplate = data.data.getEmailTemplate;
          this.emailForm.controls['name'].setValue(this.emailTemplate?.name);
          this.emailForm.controls['subject'].setValue(this.emailTemplate?.subject);
          this.emailForm.controls['body'].setValue(this.emailTemplate?.body);
          this.emailForm.controls['status'].setValue(this.emailTemplate?.status);
          this.emailForm.controls['module'].setValue(this.emailTemplate?.module);
          this.emailForm.controls['isPublic'].setValue(this.emailTemplate?.isPublic);
          this.emailForm.controls['departmentIds'].setValue(this.emailTemplate?.departments.map((dep: any) => dep.id));
          this.selectedDepartments = this.emailTemplate?.departments.map((dep: any) => dep.id);
        });
      }
    });
  }

  getDepartments(): void {
    this.departmentsService
      .departments(this.departmentsRequestOptions)
      .pipe()
      .subscribe(
        ({ data }: any) => {
          this.listOfDepartments = data.departments.edges.map((department: any) => Convert.toDepartment(department.node));
        },
        (err) => this.errorService.handleError(err, { prefix: 'Unable to load departments' })
      );
  }

  selectDepartments(event: any){
    this.selectedDepartments = event;
  }

  templateHasDepartment(departmentId: number): boolean {
    if(this.isUpdateMode && this.emailTemplate !== undefined){
      const department = this.emailTemplate?.departments?.filter((department: any) => department.id === departmentId); 
      return department.length > 0;
    }
    return false;
  }

  onFormSubmit(){
    this.emailForm.controls['departmentIds'].setValue(this.selectedDepartments);
    this.emailTemplatesService.createEmailTemplate(this.emailForm.value).subscribe(() => {
      this.emailForm.reset();
      const message$ = this.translate.get('emailTemplates.created').subscribe((message) => {
        this.nzMessage.success(message, { nzDuration: 3000 });
      });
      message$.unsubscribe();
      this.router.navigate(['/mhira/administration/email-templates'])
    },
    (err) => {
      this.nzMessage.error(`${err}`, { nzDuration: 3000 });
    })
  }

  onFormUpdateSubmit(){
    this.emailForm.controls['departmentIds'].setValue(this.selectedDepartments);
    this.emailTemplatesService.updateEmailTemplate({id: this.selectedId, ...this.emailForm.value}).subscribe(() => {
      this.emailForm.reset();
      const message$ = this.translate.get('emailTemplates.updated').subscribe((message) => {
        this.nzMessage.success(message, { nzDuration: 3000 });
      });
      message$.unsubscribe();
      this.router.navigate(['/mhira/administration/email-templates']);
    },
    (err) => {
      this.nzMessage.error(`${err}`, { nzDuration: 3000 });
    })
  }
}
