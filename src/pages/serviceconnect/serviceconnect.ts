import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { Userprovider } from '../../providers/userprovider';

/**
 * Generated class for the Serviceconnect page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-serviceconnect',
  templateUrl: 'serviceconnect.html',
  providers:[Userprovider]
})
export class Serviceconnect {

  titleColor:string;

  services:any;
  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadCtrl:LoadingController,
    public toastCtrl:ToastController,
    public userp:Userprovider
  ) {
    if(localStorage.getItem('AppTitleColor')){
      this.titleColor = localStorage.getItem('AppTitleColor');
    }else{
      localStorage.setItem('AppTitleColor',"newtitle");
        this.titleColor = 'newtitle';
    }

    this.getservices();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Serviceconnect');
  }

  getservices(){
    let loading = this.loadCtrl.create({
      spinner: 'dots',
      content: `
        <ion-spinner class="loadDataSpin" name="dots"></ion-spinner>`,
      cssClass:'classforspindata'
    });
    loading.present();

    let lData = {
      uid:localStorage.getItem("billmeUID"),
      services:"services"
    };
    this.userp.serviceconnect(lData).then(
      (result)=>{
        let dt = JSON.parse(JSON.stringify(result));
        if(dt.status == "success"){
          this.services = dt.data;
        }
        else{
          this.toastCtrl.create({
            message:"No service connect found",duration:2000,position:'top'
          }).present();
        }
        loading.dismiss();
      },
      (error)=>{
        loading.dismiss();
        this.toastCtrl.create({
          message:"Network error found",duration:2000,position:'top'
        }).present();
      }
    );

  }

  tosee(d){
    this.toastCtrl.create({
      message:"Will be available soon!",duration:2000,position:'top'
    }).present();
  }

}
