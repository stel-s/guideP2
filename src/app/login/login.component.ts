import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';

import { User } from '../providers/providers';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import * as firebase from 'firebase';
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

  constructor(public afAuth: AngularFireAuth, public router: Router, public user: User,
    public toastr: ToastsManager,
    vcr: ViewContainerRef

  ) {
    this.toastr.setRootViewContainerRef(vcr)
      afAuth.authState;
      firebase.initializeApp({apiKey: "AIzaSyC6RyUM5qmMgspMQeARqJzNbZwDF6-UHXA",
          authDomain: "anelixis-4af61.firebaseapp.com",
          databaseURL: "https://anelixis-4af61.firebaseio.com",
          projectId: "anelixis-4af61",
          storageBucket: "anelixis-4af61.appspot.com",
          messagingSenderId: "862108583603"})

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

    login(f) {
      var self = this;
      let email,password
        email = "stelios@gmail.com";
            password = "password";

        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(error)

            // ...
        });
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                self.router.navigate(['/dashboard']);


                localStorage.setItem('isLoggedin', 'true');
            } else {
                // No user is signed in.
            }
        });

        // firebase.auth().createUserWithEmailAndPassword(email = "stelios@gmail.com", password = "password").catch(function(error) {
        //     // Handle Errors here.
        //     var errorCode = error.code;
        //     var errorMessage = error.message;
        //     console.log(error)
        //
        // });
        // this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

  doLogin(user: Login) {
    //let loading = this.loadingCtrl.create({content : "Logging in ,please wait..."});
    //loading.present();

    this.user.login(this.model).subscribe((resp: any) => {

      if (resp) {
        this.token = resp;
        this.user.token = resp._body;
        this.router.navigate(['/dashboard']);
        localStorage.setItem('isLoggedin', 'true');

        //localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
      }

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


