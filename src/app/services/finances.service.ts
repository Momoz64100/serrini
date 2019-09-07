import * as firebase from 'firebase'
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { FinanceObjectif, FinanceRevenus } from '../entities/finances';
import { mergeDbId } from '../helpers/utils';
import { map } from 'rxjs/operators';

@Injectable()
export class FinancesService {
    constructor(private db: AngularFirestore) { }

    basePath: string = 'finances-objectif/';
    basePathRevenus: string = 'finances-revenus/';
    basePathRevenusGlobal: string = 'finances-revenus-global/';
    basePathContributors: string = 'finances-contributors/';

    getObjectifs() {
        return this.db.collection(this.basePath).snapshotChanges().pipe(map(mergeDbId));
    }

    createObjectif(objectif: FinanceObjectif) {
        objectif.isPrincipal = false;
        objectif.isCompleted = false;
        objectif.investedValue = 0;
        objectif.creationDate = new Date().toLocaleDateString();
        return this.db.collection(this.basePath).add(objectif);
    }

    updateObjectif(id: string, isPrincipal: boolean) {
        return this.db.doc(this.basePath + id).update({ isPrincipal: isPrincipal, investedValue: 0, updateDate: new Date().toLocaleDateString() });
    }

    updateObjectifOk(id: string) {
        return this.db.doc(this.basePath + id).update({ isCompleted: true, isPrincipal: false, investedValue: 0, updateDate: new Date().toLocaleDateString() });
    }

    updateInvestedValue(id: string, value: number) {
        return this.db.doc(this.basePath + id).update({ investedValue: value });
    }

    // Revenus
    getRevenus() {
        return this.db.collection(this.basePathRevenus).snapshotChanges().pipe(map(mergeDbId));
    }

    getRevenusByUser(userId: string) {
        return this.db.collection(this.basePathRevenus, x => x.where('userId', '==', userId)).snapshotChanges();
    }

    createRevenus(revenus: FinanceRevenus) {
        revenus.creationDate = new Date().toLocaleDateString();
        revenus.updateDate = new Date().toLocaleDateString();
        return this.db.collection(this.basePathRevenus).add(revenus);
    }

    updateRevenus(revenus: FinanceRevenus) {
        return this.db.doc(this.basePathRevenus + revenus.id).update({ value: revenus.value, updateDate: new Date().toLocaleDateString() });
    }

    // Revenus global
    getRevenusGlobal() {
        return this.db.collection(this.basePathRevenusGlobal).snapshotChanges().pipe(map(mergeDbId));
    }

    getRevenusGlobalByUser(userId: string) {
        return this.db.collection(this.basePathRevenusGlobal, x => x.where('userId', '==', userId)).snapshotChanges();
    }

    createRevenusGlobal(revenus: FinanceRevenus) {
        revenus.creationDate = new Date().toLocaleDateString();
        revenus.updateDate = new Date().toLocaleDateString();
        return this.db.collection(this.basePathRevenusGlobal).add(revenus);
    }

    updateRevenusGlobal(revenus: FinanceRevenus) {
        return this.db.doc(this.basePathRevenusGlobal + revenus.id).update({ value: revenus.value, updateDate: new Date().toLocaleDateString() });
    }
}