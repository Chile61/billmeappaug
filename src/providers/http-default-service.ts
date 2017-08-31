import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

/*
  Generated class for the HttpDefaultService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class HttpDefaultService {
  dd:any;
  myvar:string;
  constructor(public http: Http) {
    this.myvar = 'Hello HttpDefaultService Provider'; 
    console.log('Hello HttpDefaultService Provider');
  }

  findMe(){
    //console.info("I'v arrived");
    //http://coenraets.org/blog/2016/02/angular2-ionic2-rest-services/
    var a;
    return this.http.get('http://freegeoip.net/json/',{})
        .map(res=>res.json())
        .subscribe(
            data => {
                //console.log(data.ip);
                this.dd = data;
                return this.dd;
                //d = data.ip;//JSON.parse(JSON.stringify(data));
            },
            error => {
                //console.error(error);
                this.dd = error;//JSON.parse(JSON.stringify(error));
                return this.dd;
            }
        );
   //return a;     
  }


  findMe4(){//works fine perfect  //ionic generate provider providername
    //https://www.thepolyglotdeveloper.com/2016/06/working-shared-providers-ionic-2-mobile-app/
    //https://www.joshmorony.com/how-why-and-when-to-use-providers-in-ionic-2/
    //http://dr-ambedkar.in/stuffs/billserver.php/
    return new Promise((resolve, reject) => {
      this.http.get('http://freegeoip.net/json/',{})
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
