import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class subscribesService {

 

  public dbPath = '/subscribes';
  
   subscribesRef: AngularFireList<Subscripe> = null;
  
   constructor(private db: AngularFireDatabase) {
     this.subscribesRef = db.list(this.dbPath);
   }
  
   createSubscribe(Subscripe: Subscripe): void {
     this.subscribesRef.push(Subscripe);
   }
  
   updateSubscripe(key: string, value: any): Promise<void> {
     return this.db.object(this.dbPath + '/' + key).update( value);
   }
  
   deleteSubscripe(data): Promise<void> {
    return  this.db.database.ref(`/subscribes/${data}`).remove()

   }
  
   getsubscribesList(query ): AngularFireList<Subscripe> {
     
     return this.db.list(this.dbPath , query);
     
   }
   getNotification(){
    return  this.db.list('notification').snapshotChanges()
  }

   deleteAll(): Promise<void> {
     return this.subscribesRef.remove();
   }

}
export interface Subscripe {
[key : string] : any

}