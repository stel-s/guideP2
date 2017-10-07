import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms'
import { NgForm } from '@angular/forms';

import { routerTransition } from '../router.animations';
import { UsernameValidator } from '../validators/userNameValidator';
import { JwtHelper } from "angular2-jwt";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { User } from '../providers/providers';

export class NewUser {

    constructor(
        public email: string,
        public fullName: string,

    ) {  }

}

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
    model2 = new NewUser("","");
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
        isAvailable: true,
        emailError: true,
    }

    constructor(
        public userNameValidator: UsernameValidator,
        public toastr: ToastsManager,
        vcr: ViewContainerRef,
        public user: User,
    ) {
        this.toastr.setRootViewContainerRef(vcr);
        // this.signUp.valueChanges.subscribe((res) => {
        //     console.log(res);
        // })
    }

    ngOnInit() {

    }

    ngOnChanges(changes){
        console.log(changes)
    }

    doSomething(value){
        console.log("Sds")
        this.user.isAvailable(value)
            .subscribe((res) => {
                console.log(res)
                // this.model.emailError = true;
                this.model.isAvailable = res;
            })



    }

    showSuccess() {
        this.toastr.success('You are awesome!', 'Success!');
    }

    doSignup(signupForm) {
        console.log("forms1", signupForm.value);
        console.log("forms2", this.model);
        let payload = Object.assign({}, this.model);
        delete payload.confpassword;
        let firstName = payload.fullname.split(' ')[0]
        let lastName = payload.fullname.split(' ')[1]
        delete payload.fullname;
            payload.firstName = firstName;
            payload.lastName = lastName;
        const picked = (({ firstName, lastName, password, email }) => ({ firstName, lastName, password, email }))(payload);
        this.user.signup(picked).subscribe((resp) => {
            this.toastr.success('Perfect', 'All ok');
        }, (err) => {
            // Unable to sign up
            this.toastr.error(err, 'Oops!');
        });
    }
}
