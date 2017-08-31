import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { Categoriesprovider } from '../../providers/categoriesprovider';
import { Receiptsview } from "../receiptsview/receiptsview";

import * as moment from 'moment';
/**
 * Generated class for the Categorybills page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-categorybills',
  templateUrl: 'categorybills.html',
  providers:[Categoriesprovider]
})
export class Categorybills {

  navID:any;
  navName:string;
  navDesc:any;
  navTotal:any;
  navAmount:any;
  catbills:any;catbills2:any;

  titleColor:string;
  cbcount:number;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadCtrl:LoadingController,
    public rp:Categoriesprovider
  ) {
    if(localStorage.getItem('AppTitleColor')){
      this.titleColor = localStorage.getItem('AppTitleColor');
    }else{
      localStorage.setItem('AppTitleColor',"newtitle");
      this.titleColor = 'newtitle';
    }
    this.loadMybills();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Categorybills');
  }

  loadMybills(){
    this.navID = this.navParams.get("catid");
    this.navName = this.navParams.get("catname");
    this.navDesc = this.navParams.get("catdesc");
    this.navTotal = this.navParams.get("cattotal");
    this.navAmount = this.navParams.get("catamount");
    this.loadCategories();
  }

  //load particular categorywise bills
  loadCategories(){
    let loading = this.loadCtrl.create({
      spinner: 'dots',
      content: `
        <ion-spinner class="loadDataSpin" name="dots"></ion-spinner>`,
      cssClass:'classforspindata'
    });
    loading.present();
    let lData = {
      uid:localStorage.getItem("billmeUID"),
      catid:this.navID,
      catname:this.navName
    };
    this.rp.findcategorybills(lData).then(
    (result)=>{
      console.log(result);
      let dt = JSON.parse(JSON.stringify(result));
      if(dt.status == "success"){
        this.catbills = dt.data;
        this.catbills2 = dt.data;
        if((this.catbills).length>0){
          this.cbcount=1;
          //console.log(this.cbcount);
        }else{
          this.cbcount=0;
          //console.log(this.cbcount);
        }
      }else{
        console.log("no categories");
      }
      loading.dismiss();
    },
    (error)=>{
      loading.dismiss();
      console.error(error);
    }
    );
  }

  callthisReceipt(d){
    let rd = {"id":d.id,"userID":d.userID,"categoryID":d.categoryID,"vendorID":d.vendorID,"billName":d.billName,"name":d.billName,"amount":d.amount,"amountCurrency":d.amountCurrency,"description":d.description,"buyedAt":d.buyedAt,"billNo":d.billNo,"billPDF":d.billPDF,"payedStatus":d.payedStatus,"payedBy":d.payedBy,"time":d.time,"isActive":d.isActive,"created_at":d.created_at,"updated_at":d.updated_at};
    console.log(JSON.stringify(d)+"callthisReceipt()");
    this.navCtrl.push(Receiptsview,rd);
  }

  convert(ucreated){
    let a = moment(new Date(ucreated)).format("MMM DD, YYYY");
    return a;
  }

  //filter
  filterlist(){
    this.catbills = this.catbills2;
  }
  getItems(ev) {
    // Reset items back to all of the items
    this.filterlist();

    // set val to the value of the ev target
    var val = ev.target.value;

    //console.log(val);
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.catbills = this.catbills.filter((item) => {
        //console.log(item);
        return ((item.billName).toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}
