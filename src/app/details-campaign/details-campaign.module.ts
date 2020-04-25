import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsCampaignPageRoutingModule } from './details-campaign-routing.module';

import { DetailsCampaignPage } from './details-campaign.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsCampaignPageRoutingModule
  ],
  declarations: [DetailsCampaignPage]
})
export class DetailsCampaignPageModule {}
