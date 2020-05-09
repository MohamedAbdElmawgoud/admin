import { Component } from '@angular/core';
import { CompingsService } from "src/app/admin/compings.service";
import { AlertController } from "@ionic/angular";
import { map } from "rxjs/internal/operators/map";
import { AdminService } from "../admin/admin.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
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
    public router: Router,
    private campingsService: CompingsService,
    public alertController: AlertController ,
    private admin :AdminService
  ) {}

  ngOnInit(){
   // this.compaignLength();
   this.getUsers()
   this.getCompinge()
  
  }
compaignLength(length){
 
 // console.log('length is ', length)
  this.NumberOfCompaign = length;
  return length 
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
//  console.log('sub',sub)
     
       let compaign= this.campingsService.getcampingsList((res => 
        res
      )).snapshotChanges().pipe(
          map((changes: Array<any>) =>
            changes.map(c =>
              ({ key: c.payload.key, ...c.payload.val() })
            )
          )
        ).subscribe(comp => {
      this.compaignLength(comp.length + sub.length)
     
      
    });
        }); 
     
      //return user;
}

 getUsers(){
  
   this.admin.getuser().subscribe(e=>{
    e.forEach(element => {
      this.usersid.push(element.payload.doc.id) 
     
    });
   // console.log('ids', this.usersid)
   })


 this.admin.getAllUser().subscribe(e=>{
   this.usersLength(e.length)
   //console.log('user is ',  e)
  //  this.users = [];
  //  e.forEach(element => {
  //   //  if(element.photoURL == null){
  //   //   element.photoURL = ''
  //   //  }
     
  //   this.users.push(element)
  //  });
  // console.log(this.profileUrl)
 })
 }

 spacificUser(id){
return  this.admin.getDataOfUser(id)

 }
usersLength(length){
  console.log('length is ', length)
  this.NumberOfUser = length;
  return length 
}

showUsers(){
  this.status =false;
}
deleteUser(uid){ 
  this.admin.deleteUser(uid)
}

compaignDetails(){
  this.router.navigate(['compaign'])
}

UsersDetails(){
  this.router.navigate(['user'])
}
}
