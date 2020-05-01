import { Component } from '@angular/core';
import { OffersService , offers } from "../admin/offers.service";
import { AlertController } from "@ionic/angular";
import { map } from "rxjs/internal/operators/map";
import { NotificationsService } from "../admin/notifications.service";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  AllOffers=[];
  offer: offers;
 points: number;
 cash: number;
  constructor( public alertController: AlertController ,
    private offersService : OffersService,
  ) {
    this.getOffers()
  }

 creatOffer(point , cash){
  this.offer = {
    point :point,
    cash: cash
  }
  console.log(this.offer)
  this.offersService.createoffer(this.offer);
  this.presentAlert('offer Added successfully')
  document.getElementById("points").remove()
  document.getElementById("cash").remove()
 }

getOffers(){
  this.offersService.getoffersList((res => 
    res.orderByChild('point'))).snapshotChanges().pipe(
      map((changes: Array<any>) =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(offer =>{
      this.AllOffers =offer
console.log(this.AllOffers)
    }); 
}
delete(key){
  this.offersService.deleteoffer(key);
  this.presentAlert('offer Delete successfully')
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
