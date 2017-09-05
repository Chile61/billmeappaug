import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import  FORM_DIRECTIVES  from '@angular/forms';

import { Loginprovider } from '../../providers/loginprovider';
import { Mainprovider } from '../../providers/mainprovider';

//import { Dashboard } from '../dashboard/dashboard';
import { MyApp } from '../../app/app.component';

/**
 * Generated class for the Signup page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  providers:[Loginprovider,Mainprovider]
})
export class Signup {

  signup: string = "signin";

  public userimg:string;useractive:number;myuserstyle:any;
  public vendorimg:string;vendoractive:number;myvendorstyle:any;

  //Login params
  public iam:string;
  public username:string;
  public password:string;

  //Register params
  public regname:string;
  public regpassword:string;
  public reggender:string;
  public regemail:string;
  public regaddress:string;
  public regagree:boolean;
  public regData:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl:ToastController,
    public loginServ:Loginprovider,
    public loadCtrl:LoadingController,
    public mp:Mainprovider,
    public viewCtrl:ViewController
  ) {
        this.iam = "...";
    this.userimg = "assets/images/user.png";this.useractive = 0;
    this.vendorimg = "assets/images/vendor.png";this.vendoractive = 0;

    this.myuserstyle = "floralwhite";
    this.myvendorstyle = "floralwhite";

    this.generateapi();//generate first api key
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Signup');
    let lang = 'en';
    localStorage.setItem("billmeAppLanguage",lang);
  }

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
    localStorage.setItem("billmeCandidateType","u");
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
    localStorage.setItem("billmeCandidateType","v");
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
    }else if(this.username == "" || this.username == null){
      this.toastCtrl.create({
        message:'username is empty',
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
        //'iam':this.iam,
        'username':this.username,
        'password':this.password
      }
      let loading = this.loadCtrl.create({ 
        content: 'Signin...'
      });

      loading.present();
      this.loginServ.loggedIn(data)
      .then((res)=>{
        console.log(res);
        loading.dismiss();
        let ans = JSON.parse(JSON.stringify(res));
        if(ans.status == "success"){
          let loading2;
          let ud = JSON.parse(JSON.stringify(ans.data));
          localStorage.setItem("billmeUID",ud.id);
          localStorage.setItem("billmeUser",this.username);
          localStorage.setItem("billmePass",this.password);
          localStorage.setItem("billmeUToken",ud.uToken);
          let pic =  ud.profilePic?ud.profilePic:'assets/images/person.png';
          localStorage.setItem("billmeProfilePic",pic);
          localStorage.setItem("billmeIn","Y");
          loading2 = this.loadCtrl.create({
              content: 'Loading your assets...',
              duration: 2000
            });
          loading2.present();
          setTimeout(()=>{
            /*loading2.dismiss();
            if(loading2.dismiss() == true){*/
              //this.viewCtrl.dismiss();
              this.navCtrl.push(MyApp);
            //}
          },2005);
        }else{
          this.toastCtrl.create({
            message:ans.message,
            duration:2000,
            position:'top'
          }).present();
        }
      },(err)=>{
        localStorage.setItem("billmeIn","N");
        let d = JSON.parse(JSON.stringify(err));
        if(d.ok == false){
          this.toastCtrl.create({
            message:'Unable to login try again!',
            duration:2000,
            position:'top'
          }).present();
        }
        console.error(err);
        loading.dismiss();
      });

    }
  }

  //Registration
  DoRegister(){
    //this.regname = (<HTMLInputElement>document.getElementById('regUsername')).value;
    //console.log(this.regname+" "+(<HTMLInputElement>document.getElementById('regUsername')).value+" p:"+this.regpassword);
    console.log(this.regagree+" "+this.regaddress+" "+this.reggender+" "+this.regemail+" "+this.regpassword+" "+this.regname);
    if(this.iam == "..." || this.iam == "" || this.iam == null){
      this.toastCtrl.create({
        message:'Should I know who you are?',
        duration:2000,
        position:'top'
      }).present();
    }else if(this.regname == "" || this.regname == null){
      this.toastCtrl.create({
        message:'Username is required',duration:2000,position:'top'
      }).present();
    }else if(this.regpassword == "" || this.regpassword == null){
      this.toastCtrl.create({
        message:'Password is required',duration:2000,position:'top'
      }).present();
    }else if(this.reggender == "" || this.reggender == null){
      this.toastCtrl.create({
        message:'Gender is required',duration:2000,position:'top'
      }).present();
    }else if(this.regemail == "" || this.regemail == null){
      this.toastCtrl.create({
        message:'Email is required',duration:2000,position:'top'
      }).present();
    }else if(this.regaddress == "" || this.regaddress == null){
      this.toastCtrl.create({
        message:'Address is required',duration:2000,position:'top'
      }).present();
    }else if(this.regagree == false){
      this.toastCtrl.create({
        message:'You should agree with terms and condition',duration:2000,position:'top'
      }).present();
    }else if((this.regpassword).length < 6){
      this.toastCtrl.create({
        message:'Password should be 6 chars long!',duration:2000,position:'top'
      }).present();
    }else{
      console.log(this.regagree+" "+this.regaddress+" "+this.reggender+" "+this.regemail+" "+this.regpassword+" "+this.regname);
      let regData = {
        'agree':this.regagree,
        'username':this.regname,
        'pass':this.regpassword,
        'gender':this.reggender,
        'email':this.regemail,
        'address':this.regaddress,
        'time':new Date()
      };
      let loading = this.loadCtrl.create({ 
        content: 'Registering...'
      });
      this.loginServ.register(regData).then(
        (res)=>{
          loading.dismiss();
          console.info(JSON.stringify(res));
          let ans = JSON.parse(JSON.stringify(res));
          if(ans.status == "success"){
            this.toastCtrl.create({
              message:ans.message,
              duration:2000,
              position:'middle'
            }).present();
            let loading2;
            let ud = JSON.parse(JSON.stringify(ans.data));
            localStorage.setItem("billmeUID",ud.id);
            localStorage.setItem("billmeUser",this.regname);
            localStorage.setItem("billmePass",this.regpassword);
            localStorage.setItem("billmeIn","Y");
            setTimeout(()=>{
              loading2 = this.loadCtrl.create({
                content: 'Finalizing your assets...',
                duration: 2000
              });
              loading2.present();
            },2005);
            setTimeout(()=>{
                this.navCtrl.push(MyApp);
            },4010);
          }else{
            this.toastCtrl.create({
              message:ans.message,
              duration:2000,
              position:'top'
            }).present();
          }
        },
        (err)=>{
          console.error(JSON.stringify(err));
          loading.dismiss();
          this.toastCtrl.create({
              message:'Network temporary unvailable!',
              duration:2000,
              position:'top'
            }).present();
        }
      );
    }
  }
  findreg(regData){//server call method
    
  }
  //END

  //generatekey
  generateapi(){
    if(localStorage.getItem('ApiKey') == "" ||  localStorage.getItem('ApiKey') == null || !localStorage.getItem('ApiKey')){
      console.log("not generated");
      //only make url
      //make token
      /*
      this.mp.generateApiKey().then(
        data=>{ 
          console.info(data);
          let d = JSON.parse(JSON.stringify(data));
          console.log(d.status);  
          if(d.status == "success"){
            localStorage.setItem("ApiKey",d.ApiKey);
            //var ap = localStorage.getItem("appUrl")+"/"+d.ApiKey;
            //localStorage.setItem("appUrl",ap);
            //console.log(localStorage.getItem("appUrl"));
          } 
          else{
            localStorage.setItem("ApiKey","no-api-key-found");
          }
          //alert(localStorage.getItem('ApiKey')+" "+JSON.stringify(data));
        },
        error=>{
          //alert(JSON.stringify(error));
          console.error(error);
        }
      );
      */
      //end
      
      this.mp.registerdevice().then(
        res=>{
          let d = JSON.parse(JSON.stringify(res));
          console.log(d.status);  
          if(d.status == "success"){
            //make token
            this.mp.generateApiKey().then(
              data=>{ 
                console.info(data);
                let d = JSON.parse(JSON.stringify(data));
                console.log(d.status);  
                if(d.status == "success"){
                  localStorage.setItem("ApiKey",d.ApiKey);
                } 
                else{
                  localStorage.setItem("ApiKey","no-api-key-found");
                }
                //alert(localStorage.getItem('ApiKey')+" "+JSON.stringify(data));
              },
              error=>{
                //alert(JSON.stringify(error));
                console.error(error);
              }
            );
            //end
          }else{
            //make token
            this.mp.generateApiKey().then(
              data=>{ 
                console.info(data);
                let d = JSON.parse(JSON.stringify(data));
                console.log(d.status);  
                if(d.status == "success"){
                  localStorage.setItem("ApiKey",d.ApiKey);
                  //var ap = localStorage.getItem("appUrl")+"/"+d.ApiKey;
                  //localStorage.setItem("appUrl",ap);
                  //console.log(localStorage.getItem("appUrl"));
                } 
                else{
                  localStorage.setItem("ApiKey","no-api-key-found");
                }
                //alert(localStorage.getItem('ApiKey')+" "+JSON.stringify(data));
              },
              error=>{
                //alert(JSON.stringify(error));
                console.error(error);
              }
            );
            //end
            console.error("Failed to register device.");  
          }
        },
        err=>{
          console.error("Failed to register device due to "+JSON.stringify(err));
        }
      );
      
    }else{
      console.log("already generated "+localStorage.getItem('ApiKey') +" "+new Date());
    }
  }

  //forgotpassword
  forgotpassword(){
    console.log("doing on that!");
  }
}
