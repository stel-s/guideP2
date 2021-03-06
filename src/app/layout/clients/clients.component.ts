import {Component, OnInit, ViewContainerRef, ViewChild, Directive, ElementRef} from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormBuilder,
    Validators
} from '@angular/forms';
import { Router } from '@angular/router';


import { NgForm } from '@angular/forms';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/skip';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

////Providers/////
import { User } from '../../providers/providers';
import { Customer } from '../../providers/providers';

//////END///////
import { NewClientComponent } from '../new-client/new-client.component';

import { ICustomer} from '../../models/Customer'
interface Pet {
    name: string;
    type: string;
    age: number;
}
@Component({
    selector: 'clients',
    templateUrl: './clients.component.html',
    styleUrls: ['./client.component.scss']
})


export class ClientsComponent implements  OnInit {
    searchField: FormControl;
    coolForm: FormGroup;
    selectedValue: string;
    closeResult: string;
    displayedColumns = ['userId', 'companyName','companyTitle','vatNumber', 'phoneNumber', 'color'];
    exampleDatabase = new ExampleDatabase();
    dataSource: any;
    customerList;
    @ViewChild('filter') filter: ElementRef;

    foods = [
        {value: 'steak-0', viewValue: 'AFM'},
        {value: 'pizza-1', viewValue: 'ονομα'},

    ];
    stateCtrl: FormControl;
    filteredStates: Observable<any[]>;

    states: any[] = [
        {
            name: 'Νικοσ Ππαπαδοποθ',
            afm: '2323232',
            // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
            flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
        },
        {
            name: 'stelios sdsd',
            afm: '39.14M',
            // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
            flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
        },
        {
            name: 'Κωστας IKE',
            population: '20.27M',
            // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
            flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
        }
    ];
    form = new FormControl();
    checked;
    selected;
    constructor(
                private modalService: NgbModal,
                private fb:FormBuilder,
                private customer: Customer,
                private user: User,

    ) {

        this.stateCtrl = new FormControl();
        this.filteredStates = this.stateCtrl.valueChanges
            .startWith(null)
            .map(state => state ? this.filterStates(state) : this.states.slice());

        this.searchField = new FormControl();
        this.coolForm = fb.group({search: this.searchField});

        this.searchField.valueChanges
            .debounceTime(400)
            .flatMap(term => {
                console.log(term)
                return this.user.isAMKAAvailable(term)
            })
            .subscribe((result) => {
                // this.result = result.artists.items
            });

    }

    filterStates(name: string) {
        return this.states.filter(state =>
        state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
    }
    dataSource2: PetDataSource;

    selectAll(event) {
        // console.log(event);
        // this.selected = true;
    }
    ngOnInit() {
        // this.dataSource = new PetDataSource(this.myPets);
        let init = true;

        this.form.valueChanges.skip(1)
            .subscribe((change) => {
                console.log(change);

            });
        this.checked = true;

        this.customer.getAll()
            .subscribe((res:any) => {
                this.states = res.restCustomerList.map((item) => {
                    return item
                })
                this.customerList =  this.states ;
                this.dataSource = new PetDataSource(this.states);
                Observable.fromEvent(this.filter.nativeElement, 'keyup')
                    .debounceTime(150)
                    .distinctUntilChanged()
                    .subscribe((res) => {
                    console.log(res)
                        if (!this.dataSource) { return; }
                        this.dataSource.filter = this.filter.nativeElement.value;
                    });
            })
    }

    onSubmit(f) {

    }

    open() {
        this.modalService.open(NewClientComponent).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }

    onSelect(row){
        this.customer.deleteCustomer(row.uuid).subscribe((res) => {
            this.customer.getAll()
                .subscribe((res:any) => {
                    this.states = res.restCustomerList.map((item) => {
                        return item
                    })
                    console.log(this.states)
                    this.customerList =  this.states ;
                    this.dataSource = new PetDataSource(this.states);

                })
        });
        console.log(row)
    }
}

/** Constants used to fill up our data base. */
const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
    'fuchsia', 'lime'];
const NAMES = ['Nikos Giannopoulos', 'Maksi Papadimitriou','Kostas Papadakis'];

export interface UserData {
    id: string;
    name: string;
    progress: string;
    color: string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleDatabase {
    /** Stream that emits whenever the data has been modified. */
    public dataChange: BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>([]);
    get data(): UserData[] { return this.dataChange.value; }

    constructor() {
        // Fill up the database with 100 users.
        for (let i = 0; i < 5; i++) { this.addUser(); }
    }

    /** Adds a new user to the database. */
    addUser() {
        const copiedData = this.data.slice();
        copiedData.push(this.createNewUser());
        this.dataChange.next(copiedData);
    }

    /** Builds and returns a new User. */
    private createNewUser() {
        const name =
            NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
            NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

        return {
            id: (this.data.length + 1).toString(),
            name: name,
            progress: Math.round(Math.random() * 100).toString(),
            color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
        };
    }


}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class ExampleDataSource extends DataSource<any> {
    _filterChange = new BehaviorSubject('');
    get filter(): string { return this._filterChange.value; }
    set filter(filter: string) { this._filterChange.next(filter); }

    constructor(private _exampleDatabase: ExampleDatabase) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<UserData[]> {
        const displayDataChanges = [
            this._exampleDatabase.dataChange,
            this._filterChange,
        ];

        ;return Observable.merge(...displayDataChanges).map(() => {
            return this._exampleDatabase.data.slice().filter((item: UserData) => {
                let searchStr = (item.name + item.color).toLowerCase();
                return searchStr.indexOf(this.filter.toLowerCase()) != -1;
            });
        })
    }

    disconnect() {}
}

export class PetDataSource extends DataSource<Pet> {
    _filterChange = new BehaviorSubject('');
    get filter(): string { return this._filterChange.value; }
    set filter(filter: string) { this._filterChange.next(filter); }

    constructor(private pets: Pet[]) {
        super()
    }

    connect(): Observable<Pet[]> {
        const displayDataChanges = [
            this.pets,
            this._filterChange,
        ];
        return Observable.merge(...displayDataChanges).map(() => {
            return this.pets.slice().filter((item: any) => {
                let searchStr = item.companyName
                return searchStr.indexOf(this.filter.toLowerCase()) != -1;
            });
        })
    }
    disconnect() {}

}
