import * as firebase from 'firebase'
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Objectifs } from '../entities/objectifs';

@Injectable()
export class ObjectifsService {
  constructor(private db: AngularFirestore) { }

  basePath: string = 'objectifs/';

  getObjectifs() {
    return this.db.collection(this.basePath).snapshotChanges();
  }

  createObjectif(objectif: Objectifs) {
    objectif.creationDate = new Date();
    return this.db.collection(this.basePath).add(objectif);
  }

  updateObjectif(objectifId: string, value: boolean) {
    this.db.doc(this.basePath + objectifId).update({ clicked: value });
  }

  deleteObjectif(objectifId: string) {
    this.db.doc(this.basePath + objectifId).delete();
  }
}