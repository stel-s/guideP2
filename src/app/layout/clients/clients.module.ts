import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import {CdkTableModule} from '@angular/cdk/table';
import {MdTableModule} from '@angular/material';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { MdButtonModule, MdCheckboxModule,     MdMenuModule,       MdSelectModule} from '@angular/material';
// Import your AvatarModule
import { AvatarModule } from 'ngx-avatar';

@NgModule({
  imports: [MdButtonModule,
      MdCheckboxModule,
      CommonModule,
      ClientsRoutingModule,
      FileUploadModule,
      FormsModule,
      TranslateModule,
      ReactiveFormsModule,
      // Specify AvatarModule as an import
      AvatarModule,
      MdSelectModule,
      CdkTableModule,
      MdTableModule,
      MdMenuModule,


  ],
  declarations: [ClientsComponent]
})
export class ClientsModule { }
