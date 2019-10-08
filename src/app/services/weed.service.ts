import * as firebase from 'firebase'
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Weed, WeedStock } from '../entities/weed';
import { map } from 'rxjs/operators';
import { mergeDbId } from '../helpers/utils';

@Injectable()
export class WeedService {
    constructor(private db: AngularFirestore) { }

    basePath: string = 'weed/';
    basePathStockWeed: string = 'weed-stocks/';

    getWeed() {
        return this.db.collection(this.basePath).snapshotChanges();
    }

    createWeed(weed: Weed) {
        weed.creationDate = new Date().toLocaleDateString();
        return this.db.collection(this.basePath).add(weed);
    }

    updateWeed(weed: Weed) {
        this.db.doc(this.basePath + weed.id).update(weed);
    }

    // Stock weed

    getStockWeed() {
        return this.db.collection(this.basePathStockWeed).snapshotChanges().pipe(map(mergeDbId));;
    }

    getStockWeedByUser(userId: string) {
        return this.db.collection(this.basePathStockWeed, x => x.where('userId', '==', userId)).snapshotChanges();
    }

    updateStockWeed(weed: WeedStock) {
        this.db.doc(this.basePathStockWeed + weed.id).update({ quantity: weed.quantity, updateDate: new Date().toLocaleDateString() });
    }

    createStockWeed(weed: WeedStock) {
        weed.creationDate = new Date().toLocaleDateString();
        return this.db.collection(this.basePathStockWeed).add(weed);
    }

    deleteStock(id: string) {
        return this.db.doc(this.basePathStockWeed + id).delete();
    }
}