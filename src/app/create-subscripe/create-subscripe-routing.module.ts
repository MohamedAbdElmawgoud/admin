import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateSubscripePage } from './create-subscripe.page';

const routes: Routes = [
  {
    path: '',
    component: CreateSubscripePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateSubscripePageRoutingModule {}
