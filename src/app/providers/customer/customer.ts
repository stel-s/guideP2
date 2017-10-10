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

interface IUserProfile {
    "password": "Y81gfTYhzdWu8Suqu63KysteSmxAVlxZTYPglJGnHbYnTqlwgb9Ly9vSkgpFl7fd1ziDBCxlBSzpL9Inc36Qmw==",
    "email": "kollias1@fsu.gr",
    "guideNumber": "152651186",
    "vatNumber": "12345678229",
    "amka": "22222112",
    "amIKA": "12313323123",
    "streetNumber": "27",
    "postcode": "17445",
    "telephone": "6977125252",
    "street": "kapou",
    "municipality": "Dafni",
    "lastName": "Kollias21",
    "firstName": "Spyros1",
    "uuid": "41926a70-2ccb-438f-b8f3-d7552d0b98ce",
    "username": "kollias1@fsu.gr",
    "ableToInsertInvoices": true
}
interface ICustomer {
    firstName?: string;
    lastName?: string;
}

@Injectable()
export class Customer {
    _user: ICustomer;
    profile: any;
    token: string;
    jwtHelper = new JwtHelper();
    currentUser: Subject<ICustomer> = new BehaviorSubject<ICustomer>(null);
    url: string = 'http://147.102.23.230:8086';

    constructor(public http: HttpClient, public api: Api, public router: Router) {
        this.token = localStorage.getItem('token');
    }
    public setCurrentUser(newUser:any): void {
        this.currentUser.next(newUser);
    }

    createCustomer(customer) {
        console.log(customer)
        let seq = this.api.post('/gocore/customer/createOrUpdate', customer, this.getToken()).share();
        return seq;
    }
     getToken() {
        return {  headers: new HttpHeaders().set('Authorization', 'Bearer ' +   localStorage.getItem('token'))}
    }
    deleteCustomer(uuid) {
        let seq = this.http.post(`gocore/customer/delete/${uuid}`,{}).share();
        return seq;
    }

    getAll() {
        let seq = this.http.get(this.url + '/gocore/customer/list/0/0', this.getToken()).map(res => res);
        return seq;
    }

}
