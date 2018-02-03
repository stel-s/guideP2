import {Component, OnInit, ViewContainerRef, ViewChild, Directive} from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import 'rxjs/add/operator/debounce';
import { FormsModule }   from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


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
    selector: 'search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})


export class SearchComponent {
    // productList: Product[];
    // onProductSelected: EventEmitter<Product>;
    // currentProduct: Product;
    results;
    pay;
    myForm: FormGroup;


    constructor(fb: FormBuilder, public customer: Customer) {
        this.myForm = fb.group({
            'search': [''],
        });
        
        this.myForm.valueChanges.subscribe(res => console.log(res))
    }

    ngOnInit() {

    }

    onSubmit(value: string): void {
        // let pay = Object.assign({}, value, this.what);
        // this.customer.createCustomer(pay)
        //     .subscribe((r) => console.log(r));
        console.log('you submitted value: ', value);
    }
}

