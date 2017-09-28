import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { NgForm } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { JwtHelper } from "angular2-jwt";
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';

import { User } from '../../providers/providers';

export class Login {

    constructor(
        public username: string,
        public password: string,
    ) { }

}

@Component({
    selector: 'app-blank-page',
    templateUrl: './blank-page.component.html',
    styleUrls: ['./blank-page.component.scss']
})
export class BlankPageComponent implements OnInit {
    model = new Login('', '');
    @ViewChild('fileInput') fileInput;

    constructor(public user: User) {
    }

    upload() {
        var reader  = new FileReader();

        let fileBrowser = this.fileInput.nativeElement;
        if (fileBrowser.files && fileBrowser.files[0]) {
            const formData = new FormData();
            formData.append("image", fileBrowser.files[0]);
            reader.addEventListener("load", () => {
                console.log(reader.result);
                this.user.updateAvatar(reader.result).subscribe(res => {
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
    ngOnInit() {
    }
}
