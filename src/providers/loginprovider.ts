import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Loginprovider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class Loginprovider {

  url:any;
  constructor(public http: Http) {
    console.log('Hello Loginprovider Provider');
    this.url = localStorage.getItem('appUrl')+"/"+localStorage.getItem('ApiKey');
  }

  loggedIn(loginData){
    loginData = JSON.stringify(loginData);
    this.url = localStorage.getItem('appUrl')+"/"+localStorage.getItem('ApiKey');
    let url = this.url;
    //console.warn(url);
    return new Promise((resolve,reject)=>{
      this.http.post(url+'/login',loginData)
      .map(res=>res.json())
        .subscribe(
            data => {
                resolve(data);
            },
            error => {
                reject(error);
            }
        );
    });
  }

  register(regData){
    regData = JSON.stringify(regData);
    this.url = localStorage.getItem('appUrl')+"/"+localStorage.getItem('ApiKey');
    let url = this.url;
    return new Promise((resolve,reject)=>{
      this.http.post(url+'/newregister',regData)
      .map(res=>res.json())
      .subscribe(
        data=>{
          resolve(data);
        },
        error=>{
          reject(error);
        }
      );
    });
  }

  getprofile(pData){
    pData = JSON.stringify(pData);
    return new Promise((resolve,reject)=>{
      this.http.post('link',pData)
      .map(res=>res.json())
      .subscribe(
        data=>{
          resolve(data);
        },
        error=>{
          reject(error);
        }
      );
    });
  }

}
