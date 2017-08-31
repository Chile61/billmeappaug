import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class service{
    resp:any;
    constructor(public http:Http){

    }

    hello(){
        return "hi";
    }

    getIp(){
        let d:any = null;

        //http://ip-api.com/json    //http://freegeoip.net/json/
        this.resp = this.http.get('http://freegeoip.net/json/',{})
        .map(res=>res.json())
        /*.subscribe(
            data => {
                console.log(data);
                d = data;
                //this.res = data.ip;
                //d = data.ip;//JSON.parse(JSON.stringify(data));
            },
            error => {
                console.error(error);
                d = error;//JSON.parse(JSON.stringify(error));
           p }
        )*/;
        console.warn(this.resp);
        return this.resp;
    }
}