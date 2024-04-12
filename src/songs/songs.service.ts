import { Injectable } from '@nestjs/common';
import { firebaseAdmin } from 'src/config/firebase-admin';

@Injectable()
export class SongsService {
  private db: FirebaseFirestore.Firestore;

  constructor() {
    this.db = firebaseAdmin.firestore();
  }

  async create(songData: { songId: string, title: string, verses: [{ verseNumber: string, text: string, }] }, hymnId: string): Promise<any> {
    try {
      // Check if the hymn with the specified ID exists
      const hymnRef = this.db.collection('hymns').doc(hymnId);
      const hymnDocSnapshot = await hymnRef.get();

      if (!hymnDocSnapshot.exists) {
        console.error('Hymn with ID does not exist:', hymnId);
        return null;
      }

      // check if the document with the specified ID already exists
      const songRef = hymnRef.collection('songs').doc(songData.songId);
      const songDocSnapshot = await songRef.get();

      if (songDocSnapshot.exists) {
        console.error('Document with ID already exists', songData.songId);
        return null;
      }

      await songRef.set({ id: songData.songId, title: songData.title });

      // Create verse documents with custom IDs in the "verses" collection under the song
      if (songData.verses && songData.verses.length > 0) {
        const versePromises = songData.verses.map(async (verseData, index) => {
          const verseRef = songRef.collection('verses').doc(verseData.verseNumber);
          await verseRef.set(verseData);
          return { id: verseRef.id, ...verseData };
        });

        await Promise.all(versePromises);
      }

      return { id: songData.songId, ...songData }


    } catch (e) {
      console.error("Error adding songs: ", e);
    }
  }
}
