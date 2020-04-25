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
           console.log('com',comp);
  
           
           this.compaigns.forEach(element => {
            this.spacificUser(element.ownerId).then(e=>{
             this.usersComp.push(e.docs[0].data())
            
            })
           
         });
        
         console.log(this.usersComp)
          }); 
       
        //return user;
  }
  spacificUser(id){
    return  this.admin.getDataOfUser(id)
    
     }
}
