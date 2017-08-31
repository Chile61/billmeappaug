import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Billviewpdf } from './billviewpdf';

@NgModule({
  declarations: [
    Billviewpdf,
  ],
  imports: [
    IonicPageModule.forChild(Billviewpdf),
  ],
  exports: [
    Billviewpdf
  ]
})
export class BillviewpdfModule {}
