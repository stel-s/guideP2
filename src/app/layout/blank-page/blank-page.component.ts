import { Component, OnInit, ViewContainerRef, ViewChild, Directive } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/debounce';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import {
    MdAutocompleteModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdChipsModule,
    MdDatepickerModule,
    MdDialogModule,
    MdExpansionModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdNativeDateModule,
    MdPaginatorModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdRippleModule,
    MdSelectModule,
    MdSidenavModule,
    MdSliderModule,
    MdSlideToggleModule,
    MdSnackBarModule,
    MdSortModule,
    MdTableModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule,
    MdStepperModule,
} from '@angular/material';

import { routerTransition } from '../../router.animations';

import { NgForm } from '@angular/forms';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

////Providers/////
import { User } from '../../providers/providers';
//////END///////
//////////////////END IMPORTS////////////////////////////////////////
interface IHeaderProfile {
    firstName: string,
    lastName: string,
    avatar: {
        fileData: string,
    }
}
interface profile1 {
    guideNumber: string;
    amka: string;
    vatNumber: string;
    amIKA: string;
    firstName: string;
    lastName: string;
    username: string;
    street: string;
    streetNumber: string;
    telephone: string;
    municipality: string;
    postcode: string;
}
// export class Profile {
//
//     constructor(
//         public username: string,
//         public password: string,
//         public guideNumber?: string,
//          amka?: string,
//         vatNumber?: string,
//         amIKA?: string,
//         public firstName?: string,
//         lastName?: string,
//         street?: string,
//         streetNumber?: string,
//         telephone?: string,
//         municipality?: string,
//         postcode?: string,
//         public avatar?: string,
//     ) { }
//
// }

@Component({
    selector: 'app-blank-page',
    templateUrl: './blank-page.component.html',
    styleUrls: ['./blank-page.component.scss']
})


export class BlankPageComponent implements OnInit {
    closeResult: string;
    profile:any ;
    @ViewChild('fileInput') fileInput;
    avatarPreviewSrc: any;

    hero = { name: 'Dr.' };
    heroForm: FormGroup;
    myGroup = new FormGroup({
        file: new FormControl()
    });

    constructor(public user: User,
                public router: Router,
                public toastr: ToastsManager,
                vcr: ViewContainerRef,
                private sanitizer: DomSanitizer,
                private modalService: NgbModal
    ) {
        this.toastr.setRootViewContainerRef(vcr);

    }
    update(profileForm) {
        let payload = profileForm.form.value;
        console.log(profileForm.form.value)
        let obj = {
            "guideNumber": "123456789",
            "amka": "22222112",
            "username": "stel",
            "telephone": "6977125252",
            "municipality": "Dafni",
            "postcode":"17445"
        }
        payload = Object.assign({},payload,obj);
        this.user.updateProfile(payload).subscribe((res => {
            this.toastr.success('Profile', 'Saved!');
            this.user.currentUser.next({firstName: payload.firstName, lastName: payload.lastName})
        }));
    }

    ngOnInit(): void {
        this.profile = {
            firstName: undefined,
            lastName: undefined,
            avatar: {
                fileData: undefined
            }
        };
        this.heroForm = new FormGroup({
            'name': new FormControl(this.hero.name, [
            ]),

        });
        this.user.getProfile().take(1).subscribe((res: any) => {
            this.profile = res
            this.avatarPreviewSrc = res.avatar.fileData;

        }, (err) => {

        }
        );
        this.heroForm.valueChanges
            .debounceTime(1000)
            .subscribe(data => {
                console.log('Form changes', data)

            })

    }

    get name() { return this.heroForm.get('name'); }

    get power() { return this.heroForm.get('power'); }

    upload() {
        var reader = new FileReader();

        let fileBrowser = this.fileInput.nativeElement;
        if (fileBrowser.files && fileBrowser.files[0]) {
            const formData = new FormData();
            formData.append("image", fileBrowser.files[0]);
            reader.addEventListener("load",  () => {
                let imgSrc = reader.result.split(',')[1];
                console.log("insdeide")
                this.user.updateAvatar(imgSrc).subscribe(res => {
                    // do stuff w/my uploaded file

                });
            }, false);
            reader.readAsDataURL(fileBrowser.files[0]);

        }
    }

    previewFile() {
        var preview = document.querySelector('img');
        var file: any = document.querySelector('input[type=file]')
        file.files[0];
        var reader = new FileReader();

        reader.addEventListener("load", function () {
            preview.src = reader.result;
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }

    }
    onFileChange(event) {
        let files = event.target.files;
    }
    // ngOnInit() {
    //     this.heroForm = new FormGroup({
    //         'name': new FormControl(this.hero.name, [
    //             Validators.required,
    //             Validators.minLength(4),
    //
    //         ]),
    //     });
    //     this.heroForm.valueChanges
    //         .subscribe(data => {
    //             console.log('Form changes', data)
    //
    //         })
    // }
    open(content) {
        this.modalService.open(content).result.then((result) => {
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
}

