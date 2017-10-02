import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(private translate: TranslateService) {
        translate.addLangs(['en', 'el']);
        translate.setDefaultLang('el');
        const browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|el|ur|es|it|fa/) ? browserLang : 'en');
    }
}
