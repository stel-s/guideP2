import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { NgForm } from '@angular/forms';

import { User } from '../providers/providers';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { JwtHelper } from "angular2-jwt";

export class Login {

  constructor(
    public username: string,
    public password: string,
  ) { }

}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
  name: string;
  model = new Login('', '');
  token: string;
  jwtHelper = new JwtHelper();

  constructor(public router: Router, public user: User,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
 
  ) {
    this.toastr.setRootViewContainerRef(vcr);
   
  }

  ngOnInit() {
  }

  onLoggedin() {
    localStorage.setItem('isLoggedin', 'true');
  }

  showError(err) {
    this.toastr.error(err, 'Oops!');
  }


  showWarning() {
    this.toastr.warning('You are being warned.', 'Alert!');
  }

  login(form: NgForm) {
    console.log("forms", form.value);
    console.log(this.name, this.model)
    this.user.login(this.model)
    this.doLogin(this.model);
    


this.router.navigateByUrl('/login');

    // ...
  }

  doLogin(user: Login) {
    //let loading = this.loadingCtrl.create({content : "Logging in ,please wait..."});
    //loading.present();

    this.user.login(this.model).subscribe((resp: any) => {

      if (resp) {
        this.token = resp;
        console.log(this.jwtHelper.decodeToken(resp._body));
        this.user.token = resp._body;
        this.router.navigate(['/dashboard']);
        localStorage.setItem('isLoggedin', 'true');

        //localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
      }
      this.user.getProfile(this.token).subscribe( res => console.log(res))

      //    loading.dismissAll();
    }, (err: any) => {
      this.showError(err._body)
      //this.navCtrl.push(MainPage);
      // Unable to log in
      //   loading.dismissAll();
      //   let toast = this.toastCtrl.create({
      //     message: this.loginErrorString,
      //     duration: 3000,
      //     position: 'top'
      //   });
      //   toast.present();
    });
  }
}


