import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { Msgresponse } from '../services/msgresponse';

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
  uname:string;usname:string;username:string;uemail:any;uaddress:any;ucontact:any;uccode:any;
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
    public mr: Msgresponse
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
        this.uname = d.username;
        this.usname = d.firstname?d.firstname:""+" "+d.lastname?d.lastname:"";
        this.username = d.username;
        this.uemail = d.email;
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
      quality: 100,
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
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG
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

  
}
