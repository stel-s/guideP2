import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import {  RequestOptions, URLSearchParams,Headers } from '@angular/http';
import {HttpClientModule, HttpClient, HttpHeaders} from '@angular/common/http';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = 'http://147.102.23.230:8086';

  constructor(public http: HttpClient) {
  }

  get(endpoint: string, params?: any, options?: RequestOptions) {
    if (!options) {
      options = new RequestOptions();
    }
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      options = new RequestOptions({ headers: headers });
    // let headers = new HttpHeaders();
    //  let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
    //     let options = new RequestOptions({ headers: headers });
    // Support easy query params for GET requests
    // if (params) {
    //   let p = new URLSearchParams();
    //   for (let k in params) {
    //     p.set(k, params[k]);
    //   // Set the search field if we have params and don't already have
    //   // a search field set in options.
    //   options.search = !options.search && p || options.search;
    // }

      return this.http.get(this.url + '/' + endpoint);
  }

  post(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.post(this.url + '/' + endpoint, body);
  }

  put(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.url + '/' + endpoint, body);
  }

  delete(endpoint: string, options?: RequestOptions) {
    return this.http.delete(this.url + '/' + endpoint);
  }

  patch(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.url + '/' + endpoint, body);
  }
}
