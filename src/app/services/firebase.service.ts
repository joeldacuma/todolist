import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: AngularFirestore) { }

  getLists() {
    return this.firestore.collection('lists', ref => ref.orderBy('id')).valueChanges();
  }

  createTask(id, body) {
    return this.firestore.collection('lists').doc(id).set(body);
  }

  public async removeTasks(uid) {
    const batch = this.firestore.firestore.batch();
    const lists = await this.firestore.collection('lists').ref.get();
    lists.forEach(element => {
       if (element.ref.id === uid) {
        batch.delete(element.ref);
       }
    });

    return batch.commit();
  }

  updateTask(id, body) {
    return this.firestore.collection('lists').doc(id).update(body);
  }
}
