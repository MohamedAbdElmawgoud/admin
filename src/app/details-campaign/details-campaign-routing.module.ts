import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsCampaignPage } from './details-campaign.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsCampaignPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsCampaignPageRoutingModule {}
