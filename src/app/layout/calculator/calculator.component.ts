import {Component, OnInit, ViewContainerRef, ViewChild, Directive} from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule }   from '@angular/forms';

import { NgForm } from '@angular/forms';

////Providers/////
import { User } from '../../providers/providers';
import { Invoices } from '../../providers/providers';

//////END///////

let calcs = {
    "netAmount": 100.55,
    "grossAmount": 119.7,
    "employeeInsuranceAmount": 19.15,
    "employerInsuranceAmount": 30,
    "paidAmount": 149.7
}

@Component({
    selector: 'calculator',
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.scss']
})


export class CalculatorComponent implements OnInit {
    @ViewChild('fileInput') fileInput;
    profile = {
        guideNumber: "152651186",
        amka: "125828069",
        vatNumber: "125828069",
        amIKA: "125828069",
        firstName: "Spyros1",
        lastName: "Kollias1",
        username: "spykoaaaaa",
        street: "kapou",
        streetNumber: "27",
        telephone: "6977125252",
        municipality: "Dafni",
        postcode:"17445"
    }



    model = {
        grossAmount: 0,
        employeeInsuranceAmount: 0,
        employerInsuranceAmount: 0,
        paidAmount: 0
    }


    constructor(public user: User,  public router: Router, public invoices: Invoices) {



    }


    ngOnInit(): void {

    }
    onSubmit(f: NgForm) {
        console.log(f.value.first);
        this.invoices.calculateAmounts(parseInt(f.value.first))
            .subscribe((res:any) => {
                this.model = res;

            });
    }

}

