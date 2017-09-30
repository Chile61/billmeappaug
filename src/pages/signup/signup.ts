import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { App,ViewController } from 'ionic-angular';
import { Nav, Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import  FORM_DIRECTIVES  from '@angular/forms';

import { Loginprovider } from '../../providers/loginprovider';
import { Mainprovider } from '../../providers/mainprovider';

import { Ccountries } from '../services/ccountries';

//import { Dashboard } from '../dashboard/dashboard';
import { MyApp } from '../../app/app.component';

import { Signupcountries } from '../signupcountries/signupcountries';


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
  providers:[Loginprovider,Mainprovider,Ccountries]
})
export class Signup {

  @ViewChild(Nav) nav: Nav;

  signup: string = "signin";

  contentPageMenu:boolean = false;

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
  public regphone:any;
  public regpasswordconfirm:any;
  public ccountries:any;
  public countrychoosen:any = "";
  public countrychoosencode:any;

  public processsignup:boolean = true;
  public processcode:boolean = false;
  public processdone:boolean = false;

  public regregkey:number;

  public processcodeform:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl:ToastController,
    public loginServ:Loginprovider,
    public loadCtrl:LoadingController,
    public mp:Mainprovider,
    public viewCtrl:ViewController,
    public appCtrl:App,
    public alertCtrl: AlertController,
    public menuCtrl: MenuController,
    public CC:Ccountries,
    public formBuilder: FormBuilder
  ) {
    this.menuCtrl.enable(false, 'myMenu');
    this.contentPageMenu = false;
    this.menuCtrl.swipeEnable(false, 'myMenu');

        this.iam = "...";
    this.userimg = "assets/images/user.png";this.useractive = 0;
    this.vendorimg = "assets/images/vendor.png";this.vendoractive = 0;

    this.myuserstyle = "floralwhite";
    this.myvendorstyle = "floralwhite";

    localStorage.setItem("billmeCandidateType","u");
    this.generateapi();//generate first api key

    this.processcodeform = formBuilder.group({
      regregkey:['', Validators.compose([Validators.maxLength(6), Validators.pattern('[0-9]*'), Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Signup');
    this.ccountries = this.CC.listallcountries();
    let lang = 'en';
    localStorage.setItem("billmeAppLanguage",lang);
    this.menuCtrl.enable(false, 'myMenu');
    this.contentPageMenu = false;
    this.menuCtrl.swipeEnable(false, 'myMenu');
    this.menuCtrl.swipeEnable(false);
    this.countrychoosen = localStorage.getItem("BillMeUserCountryName");
    this.countrychoosencode = localStorage.getItem("BillMeUserCountryCode");
    setTimeout(()=>{
      this.menuCtrl.enable(false, 'myMenu');
      this.contentPageMenu = false;
      this.menuCtrl.swipeEnable(false, 'myMenu');
      this.menuCtrl.swipeEnable(false);
      console.log("called after 2000");
    },1000);
  }

  chooseCountry(){
    let ccode = this.countrychoosen;
    console.log(ccode);
    //this.navCtrl.push(Signupcountries,{});
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
    // if(this.iam == "..." || this.iam == "" || this.iam == null){
    //   this.toastCtrl.create({
    //     message:'Should I know who you are?',
    //     duration:2000,
    //     position:'top'
    //   }).present();
    // }else 
    if(this.username == "" || this.username == null){
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
          let fnname = ud.firstname;
          if(fnname == "" || fnname == null){
            fnname = "there";
          }
          localStorage.setItem("billmeFirstname",fnname);
          localStorage.setItem("billmeUser",this.username);
          localStorage.setItem("billmePass",this.password);
          localStorage.setItem("billmeUserEmail",ud.email);
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
              //this.navCtrl.push(MyApp);
              this.donecall();
            //}
          },2005);
        }else if(ans.status == "already"){
          this.toastCtrl.create({
            message:ans.message,duration:2000,position:'top'
          }).present();

          let ud = JSON.parse(JSON.stringify(ans.data));
          localStorage.setItem("billmeUID",ud.id);
          let fnname = ud.firstname;
          if(fnname == "" || fnname == null){
            fnname = "there";
          }
          localStorage.setItem("billmeFirstname",fnname);
          localStorage.setItem("billmeUser",this.username);
          localStorage.setItem("billmePass",this.password);
          localStorage.setItem("billmeUserEmail",ud.email);
          this.regemail = ud.email;
          localStorage.setItem("billmeUToken",ud.uToken);
          let pic =  ud.profilePic?ud.profilePic:'assets/images/person.png';
          localStorage.setItem("billmeProfilePic",pic);

          let loading2;
          setTimeout(()=>{
            this.loadCtrl.create({
              content: 'Resending Registration Key...',
              duration: 1000
            }).present();
            this.resendmailfromlogin();
          },2500);
          
          
          
          setTimeout(()=>{
            this.processsignup = false;
            this.processcode = true;
            this.processdone = false;
          },3010);
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
    //console.log(this.regagree+" "+this.regaddress+" "+this.reggender+" "+this.regemail+" "+this.regpassword+" "+this.regname);
    console.log(this.regagree+" "+this.regphone+" "+this.regemail+" "+this.regpassword+" "+this.regname+" "+this.regpasswordconfirm);
    // if(this.iam == "..." || this.iam == "" || this.iam == null){
    //   this.toastCtrl.create({
    //     message:'Should I know who you are?',
    //     duration:2000,
    //     position:'top'
    //   }).present();
    // }else 
    if(this.regname == "" || this.regname == null){
      this.toastCtrl.create({
        message:'Username is required',duration:2000,position:'top'
      }).present();
    }else if(this.regpassword == "" || this.regpassword == null){
      this.toastCtrl.create({
        message:'Password is required',duration:2000,position:'top'
      }).present();
    }else if(this.regpasswordconfirm == "" || this.regpasswordconfirm == null){
      this.toastCtrl.create({
        message:'Confirm Password is required',duration:2000,position:'top'
      }).present();
    }else if(this.regpasswordconfirm != this.regpassword){
      this.toastCtrl.create({
        message:'Hey password is not matched!',duration:2000,position:'top'
      }).present();
    }else if(this.regphone == "" || this.regphone == null){
      this.toastCtrl.create({
        message:'Phone number is required',duration:2000,position:'top'
      }).present();
    }
    else if((this.regphone).toString().length != 10){
      this.toastCtrl.create({
        message:'Phone number is invalid',duration:2000,position:'top'
      }).present();
    }
    // else if(this.reggender == "" || this.reggender == null){
    //   this.toastCtrl.create({
    //     message:'Gender is required',duration:2000,position:'top'
    //   }).present();
    // }
    else if(this.regemail == "" || this.regemail == null){
      this.toastCtrl.create({
        message:'Email is required',duration:2000,position:'top'
      }).present();
    }
    // else if(this.regaddress == "" || this.regaddress == null){
    //   this.toastCtrl.create({
    //     message:'Address is required',duration:2000,position:'top'
    //   }).present();
    // }
    else if( !this.regagree ){
      this.toastCtrl.create({
        message:'You should agree with terms and condition',duration:2000,position:'top'
      }).present();
    }
    else if((this.regpassword).length < 6 || (this.regpasswordconfirm).length < 6){
      this.toastCtrl.create({
        message:'Password should be 6 chars long!',duration:2000,position:'top'
      }).present();
    }
    else if(this.countrychoosen == "" || this.countrychoosen == null){
      this.toastCtrl.create({
        message:'Country is required',duration:2000,position:'top'
      }).present();
    }
    else{
      console.log(this.regagree+" "+this.regphone+" "+this.regemail+" "+this.regpassword+" "+this.regname+" "+this.regpasswordconfirm);
      // let regData = {
      //   'agree':this.regagree,
      //   'username':this.regname,
      //   'pass':this.regpassword,
      //   'gender':this.reggender,
      //   'email':this.regemail,
      //   'address':this.regaddress,
      //   'time':new Date()
      // };
      let regData = {
        'agree':this.regagree,
        'username':this.regname,
        'pass':this.regpassword,
        'cnfmpass':this.regpasswordconfirm,
        'email':this.regemail,
        'phone':this.regphone,
        'phonecode':this.countrychoosen,
        'time':new Date()
      };
      
      // let loading = this.loadCtrl.create({ 
      //   content: 'Registering...'
      // });
      
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
            let fnname = ud.firstname;
            if(fnname == "" || fnname == null){
              fnname = "there";
            }
            localStorage.setItem("billmeFirstname",fnname);
            localStorage.setItem("billmeUser",this.regname);
            localStorage.setItem("billmeUserEmail",this.regemail);
            localStorage.setItem("billmePass",this.regpassword);
            localStorage.setItem("billmeUToken",ud.uToken);
            let pic =  ud.profilePic?ud.profilePic:'assets/images/person.png';
            localStorage.setItem("billmeProfilePic",pic);
            //localStorage.setItem("billmeIn","Y");
            // setTimeout(()=>{
            //   loading2 = this.loadCtrl.create({
            //     content: 'Finalizing your assets...',
            //     duration: 2000
            //   });
            //   loading2.present();
            // },2005);
            // setTimeout(()=>{
            //     //this.navCtrl.push(MyApp);
            //     this.donecall();
            // },4010);
            //code to verify
            setTimeout(()=>{
              this.processsignup = false;
              this.processcode = true;
              this.processdone = false;
              loading.dismiss();
              setTimeout(()=>{
                this.regregkey = ans.regkey;
              },8000);
            },2000);
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
  donecall(){
    // this.viewCtrl.dismiss();
    // this.navCtrl.push(MyApp);

    //this.appCtrl.getRootNav().push(MyApp);
    //this.nav.setRoot(MyApp);

    this.navCtrl.setRoot(MyApp);
  }
  //END

  //getcode and verify
  verifysignup(){
    
    if(this.regregkey == undefined){
      this.toastCtrl.create({
        message:'Registration key required',duration:2000,position:'top'
      }).present();
    }else if(this.regregkey == 0){
      this.toastCtrl.create({
        message:'Registration key required',duration:2000,position:'top'
      }).present();
    }else if((this.regregkey).toString().length != 6){
      this.toastCtrl.create({
        message:'Registration key is invalid',duration:2000,position:'top'
      }).present();
    }else{
      //verify from web and confirm
      let verifydata = {
        'uid':localStorage.getItem("billmeUID"),
        'code':this.regregkey,
        'time':new Date(),
        'email':localStorage.getItem("billmeUserEmail"),
        'from':'registration'
      };
      let loading = this.loadCtrl.create({ 
        content: 'Verifying...'
      });
      this.loginServ.registerverify(verifydata)
      .then(
        (res)=>{
          loading.dismiss();
          console.info(JSON.stringify(res));
          let ans = JSON.parse(JSON.stringify(res));
          if(ans.status == "success"){
            console.log(this.regregkey);
            this.processsignup = false;
            this.processcode = false;
            this.processdone = true;
            this.gotohome();
          }else{
            this.toastCtrl.create({
              message:ans.message,duration:2000,position:'top'
            }).present();
          }
        },
        error=>{ 
          loading.dismiss();
          this.toastCtrl.create({
            message:'Network is unavailable',duration:2000,position:'top'
          }).present();
        }
      );
      
    }
  }
  //end

  //goto home finally
  gotohome(){
    localStorage.setItem("billmeIn","Y");
    let loading2;
    setTimeout(()=>{
      loading2 = this.loadCtrl.create({
        content: 'Finalizing your assets...',
        duration: 2000
      });
      loading2.present();
    },2005);
    setTimeout(()=>{
        //this.navCtrl.push(MyApp);
        this.donecall();
        console.log("homepage");
    },4010);
  }
  //end

  backtosignup(){
    this.processsignup = true;
    this.processdone = false;
    this.processcode = false;
  }

  //resendmail()
  resendmail(){
    let regData = {
      'uid':localStorage.getItem("billmeUID"),
      'email':this.regemail,
      'from':'registration',
      'time':new Date()
    };
    
    let loading = this.loadCtrl.create({ 
      content: 'Sending...'
    });
    this.loginServ.newregisterresending(regData).then(
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
          setTimeout(()=>{
            this.regregkey = ans.regkey;
          },10000);
        }else{
          this.toastCtrl.create({
            message:ans.message,duration:2000,position:'top'
          }).present();
        }
      },
      error=>{ 
        loading.dismiss();
        this.toastCtrl.create({
          message:'Network is unavailable',duration:2000,position:'top'
        }).present();
      }
    );
      
  }

  resendmailfromlogin(){
    let regData = {
      'uid':localStorage.getItem("billmeUID"),
      'email':localStorage.getItem("billmeUserEmail"),
      'from':'registration',
      'time':new Date()
    };
    
    
    this.loginServ.newregisterresending(regData).then(
      (res)=>{
        
        console.info(JSON.stringify(res));
        let ans = JSON.parse(JSON.stringify(res));
        if(ans.status == "success"){
          this.toastCtrl.create({
            message:ans.message,
            duration:2000,
            position:'middle'
          }).present();
          setTimeout(()=>{
            this.regregkey = ans.regkey;
          },10000);
        }else{
          this.toastCtrl.create({
            message:ans.message,duration:2000,position:'top'
          }).present();
        }
      },
      error=>{ 
        
        this.toastCtrl.create({
          message:'Network is unavailable',duration:2000,position:'top'
        }).present();
      }
    );
      
  }


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
}
