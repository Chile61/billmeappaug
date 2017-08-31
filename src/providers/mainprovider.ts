import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Device } from '@ionic-native/device';

/*
  Generated class for the Mainprovider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class Mainprovider {

  constructor(
      public http: Http,
      public device: Device
    ) {
    console.log('Hello Mainprovider Provider');
  }

  generateApiKey(){
      let d = JSON.stringify({"time":""+new Date()});
      return new Promise((resolve,reject)=>{
          this.http.post(localStorage.getItem("appUrl")+'/generateapikey',d)
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

  registerdevice(){
    let uuid = this.device.uuid;
    let model = this.device.model;  
    let platform = this.device.platform;
    let version = this.device.version;
    let manufacturer = this.device.manufacturer;
    let isVirtual = this.device.isVirtual;
    let serial = this.device.serial;
    let cordva = this.device.cordova;
    let d = JSON.stringify({
        "time":""+new Date(),
        "uuid":uuid,
        "model":model,
        "platform":platform,
        "version":version,
        "manufacturer":manufacturer,
        "isVirtual":isVirtual,
        "serial":serial,
        "cordva":cordva
    });
    return new Promise((resolve,reject)=>{
        this.http.post(localStorage.getItem("appUrl")+'/registerdevice',d)
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
