import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';

import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { Titlecolors } from '../services/titlecolors';
import { Applanguage } from '../services/applanguage';
import { Currencies } from '../services/currencies';

import { TranslateService } from '@ngx-translate/core';

import { MyApp } from '../../app/app.component';

import { Msgresponse } from '../services/msgresponse';
/*
  Generated class for the Setting page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
  providers:[Titlecolors,Applanguage,Msgresponse,Currencies]
})
export class Setting {

  contentPageMenu:boolean = false;
  
  makevisible:boolean;
  titleColor:any;
  piccolors:any;

  language:any;
  alllang:any;
  currency:any;
  selectcurrency:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl:ToastController,
    public titleServ:Titlecolors,
    public applanguage:Applanguage,
    public alertCtrl:AlertController,
    public translate: TranslateService,
    public msgresponse:Msgresponse,
    public currencies:Currencies,
    public menuCtrl: MenuController
    ) {
      if(localStorage.getItem('AppTitleColor')){
        this.titleColor = localStorage.getItem('AppTitleColor');
      }else{
        localStorage.setItem('AppTitleColor',"newtitle");
        this.titleColor = 'newtitle';
      }
      this.makevisible = false;

      this.piccolors = this.titleServ.piccolors();

      this.selectcurrency = 2;
    }

  ionViewDidLoad() {
    this.menuCtrl.swipeEnable(false);
    console.log('ionViewDidLoad SettingPage');
    this.language = localStorage.getItem("billmeAppLanguage");
    this.translate.setDefaultLang(this.language);
    this.alllang = this.applanguage.listlanguages();
    this.currency = this.currencies.listcurrencies();
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
      title: this.msgresponse.callMsgSettingSignout(),
      message: this.msgresponse.callMsgSettingSignoutMsg(),
      buttons: [
        {
          text: this.msgresponse.callMsgSettingCancel(),
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: this.msgresponse.callMsgSettingProceed(),
          handler: () => {
            localStorage.setItem("billmeIn","N");
            console.log('Proceed clicked');
            //this.navCtrl.push(MyApp);
            // this.menuCtrl.enable(false, 'myMenu');
            // this.menuCtrl.swipeEnable(false, 'myMenu');
            // this.contentPageMenu = false;
            this.menuCtrl.swipeEnable(false);
            this.navCtrl.setRoot(MyApp);
            setTimeout(()=>{
              // this.menuCtrl.enable(false,"myMenu");
              // this.contentPageMenu = false;
              // this.menuCtrl.swipeEnable(false, 'myMenu');
              this.menuCtrl.swipeEnable(false);
              console.log("called swipe");
            },1000);
          }
        }
      ]
    });
    alert.present();
  }


  deleteacc(){
    let alert = this.alertCtrl.create({
      title: this.msgresponse.callMsgSettingConfirmDelete(),
      message: this.msgresponse.callMsgSettingConfirmDeleteMsg(),
      buttons: [
        {
          text: this.msgresponse.callMsgSettingBtnNo(),
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: this.msgresponse.callMsgSettingBtnYes(),
          handler: () => {
            this.toastCtrl.create({
              message:this.msgresponse.callMsgSettingBtnYesMsg(),position:'bottom',duration:2500
            }).present();
          }
        }
      ]
    });
    alert.present();
  }

  changeLanguage(){
    let lang = this.language;
    console.log(lang);
    if(lang!="" || lang != null){
      localStorage.setItem("billmeAppLanguage",lang);
      this.translate.setDefaultLang(lang);
    }
  }

}
