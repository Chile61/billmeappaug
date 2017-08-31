import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Homeslider } from './homeslider';

@NgModule({
  declarations: [
    Homeslider,
  ],
  imports: [
    IonicPageModule.forChild(Homeslider),
  ],
  exports: [
    Homeslider
  ]
})
export class HomesliderModule {}
