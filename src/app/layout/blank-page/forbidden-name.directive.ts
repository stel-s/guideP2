
import { Directive, Input, OnChanges, SimpleChanges, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { User } from '../../providers/providers';
import 'rxjs/add/operator/debounceTime';
import { Observable } from "rxjs";

/** A hero's name can't match the given regular expression */
export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const forbidden = nameRe.test(control.value);
        return forbidden ? { 'forbiddenName': { value: control.value } } : null;
    };
}

@Directive({
    selector: '[forbiddenName]',
    host: {
        '(focus)': 'onFocus($event)',
        '(blur)': 'onBlur($event)'
    },
    providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: forwardRef(() => ForbiddenValidatorDirective), multi: true }]
})
export class ForbiddenValidatorDirective implements Validator {
    @Input() forbiddenName: string;
    val;
    onFocus() {

    }

    onBlur() {

    }

    constructor(public user: User) {
        this.val= 0;

    }
    validate(c: AbstractControl): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> {

        return this.validateUniqueEmailPromise(c.value);

    }
    validateUniqueEmailPromise(email: string) {
        if(this.val < 4 )
            return new Promise(resolve => { resolve(null); this.val ++ });

        return new Promise(resolve => {
            this.user.isAFMAvailable(email).map(res => res).take(1)
                .subscribe((res) => {
                    this.val = 2;
                    if (!res) {
                        resolve({
                            asyncValid: true
                        })
                    } else {
                        resolve(null);
                    }
                },
                (err) => console.log(err)
                )

        })
    }
    // validate(control: AbstractControl): {[key: string]: any} {
    //     control.valueChanges.debounceTime(1000).subscribe((res) => {
    //         console.log(res);
    //
    //         return this.forbiddenName
    //     });
    //
    //     // this.user.isAFMAvailable(control.value)
    //     //     .subscribe(() => {
    //     //
    //     //         },
    //     //         (err) => console.log(err))
    //     return this.forbiddenName ? forbiddenNameValidator(new RegExp(this.forbiddenName, 'i'))(control)
    //         : null;
    // }
}



/*
 Copyright 2017 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */
