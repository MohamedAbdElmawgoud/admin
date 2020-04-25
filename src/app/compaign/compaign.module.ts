import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompaignPageRoutingModule } from './compaign-routing.module';

import { CompaignPage } from './compaign.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompaignPageRoutingModule
  ],
  declarations: [CompaignPage]
})
export class CompaignPageModule {}
