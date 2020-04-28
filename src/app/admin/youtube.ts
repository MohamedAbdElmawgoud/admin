import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Storage } from '@ionic/storage';
 
@Injectable({
    providedIn: 'root'
})
export class YoutubeService {




    constructor(private http: HttpClient ) {
    }

    async getVideoData(id) {
        return await this.http.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=AIzaSyDCkKxVlrW7YFvjCHVkwfBUcH5r915E-Rs`).toPromise()
        
    }
    async getChannelData(id) {
        return await this.http.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=AIzaSyDCkKxVlrW7YFvjCHVkwfBUcH5r915E-Rs`).toPromise()
        
    }
    async getUserChannels() {
        // let access = await this.storage.get('accessToken')
        return await this.http.get(`https://www.googleapis.com/youtube/v3/subscriptions?mine=true&part=snippet&maxResults=50&key=AIzaSyDCkKxVlrW7YFvjCHVkwfBUcH5r915E-Rs`, {
            headers: {
                Authorization: 'Bearer ' + 'ya29.a0Ae4lvC1vL3KjVTzUA3Na_no_mMZ8S-gca8CpaX2NROQJbaoaE0jNh0Dn_AVp-q6xY1IsB4C2UzszjFI_gvHKoEFXWvQeb9vJ0VCSn3N-4-3DNda9jKA8GxOzL3piRDQVDZJvX-GTHfaKmuhNZuaT-SHrqy26Zty-k4qO'
            }
        }).toPromise()

    }

}
