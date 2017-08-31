import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Billviewpdf');
  }

}
