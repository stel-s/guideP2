import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import { Router, NavigationEnd } from '@angular/router';

@Injectable()
export class NoopInterceptor implements HttpInterceptor {
    token:string;
    constructor(public router: Router) {
        this.token = localStorage.getItem('token');
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(req);
        const changedReq = req.clone({headers: req.headers.set('Authorization',  'Bearer ' + this.token)});
        return next.handle(req).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                // do stuff with response if you want
            }
            }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                // redirect to the login route
                // or show a modal
                  this.router.navigate(['/login']);
                }
            }
            });
        }
    //     return next.handle(req);
    // }
}
