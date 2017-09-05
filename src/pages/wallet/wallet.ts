import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { Walletbalance } from '../walletbalance/walletbalance';
import { Walletexpenditure } from '../walletexpenditure/walletexpenditure';
import { Walletpurchase } from '../walletpurchase/walletpurchase';
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
  animations: [
    trigger('flip', [
      state('flipped', style({
        transform: 'rotate(180deg)',
        backgroundColor: '#f50e80'
      })),
      transition('* => flipped', animate('400ms ease'))
    ])
  ]
})
export class Wallet {

  flipState: String = 'notFlipped';
  titleColor:string;

  tab1WalletBalance:any = Walletbalance;
  tab2WalletExpenditure:any = Walletexpenditure;
  tab3WalletPurchase:any = Walletpurchase;
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

  toggleFlip(){
    this.flipState = (this.flipState == 'notFlipped') ? 'flipped' : 'notFlipped';
  }

}
