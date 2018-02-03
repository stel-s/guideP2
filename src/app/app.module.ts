import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {MATERIAL_COMPATIBILITY_MODE} from '@angular/material';
// import { reducers } from './state-management/main-reducer';
// import { reducer } from "./app.reducers";
import { ChartModule } from 'angular2-highcharts';
import * as highcharts from 'highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { StoreModule } from '@ngrx/store';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { AvatarModule } from 'ngx-avatar';

////
import { Settings } from './providers/providers';
import { User } from './providers/providers';
import { Invoices } from './providers/providers';

import { Customer } from './providers/providers';
import { Api } from './providers/providers';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { UsernameValidator } from './validators/userNameValidator'
import { CommonModule } from '@angular/common';

import {CdkTableModule} from '@angular/cdk/table';
import { NoopInterceptor } from './interceptors/NoopInterceptor'
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import { SharedModule } from "./shared/shared.module";

declare var require: any;


export function highchartsFactory() {
//return require('highcharts');
    const hc = require('highcharts');
    const dd = require('highcharts/modules/drilldown');
    const ex = require('highcharts/modules/exporting');
    const st = require('highcharts/modules/stock');

    dd(hc);
    ex(hc);
    st(hc);
    return hc;
}
@NgModule({
    exports: [
        SharedModule,
        CdkTableModule,

    ],
    declarations: []
})
export class PlunkerMaterialModule {}

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
    // for development
    // return new TranslateHttpLoader(http, '/start-angular/SB-Admin-BS4-Angular-4/master/dist/assets/i18n/', '.json');
    return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [

        CommonModule,
        AvatarModule,
        PlunkerMaterialModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ToastModule.forRoot(),
        BrowserModule,
        ChartModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [Http]
            }
        }),
        // StoreModule.provideStore(reducer),
    ],
    providers: [AuthGuard,
        {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true},
          Api,

        {
            provide: HighchartsStatic,
            useFactory: highchartsFactory
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NoopInterceptor,
            multi: true,
        },
            User,
            Customer,
            Invoices,
            UsernameValidator,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
