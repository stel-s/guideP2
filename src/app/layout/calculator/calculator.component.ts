import {Component, OnInit, ViewContainerRef, ViewChild, Directive} from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/debounce';
import { FormsModule }   from '@angular/forms';

import { routerTransition } from '../../router.animations';
import { NgForm } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { JwtHelper } from "angular2-jwt";
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
////Providers/////
import { User } from '../../providers/providers';
//////END///////

export class Profile {

    constructor(
        public username: string,
        public password: string,

    ) { }

}

@Component({
    selector: 'calculator',
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.scss']
})


export class CalculatorComponent implements OnInit {
    model = new Profile('', '');
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
    constructor(public user: User,  public router: Router,) {


        this.user.getProfile().subscribe((res: any) => {
                // this.profile = res;
                console.log(this.profile);
            },(err) => {
                if (err.statusText === 'Unauthorized') {
                    this.router.navigateByUrl('/login');
                }
            }
        );
    }
    update(profileForm) {
        console.log(profileForm)
        this.user.updateProfile(profileForm).subscribe();
    }

    ngOnInit(): void {
        this.heroForm = new FormGroup({
            'name': new FormControl(this.hero.name, [
            ]),

        });
            this.heroForm.valueChanges
                .debounceTime(1000)
                .subscribe(data => {
                    console.log('Form changes', data)

                })

    }

    get name() { return this.heroForm.get('name'); }

    get power() { return this.heroForm.get('power'); }
    upload() {
        var reader  = new FileReader();

        let fileBrowser = this.fileInput.nativeElement;
        if (fileBrowser.files && fileBrowser.files[0]) {
            const formData = new FormData();
            formData.append("image", fileBrowser.files[0]);
            reader.addEventListener("load", () => {
                this.user.updateAvatar(reader.result.split(',')[1]).subscribe(res => {
                    // do stuff w/my uploaded file
                });
            }, false);

            let x = reader.readAsDataURL(fileBrowser.files[0]);

        }
    }

        previewFile() {
        var preview = document.querySelector('img');
        var file: any    = document.querySelector('input[type=file]')
            file.files[0];
        var reader  = new FileReader();

        reader.addEventListener("load", function () {
            preview.src = reader.result;
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }
    onFileChange(event){
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
}

