import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/publishLast';
import 'rxjs/add/operator/catch';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import {  Observable } from 'rxjs'
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
interface IUser {
  firstName?: string;
  lastName?: string;
}
/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class User implements  IUser{
  _user: IUser;
  profile: any;
  token: string;
  jwtHelper = new JwtHelper();
   x = new BehaviorSubject<string>(null);

  constructor(public http: Http, public api: Api) {
      this.token = localStorage.getItem('token');
  }
  

  search(term: string) {
    var search = new URLSearchParams()
    search.set('action', 'opensearch');
    search.set('search', term);
    search.set('format', 'json');
    return this.http
      .get('http://en.wikipedia.org/w/api.php?callback=JSONP_CALLBACK', {search})
      .map((response) => response.json()[1]);
  }

  get firstName() {
    return this._user.firstName;
  }S

  isAvailable(term: string) {
    let USERNAME = term;
    //var search = new URLSearchParams()


    let seq = this.api.get(`gocore/user/isAvailable/email/${USERNAME}`).share();

    seq
      .map(res => res.json())
      .subscribe(res => {
        console.log(res);
        // If the API returned a successful response, mark the user as logged in
        if (res.status == 'success') {

        } else {
        }
      }, err => {
        console.error('ERROR', err);
      });

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

    seq
      .map(res => res.json())
      .subscribe(res => {
        console.log(res);
        // If the API returned a successful response, mark the user as logged in
        if (res.status == 'success') {

        } else {
        }
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    let seq = this.api.post('gocore/authenticate', accountInfo).share();

    seq
      .map(res => res)
      .subscribe((res:any) => {
        if (res) {
            this.authSuccess(res._body);
            this.token = res._body;
            // this.getProfile().subscribe(res => this.profile = res.json());
            //localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
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

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo) {
    let seq = this.api.post('gocore/user/create/guide', accountInfo).share();

    seq
      .map(res => res.json())
      .subscribe(res => {
        // If the API returned a successful response, mark the user as logged in
        if (res.status == 'success') {
          this._loggedIn(res);
        }
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }

  getProfile() {

      let options = new RequestOptions();
      let myHeaders = new Headers();
      myHeaders.append('Authorization', 'Bearer ' + this.token );
      myHeaders.get('Content-Type')

      options.headers = myHeaders;


      // should return 'text/xml'
      // fetch('https://147.102.23.230:8449/gocore/user/private/info', {
      //     method: 'get',
      //     headers: {
      //         'Authorization': 'Bearer '+ this.token,
      //         'Content-Type': 'application/json'
      //     }
      // }).then((res)=>console.log(res.json()));
    let seq = this.api.get('gocore/user/private/info', '',  options).take(1).share();



    seq
      .map((res:any)=> JSON.parse(res._body))
        .catch(e => {
            if (e.status === 401) {
                return Observable.throw('Unauthorized');
            }
            // do any other checking for statuses here
        })
      .subscribe(res => {
        console.log("res,", res)
        if(res) {
          this.profile = res;
          this.x.next(this.profile)
        }
        
        // If the API returned a successful response, mark the user as logged in
        if (res.status == 'success') {
          this._loggedIn(res);
        }
      }, err => {
        if (err.statusText === 'Unauthorized') {
                      console.error('Unauthorized', err);
               }
        console.error('ERROR', err);
      });

    return seq;
  }

  updateProfile(profile: any) {
      let options = new RequestOptions();
      let myHeaders = new Headers();
      myHeaders.append('Authorization', 'Bearer ' + this.token );
      myHeaders.get('Content-Type');
      options.headers = myHeaders;

     
      let seq = this.api.post('gocore/user/update/guide', profile, options).share();

    seq
      .map(res => res.json())
      .subscribe(res => {
        // If the API returned a successful response, mark the user as logged in
        if (res.status == 'success') {
          this._loggedIn(res);
        }
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }

  updateAvatar(avatar) {
    let options = new RequestOptions();
    let myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + this.token );
    myHeaders.get('Content-Type');
    options.headers = myHeaders;
    let req = { "contentType": "image/png","fileData": avatar};
    let seq = this.api.post('gocore/user/upload/avatar', req , options).share();
   
    seq
      .map(res => res.json())
      .subscribe(res => {
         this.getProfile();
        // If the API returned a successful response, mark the user as logged in
        if (res.status == 'success') {
          this._loggedIn(res);
        }
      }, err => {
        console.error('ERROR', err);
      });

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
    this._user = this.jwtHelper.decodeToken(token);
    localStorage.setItem('profile', this._user.toString());
  }
}
