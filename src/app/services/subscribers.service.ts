import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor( private firestore:Firestore) { }


  fetchAllSubscribers(): Observable<any>{
    const collectionRef = collection(this.firestore,'subscribers');
    return collectionData(collectionRef,{idField:"id"});
  }

  deleteUser(userId: string){
    const collectionRef = collection(this.firestore, 'subscribers');
    const docRef = doc(collectionRef,`${userId}`)
    deleteDoc(docRef);
  }


}
