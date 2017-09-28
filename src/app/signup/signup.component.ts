import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms'
import { NgForm } from '@angular/forms';

import { routerTransition } from '../router.animations';
import { UsernameValidator } from '../validators/userNameValidator';
import { JwtHelper } from "angular2-jwt";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { User } from '../providers/providers';



interface IAccountInfo {
    firstName: 'Test Human',
    email: 'test@example.com',
    password: 'test',
    "guideNumber": null,
};

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
    account: IAccountInfo = {
        firstName: 'Test Human',
        email: 'test@example.com',
        password: 'test',
        "guideNumber": null,
    };

    // Our translated text strings
    private signupErrorString: string;
    term = new FormControl();
    private todo: FormGroup;
    public loading = false;

    jwtHelper = new JwtHelper();

    model: any = {
        fullname: '',
        email: '',
        password: '',
        confpassword: '',
    }

    constructor(
        public userNameValidator: UsernameValidator,
        public toastr: ToastsManager,
        vcr: ViewContainerRef,
        public user: User,
    ) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        this.showSuccess();
    }

    showSuccess() {
        this.toastr.success('You are awesome!', 'Success!');
    }

    doSignup(signupForm) {
        console.log("forms1", signupForm.value);
        console.log("forms2", this.model);
        let payload = Object.assign({}, this.model);
        delete payload.confpassword;
        delete payload.fullname;
        this.model.firstName = "sdsds";
        this.model.lastName = "sdsds";
        this.user.signup(payload).subscribe((resp) => {
            this.toastr.success('Perfect', 'All ok');
        }, (err) => {
            // Unable to sign up
            this.toastr.error(err, 'Oops!');
        });
    }
}
