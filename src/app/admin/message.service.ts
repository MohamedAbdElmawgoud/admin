import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public dbPath = '/message';

  messageRef: AngularFireList<message> = null;
 
  constructor(private db: AngularFireDatabase) {
    this.messageRef = db.list(this.dbPath);
  }
 
  createmessage(message: message): void {
    this.messageRef.push(message);
  }
 
  updatemessage(key: string, value: any): Promise<void> {
    return this.db.object(this.dbPath + '/' + key).update( value);
  }
 
  deletemessage(data): Promise<void> {
   return  this.db.database.ref(`/message/${data}`).remove()
 
  } 
 
  getmessageList(query ): AngularFireList<message> {
    
    return this.db.list(this.dbPath , query);
    
  }
  getAllmessage() : AngularFireList<message>{
   return this.db.list(this.dbPath);
  }
  
 
  deleteAll(): Promise<void> {
    return this.messageRef.remove();
  }
 
 }
 export interface message {
 
 header:string,
 body:string
 }