import { Injectable } from '@angular/core';

import { AdminService } from "../admin/admin.service";

import { HttpClient,HttpErrorResponse, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  tockens=[];

  constructor(
    private admin :AdminService,
    private httpClient: HttpClient
  ) { }
  
  async notifications( title , content){
    let  headers;
    let body;
  this.tockens =[]
   let key='AAAAoXhq9Ag:APA91bFIrZ6Q5rGO5xRwgLP7yGzBSJ0uEueJ_NLhALl54Af_BBo7GXgVpIAuLaFe1Ydfso7TX-mcRetpI97Ws5gigwVrfQ9R3q34kCsQgB3ZJ9h9EReFmr-fFaxS3FY200jmg4W9oTm5'
    this.admin.getAllUser().subscribe(e=>{
     // console.log('sada',e)
      e.forEach(element => {
       
       if (element.token){
        this.tockens.push(element.token)
       } 
      
      });
      console.log('tock',this.tockens)
      const options ={
     headers: new HttpHeaders({
      'Authorization': key , 
          'registration_ids' :this.tockens
    })
  }
   body={ "notification": {
      "title": title, 
      "body": content
      }
    }
    return ( this.httpClient.post('Https://fcm.googleapis.com/fcm/send',body,options).toPromise().then(res=>{
      console.log(res)
    })
  )
    })
  //  return (<any>await this.httpClient.post(`Https://fcm.googleapis.com/fcm/send`,body,headers)).toPromise()
  
  }
  // return (<any>await this.httpClient.post(`Https://fcm.googleapis.com/fcm/send`+key,{
  //   body: body,
  //   headers: headers
  // })).toPromise()
}
