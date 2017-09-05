import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Receiptprovider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class Receiptprovider {

  urlstr;
  constructor(public http: Http) {
    this.urlstr = localStorage.getItem('appUrl')+"/"+localStorage.getItem('ApiKey')+"/"+localStorage.getItem("billmeCandidateType");
    console.log('Hello Receiptprovider Provider');
  }

  //receipt.html
  findreceipt(lData){
    lData = JSON.stringify(lData);
    let url = this.urlstr;
    console.warn(url);
    return new Promise((resolve,reject)=>{
      this.http.post(url+'/findbills',lData)
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

  //dashboard functions
  loadDashboardData(){
    let rd = {
      'uid':localStorage.getItem("billmeUID"),
      'name':'B00001'
    };
    let pdata = JSON.stringify(rd);
    let url = this.urlstr;
    return new Promise((resolve,reject)=>{
      this.http.post(url+'/dashboarddetail',pdata)
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

  //deals.html
  getDeals(){
    let lData = JSON.stringify({});
    let url = this.urlstr;
    console.warn(url);
    return new Promise((resolve,reject)=>{
      this.http.post(url+'/getdeals',lData)
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

  //to upload and generate pdf
  uploadAndMakePdf(d1,d2,d3,d4){
    let d = {
            'uid':d1,
            'base64':d2,
            'utoken':d3,
            'billid':d4
          };
    let lData = JSON.stringify(d);
    let url = this.urlstr;
    console.warn(url);
    return new Promise((resolve,reject)=>{
      this.http.post(url+'/uploadAndMakePdf',lData)
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
