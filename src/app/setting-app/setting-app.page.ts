import { Component, OnInit } from '@angular/core';

import { SettingService , settings } from "../admin/setting.service";
import { AlertController } from "@ionic/angular";
@Component({
  selector: 'app-setting-app',
  templateUrl: './setting-app.page.html',
  styleUrls: ['./setting-app.page.scss'],
})
export class SettingAppPage implements OnInit {


  ngOnInit() {
  }
  AllSetting=[];
  setting: settings;
 points: number;
 cash: number;
 discountVip: number;
 discountAll: number; 
  constructor( public alertController: AlertController ,
    private settingService : SettingService
  ) {}
  
 creatSetting(email,version,message,AppURl,points,discountVip,discountAll){
  this.setting = {
    email: email,
    version:version,
    message:message,
    AppURl:AppURl,
    point:points,
    discountVip : discountVip,
    discountAll :discountAll
  }
  console.log(this.setting)
  this.settingService.createsetting(this.setting)
  this.presentAlert('setting Added successfully')    
  document.getElementById('points').remove()
  document.getElementById('version').remove()
  document.getElementById('message').remove()
  document.getElementById('email').remove()
  document.getElementById('AppURl').remove(),
  document.getElementById('discountVip').remove(),
  document.getElementById('discountAll').remove()
 }

 async presentAlert(title) {
  const alert = await this.alertController.create({
    header: 'Alert',
   // subHeader: 'Subtitle',
    message: title,
    buttons: ['OK']
  });

  await alert.present();
}
}
 