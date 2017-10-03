import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {
    MdAutocompleteModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdChipsModule,
    MdDatepickerModule,
    MdDialogModule,
    MdExpansionModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdNativeDateModule,
    MdPaginatorModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdRippleModule,
    MdSelectModule,
    MdSidenavModule,
    MdSliderModule,
    MdSlideToggleModule,
    MdSnackBarModule,
    MdSortModule,
    MdTableModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule,
    MdStepperModule,
} from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BlankPageRoutingModule } from './blank-page-routing.module';
import { BlankPageComponent } from './blank-page.component';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { ForbiddenValidatorDirective } from './forbidden-name.directive';
// Import your AvatarModule
import { AvatarModule } from 'ngx-avatar';
@NgModule({

  imports: [
      MdAutocompleteModule,
      MdButtonModule,
      MdButtonToggleModule,
      MdCardModule,
      MdCheckboxModule,
      MdChipsModule,
      MdStepperModule,
      MdDatepickerModule,
      MdDialogModule,
      MdExpansionModule,
      MdGridListModule,
      MdIconModule,
      MdInputModule,
      MdListModule,
      MdMenuModule,
      MdNativeDateModule,
      MdPaginatorModule,
      MdProgressBarModule,
      MdProgressSpinnerModule,
      MdRadioModule,
      MdRippleModule,
      MdSelectModule,
      MdSidenavModule,
      MdSliderModule,
      MdSlideToggleModule,
      MdSnackBarModule,
      MdSortModule,
      MdTableModule,
      MdTabsModule,
      MdToolbarModule,
      MdTooltipModule,
      CommonModule,
      BlankPageRoutingModule,
      FileUploadModule,
      FormsModule,
      TranslateModule,
      ReactiveFormsModule,
      // Specify AvatarModule as an import
      AvatarModule,
      NgbModule.forRoot(),
  ],
  declarations: [BlankPageComponent,ForbiddenValidatorDirective]
})
export class BlankPageModule { }
