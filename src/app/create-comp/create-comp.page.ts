import { Component, OnInit } from '@angular/core';
import { CompingsService, camping } from "src/app/admin/compings.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-create-comp',
  templateUrl: './create-comp.page.html',
  styleUrls: ['./create-comp.page.scss'],
})
export class CreateCompPage implements OnInit {
  Views = [10, 50,  100,150, 200,250, 300,350, 400,450
    , 500,550, 600,650, 700,750, 800,850, 900,950, 1000]
    seconds= [45,
      60,90,120,150,180,210,240,270,300,330,360,390,420,450,
      480,510,540,570,600,900,1200,1500,1800,
      2100,2400,2700,3000,3300,3600
    ]
  likes = 10;
  Subscribe = 10;
  view = 10;
  type: string;
  needed: number;
  ListOfUserDoneIt: string[];
  camping: camping;
  sec = 45;
  point = this.view * this.sec;
  video;
  videoId;
  userTotalPoint;
  user;
  status= false;
  constructor(
    private alertController: AlertController,    
    private datePipe: DatePipe,
    private comp: CompingsService,
    private router: ActivatedRoute,
    private route : Router,
   
  ) { }

  ngOnInit() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }
  getVideo(video) {
    if(/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})?$/.test(video.el.value)){
    this.video = video.el.value;

      let scrubbed = this.video.slice(this.video.indexOf('=') + 1)
      if (this.video.search('=') == -1) {
        scrubbed = this.video.slice(this.video.indexOf('be/') + 3)
      }
      // abc 123 Howdy
      this.videoId = scrubbed;
      console.log('video is ', scrubbed)
    }else{
      this.presentAlert('please add a youtube url')

    }

  }
  Onlikes(event) {
    this.likes = event.target.value;
    //  console.log('selecte is ', event.target.value)
  }
  OnSubscribe(event) {
    this.Subscribe = event.target.value;
    //  console.log('selecte is ', event.target.value)
  }
  Onview(event) {
    this.view = event.target.value;
    this.point = this.view * this.sec
    //  console.log('selecte is ', event.target.value)
  }
  Onsec(event) {
    this.sec = event.target.value;
    this.point = this.view * this.sec
    //  console.log('selecte is ', event.target.value)
  }
  async  createComp() {
    let lenOfComp;
    if (this.status== true){
    
     

      this.camping = {
        // likes: this.likes,
        // Subscribe: this.Subscribe,
        view: this.view,
        type: 'view',
        // needed: this.Subscribe,
        ListOfUserDoneIt: [],
        second: this.sec,
        point: this.point,
        videoUrl: this.videoId,
        createdData: Date.now(),
        ownerId : 'admin',
        photoURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5BdmOpYjhT8eCXbPFKrfK-4Jx0DHd-ihLDzSuE6tCi1dK1yUwfPOlwoJS&s=10',
        displayName:'admin',
        done: []
      }
      // this.comp.getcampingsList((res =>
      //   res.orderByChild('ownerId')
      //     .equalTo('admin'))).snapshotChanges().pipe(
      //       map((changes: Array<any>) =>
      //         changes.map(c =>
      //           ({ key: c.payload.key, ...c.payload.val() })
      //         )
      //       )
      //     ).subscribe(e=>{
      //       lenOfComp =e.length;
      //       if(lenOfComp==5){
      //          this.presentAlert('You have maximum Of compaign')
      //       }
           
             
      //     })

    //  
    this.comp.createcamping(this.camping);
    this.presentAlert('Added success');
    this.route.navigate([''])
    
    }
    else{
this.presentAlert('please play your video')
    }

  }
  changeStatus($event){
    setInterval(()=>{
    if(this.status==false){
     if($event.target.playerInfo.currentTime>0){
        console.log('event is',$event.target.playerInfo.currentTime)
        this.status = true;
      }
    }
   
    },1000)
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
