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

import { PdfViewerComponent } from 'ng2-pdf-viewer';
import {HttpModule} from '@angular/http';
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
    PdfViewerComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
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
    Billviewpdf
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
    Camera
  ]
})
export class AppModule {}
