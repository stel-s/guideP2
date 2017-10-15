import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/publishLast';
import 'rxjs/add/operator/catch';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Router, NavigationEnd } from '@angular/router';

import {Observable, Subject} from 'rxjs'
import {Injectable} from '@angular/core';
import { URLSearchParams, Jsonp, RequestOptions} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Api} from '../api/api';

// import {IAccountInfo} from "../../interfaces/interfaces";

import {JwtHelper} from "angular2-jwt";



@Injectable()
export class Invoices {


    url: string = 'http://147.102.23.230:8086';

    constructor(public http: HttpClient, public api: Api, public router: Router) {

    }


    calculateAmounts(amount: number) {
        let seq = this.http.get(`http://147.102.23.230:8086/gocore/invoice/calculateAmounts/${amount}`).share();
        return seq;
    }


}
