import * as firebase from 'firebase'
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Annuaire } from '../entities/annuaire';
import { Group } from '../entities/group';

@Injectable()
export class AnnuaireService {
  constructor(private db: AngularFirestore) { }

  basePath: string = 'annuaire/';
  basePathGRoup: string = 'groups/';

  getAnnuaires() {
    return this.db.collection(this.basePath).snapshotChanges();
  }

  createAnnuaire(annuaire: Annuaire) {
    annuaire.creationDate = new Date();
    return this.db.collection(this.basePath).add(annuaire);
  }

  updateAnnuaire(annuaireId: string, value: boolean) {
    this.db.doc(this.basePath + annuaireId).update({ clicked: value });
  }

  deleteAnnuaire(annuaireId: string) {
    this.db.doc(this.basePath + annuaireId).delete();
  }

  // GROUPES
  getGroups() {
    return this.db.collection(this.basePathGRoup).snapshotChanges();
  }

  createGroup(group: Group) {
    group.creationDate = new Date();
    return this.db.collection(this.basePathGRoup).add(group);
  }
}