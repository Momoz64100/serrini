import * as firebase from 'firebase'
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { WorkingDay } from '../entities/working-day';

@Injectable()
export class WorkingDayService {
  constructor(private db: AngularFirestore) { }

  basePath: string = 'workings/';

  getWorkings() {
    return this.db.collection(this.basePath).snapshotChanges();
  }

  createWorking(working: WorkingDay) {
    working.timestamp = new Date();
    return this.db.collection(this.basePath).add(working);
  }

  updateWorking(workingId: string, value: string, message: string) {  
    this.db.doc(this.basePath + workingId).update({ status: value });
    this.db.doc(this.basePath + workingId).update({ message: message });
  }

  deleteWorking(workingId: string) {
    this.db.doc(this.basePath + workingId).delete();
  }
}