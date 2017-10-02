import { FormControl } from '@angular/forms';
import { User } from '../providers/providers';
import { Injectable } from '@angular/core';


@Injectable()
export class UsernameValidator {


  constructor(public user: User){
  }
   checkUsername(control: FormControl): any {



    return new Promise(resolve => {

      //Fake a slow response from server
      this.user.isAvailable(control.value)
        .subscribe(() => {

          resolve({"username taken": true});
          console.log('wtf')
        },
          (err) => resolve(null))

      setTimeout(() => {
        if(control.value.toLowerCase() === "stel"){
                console.log("WTF")



        } else {

        }
      }, 2000);

    });
  }
   checkAFM(control: FormControl): any {

    //this.user.isAFMAvailable(control.value).subscribe(()=> console.log('wtf'))

    return new Promise(resolve => {

      //Fake a slow response from server

      setTimeout(() => {
        if(control.value.toLowerCase() === "stel"){
          console.log("WTF")

          resolve({
            "username taken": true
          });

        } else {
          resolve();
        }
      }, 2000);

    });
  }

  checkAMKA(control: FormControl): any {

    this.user.isAMKAAvailable(control.value).subscribe(()=> console.log('wtf'))

    return new Promise(resolve => {

      //Fake a slow response from server

      setTimeout(() => {
        if(control.value.toLowerCase() === "stel"){
          console.log("WTF")

          resolve({
            "username taken": true
          });

        } else {
          resolve();
        }
      }, 2000);

    });
  }

}

