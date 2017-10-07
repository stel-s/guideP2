import {Component, OnInit, ViewContainerRef, ViewChild, Directive} from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import 'rxjs/add/operator/debounce';
import { FormsModule }   from '@angular/forms';

import { routerTransition } from '../../router.animations';
import { NgForm } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { JwtHelper } from "angular2-jwt";
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import * as uuid from 'uuid/v1'

////Providers/////
import { User } from '../../providers/providers';
import { Customer } from '../../providers/providers';

//////END///////

export class Profile {

    constructor(
        public username: string,
        public password: string,

    ) { }

}


interface IClient {
    companyName: string;
    vatNumber: string;
}
@Component({
    selector: 'new-client',
    templateUrl: './new-client.component.html',
    styleUrls: ['./new-client.component.scss']
})


export class NewClientComponent implements OnInit {
    myForm: FormGroup;
    model: IClient = {
        vatNumber: '',
        companyName: ''
    }
    what = {
        "companyName": "Travel Exchange",
        "companyTitle": "Travel Exchange",
        "contactName": "Λώρα 2",
        "vatNumber": "0283403928",
        "profession": "Travel Agent",
        "phoneNumber": "2108999999",
        "customerType": "TYPE_A",
        "notes": "Very Nice 2",
        "uuid" : uuid()
    }
    constructor(fb: FormBuilder, public customer: Customer) {
        this.myForm = fb.group({
            'companyName': ['Travel Exchange'],
            'companyTitle': ['Travel Exchange'],
            'contactName': ['Λώρα'],
            'vatNumber': ['0283403928'],
            'profession': ['Travel'],
            'notes': ['Very'],
        });
    }
    ngOnInit() {

    }

    onSubmit(value: string): void {
        let pay = Object.assign({}, value, this.what)
        this.customer.createCustomer(pay)
            .subscribe((r) => console.log(r))
        console.log('you submitted value: ', value);
    }
}

