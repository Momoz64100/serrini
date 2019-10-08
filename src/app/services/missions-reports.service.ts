import * as firebase from 'firebase'
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { MissionsReports } from '../entities/missions-reports';
import { fillStringByUserId } from '../helpers/utils';
import { ReportsFeed } from '../entities/reports-feed';


@Injectable()
export class MissionsReportsService {
  constructor(private db: AngularFirestore) { }

  basePath: string = 'missions-reports/';
  basePathFeed: string = 'reports-feed/';

  getMissions() {
    return this.db.collection(this.basePath).snapshotChanges();
  }

  createMission(mission: MissionsReports, userId: string) {
    mission.creationDate = new Date();
    mission.usersMissionReaded = userId;
    mission.usersMissionMessagesReaded = userId;
    return this.db.collection(this.basePath).add(mission);
  }

  updateViewMission(id: string, userId: string) {
    return this.db.collection(this.basePath).doc(id).ref.get().then(x => {
      var mission = x.data() as MissionsReports;
      mission.creationDate = new Date();
      mission.usersMissionReaded = fillStringByUserId(mission.usersMissionReaded, userId);
      mission.usersMissionMessagesReaded = fillStringByUserId(mission.usersMissionMessagesReaded, userId);
      this.db.doc(this.basePath + id).update(mission);
    });

  }

  updateReportsNewMessage(id: string, userId: string) {
    return this.db.collection(this.basePath).doc(id).ref.get().then(x => {
      var mission = x.data() as MissionsReports;
      mission.creationDate = new Date();
      mission.usersMissionMessagesReaded = userId;
      this.db.doc(this.basePath + id).update(mission);
    });
  }

  deleteMission(missionId: string) {
    this.db.doc(this.basePath + missionId).delete();
  }

  // Feed
  getFeedByReportId(reportId: string) {
    return this.db.collection(this.basePathFeed, x => x.where('reportId', '==', reportId)).snapshotChanges();
  }

  createFeed(feed: ReportsFeed) {
    feed.creationDate = new Date();
    return this.db.collection(this.basePathFeed).add(feed);
  }
}