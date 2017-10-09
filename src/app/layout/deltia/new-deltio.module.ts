import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


import { NewDeltioRoutingModule } from './new-deltio-routing.module';
import { NewDeltioComponent } from './new-deltio.component';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { MdButtonModule, MdCheckboxModule } from '@angular/material';
// Import your AvatarModule
import { AvatarModule } from 'ngx-avatar';
import { BsComponentModule } from '../bs-component/bs-component.module'

///
import {
    MdAutocompleteModule,
}from '@angular/material'
@NgModule({
  imports: [
      MdButtonModule,
      MdCheckboxModule,
      CommonModule,
      NewDeltioRoutingModule,
      FileUploadModule,
      FormsModule,
      TranslateModule,
      ReactiveFormsModule,
      // Specify AvatarModule as an import
      AvatarModule,
      MdAutocompleteModule,
      BsComponentModule
  ],
  declarations: [NewDeltioComponent]
})
export class NewDeltioModule { }
