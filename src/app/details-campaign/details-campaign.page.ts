import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompingsService } from "src/app/admin/compings.service";
import { map } from "rxjs/operators";
import { AdminService } from "src/app/admin/admin.service";
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { subscribesService } from '../admin/subscripe';

@Component({
  selector: 'app-details-campaign',
  templateUrl: './details-campaign.page.html',
  styleUrls: ['./details-campaign.page.scss'],
})
export class DetailsCampaignPage implements OnInit {
  user: any;
  showPoint: any;
  key: any;
  done: any;
  view: any;
  compdata: any;
  compInfo: any;
  data: any;
  createdata = 1587206533125;
  photoUrl = 'https://lh3.googleusercontent.com/a-/AOh14Git2em9CyfYQAcZGc3EvPs189RFj551ZRkJvDXrjw';
  displayName = 'Nader Medhat';
  viewers = [];
  campId;
  type;
  constructor(
    private firebase: AdminService,
    private router: Router,

    private alertController: AlertController,
    private campingsService: CompingsService,
    private route: ActivatedRoute,
    private subscribes: subscribesService,
    private storage: Storage) { }

  async ngOnInit() {
    this.user = await this.storage.get('User');
    this.getPoint()
    this.data = this.route
      .queryParamMap
      .subscribe(v => {
        this.campId = v.get('data');
        console.log(v.get('data'));
        this.type = v.get('type')
        
        this.getCompain(v.get('data') ,  v.get('type'))

      });
  }

  getPoint() {
    this.firebase.getDataOfUser("admin").then(point => {
      this.showPoint = point.docs[0].data().point
    })
    return this.showPoint
  }
  getCompain(createdata , type) {
    if(type == 'subscribe'){
      this.subscribes.getsubscribesList((res =>
        res.orderByChild('key')
          )).snapshotChanges().pipe(
            map((changes: Array<any>) =>
              changes.map(c =>
                ({ key: c.payload.key, ...c.payload.val() })
              )
            )
          ).subscribe(async comp => {
            this.compInfo = comp.filter(ele=>ele.key==createdata)[0];
            this.campId = createdata;
            this.getUser(this.compInfo.ownerId)
            this.done = (this.compInfo.done || []).length
            this.compdata = this.compInfo.createdData;
            this.key = this.compInfo.key
            this.view = this.compInfo.view
            // comp[0].done.forEach( async (ele) => {
            
              this.compInfo.done.forEach(id => {
                this.getUser(id).then(e=>{
                  //console.log('user is',e.docs[0].data())
                  this.viewers.push(e.docs[0].data())
                })
              });
            // for (const ele of this.compInfo.done) {
            //   console.log(ele);
              
            //   let user = await this.getUser(ele)
            //   if(user.docs[0]){
            //     this.viewers.push(user.docs[0].data())
            //   }            
            // }
  
  
            // })
          });
    }else{
      this.campingsService.getcampingsList((res =>
        res.orderByChild('key')))
        .snapshotChanges().pipe(
            map((changes: Array<any>) =>
              changes.map(c =>
                ({ key: c.payload.key, ...c.payload.val() })
              )
            )
          ).subscribe(async comp => {
          this.compInfo = comp.filter(ele=>ele.key==createdata)[0];
            this.campId = createdata;
           this.getUser(this.compInfo.ownerId)
            this.done = (this.compInfo.done || []).length
            this.compdata = this.compInfo.createdData;
            this.key = this.compInfo.key
            this.view = this.compInfo.view
            // comp[0].done.forEach( async (ele) => {
            console.log('done',this.compInfo)
            this.compInfo.done.forEach(id => {
              this.getUser(id).then(e=>{
                //console.log('user is',e.docs[0].data())
                this.viewers.push(e.docs[0].data())
              })
            });
            // for (const ele of comp[0].done) {
            //   console.log(ele);
              
            //   let user = await this.getUser(ele)
            //   if(user.docs[0]){
            //     this.viewers.push(user.docs[0].data())
            //   }            
            // }
  
  
            // })
          });
    }
  }
  getUser(id) {
    return this.firebase.getDataOfUser(id);
  }
  deleteComp() {
    if(this.type == 'subscribe' || this.type =='sub' || !this.type){
      this.subscribes.deleteSubscripe(this.campId)
      
    }else{
      this.campingsService.deletecamping(this.campId)

    }
    let text = 'compaign deleted'
    this.presentAlert(text)
    this.router.navigate([''])
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
