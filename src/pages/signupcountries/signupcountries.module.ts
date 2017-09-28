import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Signupcountries } from './signupcountries';

@NgModule({
  declarations: [
    Signupcountries,
  ],
  imports: [
    IonicPageModule.forChild(Signupcountries),
  ],
})
export class SignupcountriesPageModule {}
