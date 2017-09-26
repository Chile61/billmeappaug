import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the ProfileditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profiledit',
  templateUrl: 'profiledit.html',
})
export class Profiledit {

  titleColor:string;
  profile:any;

  uname:string;usname:string;username:string;uemail:any;uaddress:any;
  ucontact:any;uccode:any;
  ufname:any;ulname:any;
  ujoin:any;ugender:string;utoken:any;upic:any;ucreated:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl:ToastController
  ) {
    if(localStorage.getItem('AppTitleColor')){
      this.titleColor = localStorage.getItem('AppTitleColor');
    }else{
      localStorage.setItem('AppTitleColor',"newtitle");
      this.titleColor = 'newtitle';
    }
  }

  ionViewDidLoad() {
    this.uname = this.navParams.get("uname");
    this.ufname = this.navParams.get("ufname");
    this.ulname = this.navParams.get("ulname");
    this.uemail = this.navParams.get("uemail");
    this.uaddress = this.navParams.get("uaddress");
    this.ucontact = this.navParams.get("ucontact");
    this.uccode = this.navParams.get("uccode");
    this.ujoin = this.navParams.get("ujoin");
    this.ugender = this.navParams.get("ugender");
    this.utoken = this.navParams.get("utoken");
    this.ucreated = this.navParams.get("ucreated");
    this.upic = this.navParams.get("upic");
    console.log(this.uname);
    console.log('ionViewDidLoad ProfileditPage');
  }

  editprofile(){
    console.log(this);
    this.toastCtrl.create({
        message:"Working on that ...",duration:2000,position:'top'
    }).present();
  }

}
