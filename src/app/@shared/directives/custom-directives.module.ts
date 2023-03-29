import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DisableControlDirective} from './disabled-control-directive';

@NgModule({
  declarations: [DisableControlDirective],
  imports: [
    CommonModule
  ],
  exports: [DisableControlDirective]
})

export class CustomDirectivesModule { }
