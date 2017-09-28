import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { UsernameValidator } from  '../../validators/userNameValidator';
import {JwtHelper} from "angular2-jwt";


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
    private todo : FormGroup;
    public loading = false;

    jwtHelper = new JwtHelper();


    constructor(
        public userNameValidator: UsernameValidator,
        public toastCtrl: ToastController,
        public translateService: TranslateService,
        private formBuilder: FormBuilder,
    ) { }

    ngOnInit() { }
}
