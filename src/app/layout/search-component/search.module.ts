import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { MdButtonModule, MdCheckboxModule } from '@angular/material';
// Import your AvatarModule
import { AvatarModule } from 'ngx-avatar';
///
import {
    MdAutocompleteModule,
}from '@angular/material'
@NgModule({
  imports: [
      MdButtonModule,
      MdCheckboxModule,
      CommonModule,
      SearchRoutingModule,
      FileUploadModule,
      FormsModule,
      TranslateModule,
      ReactiveFormsModule,
      // Specify AvatarModule as an import
      AvatarModule,
      MdAutocompleteModule
  ],
  declarations: [SearchComponent],
    exports:[SearchComponent]
})
export class SearchModule { }
