import { Injectable } from '@nestjs/common';
import { firebaseAdmin } from 'src/config/firebase-admin';

@Injectable()
export class HymnsService {
  private db: FirebaseFirestore.Firestore;

  constructor() {
    this.db = firebaseAdmin.firestore();
  }

  async create(hymnData: any): Promise<any> {
    try {
      const hymnRef = this.db.collection('hymns');
      const hymnDocRef = hymnRef.doc(hymnData.id);

      // Check if the document with the specified ID already exists
      const hymnDocSnapshot = await hymnDocRef.get();

      if (!hymnDocSnapshot.exists) {
        await hymnDocRef.set(hymnData);
        console.log("Document written with ID: ", hymnDocRef.id);
        return { id: hymnDocRef.id, ...hymnData }
      }

      // TODO:: handle this error
      console.error('Document with ID already exists', hymnData.id);
      return null;

    } catch (e) {
      console.error("Error adding hymns: ", e);
    }

  }
}
