import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatComponent } from './stat.component';
import { NavigationEnd, RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,

    ],
    declarations: [StatComponent],
    exports: [StatComponent]
})
export class StatModule { }
