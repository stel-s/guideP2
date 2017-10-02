import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


import { NewClientRoutingModule } from './new-client-routing.module';
import { NewClientComponent } from './new-client.component';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { MdButtonModule, MdCheckboxModule } from '@angular/material';
import { ForbiddenValidatorDirective } from './forbidden-name.directive';
// Import your AvatarModule
import { AvatarModule } from 'ngx-avatar';

@NgModule({
  imports: [MdButtonModule,
      MdCheckboxModule,
      CommonModule,
      NewClientRoutingModule,
      FileUploadModule,
      FormsModule,
      TranslateModule,
      ReactiveFormsModule,
      // Specify AvatarModule as an import
      AvatarModule
  ],
  declarations: [NewClientComponent,ForbiddenValidatorDirective]
})
export class NewClientModule { }
