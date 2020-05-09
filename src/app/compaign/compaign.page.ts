import { Component, OnInit } from '@angular/core';
import { CompingsService } from "src/app/admin/compings.service";
import { AlertController } from "@ionic/angular";
import { map } from "rxjs/internal/operators/map";
import { AdminService } from '../admin/admin.service';
import { subscribesService } from "src/app/admin/subscripe";

@Component({
  selector: 'app-compaign',
  templateUrl: './compaign.page.html',
  styleUrls: ['./compaign.page.scss'],
})
export class CompaignPage implements OnInit {
  compaigns: any;
  usersid = [];
  usersComp = [];
  users = [];
  point = [];
  email= [];
  name= [];
  profileUrl = [];
  NumberOfCompaign: any;
  NumberOfUser: any;
status = true;
  constructor(
    private campingsService: CompingsService,
    public alertController: AlertController ,
    private subscribes: subscribesService,    
    private admin :AdminService
  ) { }

  ngOnInit() {
    this.getCompinge()
  }
  
  getCompinge(){
  
    let done =0;
    
    this.campingsService.getSubscribesList((res => 
      res
    )).snapshotChanges().pipe(
        map((changes: Array<any>) =>
          changes.map(c =>
            ({ key: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(sub => {
         let compaign= this.campingsService.getcampingsList((res => 
          res.orderByChild('type')
        )).snapshotChanges().pipe(
            map((changes: Array<any>) =>
              changes.map(c =>
                ({ key: c.payload.key, ...c.payload.val() })
              )
            )
          ).subscribe(comp => {
     
        this.compaigns = comp;
        sub.forEach(element => {
          this.compaigns.push(element)
        });
          // console.log('com',comp);
        
      //  console.log('com',this.compaigns)
           this.compaigns.forEach(element => {
            this.spacificUser(element.ownerId).then(e=>{
             this.usersComp.push(e.docs[0].data())
            // console.log('user',this.usersComp)
             element.photoURL = e.docs[0].data().photoURL
             if (element.photoURL ==''){
               element.photoURL = 'https://fogtube.store/profile.svg'
             }
             if(element.displayName== '' || !element.displayName){
              element.displayName= e.docs[0].data().displayName
             }
            })
          }); 
         });
        
        
          }); 
        
        //return user;
  }
  spacificUser(id){
    return  this.admin.getDataOfUser(id)
    
     }
  
  deleteCompaign(key){
   // console.log('data',key)
    this.campingsService.getcampingsList((res => 
      res.orderByChild('type')
      .equalTo('view'))).snapshotChanges().pipe(
        map((changes: Array<any>) =>
          changes.map(c =>
            ({ key: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(comp => {
        this.campingsService.deletecamping(key)
      })



      this.subscribes.getsubscribesList((res => 
        res.orderByChild('type')
        .equalTo('sub' || 'subscribe'|| null))).snapshotChanges().pipe(
          map((changes: Array<any>) =>
            changes.map(c =>
              ({ key: c.payload.key, ...c.payload.val() })
            )
          )
        ).subscribe(comp => {
          this.subscribes.deleteSubscripe(key)
        })
  


    // if(this.type == 'subscribe'){
    //   this.subscribes.deleteSubscripe(this.campId)
      
    // }else{
    //   this.campingsService.deletecamping(this.campId)

    // }
    // let text = 'compaign deleted'
    // this.presentAlert(text)
    // this.router.navigate([''])
  
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
