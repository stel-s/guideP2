import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MdButtonModule, MdCheckboxModule} from '@angular/material';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        FormsModule,
        MdButtonModule
    ],
    declarations: [LoginComponent]
})
export class LoginModule {
}
