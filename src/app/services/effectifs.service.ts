import * as firebase from 'firebase'
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { mergeDbId, concatUserName } from '../helpers/utils';
import { map } from 'rxjs/operators';
import { Effectifs } from '../entities/effectifs';

@Injectable()
export class EffectifsService {
  constructor(private db: AngularFirestore) { }

  basePath: string = 'effectifs/';

  getEffectifs() {
    return this.db.collection(this.basePath).snapshotChanges().pipe(map(mergeDbId));
  }

  getEffectifsByUser(userId: string) {
    return this.db.collection(this.basePath, x => x.where('userId', '==', userId)).snapshotChanges().pipe(map(mergeDbId));
  }

  createEmptyEffectif(userId: string, userName: string) {
    var effectif: Effectifs = {
      creationDate: new Date(),
      userId: userId,
      userName: userName,
      lundi2: 0,
      lundi3: 0,
      mardi2: 0,
      mardi3: 0,
      mercredi2: 0,
      mercredi3: 0,
      jeudi2: 0,
      jeudi3: 0,
      vendredi2: 0,
      vendredi3: 0,
      samedi2: 0,
      samedi3: 0,
      dimanche2: 0,
      dimanche3: 0
    }
    return this.db.collection(this.basePath).add(effectif);
  }

  updateEffectif(effectif: Effectifs) {
    this.db.doc(this.basePath + effectif.id).update(effectif);
  }

  resetAllEffectifs() {
    firebase.firestore().collection(this.basePath).get().then(x => {
      x.forEach(data => {
        this.db.doc(this.basePath + data.id).update({
          lundi2: 0,
          lundi3: 0,
          mardi2: 0,
          mardi3: 0,
          mercredi2: 0,
          mercredi3: 0,
          jeudi2: 0,
          jeudi3: 0,
          vendredi2: 0,
          vendredi3: 0,
          samedi2: 0,
          samedi3: 0,
          dimanche2: 0,
          dimanche3: 0
        });
      })
    });
  }
}