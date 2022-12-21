import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { EmailTemplatesService } from '../@services/email-templates.service';
import { switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-email-template',
  templateUrl: './create-email-template.component.html',
  styleUrls: ['./create-email-template.component.scss']
})
export class CreateEmailTemplateComponent implements OnInit {

  selectedId: number = null;
  emailTemplate: any;
  customStyles = {height: '250px', width: '100%'}
  isUpdateMode: boolean = false;
  emailForm = this.fb.group({
    name: '',
    subject: '',
    body: '',
    status: null,
    module: ''
  })

  constructor(
     private emailTemplatesService: EmailTemplatesService,
     private fb: FormBuilder, 
     private nzMessage: NzMessageService, 
     private router: Router, 
     private route: ActivatedRoute,
     private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      if(data.id){
        this.isUpdateMode = true;
        this.route.paramMap.pipe(
          switchMap((params) => {
            this.selectedId = Number(params.get('id'));
            return this.emailTemplatesService.getAllEmailTemplates();
          })
        ).subscribe((data: any) => {
          this.emailTemplate = data.data.getAllEmailTemplates.edges.filter((template: any) => template.node.id === this.selectedId);
          this.emailForm.controls['name'].setValue(this.emailTemplate[0]?.node.name);
          this.emailForm.controls['subject'].setValue(this.emailTemplate[0]?.node.subject);
          this.emailForm.controls['body'].setValue(this.emailTemplate[0]?.node.body);
          this.emailForm.controls['status'].setValue(this.emailTemplate[0]?.node.status);
          this.emailForm.controls['module'].setValue(this.emailTemplate[0]?.node.module);
        });
      }
    });
  }

  onFormSubmit(){
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
    this.emailTemplatesService.updateEmailTemplate({id: this.selectedId, ...this.emailForm.value}).subscribe(() => {
      this.emailForm.reset();
      const message$ = this.translate.get('emailTemplates.updated').subscribe((message) => {
        this.nzMessage.success(message, { nzDuration: 3000 });
      });
      message$.unsubscribe();
      this.router.navigate(['/mhira/administration/email-templates'])
    },
    (err) => {
      this.nzMessage.error(`${err}`, { nzDuration: 3000 });
    })
  }
}
