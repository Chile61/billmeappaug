import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Userprovider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class Userprovider {

  urlstr;
  constructor(public http: Http) {
    this.urlstr = localStorage.getItem('appUrl')+"/"+localStorage.getItem('ApiKey')+"/"+localStorage.getItem("billmeCandidateType");
    console.log('Hello Userprovider Provider');
  }

  //profile.html
  getprofile(lData){
    lData = JSON.stringify(lData);
    let url = this.urlstr;
    console.warn(url);
    return new Promise((resolve,reject)=>{
      this.http.post(url+'/myprofile',lData)
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

  //profile.html
  changeprofilepic(lData){
    lData = JSON.stringify(lData);
    let url = this.urlstr;
    console.warn(url);
    return new Promise((resolve,reject)=>{
      this.http.post(url+'/changeprofilepic',lData)
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

  //profile.html
  editprofile(lData){
    lData = JSON.stringify(lData);
    let url = this.urlstr;
    console.warn(url);
    return new Promise((resolve,reject)=>{
      this.http.post(url+'/editprofile',lData)
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


  //serviceconnect.html
  serviceconnect(lData){
    lData = JSON.stringify(lData);
    let url = this.urlstr;
    console.warn(url);
    return new Promise((resolve,reject)=>{
      this.http.post(url+'/findserviceconnect',lData)
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
}
