import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { Categoriesprovider } from '../../providers/categoriesprovider';
import { Categorybills } from '../categorybills/categorybills';
/**
 * Generated class for the Categories page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
  providers:[Categoriesprovider]
})
export class Categories {

  titleColor:string;
  category:any;category2:any;
  categorycount:number;
  private isOn: boolean = false;
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
      this.loadCategories();
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
    console.log('ionViewDidLoad Categories');
  }

  loadCategories(){
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
    this.rp.findcategories(lData).then(
    (result)=>{
      console.log(result);
      let dt = JSON.parse(JSON.stringify(result));
      if(dt.status == "success"){
        this.category = dt.data;
        this.category2 = dt.data;//for fitering records
        if((this.category).length>0){
          this.categorycount=1;
          //console.log(this.categorycount);
        }else{
          this.categorycount=0;
          //console.log(this.categorycount);
        }
      }else{
        this.categorycount=0;
        console.log("no categories");
      }
      loading.dismiss();
    },
    (error)=>{
      this.categorycount=0;
      loading.dismiss();
      console.error(error);
    }
    );
  }

  checkcategories(c){
    console.log(JSON.stringify(c));
    let pd = {
      catid:c.id,
      catname:c.name,
      catdesc:c.description,
      cattotal:c.total,
      catamount:c.amount
    }
    this.navCtrl.push(Categorybills,pd);
  }

  //filter
  filterlist(){
    this.category = this.category2;
  }
  getItems(ev) {
    // Reset items back to all of the items
    this.filterlist();

    // set val to the value of the ev target
    var val = ev.target.value;

    //console.log(val);
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.category = this.category.filter((item) => {
        //console.log(item);
        return ((item.name).toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}
