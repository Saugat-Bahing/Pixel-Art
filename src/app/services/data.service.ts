import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  pixelRef: AngularFirestoreCollection;
  userRef: AngularFirestoreCollection;

  constructor(private db:AngularFirestore) {

    this.pixelRef = db.collection('pixels');
    this.userRef = db.collection('users');
   }

   setPixels(id:string, data:{}) {

    return new Promise<any>((resolve, reject) => {

      this.pixelRef.doc(id).set(data)
      .then((res)=>{
        resolve(res);
      })
      .catch(
        (err)=> {

          reject(err);
        }
      )
    });
   }

   getPixels() {

    return this.pixelRef.snapshotChanges().pipe(
      catchError(this.handleError),
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    )
   } 

  setUserPixel(id:string, data:{}) {
    
    return new Promise<any>((resolve, reject) => {

      this.userRef.doc(id).set(data)
      .then((res)=>{
        resolve(res);
      })
      .catch(
        (err)=> {

          reject(err);
        }
      )
    });
  }

  getUserPixel() {

    return this.userRef.snapshotChanges().pipe(
      catchError(this.handleError),
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    );
  }

   handleError() {

    return throwError(() => new Error("Error"))
   }
}
