import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
//import { Login } from '../pages/login/login';
import { Signup } from '../pages/signup/signup';
import { Register } from '../pages/register/register';
import { Profile } from '../pages/profile/profile';
import { Dashboard } from '../pages/dashboard/dashboard';
import { Setting } from '../pages/setting/setting';
import { Receipts } from '../pages/receipts/receipts';
import { Receiptsview } from '../pages/receiptsview/receiptsview';
import { Billview } from '../pages/billview/billview';
import { Homeslider } from '../pages/homeslider/homeslider';
import { Categories } from '../pages/categories/categories';
import { Categorybills } from '../pages/categorybills/categorybills';
import { Deals } from '../pages/deals/deals';
import { Wallet } from '../pages/wallet/wallet';
import { Serviceconnect } from '../pages/serviceconnect/serviceconnect';
import { Billviewpdf } from '../pages/billviewpdf/billviewpdf';
import { Walletbalance } from '../pages/walletbalance/walletbalance';
import { Walletexpenditure } from '../pages/walletexpenditure/walletexpenditure';
import { Walletpurchase } from '../pages/walletpurchase/walletpurchase';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Device } from '@ionic-native/device';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Globalization } from '@ionic-native/globalization';
import { EmailComposer } from '@ionic-native/email-composer';
import { SocialSharing } from '@ionic-native/social-sharing';

import { PdfViewerComponent } from 'ng2-pdf-viewer';

import { HttpModule, Http } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    Signup,
    Register,
    Profile,
    Dashboard,
    Setting,
    Receipts,
    Receiptsview,
    Billview,
    Homeslider,
    Categories,
    Categorybills,
    Deals,
    Wallet,
    Serviceconnect,
    Billviewpdf,
    PdfViewerComponent,
    Walletbalance,Walletexpenditure,Walletpurchase
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
    BrowserAnimationsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    Signup,
    Register,
    Profile,
    Dashboard,
    Setting,
    Receipts,
    Receiptsview,
    Billview,
    Homeslider,
    Categories,
    Categorybills,
    Deals,
    Wallet,
    Serviceconnect,
    Billviewpdf,
    Walletbalance,Walletexpenditure,Walletpurchase
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FileTransfer,
    File,
    LocalNotifications,
    DocumentViewer,
    InAppBrowser,
    PhotoViewer,
    Device,
    Camera,
    Globalization,
    EmailComposer,
    SocialSharing
  ]
})
export class AppModule {}

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}