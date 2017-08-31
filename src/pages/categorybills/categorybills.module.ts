import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Categorybills } from './categorybills';

@NgModule({
  declarations: [
    Categorybills,
  ],
  imports: [
    IonicPageModule.forChild(Categorybills),
  ],
  exports: [
    Categorybills
  ]
})
export class CategorybillsModule {}
