import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin/admin.service';
import { YoutubeService } from '../admin/youtube';
import { subscribesService } from '../admin/subscripe';
import { countryList, videos } from './country'
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-subscripe',
  templateUrl: './create-subscripe.page.html',
  styleUrls: ['./create-subscripe.page.scss'],
})
export class CreateSubscripePage implements OnInit {
  user;
  step = 0;
  countries = countryList;
  videos = videos;
  userChannel: any = {};
  Views = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
  seconds = [45,
    60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450,
    480, 510, 540, 570, 600, 900, 1200, 1500, 1800,
    2100, 2400, 2700, 3000, 3300, 3600
  ];
  points = 3000;

  constructor(private userService: AdminService, private youtube: YoutubeService,
    private alertController: AlertController,
    private subscribes: subscribesService,
    private route: Router

  ) {

  }

  async ngOnInit() {
    this.user = (await this.userService.getDataOfUser('admin')).docs[0].data()
    this.user.channel = null;
    if (!this.user.channel) {
      this.step = 1;
    } 
    else {
      this.userChannel = this.user.channel

    }
  }
  async  videoChange(e) {
    console.log(e.target.value)
    let scrubbed = e.target.value.slice(e.target.value.indexOf('=') + 1)
    if (e.target.value.search('=') == -1) {
      scrubbed = e.target.value.slice(e.target.value.indexOf('be/') + 3)
    }
    let videoData: any = await this.youtube.getVideoData(scrubbed)
    this.userChannel.video = scrubbed;
    if (videoData.items[0]) {
      let channelData: any = await this.youtube.getChannelData(videoData.items[0].snippet.channelId)
    this.userChannel.channelId= videoData.items[0].snippet.channelId;

      this.userChannel.channel = channelData.items[0].snippet;

    } else {
      this.presentAlert('Please add a valid video')
    }


  }

  async saveStepOne(c, v) {

    if (this.userChannel.channel) {
      let user = this.userService.getDataOfUser(this.user.uid).then(e => {

        let UserEdited = {
          ...e.docs[0].data(),
          channel: this.userChannel
        }
        this.userService.updateUser(UserEdited);
        this.step = 2
      });
    } else {

    }

  }


  async createComp(sec, view) {

    // if (this.user.point < this.points) {
    //   this.presentAlert("You don't have enough points")
    //   return
    // }
    let user = await this.user;

    let camping = {
      view: view.el.value,
      ListOfUserDoneIt: [],
      second: sec.el.value,
      point: this.points,
      channel: this.userChannel,
      createdData: Date.now(),
      ownerId: user.uid
    }
   // this.UpdateUSerPoints(-this.points)


    //  
    this.subscribes.createSubscribe(camping);
    this.presentAlert('Added success');
    this.route.navigate([''])


  }
  onChange(sec, view) {
    console.log(sec.el.value, view.el.value);
    this.points = +(sec.el.value * view.el.value * 0.1 * 5) + (view.el.value * 270)

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

  // UpdateUSerPoints(points) {
  //   console.log('updatePoint', points)
  //   let user = this.userService.getDataOfUser(this.user.uid).then(e => {

  //     let UserEdited = {
  //       ...e.docs[0].data(),
  //       point: e.docs[0].data().point + points
  //     }
  //     this.userService.updateUser(UserEdited)
  //   });

  // }
}


