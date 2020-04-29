import { Component, OnInit } from '@angular/core';
import { AlertController } from "@ionic/angular";
import { map } from "rxjs/internal/operators/map";
import { AdminService } from "../admin/admin.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  
  usersid = [];
  
  users = [];
  point = [];
  email= [];
  name= []; 
  profileUrl = [];
  
  
  constructor(
    public router: Router,    
    public alertController: AlertController ,
    private admin :AdminService
  ) { }

  ngOnInit() {
    this.getUsers();
    //this.updateUser(1587319417226,2000)
  }
  getUsers(){
  
    this.admin.getuser().subscribe(e=>{
     e.forEach(element => {
       this.usersid.push(element.payload.doc.id) 
      
     });
  // console.log('ids', this.usersid)
    })
 
 
  this.admin.getAllUser().subscribe(e=>{
    
    //console.log('user is ',  e)
    this.users = [];
    e.forEach(element => {
      if(element.photoURL == ''){
       element.photoURL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5BdmOpYjhT8eCXbPFKrfK-4Jx0DHd-ihLDzSuE6tCi1dK1yUwfPOlwoJS&s=10'
      }
      
     this.users.push(element)
    });
    console.log(this.users)
  })
  }
  deleteUser(id){
    this.admin.deleteUser(id)
  }
  updateUser(id){
    this.router.navigate(['update-user'] ,{
      queryParams: {
        id: id 
       }
    });
   
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
