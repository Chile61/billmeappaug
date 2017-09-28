import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SignupcountriesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signupcountries',
  templateUrl: 'signupcountries.html',
})
export class Signupcountries {

  cname:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
    
  }

  ionViewDidLoad() {
    localStorage.setItem("BillMeUserCountryName","IN");
    localStorage.setItem("BillMeUserCountryCode",(new Date()).toString());
    this.cname = localStorage.getItem("BillMeUserCountryName");
    console.log('ionViewDidLoad SignupcountriesPage');
  }

}
