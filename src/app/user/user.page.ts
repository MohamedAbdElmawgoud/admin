import { Component, OnInit } from '@angular/core';
import { AlertController } from "@ionic/angular";
import { map } from "rxjs/internal/operators/map";
import { AdminService } from "../admin/admin.service";
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
    public alertController: AlertController ,
    private admin :AdminService
  ) { }

  ngOnInit() {
    this.getUsers();
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
}
