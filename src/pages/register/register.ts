import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class Register {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl:ViewController,
    public actionCtrl:ActionSheetController
    ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  goLogin(){
    this.viewCtrl.dismiss();
  }

  actionforimage(){
    console.info("actionforimage called");
    this.actionCtrl.create({
      title:'Make your profile pic',
      buttons:[
        {
          text:'Camera',
          handler:()=>{
            console.log("Camera clicked");
          }
        },
        {
          text:'Gallery',
          handler:()=>{
            console.log("Gallery clicked");
          }
        },
        {
          text:'Cancel',
          role:'cancel',
          handler:()=>{
            console.error("cancel");
          }
        }
      ]
    }).present();
  }

  viewterms(){
    console.log("Provided soon");
  }

  DoRegister(){
    console.log("Provided soon");
  }

}
