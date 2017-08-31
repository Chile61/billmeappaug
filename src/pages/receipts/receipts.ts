import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { Receiptsview } from '../receiptsview/receiptsview';
import { Billview } from '../billview/billview';

import { Receiptprovider } from '../../providers/receiptprovider';

import * as moment from 'moment';
/*
  Generated class for the Receipts page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-receipts',
  templateUrl: 'receipts.html',
  providers:[Receiptprovider]
})
export class Receipts {
  titleColor:string;
  bills:any;bills2:any;
  billscount:number;
  private isOn: boolean = false;
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
      this.loadReceipt();
    }

  /*Search box functionality*/  
  getButtonText(): string {
    return `Switch ${ this.isOn ? 'Off' : 'On' }`;
  }
  setState(): void {
    this.isOn = !this.isOn;
  }
  toggleDetails() {
    this.isOn = !this.isOn;
  }
  /**END */

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceiptsPage');
  }

  callthisReceipt(d){
    let rd = {"id":d.id,"userID":d.userID,"categoryID":d.categoryID,"vendorID":d.vendorID,"billName":d.billName,"name":d.billName,"amount":d.amount,"amountCurrency":d.amountCurrency,"description":d.description,"buyedAt":d.buyedAt,"billNo":d.billNo,"billPDF":d.billPDF,"payedStatus":d.payedStatus,"payedBy":d.payedBy,"time":d.time,"isActive":d.isActive,"created_at":d.created_at,"updated_at":d.updated_at};
    console.log(JSON.stringify(d)+"callthisReceipt()");
    this.navCtrl.push(Receiptsview,rd);
  }

  loadReceipt(){
    let loading = this.loadCtrl.create({
      spinner: 'dots',
      content: `
        <ion-spinner class="loadDataSpin" name="dots"></ion-spinner>`,
      cssClass:'classforspindata'
    });
    loading.present();
    let lData = {
      uid:localStorage.getItem("billmeUID")
    };
    this.rp.findreceipt(lData).then(
    (result)=>{
      console.log(result);
      let dt = JSON.parse(JSON.stringify(result));
      this.bills = dt.data;
      this.bills2 = dt.data;//for fitering records
      if((this.bills).length>0){
        this.billscount=1;
        //console.log(this.billscount);
      }else{
        this.billscount=0;
        //console.log(this.billscount);
      }
      //setTimeout(()=>{
            loading.dismiss();
        //  },8000);
    },
    (error)=>{
      this.billscount=0;
      loading.dismiss();
      console.error(error);
    }
    );
  }

  //filter
  filterlist(){
    this.bills = this.bills2;
  }
  getItems(ev) {
    // Reset items back to all of the items
    this.filterlist();

    // set val to the value of the ev target
    var val = ev.target.value;

    //console.log(val);
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.bills = this.bills.filter((item) => {
        //console.log(item);
        return ((item.billName).toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  convert(ucreated){
    let a = moment(new Date(ucreated)).format("MMM DD, YYYY");
    return a;
  }
}
