import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompaignPage } from './compaign.page';

const routes: Routes = [
  {
    path: '',
    component: CompaignPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompaignPageRoutingModule {}
