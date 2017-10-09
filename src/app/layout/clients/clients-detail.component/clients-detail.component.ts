import {Component, OnInit, ViewContainerRef, ViewChild, Directive, ElementRef} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

import 'rxjs/add/operator/switchMap';
////Providers/////
import { User } from '../../../providers/providers';
import { Customer } from '../../../providers/providers';

//////END///////

import { ICustomer} from '../../../models/Customer'
interface Pet {
    name: string;
    type: string;
    age: number;
}
@Component({
    selector: 'clients-detail',
    templateUrl: './client-detail.component.html',
    styleUrls: ['./client-detail.component.scss']
})


export class ClientsDetailComponent implements  OnInit {

    constructor(
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        // this.route.paramMap
        //     .switchMap((params: ParamMap) => this.heroService.getHero(+params.get('id')))
        //     .subscribe(hero => this.hero = hero);
    }
}
