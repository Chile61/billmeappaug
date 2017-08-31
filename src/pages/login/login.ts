import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Register } from '../register/register';

import { Loginprovider } from '../../providers/loginprovider';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers:[Loginprovider]
})
export class Login {

  public userimg:string;useractive:number;myuserstyle:any;
  public vendorimg:string;vendoractive:number;myvendorstyle:any;

  public iam:string;
  public email:string;
  public password:string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl:ToastController,
    public loginServ:Loginprovider
    ) {

    this.iam = "...";
    this.userimg = "assets/images/user.png";this.useractive = 0;
    this.vendorimg = "assets/images/vendor.png";this.vendoractive = 0;

    this.myuserstyle = "floralwhite";
    this.myvendorstyle = "floralwhite";

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  /*myuserstyle(){
    const style = `background-color: floralwhite;padding: 15px;border-radius: 40px;`;
    return style;
  }

  myvendorstyle(){
    const style = `background-color: floralwhite;padding: 15px;border-radius: 40px;`;
    return style;
  }*/

  finduser(e){
    //console.log(e);
    /*if(this.vendoractive == 1){
      this.vendoractive = 0;this.vendorimg = "assets/images/vendor.png";
      this.useractive = 1;this.userimg = "assets/images/useractive.png";
    }else{
      this.vendoractive = 0;this.vendorimg = "assets/images/vendor.png";
      this.useractive = 1;this.userimg = "assets/images/useractive.png";
    }*/
    if(this.vendoractive == 1){
      this.vendoractive = 0;this.vendorimg = "assets/images/vendor.png";
      this.myuserstyle = "cyan";
      this.myvendorstyle = "floralwhite";
      this.useractive = 1;this.userimg = "assets/images/useractive.png";
    }
    else{
      this.vendoractive = 0;this.vendorimg = "assets/images/vendor.png";
      this.myuserstyle = "cyan";
      this.myvendorstyle = "floralwhite";
      this.useractive = 1;this.userimg = "assets/images/useractive.png";
    }
    this.iam = "User";
    this.toastCtrl.create({
        message:'I am '+this.iam,
        duration:2000,
        position:'bottom'
      }).present();
      
  }

  findvendor(e){
    //console.log(e);
    /*if(this.useractive == 1){
      this.useractive = 0;this.userimg = "assets/images/user.png";
      this.vendoractive = 1;this.vendorimg = "assets/images/vendoractive.png";
    }else{
      this.useractive = 0;this.userimg = "assets/images/user.png";
      this.vendoractive = 1;this.vendorimg = "assets/images/vendoractive.png";
    }*/
    if(this.useractive == 1){
      this.useractive = 0;this.userimg = "assets/images/user.png";
      this.myuserstyle = "floralwhite";
      this.myvendorstyle = "cyan";
      this.vendoractive = 1;this.vendorimg = "assets/images/vendoractive.png";
    }
    else{
      this.useractive = 0;this.userimg = "assets/images/user.png";
      this.myuserstyle = "floralwhite";
      this.myvendorstyle = "cyan";
      this.vendoractive = 1;this.vendorimg = "assets/images/vendoractive.png";
    }
    this.iam = "Vendor";
    this.toastCtrl.create({
        message:'I am '+this.iam,
        duration:2000,
        position:'bottom'
      }).present();
  }

  DoLogin(){
    if(this.iam == "..." || this.iam == "" || this.iam == null){
      this.toastCtrl.create({
        message:'Should I know who you are?',
        duration:2000,
        position:'top'
      }).present();
    }else if(this.email == "" || this.email == null){
      this.toastCtrl.create({
        message:'Email is empty',
        duration:2000,
        position:'top'
      }).present();
    }else if(this.password == "" || this.password == null){
      this.toastCtrl.create({
        message:'Password is empty',
        duration:2000,
        position:'top'
      }).present();
    }else{
      //console.log(this.iam+' '+this.email+' '+this.password);

      let data = {
        'iam':this.iam,
        'email':this.email,
        'password':this.password
      }
      this.loginServ.loggedIn(data);

    }
  }

  //register 
  goRegister(){
    this.navCtrl.push(Register,{

    });
  }


  
}
//unused