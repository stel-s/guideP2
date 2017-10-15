import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import {CdkTableModule} from '@angular/cdk/table';
import {MatTableModule} from '@angular/material';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import { ClientsDetailComponent } from './clients-detail.component/clients-detail.component';
import { NewClientComponent } from '../new-client/new-client.component';
import { NewClientModule } from '../new-client/new-client.module';

import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatSliderModule,
    MatSlideToggleModule,
} from '@angular/material';
// Import your AvatarModule
import { AvatarModule } from 'ngx-avatar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchModule } from '../search-component/search.module'
@NgModule({
  imports: [
      MatSliderModule,
      MatSlideToggleModule,
      MatAutocompleteModule,
      MatButtonModule,
      MatCheckboxModule,
      CommonModule,
      ClientsRoutingModule,
      FileUploadModule,
      FormsModule,
      TranslateModule,
      ReactiveFormsModule,
      // Specify AvatarModule as an import
      AvatarModule,
      MatSelectModule,
      CdkTableModule,
      MatTableModule,
      MatMenuModule,
      NgbModule.forRoot(),
      SearchModule,
      NewClientModule
  ],
  entryComponents: [ NewClientComponent ],


  declarations: [ClientsComponent,ClientsDetailComponent]
})
export class ClientsModule { }
