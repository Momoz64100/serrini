import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Radio } from '../entities/radio';

@Injectable()
export class RadioService {
  constructor(private db: AngularFirestore) { }

  basePath: string = 'radio/';

  getRadios() {
    return this.db.collection(this.basePath).snapshotChanges();
  }

  createRadio(radio: Radio) {
    return this.db.collection(this.basePath).add(radio);
  }

  updateRadio(radio: Radio) {
    this.db.doc(this.basePath + radio.id).update(radio);
  }
}