import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Globalization } from '@ionic-native/globalization';

import { TranslateService } from '@ngx-translate/core';

//import { HomePage } from '../pages/home/home';
//import { ListPage } from '../pages/list/list';
//import { Login } from '../pages/login/login';
import { Signup } from '../pages/signup/signup';
//import { Register } from '../pages/register/register';
import { Profile } from '../pages/profile/profile';
import { Dashboard } from '../pages/dashboard/dashboard';
import { Setting } from '../pages/setting/setting';
import { Receipts } from '../pages/receipts/receipts';
import { Homeslider } from '../pages/homeslider/homeslider';
import { Categories } from '../pages/categories/categories';
import { Deals } from '../pages/deals/deals';
import { Wallet } from '../pages/wallet/wallet';
import { Serviceconnect } from '../pages/serviceconnect/serviceconnect';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  billmeuser:string;

  year:any;

  pages: Array<{title: string, component: any,icon:string}>;

  pic:any;
  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public globalization: Globalization,
    public translate: TranslateService
  ) {
    this.initializeApp();

    if(localStorage.getItem('billmeAppLanguage') == "" ||   localStorage.getItem('billmeAppLanguage') == null || !localStorage.getItem('billmeAppLanguage')){
      let lang = 'en';
      translate.setDefaultLang(lang);
      localStorage.setItem("billmeAppLanguage",lang);
    }else{
      let lang = localStorage.getItem("billmeAppLanguage");
      translate.setDefaultLang(lang);
    }
    //take session
    if(localStorage.getItem('billmeIn') == "" || localStorage.getItem('billmeIn') == "N" ||  localStorage.getItem('billmeIn') == null || !localStorage.getItem('billmeIn')){
      if(localStorage.getItem('billmeSeenSlider') == "" || localStorage.getItem('billmeSeenSlider') == "N" ||  localStorage.getItem('billmeSeenSlider') == null || !localStorage.getItem('billmeSeenSlider')){
        this.rootPage = Homeslider;
      }else{
        this.rootPage = Signup;
      }
      this.pic = "assets/images/person.png";
    }
    else{
      this.rootPage = Dashboard;//Profile;//
      this.pic = localStorage.getItem("billmeProfilePic");
      this.billmeuser = localStorage.getItem("billmeUser");
      setTimeout(()=>{
        this.pic = localStorage.getItem("billmeProfilePic");
      },2500);
    }
    //this.rootPage = Dashboard;

    // used for an example of ngFor and navigation
    this.pages = [
      //{ title: 'Home', component: HomePage },
      { title: 'Dashboard', component: Dashboard,icon: 'home'},
      { title: 'Bills', component: Receipts ,icon: 'paper'},
      { title: 'Categories', component: Categories ,icon: 'copy'},
      { title: 'Wallet', component: Wallet ,icon: 'beaker'},
      { title: 'Service Connect', component: Serviceconnect ,icon: 'filing'},
      { title: 'Deals', component: Deals ,icon: 'logo-designernews'},
      { title: 'Profile', component: Profile ,icon: 'bowtie'},
      { title: 'Settings', component: Setting ,icon: 'cog'}
    ];

    this.year = new Date().getFullYear();


  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.pic = "assets/images/person.png";
      localStorage.setItem("appUrl","http://www.podargroup.com/billmemobileapp/api/mobile");

      this.globalization.getPreferredLanguage()
      .then(res => console.log(res))
      .catch(e => console.log(e));

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
