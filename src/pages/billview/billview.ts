import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Billview page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-billview',
  templateUrl: 'billview.html'
})
export class Billview {
  titleColor:string;
  navTitle:any;
  navImage:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
      if(localStorage.getItem('AppTitleColor')){
        this.titleColor = localStorage.getItem('AppTitleColor');
      }else{
        localStorage.setItem('AppTitleColor',"newtitle");
        this.titleColor = 'newtitle';
      }
      this.callImage();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BillviewPage');
  }

  callImage(){
    this.navTitle = this.navParams.get("name");
    this.navImage = this.navParams.get("image");
  }

}
