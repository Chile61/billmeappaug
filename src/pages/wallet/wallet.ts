import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Wallet page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html',
})
export class Wallet {

  titleColor:string;
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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Wallet');
  }

}
