import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  public dbPath = '/offers';
  
   offersRef: AngularFireList<offers> = null;


  constructor(private db: AngularFireDatabase) {
    this.offersRef = db.list(this.dbPath);
   }


  createoffer(offer: offers): void {
    this.offersRef.push(offer);
  }

  deleteoffer(data): Promise<void> {
    return  this.db.database.ref(`/offers/${data}`).remove()
  
   } 
   getoffersList(query ): AngularFireList<offers> {
    
    return this.db.list(this.dbPath , query);
    
  }
  getAlloffers() : AngularFireList<offers>{
   return this.db.list(this.dbPath);
  }
}

export interface offers{
point : number;
cash : number;
}