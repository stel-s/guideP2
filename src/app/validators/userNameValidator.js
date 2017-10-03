var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { User } from '../providers/providers';
import { Injectable } from '@angular/core';
var UsernameValidator = (function () {
    function UsernameValidator(user) {
        this.user = user;
    }
    UsernameValidator.prototype.checkUsername = function (control) {
        var _this = this;
        return new Promise(function (resolve) {
            //Fake a slow response from server
            _this.user.isAvailable(control.value)
                .subscribe(function () {
                resolve({ "username taken": true });
                console.log('wtf');
            }, function (err) { return resolve(null); });
            setTimeout(function () {
                if (control.value.toLowerCase() === "stel") {
                    console.log("WTF");
                }
                else {
                }
            }, 2000);
        });
    };
    UsernameValidator.prototype.checkAFM = function (control) {
        this.user.isAFMAvailable(control.value).subscribe(function () { return console.log('wtf'); });
        return new Promise(function (resolve) {
            //Fake a slow response from server
            setTimeout(function () {
                if (control.value.toLowerCase() === "stel") {
                    console.log("WTF");
                    resolve({
                        "username taken": true
                    });
                }
                else {
                    resolve();
                }
            }, 2000);
        });
    };
    UsernameValidator.prototype.checkAMKA = function (control) {
        this.user.isAMKAAvailable(control.value).subscribe(function () { return console.log('wtf'); });
        return new Promise(function (resolve) {
            //Fake a slow response from server
            setTimeout(function () {
                if (control.value.toLowerCase() === "stel") {
                    console.log("WTF");
                    resolve({
                        "username taken": true
                    });
                }
                else {
                    resolve();
                }
            }, 2000);
        });
    };
    return UsernameValidator;
}());
UsernameValidator = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [User])
], UsernameValidator);
export { UsernameValidator };
//# sourceMappingURL=userNameValidator.js.map