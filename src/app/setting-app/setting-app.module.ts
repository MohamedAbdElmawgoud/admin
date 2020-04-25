import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingAppPageRoutingModule } from './setting-app-routing.module';

import { SettingAppPage } from './setting-app.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingAppPageRoutingModule
  ],
  declarations: [SettingAppPage]
})
export class SettingAppPageModule {}
