import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { AvatarModule } from 'ngx-avatar';
import { ChartModule } from 'angular2-highcharts';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent, SidebarComponent } from '../shared';
import { NewClientComponent } from './new-client/new-client.component';
declare var require : any;

export function highchartsFactory() {
    const highcharts = require('highcharts');
    const highChartsMore = require('highcharts/highcharts-more');
    const solidGauge = require('highcharts/modules/solid-gauge');
    ChartModule.forRoot(require('highcharts'),
        require('highcharts/highcharts-more'),
        require('highcharts/modules/solid-gauge'));
    return highcharts;
}
@NgModule({
    imports: [
        CommonModule,
        NgbDropdownModule.forRoot(),
        LayoutRoutingModule,
        TranslateModule,
        AvatarModule,
        ChartModule
    ],
    declarations: [
        LayoutComponent,
        HeaderComponent,
        SidebarComponent,
    ]
})
export class LayoutModule { }
