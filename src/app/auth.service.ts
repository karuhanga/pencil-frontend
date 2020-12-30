import { Injectable } from '@angular/core';
import {FirebaseService} from "./firebase.service";

import firebase from "firebase/app";
import "firebase/auth";
import * as firebaseui from "firebaseui";
import {BehaviorSubject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private ui: firebaseui.auth.AuthUI;
  readonly userSubject = new BehaviorSubject<firebase.User|null>(null);

  constructor(private firebaseService: FirebaseService) {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    firebase.auth().onAuthStateChanged(user => {
      console.log(user)
      this.userSubject.next(user);
    });
    this.ui = new firebaseui.auth.AuthUI(firebase.auth());
  }

  initLoginButton(element: string, onSetupComplete: () => void) {
    const authService = this;
    function initButton() {
      authService.ui.start(element, {
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
        signInFlow: 'popup',
        siteName: " A single-page note taking tool",
        callbacks: {
          signInSuccessWithAuthResult: () => false,
        },
      });
      onSetupComplete();
    }

    setTimeout(initButton, 1500); // artificial delay to avoid jarring button jump
  }
}
