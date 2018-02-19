import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as firebase from 'firebase';


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
        firebase.initializeApp({apiKey: "AIzaSyC6RyUM5qmMgspMQeARqJzNbZwDF6-UHXA",
            authDomain: "anelixis-4af61.firebaseapp.com",
            databaseURL: "https://anelixis-4af61.firebaseio.com",
            projectId: "anelixis-4af61",
            storageBucket: "anelixis-4af61.appspot.com",
            messagingSenderId: "862108583603"})
    }
}
