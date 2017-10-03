import {Component, OnInit, ViewContainerRef, ViewChild, Directive} from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule }   from '@angular/forms';

import { NgForm } from '@angular/forms';

////Providers/////
import { User } from '../../providers/providers';
//////END///////


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
    hero = {name: 'Dr.'};
    heroForm: FormGroup;
    vatNumber;
    model = {
        ika: 0,
        poso: 0,
        pliroteo: 0,
    }
    constructor(public user: User,  public router: Router,) {



    }


    ngOnInit(): void {

    }
    onSubmit(f: NgForm) {
        console.log(f.value.first);
        this.model.ika = parseInt(f.value.first ) / 5;
        console.log(f.value);  // { first: '', last: '' }
        console.log(f.valid);  // false
    }

}

