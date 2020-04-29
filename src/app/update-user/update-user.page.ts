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
  data: any;
  id: any;
points: number;
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
   
    // .queryParamMap
    // .subscribe(v => {
    //   this.id = v.get('data');
    //  console.log(this.id)
    // });
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

}
