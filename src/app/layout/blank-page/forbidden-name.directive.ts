
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
    providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: forwardRef(() => ForbiddenValidatorDirective), multi: true }]
})
export class ForbiddenValidatorDirective implements Validator {
    @Input() forbiddenName: string;

    constructor(public user: User) {

    }
    validate(c: AbstractControl): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> {
        return this.validateUniqueEmailPromise(c.value);

    }
    validateUniqueEmailPromise(email: string) {
        return new Promise(resolve => {
            this.user.isAFMAvailable(email).map(res => res.json()).take(1)
                .subscribe((res) => {
                    console.log(res)
                    if (res === "3") {
                        resolve({
                            asyncInvalid: true
                        })
                    } else {
                        resolve(null);
                    }
                },
                (err) => console.log(err)
                )
            setTimeout(() => {
                if (email === "3") {
                    resolve({
                        asyncInvalid: true
                    })
                } else {
                    resolve(null);
                }
            }, 2000);
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
