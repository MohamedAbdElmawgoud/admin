import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AdminService } from "../admin/admin.service";
import { CompingsService } from "src/app/admin/compings.service";
import { AlertController } from "@ionic/angular";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  compaignValue: any[];
  compaign=false;
  done=[];
  view=[];

  constructor(
    public router: Router,
    private campingsService: CompingsService,
    public alertController: AlertController ,
  ) {
    this.getCompinge()
  }


async createCompinge() {
  const alert = await this.alertController.create({
    header: 'select the camping type',
    inputs: [
     
      {
        name: 'view for you video',
        type: 'radio',
        label:  'view for your video',
        value: 'video'
      },
      {
        name: 'radio6',
        type: 'radio',
        label:  'likes or subscribes',
        value: 'channel'
      }
    ],
    buttons : [
      {
        text :  "select"
      }
    ]
  });

  await alert.present();

  alert.onDidDismiss().then(e=>{
    if(e.data){
      this.router.navigate(['create-comp'] , {
        queryParams : {
          type : e.data.values
        }
      });

    }
    
  })

// this.presentModal();
 
  
}
getCompinge(){
  this.compaignValue = []
  let done =0;
    
       let compaign= this.campingsService.getcampingsList((res => 
        res.orderByChild('ownerId')
        .equalTo('admin'))).snapshotChanges().pipe(
          map((changes: Array<any>) =>
            changes.map(c =>
              ({ key: c.payload.key, ...c.payload.val() })
            )
          )
        ).subscribe(comp => {
      this.compaignValue = comp
        comp.forEach(element => {
         
          this.done=element.done? element.done.length : 0
          this.view.push(this.done);
        // this.createdDate.push(element.createdData) 
       this.compaign =true;   
        });
         // console.log(comp);
       
         console.log('compaignValue is', this.compaignValue )
        });
     
      //return user;
  
  
} 

getDetailsOfComp(data ){
 // console.log(data.createdData)
  this.router.navigate(['details-campaign'] , {queryParams : { data: data.createdData } });
}

}
