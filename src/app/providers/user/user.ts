import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

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
  token: string;
  jwtHelper = new JwtHelper();

  constructor(public http: Http, public api: Api) {
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


    let seq = this.api.get(`gocore/user/isAvailable/vat/${term}`).share();

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
        if(res){

          console.log(this.jwtHelper.decodeToken(res._body));
          this.authSuccess(res._body);
          this.token = res._body;
          this.getProfile(this.token).subscribe(res => console.log(res));
          //localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

        }
        console.log(res)
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

  getProfile(token) {
    let headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
    let options = new RequestOptions();
    let seq = this.api.get('gocore/user/private/info', '', options).share();

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

  updateProfile(profile: IUserProfile) {
    let headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
    let options = new RequestOptions();
    
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
    // let headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
    // let options = new RequestOptions();

    let headers = new Headers();
    let requestOptions = new RequestOptions({ headers: headers });

    headers.append('Authorization', 'Bearer ' + this.token);  
    let req = { "contentType": "image/png","fileData": avatar};
    let seq = this.api.post('gocore/user/upload/avatar', req , requestOptions).share();

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
