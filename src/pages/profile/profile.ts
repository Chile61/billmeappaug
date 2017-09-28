import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertController } from 'ionic-angular';

import { Msgresponse } from '../services/msgresponse';

import { Profiledit } from '../profiledit/profiledit';

import * as moment from 'moment';
//import { service } from '../services/service';
//import { Http,Response } from '@angular/http';
//import 'rxjs/add/operator/map';

import { Userprovider } from '../../providers/userprovider';
//import { Dbservice } from '../../providers/dbservice';
/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers:[Userprovider,Msgresponse]
})
export class Profile {
  d:any;
  titleColor:string;
  profile:any;
  uname:string = "there";usname:string = "!";username:string;uemail:any;uaddress:any;udob:any;
  ucontact:any;uccode:any;
  ufname:any;ulname:any;
  ujoin:any;ugender:string;utoken:any;upic:any;ucreated:any;

  errorNetwork:any;
  errorNetworkUnavailable:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl:ToastController,
    public actionCtrl:ActionSheetController,public up:Userprovider,//public dbs:Dbservice,
    public loadCtrl:LoadingController,
    public camera:Camera,
    public mr: Msgresponse,
    public alertCtrl: AlertController
    ) {
      if(localStorage.getItem('AppTitleColor')){
        this.titleColor = localStorage.getItem('AppTitleColor');
      }else{
        localStorage.setItem('AppTitleColor',"newtitle");
        this.titleColor = 'newtitle';
      }
      

      //console.info(this.service.hello());
      this.loadProfile();
      this.upic = 'assets/images/bg3.png';

      //this.postPic2();
  }

  ionViewDidLoad() {
    this.errorNetwork = this.mr.callErrorNetwork();
    this.errorNetworkUnavailable = this.mr.callErrorNetworkUnavailable();
    console.log('ionViewDidLoad ProfilePage');
  }

  loadProfile(){
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
    this.up.getprofile(lData).then(
    (result)=>{
      console.log(result);
      let dt = JSON.parse(JSON.stringify(result));
      if(dt.status == "success"){
        let d = JSON.parse(JSON.stringify(dt.data));
        console.log(d.username);
        console.log(dt.data.username);
        this.profile = dt.data;
        this.uname = d.username || "there";
        this.usname = d.firstname?d.firstname:""+" "+d.lastname?d.lastname:"";
        this.ufname = d.firstname;
        this.ulname = d.lastname;
        this.username = d.username;
        this.uemail = d.email;
        this.udob = d.dob;
        this.uaddress = d.address;
        this.ucontact = d.contact;
        this.uccode = d.phoneCode;
        this.ujoin = this.convertTimestamptoDate(d.time);
        this.ugender = d.gender;
        this.utoken = d.uToken;
        this.ucreated = d.created_at;
        this.upic = d.profilePic?d.profilePic:'assets/images/bg3.png';
      }else{
        this.toastCtrl.create({
            message:this.errorNetwork,duration:2000,position:'top'
        }).present();
      }
            loading.dismiss();
    },
    (error)=>{
      this.toastCtrl.create({
          message:this.errorNetworkUnavailable,duration:2000,position:'top'
      }).present();
      loading.dismiss();
      console.error(error);
    }
    );
  }

  changePicture(){
    this.actionCtrl.create({
      title:this.mr.callMsgPickerTitle(),
      buttons:[
        {
          text:this.mr.callMsgCamera(),
          handler:()=>{
            console.info("Camera");
            this.chooseCamera();
          }
        },
        {
          text:this.mr.callMsgGallery(),
          handler:()=>{
            console.info("Gallery");
            this.chooseGallery();
          }
        },
        {
          text:this.mr.callMsgPickerDismiss(),
          role:'cancel',
          handler:()=>{
            console.warn("Dismiss");
          }
        }
      ]
    }).present();
  }

  convertTimestamptoDate(d){
    let ans = moment(new Date(d)).format("MMM DD, YYYY");
    return ans;
  }

  isme(ucreated){
    let a = moment(new Date(ucreated)).format("MMM DD, YYYY");
    return a;
  }

  //camera
  chooseCamera(){
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType:this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum:true
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     this.upic = base64Image;
     this.postPic();
    }, (err) => {
     // Handle error
    });
  }

  //gallery
  chooseGallery(){
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType:this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      encodingType: this.camera.EncodingType.JPEG
    }//PHOTOLIBRARY
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     this.upic = base64Image;
     this.postPic();
    }, (err) => {
     // Handle error
    });
  }

  //postprofilepic
  postPic(){
    let loading = this.loadCtrl.create({
      spinner: 'dots',
      content: `
        <ion-spinner class="loadDataSpin" name="dots"></ion-spinner>`,
      cssClass:'classforspindata'
    });
    loading.present();

    let pic = this.upic;
    let lData = {
      uid:localStorage.getItem("billmeUID"),
      image:pic
    };
    this.up.changeprofilepic(lData).then(
      (result)=>{
        let dt = JSON.parse(JSON.stringify(result));
        let m = JSON.stringify(result);
        if(dt.status == "success"){
          console.log(dt.message);
          let msg = dt.message;
          let path = dt.path;
          localStorage.setItem("billmeProfilePic",path);
          this.toastCtrl.create({
            message:msg,duration:2000,position:'middle'
          }).present();
        }else{
          this.toastCtrl.create({
              message:this.errorNetwork,duration:2000,position:'top'
          }).present();
        }
        loading.dismiss();
      },
      (error)=>{
        let m = JSON.stringify(error);
        this.toastCtrl.create({
            message:this.errorNetworkUnavailable,duration:2000,position:'top'
        }).present();
        loading.dismiss();
      }
    );
  }

  postPic2(){
    let loading = this.loadCtrl.create({
      spinner: 'dots',
      content: `
        <ion-spinner class="loadDataSpin" name="dots"></ion-spinner>`,
      cssClass:'classforspindata'
    });
    loading.present();

    let pic = this.upic;
    let lData = {
      uid:localStorage.getItem("billmeUID"),
      image:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAkACQAAD/4QC8RXhpZgAATU0AKgAAAAgABwESAAMAAAABAAEAAAEaAAUAAAABAAAAYgEbAAUAAAABAAAAagEoAAMAAAABAAIAAAExAAIAAAAPAAAAcgEyAAIAAAAUAAAAgodpAAQAAAABAAAAlgAAAAAAAACQAAAAAQAAAJAAAAABUGl4ZWxtYXRvciAzLjYAADIwMTc6MDM6MjkgMjE6MDM6OTMAAAKgAgAEAAAAAQAAAQSgAwAEAAAAAQAAAMgAAAAA/+EJ9Gh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1wOk1vZGlmeURhdGU9IjIwMTctMDMtMjlUMjE6MDM6OTMiIHhtcDpDcmVhdG9yVG9vbD0iUGl4ZWxtYXRvciAzLjYiPiA8ZGM6c3ViamVjdD4gPHJkZjpCYWcvPiA8L2RjOnN1YmplY3Q+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg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"
    };
    this.up.changeprofilepic(lData).then(
      (result)=>{
        let dt = JSON.parse(JSON.stringify(result));
        let m = JSON.stringify(result);
        if(dt.status == "success"){
          console.log(dt.message);
          let msg = dt.message;
          let path = dt.path;
          localStorage.setItem("billmeProfilePic",path);
          this.toastCtrl.create({
            message:msg,duration:2000,position:'middle'
          }).present();
        }else{
          this.toastCtrl.create({
              message:this.errorNetwork,duration:2000,position:'top'
          }).present();
        }
        loading.dismiss();
      },
      (error)=>{
        let m = JSON.stringify(error);
        this.toastCtrl.create({
            message:this.errorNetworkUnavailable,duration:2000,position:'top'
        }).present();
        loading.dismiss();
      }
    );
  }


  additional(){
    let pr = 'Name:'+this.usname+'<br>Joined at '+this.ujoin+'<br>Address is '+this.uaddress;
    let alert = this.alertCtrl.create({
      title: this.uname,
      subTitle: pr,
      buttons: ['Ok']
    });
    alert.present();
  }

  createfun(){
    let uname = this.uname;
    let ufname = this.ufname;
    let ulname = this.ulname;
    let uemail = this.uemail;
    let uaddress = this.uaddress;
    let ucontact = this.ucontact;
    let uccode = this.uccode;
    let ujoin = this.ujoin;
    let ugender = this.ugender;
    let utoken = this.utoken;
    let ucreated = this.ucreated;
    let upic = this.upic;
    let udob = this.udob;
    this.navCtrl.push(Profiledit,{
      uname:uname,
      ufname:ufname,
      ulname:ulname,
      uemail:uemail,
      uaddress:uaddress,
      ucontact:ucontact,
      uccode:uccode,
      ujoin:ujoin,
      ugender:ugender,
      utoken:utoken,
      ucreated:ucreated,
      upic:upic,
      udob:udob
    });
  }
  
}
