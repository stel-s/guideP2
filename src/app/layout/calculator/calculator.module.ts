import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


import { CalculatorRoutingModule } from './calculator-routing.module';
import { CalculatorComponent } from './calculator.component';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { ForbiddenValidatorDirective } from './forbidden-name.directive';
// Import your AvatarModule
import { AvatarModule } from 'ngx-avatar';
import { BsComponentModule } from '../bs-component/bs-component.module'

@NgModule({
  imports: [MatButtonModule,
      MatCheckboxModule,
      CommonModule,
      CalculatorRoutingModule,
      FileUploadModule,
      FormsModule,
      TranslateModule,
      ReactiveFormsModule,
      // Specify AvatarModule as an import
      AvatarModule,
      BsComponentModule,

  ],
  declarations: [CalculatorComponent,ForbiddenValidatorDirective]
})
export class CalculatorModule { }
