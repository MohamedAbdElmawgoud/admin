import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AlertController } from "@ionic/angular";
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private alertController: AlertController,
  ) { }

  updateUser(user) {
        
            this.firestore.collection('users')
              .ref.where('uid', '==', user.uid).get().then(ele => {
                ele.docs[0].ref.update({
                  ...user
                })
              })
          }

   getAllUser(){
  return  this.firestore.collection('users').valueChanges()
   }
   getuser(){
  return  this.firestore.collection('users').snapshotChanges()  
   }
   deleteUser(uid){
    return this.firestore.collection('users').doc(uid).delete()
   }

   getDataOfUser(id) {
    return  this.firestore.collection('users')
      .ref.where('uid', '==', id).get()
  }
}
 
