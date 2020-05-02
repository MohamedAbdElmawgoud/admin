import { Component, OnInit } from '@angular/core';
import { CompingsService } from "src/app/admin/compings.service";
import { AlertController } from "@ionic/angular";
import { map } from "rxjs/internal/operators/map";
import { AdminService } from '../admin/admin.service';
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
    private admin :AdminService
  ) { }

  ngOnInit() {
    this.getCompinge()
  }
  
  getCompinge(){
  
    let done =0;
    
      
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
          // console.log('com',comp);
  
           
           this.compaigns.forEach(element => {
            this.spacificUser(element.ownerId).then(e=>{
             this.usersComp.push(e.docs[0].data())
            // console.log('user',this.usersComp)
             element.photoURL = e.docs[0].data().photoURL
             if (element.photoURL ==''){
               element.photoURL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5BdmOpYjhT8eCXbPFKrfK-4Jx0DHd-ihLDzSuE6tCi1dK1yUwfPOlwoJS&s=10'
             }
             if(element.displayName== '' || !element.displayName){
              element.displayName= e.docs[0].data().displayName
             }
            })
           
         });
        
        
          }); 
        
        //return user;
  }
  spacificUser(id){
    return  this.admin.getDataOfUser(id)
    
     }
  
  deleteCompaign(data){
    
    this.campingsService.deletecamping(data);
    this.presentAlert('Compaign Deleted')
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
