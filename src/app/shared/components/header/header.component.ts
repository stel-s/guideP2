import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../providers/providers';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    @ViewChild('imgRef') img: ElementRef;


    profile = {
        firstName: undefined,
        avatar: {
            fileData: undefined
        }
    };

    pushRightClass: string = 'push-right';

    constructor(private translate: TranslateService, public router: Router, public user: User,) {
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
                this.toggleSidebar();
            }
        });


    }

    ngOnInit() {
        this.user.currentUser.subscribe((x:any) => {
            if (x) {
                this.profile = Object.assign({},this.profile,x);
            }
        })

        this.user.getProfile().subscribe((res => this.profile = res));
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
