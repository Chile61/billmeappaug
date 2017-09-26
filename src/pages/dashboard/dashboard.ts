import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { Receiptprovider } from '../../providers/receiptprovider';
import { Receiptsview } from "../receiptsview/receiptsview";
import { Billviewpdf } from '../billviewpdf/billviewpdf';

import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';

import * as moment from 'moment';
declare var cordova:any;
/*
  Generated class for the Dashboard page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  providers:[Receiptprovider]
})
export class Dashboard {
  titleColor:string;
  billmeuser:string;

  duebills:any;
  expenditure:any;ebillreceived:any;totalduebill:any;
  mostrecent:any;
  deals:any;

  mostrecentcount:number;duebillscount:number;dealscount:number;

  pic:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadCtrl:LoadingController,
    public rp:Receiptprovider,
    public iab: InAppBrowser,
    public photoViewer:PhotoViewer,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
  ) {
      if(localStorage.getItem('AppTitleColor')){
        this.titleColor = localStorage.getItem('AppTitleColor');
      }else{
        localStorage.setItem('AppTitleColor',"newtitle");
        this.titleColor = 'newtitle';
      }
      
      this.pic = "assets/images/person.png";
  }

  ionViewDidLoad() {
    this.pic = localStorage.getItem("billmeProfilePic");
    console.log('ionViewDidLoad DashboardPage HomePage');
    this.billmeuser = localStorage.getItem("billmeUser");
    this.loadData();
  }

  loadData(){
    let loading = this.loadCtrl.create({
      spinner: 'dots',
      content: `
        <ion-spinner class="loadDataSpin" name="dots"></ion-spinner>`,
      cssClass:'classforspindata',
      duration:8000

    });
    loading.present();

    this.rp.loadDashboardData().then(
      data=>{
        //console.info(data);
        let d = JSON.parse(JSON.stringify(data));
        if(d.status=="success"){

          let profilepic = d.profilepic;
          if(profilepic == null || profilepic == ""){
            this.pic = "assets/images/person.png";
            localStorage.setItem("billmeProfilePic","assets/images/person.png");
          }else{ 
            localStorage.setItem("billmeProfilePic",profilepic);
            this.pic = profilepic;
          }

          let exp = d.expenditure;
          if(exp == null || exp == "00.00"){
            this.expenditure = "00.00";
            localStorage.setItem("billmeExpenditure","0");
          }else{
            this.expenditure = exp;
            localStorage.setItem("billmeExpenditure",this.expenditure);
          }
          let ebr = d.ebillreceived;
          if(ebr == null || ebr == "0"){
            this.ebillreceived = "0";
          }else{
            this.ebillreceived =  ebr;
          }
          let tdb = d.totalduebill;
          if(tdb == null || tdb == "0"){
            this.totalduebill = "0";
          }else{
            this.totalduebill =  tdb;
          }
          
          this.deals = d.deals;
          if((this.deals).length>0){
            this.dealscount=1;//duebillscount:number;dealscount:number;
            //console.log(this.dealscount);
          }else{
            this.dealscount=0;
            //console.log(this.dealscount);
          }

          this.mostrecent = d.mostrecent;
          if((this.mostrecent).length>0){
            this.mostrecentcount=1;//duebillscount:number;dealscount:number;
            //console.log(this.mostrecentcount);
          }else{
            this.mostrecentcount=0;
            //console.log(this.mostrecentcount);
          }
          //console.log(this.mostrecent);


          this.duebills = d.duebill;
          if((this.duebills).length>0){
            this.duebillscount=1;
            //console.log(this.duebillscount);
          }else{
            this.duebillscount=0;
            //console.log(this.duebillscount);
          }
          //console.log(this.duebills);

          //setTimeout(()=>{
            //loading.dismiss();
          //},8000);
        }else{
          this.expenditure = "00.00";
          this.ebillreceived = "0";
          this.totalduebill = "0";
          this.dealscount=0;
          this.mostrecentcount=0;
          this.duebillscount=0;
          //loading.dismiss();
          console.log("No bills right now available");
        }
        loading.dismiss();
      },
      error=>{
        this.expenditure = "00.00";
        this.ebillreceived = "0";
        this.totalduebill = "0";
        this.dealscount=0;
        this.mostrecentcount=0;
        this.duebillscount=0;
        loading.dismiss();
        console.error(error+"\t error");
      }
    );
  }

  //open bills accordingly
  openBillold(d){
    let rd = {"id":d.id,"userID":d.userID,"categoryID":d.categoryID,"vendorID":d.vendorID,"billName":d.billName,"name":d.billName,"amount":d.amount,"amountCurrency":d.amountCurrency,"description":d.description,"buyedAt":d.buyedAt,"billNo":d.billNo,"billPDF":d.billPDF,"payedStatus":d.payedStatus,"payedBy":d.payedBy,"time":d.time,"isActive":d.isActive,"created_at":d.created_at,"updated_at":d.updated_at};
    console.log(JSON.stringify(d)+"callthisReceipt()");
    this.navCtrl.push(Receiptsview,rd);
  }

  convert(ucreated){
    let a = moment(new Date(ucreated)).format("MMM DD, YYYY");
    return a;
  }

  makepdf(){
    const before = Date.now();
 
    //document.addEventListener('deviceready', () => {
        console.log('DEVICE READY FIRED AFTER', (Date.now() - before), 'ms');

        //generate the pdf. 
        let base64;let b4;
        cordova.plugins.pdf.htmlToPDF({
                data: "<html><h1>I am visible in pdf</h1></html>",
                //url: "www.cloud.org/template.html" 
            },
            (sucess) => { 
              b4 = sucess;
              localStorage.setItem("billbase64",sucess);
              let path = "data:application/pdf;base64,"+b4;
              this.navCtrl.push(Billviewpdf,{
                navpath:path
              });
            },
            (error) => {
              b4 = error;
              localStorage.setItem("billbase64",error);
          });
        
            base64 = localStorage.getItem("billbase64");
        let url = "data:application/pdf;base64,"+b4;
        //setTimeout(()=>{
          /*alert(url);
          const browser = this.iab.create(url,"_self",{
            location:"yes",
            clearcache:'yes',
            zoom:'yes',
            hardwareback:'yes',
            closebuttoncaption:'OK'
          });

          browser.show();*/
        //},5000);
        
    //});
  }

  becomevendor(){
    let prompt = this.alertCtrl.create({
      title: 'Become an vendor',
      message: "Add  a email id to become an vendor",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email address'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            console.log(data);
            let toast = this.toastCtrl.create({
              message: 'Ok we contact you soon on email id '+data.email+'!',
              duration: 2500,
              position:'middle'
            });
            toast.present();
          }
        }
      ]
    });
    prompt.present();
  }


  //24sep2017
  openBill(d){
    let im = d.billPDF;
    let liof = im.substr(im.lastIndexOf("/"));
    let spl = liof.split(".");let pic = spl[1];
    if(pic == "pdf" || pic == "PDF" || pic == "DOC" || pic == "doc" || pic == "docx" || pic == "DOCX"){
      //pdf
      let path = im;
      let bname = d.billName+' '+d.buyedAt;
      this.navCtrl.push(Billviewpdf,{
        navpath:path,
        navbillName:bname
      });
    }else{
      //image
      let name = d.billName+' '+d.buyedAt;
      this.photoViewer.show(d.billPDF, name, {share: true});
    }
  }

  seepdfdsb(){
    let im = 'assets/pdf/ca.pdf';//'http://koperkhairne.com/billme_dev/billmemobileapp/storage/app/public/dfgewef/Bills/Bill_22:11:59_2017-08-30.pdf';
    let liof = im.substr(im.lastIndexOf("/"));
    let spl = liof.split(".");let pic = spl[1];
    if(pic == "pdf" || pic == "PDF" || pic == "DOC" || pic == "doc" || pic == "docx" || pic == "DOCX"){
      //pdf
      let path = im;
      let bname = 'asdfsdfdsfsd';
      this.navCtrl.push(Billviewpdf,{
        navpath:path,
        navbillName:bname
      });
    }else{
      //image
      let name = 'adsfdsfdsf';
      this.photoViewer.show(im, name, {share: true});
    }
  }

  
}
