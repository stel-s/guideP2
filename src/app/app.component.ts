import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    options;
    constructor(private translate: TranslateService) {
        this.options = {
            title : { text : 'simple chart' },
            series: [{
                data: [29.9, 71.5, 106.4, 129.2],
            }]
        };
        translate.addLangs(['en', 'el']);
        translate.setDefaultLang('el');
        const browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|el|ur|es|it|fa/) ? browserLang : 'en');
    }
}
