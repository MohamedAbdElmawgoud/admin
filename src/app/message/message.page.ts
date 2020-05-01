import { Component, OnInit } from '@angular/core';
import { MessageService , message } from "../admin/message.service";
import { AlertController } from "@ionic/angular";
import { map } from "rxjs/internal/operators/map";
import { NotificationsService } from "../admin/notifications.service";

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage  {
  Allmessage=[];
  message: message;
  header: string;
  body: string;
  constructor( public alertController: AlertController ,
    private messageService : MessageService,
    private noti :NotificationsService
  ) {
    this.getmessage()
  }

 creatmessage(header , body){
  this.message = {
   header:header,
   body:body
  }
  console.log(this.message)
  this.messageService.createmessage(this.message);
  this.noti.notifications(header,body);
  this.presentAlert('message Added successfully')
  document.getElementById("header").remove()
  document.getElementById("body").remove()
  
 }

getmessage(){
  this.messageService.getmessageList((res =>  
    res.orderByChild('point'))).snapshotChanges().pipe(
      map((changes: Array<any>) =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(message =>{
      this.Allmessage =message
console.log(this.Allmessage) 
    }); 
}
delete(key){
  this.messageService.deletemessage(key);
  this.presentAlert('message Deleted successfully')
}
DeleteAll(){
  this.messageService.deleteAll();
  this.presentAlert('All message Deleted successfully')
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
