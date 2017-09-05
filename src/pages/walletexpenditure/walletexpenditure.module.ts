import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Walletexpenditure } from './walletexpenditure';

@NgModule({
  declarations: [
    Walletexpenditure,
  ],
  imports: [
    IonicPageModule.forChild(Walletexpenditure),
  ],
})
export class WalletexpenditurePageModule {}
