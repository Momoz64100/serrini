import 'firebase/firestore'
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

  deleteUser(userId: string) {
    this.db.doc(this.basePath + userId).delete();
  }
}