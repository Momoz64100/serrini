import * as firebase from 'firebase'
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Users } from '../entities/users';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  constructor(private db: AngularFirestore) { }

  basePath: string = 'users/';

  getUsers() {
    return this.db.collection(this.basePath).snapshotChanges();
  }
  
  createUser(user: Users) {
    user.creationDate = new Date().toLocaleDateString();
    user.login = user.login.toLowerCase();
    return this.db.collection(this.basePath).add(user);
  }

  updateUser(user: Users) {
    this.db.doc(this.basePath + user.id).update(user);
  }

  updateTel(id: string, tel: string, surnom: string) {    
    this.db.doc(this.basePath + id).update({ tel: tel, surnom: surnom });
  }

  updateAllUserNewReport() {
    firebase.firestore().collection(this.basePath).get().then(x => {
      x.forEach(data => {
        this.db.doc(this.basePath + data.id).update({ newReport: true });
      })
    });
  }

  updateReportReaded(id: string) {
    this.db.doc(this.basePath + id).update({ newReport: false });
  }

  deleteUser(userId: string) {
    this.db.doc(this.basePath + userId).delete();
  }
}