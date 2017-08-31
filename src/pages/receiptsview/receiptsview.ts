import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FileTransfer } from '@ionic-native/file-transfer';
//import { FileUploadOptions } from '@ionic-native/file-transfer';
import { FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { ToastController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { DocumentViewerOptions } from '@ionic-native/document-viewer';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { LoadingController } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';

//import { Billview } from '../billview/billview';
import { Billviewpdf } from '../billviewpdf/billviewpdf';

import { Receiptprovider } from '../../providers/receiptprovider';

import * as moment from 'moment';
declare var cordova:any;
/*
  Generated class for the Receiptsview page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-receiptsview',
  templateUrl: 'receiptsview.html',
  providers:[Receiptprovider]
})
export class Receiptsview {

  titleColor:string;

  navId:number;
  navName:string;
  navuserID:number;navcategoryID:number;navvendorID:number;
  navbillName:any;navamount:any;navamountCurrency:any;
  navdescription:any;navbuyedAt:any;navbillNo:any;
  navbillPDF:any;navpayedStatus:string;navpayedBy:string;
  navtime:any;navisActive:string;navcreated_at:any;navupdated_at:any;

  isImg:boolean;isPdf:boolean;

  toDownload:boolean;
  navbillPDFOnlyforPDF:any;
  
  constructor(
    public navCtrl: NavController, 
    public toastCtrl:ToastController,
    public transfer: FileTransfer, 
    public file: File,
    public localNotifications: LocalNotifications,
    public loadCtrl:LoadingController,
    public document: DocumentViewer,
    public navParams: NavParams,
    public iab: InAppBrowser,
    public rp:Receiptprovider,
    public photoViewer:PhotoViewer
    ) {
      if(localStorage.getItem('AppTitleColor')){
        this.titleColor = localStorage.getItem('AppTitleColor');
      }else{
        localStorage.setItem('AppTitleColor',"newtitle");
        this.titleColor = 'newtitle';
      }

      this.loadNavVals();

    }

  //const fileTransfer: FileTransferObject = this.transfer.create();

  ionViewDidLoad() {
    //let time = moment().format('HH:mm:ss');

    console.log('ionViewDidLoad ReceiptsviewPage');
    this.file.checkDir(this.file.externalRootDirectory, 'Billme')
    .then(
      _ => console.log('Directory exists')
    )
    .catch(
      
      err => console.log('Directory doesnt exist')
    );
    this.file.createDir(this.file.externalRootDirectory, 'Billme',false)
    .then(
      _ => console.log('created directory')
    )
    .catch(
      err => console.log('not created Directory')
    );

    this.file.createDir(this.file.externalRootDirectory+'Billme', 'Bills',false)
    .then(
      _ => console.log('created directory')
    )
    .catch(
      err => console.log('not created Directory')
    );
  }

  loadNavVals(){
    this.navuserID = this.navParams.get("userID");
    this.navcategoryID = this.navParams.get("categoryID");
    this.navvendorID = this.navParams.get("vendorID");
    this.navbillName = this.navParams.get("billName");
    this.navamount = this.navParams.get("amount");
    this.navamountCurrency = this.navParams.get("amountCurrency");
    this.navdescription = this.navParams.get("description");
    this.navbuyedAt = this.navParams.get("buyedAt");
    this.navbillNo = this.navParams.get("billNo");
    //this.navbillPDF = this.navParams.get("billPDF")?this.navParams.get("billPDF"):"assets/images/logo.png";
    this.navpayedStatus = this.navParams.get("payedStatus");
    this.navpayedBy = this.navParams.get("payedBy");
    this.navtime = this.navParams.get("time");
    this.navisActive = this.navParams.get("isActive");
    this.navcreated_at = this.navParams.get("created_at");
    this.navupdated_at = this.navParams.get("updated_at");
    this.navId = this.navParams.get("id");
    this.navName = this.navParams.get("name");
    console.warn(this.navId+" "+this.navName);

    //this.navbillPDF = this.navParams.get("billPDF")?this.navParams.get("billPDF"):"assets/images/logo.png";
    let im = this.navParams.get("billPDF");
    let liof = im.substr(im.lastIndexOf("/"));
    let spl = liof.split(".");let pic = spl[1];
    if(pic == "pdf" || pic == "PDF" || pic == "DOC" || pic == "doc" || pic == "docx" || pic == "DOCX"){
      this.isPdf = true;this.isImg = false;
      this.navbillPDF = this.navParams.get("billPDF");
      if(im.search("http") == -1){
        this.toDownload = false;
        this.navbillPDFOnlyforPDF = "assets/images/No_image_available.png";
      }else{
        this.toDownload = true;
        this.navbillPDFOnlyforPDF = "assets/images/ic_pdf.png";//this.navbillPDF;
      }
      
      


    }else{
      this.isPdf = false;this.isImg = true;
      if(im.search("http") == -1){
        this.toDownload = false;
        this.navbillPDF = "assets/images/No_image_available.png";
      }else{
        this.toDownload = true;
        this.navbillPDF = this.navParams.get("billPDF")?this.navParams.get("billPDF"):"assets/images/logo.png";  
      }


      //test
      /*let d1 = localStorage.getItem("billmeUID");
      let d2 = this.navbillPDF;
      let d3 = localStorage.getItem("billmeUToken");
      let d4 = this.navId;
      this.rp.uploadAndMakePdf(d1,d2,d3,d4).then(
        (result)=>{
          console.log(JSON.stringify(result));
        },
        (error)=>{
          console.error(error);
        }
      );*/
      //end
      
    }
  }

  openEditBill(){
    this.navCtrl.push(Receiptsview,{
      id:this.navId,
      name:this.navName
    })
  }

  download(){//works
    //const fs:string = cordova.file.externalRootDirectory+"Billme";

    let loading = this.loadCtrl.create({ 
      content: 'Downloading...'
    });
    loading.present();
    const fileTransfer: FileTransferObject = this.transfer.create();//important
    let url = this.navbillPDF;
    let time = "_"+moment().format('HH:mm:ss')+"_"+this.navbuyedAt+"_"+localStorage.getItem("billmeUser");
    let name = "Bill_"+time+".pdf";
    //var fileTransfer = new Transfer();
    //let path = cordova.file.externalRootDirectory+"Billme/" + name;
    this.localNotifications.schedule({
        id: 1,
        title:'Downloading Bill...',
        icon: 'assets/images/logo.png',
        smallIcon: 'assets/images/logo.png'
      });
    
      if(this.isImg){
        let base64;
        /*cordova.plugins.pdf.htmlToPDF({
                data: "<html><style>.pdfdiv{height:100%;width:100%;text-align:center;}"+
                 ".pdfimg{padding:5%;margin-top:5%}</style> <div class='pdfdiv'><img class='pdfimg' src="+this.navbillPDF+"></div> </html>"//,
                //url: "www.cloud.org/template.html" 
            },
            (sucess) => localStorage.setItem("billbase64",sucess),
            (error) => localStorage.setItem("billbase64",error));
            */
        //setTimeout(()=>{ 
          base64 = this.navbillPDF;//localStorage.getItem("billbase64");
          url = base64;//"data:application/pdf;base64,"+base64;
          let d1 = localStorage.getItem("billmeUID");
          let d2 = url;
          let d3 = localStorage.getItem("billmeUToken");
          let d4 = this.navId;
          this.rp.uploadAndMakePdf(d1,d2,d3,d4).then(
            (result)=>{
              let dt = JSON.parse(JSON.stringify(result));
              if(dt.status == "success"){
                let path = dt.path;
               //loading.dismiss();
               //alert(JSON.stringify(result));
                fileTransfer.download(path, cordova.file.externalRootDirectory+"Billme/Bills/" + name).then((entry) => {
                  //console.log('download complete: ' + entry.toURL());
                  
                  this.toastCtrl.create({
                        message:"Downloaded successfully! Saved in storage.",
                        duration:2000,
                        position:'middle'
                      }).present();
                      //alert(JSON.stringify(entry));
                  this.localNotifications.schedule({
                    id: 1,
                    title:'Bill Download completed!',
                    text: 'Saved at Billme folder '+name,
                    icon: 'assets/images/logo.png',
                    smallIcon: 'assets/images/logo.png'
                  });
                }, (error) => {
                  //loading.dismiss();
                  this.toastCtrl.create({
                        message:"Bill can not be downloaded, try again later.",
                        duration:2000,
                        position:'top'
                      }).present();
                      //alert(JSON.stringify(error));
                      this.localNotifications.schedule({
                        id: 1,
                        title:'Bill not able to download completely, try again',
                        icon: 'assets/images/logo.png',
                        smallIcon: 'assets/images/logo.png'
                      });
                });
              }else{
                //loading.dismiss();
                this.toastCtrl.create({
                        message:"Bill can not be downloaded, try again.",
                        duration:2000,
                        position:'top'
                      }).present();
              }
              loading.dismiss();
            },
            (error)=>{
              loading.dismiss();
              //alert(JSON.stringify(error));
              this.toastCtrl.create({
                    message:"Bill can not be downloaded, Try again.",
                    duration:2000,
                    position:'top'
                  }).present();
            }
          );
        //},1500);
        
        //loading.dismiss();
      }
      if(this.isPdf){
        url = this.navbillPDF;
        fileTransfer.download(url, cordova.file.externalRootDirectory+"Billme/Bills/" + name).then((entry) => {
          //console.log('download complete: ' + entry.toURL());
          loading.dismiss();
          this.toastCtrl.create({
                message:"Downloaded successfully! Saved in storage.",
                duration:2000,
                position:'middle'
              }).present();
              //alert(JSON.stringify(entry));
          this.localNotifications.schedule({
            id: 1,
            title:'Bill Download completed!',
            text: 'Saved at Billme folder '+name,
            icon: 'assets/images/logo.png',
            smallIcon: 'assets/images/logo.png'
          });
        }, (error) => {
          loading.dismiss();
          this.toastCtrl.create({
                message:"Bill can not be downloaded, try again.",
                duration:2000,
                position:'top'
              }).present();
              //alert(JSON.stringify(error));
              this.localNotifications.schedule({
                id: 1,
                title:'Bill not able to download completely, try again',
                icon: 'assets/images/logo.png',
                smallIcon: 'assets/images/logo.png'
              });
        });
      }
        
  }
  download2(){
    /*this.navCtrl.push(Billview,{
      name:this.navbillName+' '+this.navbuyedAt,
      image:this.navbillPDF
    });*/
    const fileTransfer: FileTransferObject = this.transfer.create();
    const url = this.navbillPDF;
    let name = "Bill_"+this.navbillNo+this.navbuyedAt+".pdf";
    //var fileTransfer = new Transfer();
    let path = this.file.dataDirectory + name;
    fileTransfer.download(url, this.file.dataDirectory + name).then((entry) => {
      //console.log('download complete: ' + entry.toURL());
      this.toastCtrl.create({
            message:"Download completed!",
            duration:2500,
            position:'middle'
          }).present();
      this.localNotifications.schedule({
        id: 1,
        title:'Bill Download completed!',
        text: 'Saved bill '+name+' at '+path,
        icon: 'assets/images/logo.png'
      });
    }, (error) => {
      this.toastCtrl.create({
            message:"Bill can not be downloaded, try again.",
            duration:2000,
            position:'top'
          }).present();
    });
  }

  viewfull(){
    /*this.navCtrl.push(Billview,{
      name:this.navbillName+' '+this.navbuyedAt,
      image:this.navbillPDF
    });*/
    let name = this.navbillName+' '+this.navbuyedAt;
    this.photoViewer.show(this.navbillPDF, name, {share: true});
  }

  convert(ucreated){
    let a = moment(new Date(ucreated)).format("MMM DD, YYYY");
    return a;
  }

  viewpdf2(){
    const options: DocumentViewerOptions = {
      title: 'Bill '+this.navbillName,
      email: {enabled:true},
      print:{enabled:true}
    }

    //let url = "Bill_"+this.navbillNo+this.navbuyedAt+".pdf";
    let path = this.navbillPDF;
    this.document.viewDocument(path, 'application/pdf', options);
  }

  viewpdf1(){
    let path = "https://docs.google.com/viewerng/viewer?url="+this.navbillPDF;
    const browser = this.iab.create(path,"_self",{
      location:"yes",
      clearcache:'yes',
      zoom:'yes',
      hardwareback:'yes',
      closebuttoncaption:'OK'
    });

    browser.show();
  }
  
  viewpdf(){//works
    let path = this.navbillPDF;
    this.navCtrl.push(Billviewpdf,{
      navpath:path
    });
  }
  
}
