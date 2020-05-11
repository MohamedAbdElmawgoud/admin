import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AdminService } from "../admin/admin.service";
import { CompingsService } from "src/app/admin/compings.service";
import { AlertController } from "@ionic/angular";
import { map } from 'rxjs/operators';
import { subscribesService } from "src/app/admin/subscripe";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  compaignView: {};
  compaignValue = [];  
  compaign=false;
  done=[];
  view=[];

  constructor(
    private subscribes: subscribesService,    
    public router: Router,
    private campingsService: CompingsService,
    public alertController: AlertController ,
  ) {
   
  }

  ionViewWillEnter() {
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
    if (e.data) {
      
              if (e.data.values == 'channel') {
                this.router.navigate(['create-subscripe'], {
                  queryParams: {
                    type: e.data.values
                   }
                });
              }
    else{
      this.router.navigate(['create-comp'] , {
        queryParams : {
          type : e.data.values
        }
      });
    }
    }
    
  })

// this.presentModal();
 
  
}
getCompinge() {
  
   let done = 0;
   
    
      

       this.subscribes.getsubscribesList((res =>
         res.orderByChild('ownerId')
           .equalTo('admin'))).snapshotChanges().pipe(
             map((changes: Array<any>) =>
               changes.map(c =>
                 ({ key: c.payload.key, ...c.payload.val() })
               )
             )
           ).subscribe(subscribes => {
             this.compaignValue =[]   
             this.compaignView['']           
             subscribes.forEach(ele => {

               let views = `${ele.view}/${ele.done ? ele.done.length : 0}`
               ele['viewStat'] = views;
               ele['type'] = 'subscribe'
               ele['image'] = ele.channel.channel.thumbnails.default.url;

               this.compaignValue.push(ele)

             })
             console.log(this.compaignValue);

           });

           this.campingsService.getcampingsList((res =>
             res.orderByChild('ownerId')
               .equalTo('admin'))).snapshotChanges().pipe(
                 map((changes: Array<any>) =>
                   changes.map(c =>
                     ({ key: c.payload.key, ...c.payload.val() })
                   )
                 )
               ).subscribe(comp => {
                 this.compaignView =[]
                 comp.forEach(ele => {
                   let views = `${ele.view}/${ele.done ? ele.done.length : 0}`
                   ele['viewStat'] = views;
                   this.compaignView.push(ele)

                 })
                 console.log('compaignView is', this.compaignView)
               });

     
     //return user;
              }



getDetailsOfComp(data ){
 // console.log(data.createdData)
 this.router.navigate(['details-campaign'], { queryParams: { data: data.key , type : data.type  } });
}

}
