import { Injectable } from '@angular/core';

@Injectable()
export class Applanguage {
    lang:any;
    constructor(){

    }

    listlanguages(){
        this.lang = [
            {id:1,name:'English',code:'en'},
            {id:2,name:'Arabic',code:'ar'},
            {id:3,name:'Spanish',code:'es'},
            {id:4,name:'Hindi',code:'hi'},
            {id:5,name:'Marathi',code:'ma'}
        ]
        return this.lang;
    }
}