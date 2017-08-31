import { Injectable } from '@angular/core';

@Injectable()
export class Titlecolors {
    colors:any;
    constructor(){

    }

    piccolors(){
        this.colors = [
            {id:1,color:'newtitle',name:'Default',icon:'leaf',hexvalue:'#0372b2'},
            {id:2,color:'title',name:'Avenger',icon:'rose',hexvalue:'#876A81'},
            {id:3,color:'primary',name:'Primary',icon:'leaf',hexvalue:'#387ef5'},
            {id:4,color:'secondary',name:'Secondary',icon:'rose',hexvalue:'#32db64'},
            {id:5,color:'danger',name:'Danger',icon:'leaf',hexvalue:'#f53d3d'},
            {id:6,color:'dark',name:'Dark',icon:'rose',hexvalue:'#222'},
            {id:7,color:'bgColor',name:'Themed',icon:'leaf',hexvalue:'#C6ACD8'},
            {id:7,color:'bgColor2',name:'Glee',icon:'rose',hexvalue:'#C12CD8'}
        ]
        return this.colors;
    }
}