import admin from 'firebase-admin';
import { serviceAccountCredentials } from '../serviceAccountKey';
const serviceAccount = serviceAccountCredentials as admin.ServiceAccount;

export type Antrian = {
    kode_antrian: string;
    jenis_antrian: string;
    loket: number;
    tanggal_antrian: Date;
};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL,
});

const db = admin.firestore();
const antrianRef = db.collection('antrian');

export class FirebaseClient {
  private db: FirebaseFirestore.Firestore;
  private antrianRef: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;
  
  constructor() {
    this.db = db;
     this.antrianRef = antrianRef;
  }

  async addData(antrian: Antrian) {
      try {
        await antrianRef.add(antrian);
      } catch (error) {
        throw error
      }
  
      return;
  }

  async getData() {
      let snapshot;
      try {
        snapshot = await this.antrianRef.get();
      } catch (error) {
        throw error;
      }
  
      console.log(snapshot);
      return snapshot.docs.map(doc => doc.data());
  }

  async getDataById(id: string) {
    let snapshot;
    try {
      snapshot = await antrianRef.doc(id).get();
    } catch (error) {
      throw error;
    }
  
    return snapshot.data();
  }

  async updateData(id: string, update: Object) {
    let snapshot;
    try {
      await antrianRef.doc(id).update({
        ...update
      });
      snapshot = await antrianRef.doc(id).get();
    } catch (error) {
      throw error;
    }

    return snapshot.data();
  }

  async deleteData(id: string) {
    try {
      await antrianRef.doc(id).delete();
    } catch (error) {
      throw error;
    }

    return;
  }

  async getDataByJenisAntrian(jenisantrian: string) {
    let snapshot;
    try {
      snapshot = await antrianRef.where('jenis_antrian', '==', jenisantrian).get();
    } catch (error) {
      throw error;
    }

    return snapshot.docs.map(doc => doc.data());
  }

  async getDataByLoket(loket: number) {
    let snapshot;
    try {
      snapshot = await antrianRef.where('loket', '==', loket).get();
    } catch(error) {
      throw error;
    }

    return snapshot.docs.map(doc => doc.data());
  }
}