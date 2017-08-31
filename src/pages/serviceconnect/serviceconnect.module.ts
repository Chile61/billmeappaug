import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Serviceconnect } from './serviceconnect';

@NgModule({
  declarations: [
    Serviceconnect,
  ],
  imports: [
    IonicPageModule.forChild(Serviceconnect),
  ],
  exports: [
    Serviceconnect
  ]
})
export class ServiceconnectModule {}
