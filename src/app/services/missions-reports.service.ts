import * as firebase from 'firebase'
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { MissionsReports } from '../entities/missions-reports';
import { mergeDbId } from '../helpers/utils';
import { map } from 'rxjs/operators';

@Injectable()
export class MissionsReportsService {
  constructor(private db: AngularFirestore) { }

  basePath: string = 'missions-reports/';

  getMissions() {
    return this.db.collection(this.basePath).snapshotChanges().pipe(map(mergeDbId));
  }

  createMission(mission: MissionsReports) {
    mission.creationDate = new Date();
    mission.isConfidential = false;
    return this.db.collection(this.basePath).add(mission);
  }

  updateMission(missionId: string, value: boolean) {
    this.db.doc(this.basePath + missionId).update({ clicked: value });
  }

  deleteMission(missionId: string) {
    this.db.doc(this.basePath + missionId).delete();
  }
}