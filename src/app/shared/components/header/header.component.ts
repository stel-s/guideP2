import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../providers/providers';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    profile = {
        firstName:'ss'
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
        this.user.getProfile().subscribe((res: any) => {
            this.profile = JSON.parse(res._body);
            console.log(this.profile);
        },(err) => {
                if (err.statusText === 'Unauthorized') {
                    this.router.navigateByUrl('/login');
                }
            }
        );
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
