import { Injectable, inject } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class HabitacionService {
  db = inject(Firestore);
  constructor() {}
  async prueba() {
    let query = await getDocs(collection(this.db, 'habitaciones'));
    return query.docs.map((doc) => doc.data());
  }
}
