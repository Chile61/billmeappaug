import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { Titlecolors } from '../services/titlecolors';

import { MyApp } from '../../app/app.component';
/*
  Generated class for the Setting page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
  providers:[Titlecolors]
})
export class Setting {

  makevisible:boolean;
  titleColor:any;
  piccolors:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl:ToastController,
    public titleServ:Titlecolors,
    public alertCtrl:AlertController
    ) {
      if(localStorage.getItem('AppTitleColor')){
        this.titleColor = localStorage.getItem('AppTitleColor');
      }else{
        localStorage.setItem('AppTitleColor',"newtitle");
        this.titleColor = 'newtitle';
      }
      this.makevisible = false;

      this.piccolors = this.titleServ.piccolors();
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  changevisibility(){
    /*if(this.makevisible == true){
      this.makevisible = true;
      console.log(this.makevisible);
    }else{
      this.makevisible = false;*/
      console.log(this.makevisible);
      let m = "";
      if(this.makevisible == true)  m = "You are visible to all!"; else m = "You act as invisible to others!";  
      this.toastCtrl.create({
        message:m,position:'middle',duration:2500
      }).present();
    //}
  }

  changeColor(color){
    localStorage.setItem("AppTitleColor",color);
    this.titleColor = color;
  }

  signout(){
    let alert = this.alertCtrl.create({
      title: 'Sign out',
      message: 'Are you sure want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Proceed',
          handler: () => {
            localStorage.setItem("billmeIn","N");
            console.log('Proceed clicked');
            this.navCtrl.push(MyApp);
          }
        }
      ]
    });
    alert.present();
  }

}
