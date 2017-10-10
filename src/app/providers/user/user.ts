import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/publishLast';
import 'rxjs/add/operator/catch';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Router, NavigationEnd } from '@angular/router';

import { Observable, Subject } from 'rxjs'
import { Injectable } from '@angular/core';
import { URLSearchParams, Jsonp, RequestOptions, Headers} from '@angular/http';
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
interface IUser {
  firstName?: string;
  lastName?: string;
}

@Injectable()
export class User {
  url: string = 'http://147.102.23.230:8086';
  _user: IUser;
  profile: any;
  token: string;
  jwtHelper = new JwtHelper();
  currentUser: Subject<IUser> = new BehaviorSubject<User>(null);

  constructor(public http: HttpClient, public api: Api, public router: Router) {
      this.token = localStorage.getItem('token');
  }
  public setCurrentUser(newUser:any): void {
      this.currentUser.next(newUser);
  }


  search(term: string) {
    var search = new URLSearchParams()
    search.set('action', 'opensearch');
    search.set('search', term);
    search.set('format', 'json');
    // return this.http
    //   .get('http://en.wikipedia.org/w/api.php?callback=JSONP_CALLBACK', {search})
    //   .map((response) => response.json()[1]);
  }

  get firstName() {
    return this._user.firstName;
  }S

  isAvailable(term: string) {
    let USERNAME = term;
    //var search = new URLSearchParams()


    let seq = this.api.get(`gocore/user/isAvailable/email/${USERNAME}`)
        .map((res:any) => res)


      // .subscribe(res => {
      //   console.log(res);
      //   // If the API returned a successful response, mark the user as logged in
      //   if (res.status == 'success') {
      //
      //   } else {
      //   }
      // }, err => {
      //   console.error('ERROR', err);
      // });

    return seq;
  }

  isAFMAvailable(term: string) {
    //var search = new URLSearchParams()


    let seq = this.api.get(`gocore/user/isAvailable/vat/${term}`).publishReplay(1)
                                   .refCount();

    // seq
    //   .map(res => res.json())
    //   .subscribe(res => {
    //     console.log(res);
    //     // If the API returned a successful response, mark the user as logged in
    //     if (res.status == 'success') {
    //
    //     } else {
    //     }
    //   }, err => {
    //     console.error('ERROR', err);
    //   });

    return seq;
  }

  isAMKAAvailable(term: string) {

    //var search = new URLSearchParams()


    let seq = this.api.get(`gocore/user/isAvailable/ssn/${term}`).share();



    return seq;
  }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
     var firstHeaders = new Headers();
    firstHeaders.append('Content-Type', 'text/html');
    let options = new RequestOptions({ headers: firstHeaders });
      // let headers = new HttpHeaders();
      //  let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
      //    
        let seq =  this.http.post(this.url + '/gocore/authenticate', accountInfo, { responseType: 'text' });
    // let seq = this.api.post('gocore/authenticate', accountInfo , options).share();

    seq
      .map(res => res)
      .subscribe((res:any) => {
        if (res) {
            console.error('response',res);
            this.authSuccess(res);
            this.token = res;
            // this.getProfile().subscribe(res => this.profile = res.json());
            // localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
        }
        // If the API returned a successful response, mark the user as logged in
        // if (res.status == 'success') {
        //   this._loggedIn(res);
        // } else {
        // }
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }
  getToken() {
    return {  headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)}
  }
  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo) {
    let seq = this.api.post('gocore/user/create/guide', accountInfo).share();
    //
    // seq
    //   .map(res => res)
    //   .subscribe(res => {
    //     // If the API returned a successful response, mark the user as logged in
    //     if (res.status == 'success') {
    //       this._loggedIn(res);
    //     }
    //   }, err => {
    //     console.error('ERROR', err);
    //   });

    return seq;
  }

  getProfile() {

      if(this.profile) {
        this.currentUser.next(this.profile)
        return Observable.of(this.profile)
      }
      let seq = this.http.get(this.url + '/gocore/user/private/info', this.getToken());

    seq
      .map((res:any)=> res)
        .catch(e => {
            if (e.status === 401) {
                return Observable.throw('Unauthorized');
            }
            // do any other checking for statuses here
        })
      .subscribe(res => {
          if(res) {
            this.profile = res;
            this.currentUser.next(this.profile)
          }
      });

   return seq.map((res:any) => res);
  }


  updateProfile(profile: any) {
      console.log(profile)
      let options = new RequestOptions();
      let myHeaders = new Headers();
      myHeaders.append('Authorization', 'Bearer ' + this.token );
      myHeaders.get('Content-Type');
      options.headers = myHeaders;


      let seq = this.api.post(this.url + '/gocore/user/update/guide', profile, this.getToken()).share();

    // seq
    //   .map(res => res)
    //   .subscribe(res => {
    //     // If the API returned a successful response, mark the user as logged in
    //   //   if (res.status == 'success') {
    //   //     this._loggedIn(res);
    //   //   }
    //   // }, err => {
    //   //   console.error('ERROR', err);
    //   });

    return seq;
  }

  updateAvatar(avatar) {
    let options = new RequestOptions();
    let myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + this.token );
    myHeaders.get('Content-Type');
    options.headers = myHeaders;
    let req = { "contentType": "image/png","fileData": avatar};
    let seq = this.http.post(this.url + '/gocore/user/upload/avatar', req , this.getToken()).share();



    return seq;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp.user;
  }

  authSuccess(token) {
    // this.error = null;
    console.log(token);
    localStorage.setItem('token', token);
    this.token = token;
    this._user = this.jwtHelper.decodeToken(token);
    localStorage.setItem('profile', this._user.toString());
  }
}
