import { Component, OnInit } from '@angular/core';

import { SettingService , settings } from "../admin/setting.service";
import { AlertController } from "@ionic/angular";
import { map } from "rxjs/operators";
@Component({
  selector: 'app-setting-app',
  templateUrl: './setting-app.page.html',
  styleUrls: ['./setting-app.page.scss'],
})
export class SettingAppPage implements OnInit {


 
  AllSetting=[];
  setting: settings;
 points: number;

 discountVip: number;
 discountAll: number; 


 lastSettinig: settings;
 lastpoints: number;
 
 lastdiscountVip: number;
 lastdiscountAll: number; 
 lasturl:string;
 lastEmail:string;
 lastmessage:string
 lastVersion:string
  constructor( public alertController: AlertController ,
    private settingService : SettingService
  ) {
    
  }
  
  ngOnInit() {
    this.settingService.getsettingsList((res => 
      res)).snapshotChanges().pipe(
        map((changes: Array<any>) =>
          changes.map(c =>
            ({ key: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(  res =>{
  this.lastSettinig =res[res.length-1]
  this.lastpoints =  this.lastSettinig.point;
  this.lastdiscountVip = this.lastSettinig.discountVip;
  this.lastdiscountAll = this.lastSettinig.discountAll;
  this.lasturl = this.lastSettinig.AppURl;
  this.lastEmail = this.lastSettinig.email;
  this.lastmessage = this.lastSettinig.message;
  this.lastVersion = this.lastSettinig.version;

  console.log(this.lastSettinig)
      })
    }
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
 