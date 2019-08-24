import * as firebase from 'firebase'
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { MessageGrades } from '../entities/message-grades';

@Injectable()
export class MessageService {
  constructor(private db: AngularFirestore) { }

  basePath: string = 'messages/';

  getMessages() {
    return this.db.collection(this.basePath).snapshotChanges();
  }

  createMessage(message: MessageGrades) {
    return this.db.collection(this.basePath).add(message);
  }

  updateMessage(message: MessageGrades) {
    this.db.doc(this.basePath + message.id).update(message);
  }

  deleteMessage(messageId: MessageGrades) {
    this.db.doc(this.basePath + messageId).delete();
  }
}