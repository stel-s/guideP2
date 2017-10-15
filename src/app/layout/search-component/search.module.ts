import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
// Import your AvatarModule
import { AvatarModule } from 'ngx-avatar';
///
import {
    MatAutocompleteModule,
}from '@angular/material'
@NgModule({
  imports: [
      MatButtonModule,
      MatCheckboxModule,
      CommonModule,
      SearchRoutingModule,
      FileUploadModule,
      FormsModule,
      TranslateModule,
      ReactiveFormsModule,
      // Specify AvatarModule as an import
      AvatarModule,
      MatAutocompleteModule
  ],
  declarations: [SearchComponent],
    exports:[SearchComponent]
})
export class SearchModule { }
