import * as firebase from 'firebase'
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Annuaire } from '../entities/annuaire';
import { Group } from '../entities/group';
import { map } from 'rxjs/operators';
import { mergeDbId, mergeDbIdSimpleValue } from '../helpers/utils';

@Injectable()
export class AnnuaireService {
  constructor(private db: AngularFirestore) { }

  basePath: string = 'annuaire/';
  basePathGRoup: string = 'groups/';

  getAnnuaires() {
    return this.db.collection(this.basePath).snapshotChanges().pipe(map(mergeDbId));;
  }

  getAnnuaireByid(id: string) {
    return this.db.collection(this.basePath).doc(id).snapshotChanges();
  }

  createAnnuaire(annuaire: Annuaire) {
    annuaire.creationDate = new Date();
    return this.db.collection(this.basePath).add(annuaire);
  }

  updateAnnuaire(annuaire: Annuaire) {
    this.db.doc(this.basePath + annuaire.id).update(annuaire);
  }

  deleteAnnuaire(annuaireId: string) {
    this.db.doc(this.basePath + annuaireId).delete();
  }

  // GROUPES
  getGroups() {
    return this.db.collection(this.basePathGRoup).snapshotChanges().pipe(map(mergeDbId));;
  }

  createGroup(group: Group) {
    group.creationDate = new Date();
    return this.db.collection(this.basePathGRoup).add(group);
  }
}