import { Injectable } from '@angular/core';

@Injectable()
export class Currencies {
    currency:any;
    constructor(){

    }

    listcurrencies(){
        this.currency = [
            {id:1,name:'USD',country:'US',symbol:'$'},
            {id:2,name:'INR',code:'IN',symbol:'₹'},
        ]
        return this.currency;
    }
}