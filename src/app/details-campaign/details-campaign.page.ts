import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompingsService, camping } from "src/app/admin/compings.service";
import { map } from "rxjs/operators";
import { AdminService } from "../admin/admin.service";
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-details-campaign',
  templateUrl: './details-campaign.page.html',
  styleUrls: ['./details-campaign.page.scss'],
})
export class DetailsCampaignPage implements OnInit {
  user: any;
  
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
  constructor(
  
    private router: Router,
    private alertController: AlertController,  
    private campingsService: CompingsService,
    private route: ActivatedRoute, 
    private admin :AdminService
    ) { }

 async ngOnInit() {
  
    
    this.data = this.route
      .queryParamMap
      .subscribe(v => {
        this.campId = v.get('data');
        this.getCompain(v.get('data'))

      });
  }

  
  getCompain(createdData) {
    console.log(createdData)
    this.campingsService.getcampingsList((res =>
      res.orderByChild('ownerId')
        .equalTo('admin'))).snapshotChanges().pipe(
          map((changes: Array<any>) =>
            changes.map(c =>
              ({ key: c.payload.key, ...c.payload.val() })
            ) 
          )
        ).subscribe(comp => {
       comp.forEach(element => {
         if(element.createdData == createdData){
           this.compInfo = element
         }
       });
        console.log('cscsc', this.compInfo)
         
       this.getUser(this.compInfo.ownerId)
        
        this.compdata = this.compInfo.createdData;
       this.key = this.compInfo.key
        this.view = this.compInfo.view
        this.compInfo.done.forEach( async (ele) => {
           let user =  await this.getUser(ele)
           this.viewers.push(user.docs[0].data())
           this.done = this.compInfo.done.length
          })
        });
  }
   
  deleteComp(){
    this.campingsService.deletecamping(this.campId)
    
    this.presentAlert('compaign deleted')
   this.router.navigate([''])
  }

  getUser(id) {
    return this.admin.getDataOfUser(id);
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
