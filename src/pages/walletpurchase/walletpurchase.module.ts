import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Walletpurchase } from './walletpurchase';

@NgModule({
  declarations: [
    Walletpurchase,
  ],
  imports: [
    IonicPageModule.forChild(Walletpurchase),
  ],
})
export class WalletpurchasePageModule {}
