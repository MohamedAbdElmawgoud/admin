import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'create-comp',
    loadChildren: () => import('./create-comp/create-comp.module').then( m => m.CreateCompPageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'tabs/setting-app',
    loadChildren: () => import('./setting-app/setting-app.module').then( m => m.SettingAppPageModule)
  },
  {
    path: 'details-campaign',data: {data : ''},
    loadChildren: () => import('./details-campaign/details-campaign.module').then( m => m.DetailsCampaignPageModule)
  },
  {
    path: 'compaign',
    loadChildren: () => import('./compaign/compaign.module').then( m => m.CompaignPageModule)
  },
  {
    path: 'tabs/message',
    loadChildren: () => import('./message/message.module').then( m => m.MessagePageModule)
  },
  {
    path: 'create-subscripe',
    loadChildren: () => import('./create-subscripe/create-subscripe.module').then( m => m.CreateSubscripePageModule)
  },
  {
    path: 'update-user' ,data: {data : ''},
    loadChildren: () => import('./update-user/update-user.module').then( m => m.UpdateUserPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
