import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/publishLast';
import 'rxjs/add/operator/catch';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Router, NavigationEnd } from '@angular/router';

import {Observable, Subject} from 'rxjs'
import {Injectable} from '@angular/core';
import {Http, URLSearchParams, Jsonp, RequestOptions, Headers} from '@angular/http';

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

    constructor(public http: Http, public api: Api, public router: Router) {
        this.token = localStorage.getItem('token');
    }
    public setCurrentUser(newUser:any): void {
        this.currentUser.next(newUser);
    }


    createCustomer(customer) {
        console.log(customer)
        let options = new RequestOptions();
        let myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + this.token );
        myHeaders.get('Content-Type');
        options.headers = myHeaders;


        let seq = this.api.post('gocore/customer/createOrUpdate', customer, options).share();
        return seq;
    }

    getAll() {

        let options = new RequestOptions();
        let myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + this.token );
        myHeaders.get('Content-Type');
        options.headers = myHeaders;


        let seq = this.api.get('gocore/customer/list/0/0', '', options).map(res => res.json());
        return seq;
    }

}
