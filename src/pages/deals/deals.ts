import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { Receiptprovider } from '../../providers/receiptprovider';

/**
 * Generated class for the Deals page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-deals',
  templateUrl: 'deals.html',
  providers:[Receiptprovider]
})
export class Deals {
  titleColor:string;
  deals:any;
  dealscount:number;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadCtrl:LoadingController,
    public rp:Receiptprovider
  ) {
    if(localStorage.getItem('AppTitleColor')){
      this.titleColor = localStorage.getItem('AppTitleColor');
    }else{
      localStorage.setItem('AppTitleColor',"newtitle");
        this.titleColor = 'newtitle';
    }

    this.getDealData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Deals');
  }

  getDealData(){
    let loading = this.loadCtrl.create({
      spinner: 'dots',
      content: `
        <ion-spinner class="loadDataSpin" name="dots"></ion-spinner>`,
      cssClass:'classforspindata'
    });
    loading.present();

    this.rp.getDeals().then(
      data=>{
        console.info(data);
        let d = JSON.parse(JSON.stringify(data));
        if(d.status=="success"){
          this.deals = d.data;
          if((this.deals).length>0){
            this.dealscount=1;
            //console.log(this.dealscount);
          }else{
            this.dealscount=0;
            //console.log(this.dealscount);
          }
          //setTimeout(()=>{
            loading.dismiss();
          //},8000);
        }else{
          loading.dismiss();
          console.log("No bills right now available");
        }
      },
      error=>{
        loading.dismiss();
        console.error(error+"\t error");
      }
    );
  }

}
