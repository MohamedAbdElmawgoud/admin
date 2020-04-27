import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateSubscripePageRoutingModule } from './create-subscripe-routing.module';

import { CreateSubscripePage } from './create-subscripe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateSubscripePageRoutingModule
  ],
  declarations: [CreateSubscripePage]
})
export class CreateSubscripePageModule {}
