import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth, 
    private afs: AngularFirestore) { 
      this.user$ = this.afAuth.authState.pipe(
        switchMap(user => {
          if (user) {
            return this.afs.doc(`users/${user.uid}`).valueChanges();
          } else {
            return of(null);
          }
        })
      );
    }

  loginUser(email: string, password: string): Promise<firebase.default.auth.UserCredential> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logoutUser(): Promise<void> {
    return this.afAuth.signOut();
  }

  isLoggedIn(): Observable<boolean> {
    return this.user$.pipe(
      switchMap(user => {
        if (user) {
          return of(true);
        } else {
          return of(false);
        }
      })
    );
  }

  // getCurrentUser(): Promise<firebase.default.User | null> {
  //   return new Promise((resolve, reject) => {
  //     this.afAuth.onAuthStateChanged((user) => {
  //       resolve(user);
  //     }, (error) => {
  //       reject(error);
  //     });
  //   });
  // }
  getCurrentUser(): Promise<any> {
    return this.afAuth.currentUser;
  }

  registerUser(email: string, password: string, username: string, isAdmin: boolean): Promise<void> {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Store additional user data in Firestore
        return this.afs.collection('users').doc(user.uid).set({
          username,
          email,
          isAdmin
        });
      });
    }

    getUser(uid: string): Observable<any> {
      return this.afs.collection('users').doc(uid).valueChanges();
    }

    getUserData(): Observable<any> {
      return this.user$;
    }

}
