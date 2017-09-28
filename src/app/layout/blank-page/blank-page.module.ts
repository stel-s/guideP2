import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlankPageRoutingModule } from './blank-page-routing.module';
import { BlankPageComponent } from './blank-page.component';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    BlankPageRoutingModule,
      FileUploadModule
  ],
  declarations: [BlankPageComponent]
})
export class BlankPageModule { }
