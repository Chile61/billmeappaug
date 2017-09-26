import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AlertController } from 'ionic-angular';

import { ToastController } from 'ionic-angular';
import * as jsPDF from 'jspdf';
/**
 * Generated class for the Billviewpdf page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-billviewpdf',
  templateUrl: 'billviewpdf.html',
})
export class Billviewpdf {

  pdfSrc: string;
  page: number;
  titleColor:string;

  pdfname:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public iab: InAppBrowser,
    private emailComposer: EmailComposer,
    public alertCtrl: AlertController,
    private socialSharing: SocialSharing
  ) {
    if(localStorage.getItem('AppTitleColor')){
        this.titleColor = localStorage.getItem('AppTitleColor');
      }else{
        localStorage.setItem('AppTitleColor',"newtitle");
        this.titleColor = 'newtitle';
      }

    this.pdfSrc = this.navParams.get("navpath");
    console.log(this.pdfSrc);
    this.page = 1;
    this.pdfname = this.navParams.get("navbillName");
  }

  ionViewDidLoad() {
    // var doc = new jsPDF;
    // doc.setFontStyle('Bold');
    // doc.setFontSize(14);
    // doc.text(this.pdfname,20,20);
    // var blob = doc.output('blob',{type:'application/pdf'});
    // this.pdfSrc = URL.createObjectURL(blob);
    console.log('ionViewDidLoad Billviewpdf Page');
  }

  fabsendto(){
    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
        //Now we know we can send
        let email = {
          to: 'jai@billme.co.in',
          attachments: [
            'assets/images/logo.png'
          ],
          subject: 'PDF bill generate share',
          body: 'Here is the bill generated in pdf which is name as '+this.pdfname+' find more on <a href="'+this.pdfSrc+'">here</a>',
          isHtml: true
        };
        
        // Send a text message using default options
        this.emailComposer.open(email);
      }
    });
  }

  fabmail(){
    this.socialSharing.canShareViaEmail().then(() => {
      // Share via email
      let body = 'Here is the bill generated in pdf which is name as '+this.pdfname+' find more on link '+this.pdfSrc+'';
      let subject = 'PDF bill generate share';
      let to = 'jai@billme.co.in';
      this.socialSharing.shareViaEmail(body, subject, [to]).then(() => {
        // Success!
      }).catch(() => {
        // Error!
      });
    }).catch(() => {
      // Sharing via email is not possible
    });
  }

  fabgmail(){
    let g = 'com.google.android.gm';
    let body = 'Here is the bill generated in pdf which is name as '+this.pdfname+' find more on given link '+this.pdfSrc+'';
    let subject = 'PDF bill generate share';
    let to = 'jai@billme.co.in';
    let img = 'assets/images/logo.png';
    // Share via email
    this.socialSharing.canShareVia(g,body,subject,img,null).then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }

  fabsms(){
    let msg = 'Here is the bill generated in pdf which is name as '+this.pdfname+' find more on given link '+this.pdfSrc+'';
    let nos = '';
    let prompt = this.alertCtrl.create({
      title: 'Add mobile number!',
      message: "Can add multiple mobile numbers",
      inputs: [
        {
          name: 'mobile',
          placeholder: 'Mobile number to share bill'
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
            nos = data.mobile;
            this.socialSharing.shareViaSMS(msg,nos).then(() => {
              // Success!
            }).catch(() => {
              // Error!
            });
          } 
        }
      ]
    });
    prompt.present();
  }

  fabfb(){
    let msg = 'Here is the bill generated in pdf which is name as '+this.pdfname+' find more on given link '+this.pdfSrc+'';
    let img = 'assets/images/logo.png';
    this.socialSharing.shareViaFacebook(msg, img,null).then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }

  fabtw(){
    let msg = 'Here is the bill generated in pdf which is name as '+this.pdfname+' find more on given link '+this.pdfSrc+'';
    let img = 'assets/images/logo.png';
    this.socialSharing.shareViaEmail(msg, img, null).then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }

  fabwhtsp(){
    let msg = 'Here is the bill generated in pdf which is name as '+this.pdfname+' find more on given link '+this.pdfSrc+'';
    let img = 'assets/images/logo.png';
    this.socialSharing.shareViaWhatsApp(msg,img, null).then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }

  shareit(){
    let toast = this.toastCtrl.create({
      message: 'This feature available soon!',
      duration: 2500,
      position:'middle'
    });
    toast.present();
  }


  seeinbrowser(){
    let path = this.pdfSrc;
    const browser = this.iab.create(path,"_self",{
      location:"yes",
      clearcache:'yes',
      zoom:'yes',
      hardwareback:'yes',
      closebuttoncaption:'OK'
    });
  }
}
