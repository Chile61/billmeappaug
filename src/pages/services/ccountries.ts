import { Injectable } from '@angular/core';

@Injectable()
export class Ccountries{
    countries:any;
    listallcountries(){
        this.countries = [
            {id:1,name:'US',country:'United State Of America',code:'+1'},
            {id:2,name:'IN',country:'India',code:'+91'},
            {id:3,name:'UK',country:'United Kingdom',code:'+2'},
            {id:4,name:'UAE',country:'United Arab Emirates',code:'+971'}
        ];            
        return this.countries;
    }
}