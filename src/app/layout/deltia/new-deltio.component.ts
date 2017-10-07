import {Component, OnInit, ViewContainerRef, ViewChild, Directive} from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import 'rxjs/add/operator/debounce';
import { FormsModule }   from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
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
    selector: 'new-deltio',
    templateUrl: './new-deltio.component.html',
    styleUrls: ['./new-deltio.component.scss']
})


export class NewDeltioComponent implements OnInit {
    myForm: FormGroup;
    model: IClient = {
        vatNumber: '',
        companyName: ''
    };

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
    };

    constructor(fb: FormBuilder, public customer: Customer) {
        this.myForm = fb.group({
            'companyName': [''],
            'companyTitle': [''],
            'contactName': ['α'],
            'vatNumber': ['0'],
            'profession': [''],
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

