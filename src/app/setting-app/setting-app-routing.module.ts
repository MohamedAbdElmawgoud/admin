import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingAppPage } from './setting-app.page';

const routes: Routes = [
  {
    path: '',
    component: SettingAppPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingAppPageRoutingModule {}
