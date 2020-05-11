import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  public dbPath = '/settings';
  
   settingsRef: AngularFireList<settings> = null;


  constructor(private db: AngularFireDatabase) {
    this.settingsRef = db.list(this.dbPath);
   }


  createsetting(setting: settings): void {
    this.settingsRef.push(setting);
  }

  deletesetting(data): Promise<void> {
    return  this.db.database.ref(`/settings/${data}`).remove()
  
   } 
   getsettingsList(query ): AngularFireList<settings> {
    
    return this.db.list(this.dbPath , query);
    
  }
  getAllsettings() : AngularFireList<settings>{
   return this.db.list(this.dbPath);
  }
  updatesettings(key: string, value: any): Promise<void> {
    return this.db.object(this.dbPath + '/' + key).update( value);
  }
}

export interface settings{
email:string,
point:number,
version:string,
message: string,
AppURl: string,
discountVip:number,
discountAll:number,
Time: number,
hours : number
}