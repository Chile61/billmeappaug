import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MyApp } from '../../app/app.component';
/**
 * Generated class for the Homeslider page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-homeslider',
  templateUrl: 'homeslider.html',
})
export class Homeslider {
  homeOptions:any;
  slides:Array<{}>;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.loadSlides();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Homeslider');
  }

  loadSlides(){
    this.slides = [
      {id:1,image:'assets/images/logo.png',title:'Bill me',description:'Lets start with bill me!',bg:'#0372b2',titlebar:'#0372b2'},
      {id:2,image:'assets/images/2.png',title:'Utilize',description:'Load your bill with bill me!',bg:'#fff',titlebar:'#fff'},
      {id:3,image:'assets/images/3.png',title:'Safer',description:'Make safe your every transactions!',bg:'#fff',titlebar:'#fff'}
    ];
    this.homeOptions = {
        initialSlide: 0,
        loop: false,
        autoplay:1500
      };
  }

  continue(){
    localStorage.setItem('billmeSeenSlider',"Y");
    this.navCtrl.push(MyApp);
  }

}
