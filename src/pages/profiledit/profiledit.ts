import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { Msgresponse } from '../services/msgresponse';
import { Ccountries } from '../services/ccountries';

import { Userprovider } from '../../providers/userprovider';

import * as moment from 'moment';
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
  providers:[Userprovider,Msgresponse,Ccountries]
})
export class Profiledit {

  titleColor:string;
  profile:any;

  uname:string;usname:string;username:string;uemail:any;uaddress:any;
  ucontact:any;uccode:any;udob:any;
  ufname:any;ulname:any;
  ujoin:any;ugender:string;utoken:any;upic:any;ucreated:any;
  public ccountries:any;
  public countrychoosen:any;

  errorNetwork:any;
  errorNetworkUnavailable:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl:ToastController,
    public loadCtrl:LoadingController,
    public mr: Msgresponse,
    public alertCtrl: AlertController,
    public up:Userprovider,
    public CC:Ccountries
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
    this.countrychoosen = this.navParams.get("uccode");
    this.ujoin = this.navParams.get("ujoin");
    this.ugender = this.navParams.get("ugender");
    this.utoken = this.navParams.get("utoken");
    this.ucreated = this.navParams.get("ucreated");
    this.upic = this.navParams.get("upic");
    this.udob = this.navParams.get("udob");
    console.log(this.uname);
    console.log(this.converttoDate(this.udob));
    this.ccountries = this.CC.listallcountries();
    this.errorNetwork = this.mr.callErrorNetwork();
    this.errorNetworkUnavailable = this.mr.callErrorNetworkUnavailable();
    console.log('ionViewDidLoad ProfileditPage');
  }

  editprofile(){
    
    let lData = {
      uid:localStorage.getItem("billmeUID"),
      username:this.uname,
      ufname:this.ufname,
      ulname:this.ulname,
      ugender:this.ugender,
      uaddress:this.uaddress,
      ucontact:this.ucontact,
      udob:this.udob,
      phonecode:this.countrychoosen,
      utoken:localStorage.getItem("billmeUToken")
    };
    let loading = this.loadCtrl.create({
      spinner: 'dots',
      content: `
        <ion-spinner class="loadDataSpin" name="dots"></ion-spinner>`,
      cssClass:'classforspindata'
    });
    loading.present();
    this.up.editprofile(lData).then(
      (res)=>{
        console.log(res);
        let d = JSON.parse(JSON.stringify(res));
        let status = d.status;
        if(status=="success"){
          let flag = d.flag;
          if(flag=="same"){
            this.toastCtrl.create({
                message:d.message,duration:2000,position:'top'
            }).present();   
          }else if(flag=="new"){
            this.toastCtrl.create({
                message:d.message,duration:2000,position:'middle'
            }).present();   
          }else{
            this.toastCtrl.create({
                message:this.errorNetwork,duration:2000,position:'top'
            }).present();   
          }
        }else{
          this.toastCtrl.create({
              message:this.errorNetworkUnavailable,duration:2000,position:'top'
          }).present();    
        }
        loading.dismiss();
      },
      (error)=>{
        console.error(error);
        this.toastCtrl.create({
            message:this.errorNetwork,duration:2000,position:'top'
        }).present();    
        loading.dismiss();
      }
    ).catch(
      (error)=>{
        this.toastCtrl.create({
            message:this.errorNetworkUnavailable,duration:2000,position:'top'
        }).present();    
        loading.dismiss();
      }
    );
    
  }

  converttoDate(d){
    let ans = moment(new Date(d)).format("YYYY-MM-DD");
    return ans;
  }
}
