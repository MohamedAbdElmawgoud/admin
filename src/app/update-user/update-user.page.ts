import { Component, OnInit } from '@angular/core';
import { AlertController } from "@ionic/angular";
import { map } from "rxjs/internal/operators/map";
import { AdminService } from "../admin/admin.service";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.page.html',
  styleUrls: ['./update-user.page.scss'],
})
export class UpdateUserPage implements OnInit {
  expiredDate: any;
  data: any;
  id: any;
points: number;
time: any;
block =false;

  constructor( 
    public alertController: AlertController ,
    private admin :AdminService,
    private route: ActivatedRoute    
  ) { }

  ngOnInit() {
    this.data = this.route
    .queryParamMap
    .subscribe(v => {
      this.id = v.get('id');
    //console.log(this.id)
    });
    let user ;
  this.admin.getDataOfUser(this.id).then(e=>{
    user = e.docs[0].data() 
    this.block = user.block 
    console.log('user',user)
   this.expiredDate = user.vip.expired;
  })
} 
  
  updateUser(point){
    let user ;
   // console.log(this.id)
    this.admin.getDataOfUser(this.id).then(e=>{

     // console.log(e)
       user = e.docs[0].data() 
       user.point = point;
       console.log('afda',user)
       this.admin.updateUser(user);
       this.presentAlert('point updated successful')
    }) 
   
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
makeVIP(expiredData){
  let user ;
  this.expiredDate = expiredData
  // console.log(this.id)
   this.admin.getDataOfUser(this.id).then(e=>{

    // console.log(e)
      user = e.docs[0].data() 
      user.vip = {
        status : true,
        expired: expiredData
      };
      console.log('afda',user)
      this.admin.updateUser(user);
      this.presentAlert('This account will be VIP until  '+ expiredData)
   }) 
}

deleteVIP(){
  let user ;
 
  // console.log(this.id)
   this.admin.getDataOfUser(this.id).then(e=>{

    // console.log(e)
      user = e.docs[0].data() 
      user.vip = {
        status : false,
       
      };
      console.log('afda',user)
      this.admin.updateUser(user);
      this.presentAlert('This account disable VIP ')
   }) 
}
blockUser(id){
  let user;
  this.admin.getDataOfUser(id).then(e=>{
    
         // console.log(e)
           user = e.docs[0].data() 
           user.block = true;
           console.log('afda',user)
           this.admin.updateUser(user);
           this.presentAlert('user blocked successful')
           this.block =true
        }) 
  
}
unblockUser(id){
  let user;
  this.admin.getDataOfUser(id).then(e=>{
    
         // console.log(e)
           user = e.docs[0].data() 
           user.block = false;
           console.log('afda',user)
           this.admin.updateUser(user);
           this.presentAlert('user un blocked successful')
           this.block =false
        }) 
  
}
}
