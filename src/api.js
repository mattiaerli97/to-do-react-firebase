import * as firebase from 'firebase';

const config = {
    apiKey: "FIREBASE_API_KEY",
    authDomain: "FIREBASE_AUTH_DOMAIN",
    databaseURL: "FIREBASE_DATABASE_URL",
    projectId: "FIREBASE_PROJECT_ID",
    storageBucket: "FIREBASE_STORAGE_BUCKET",
    messagingSenderId: "FIREBASE_MESSAGING_SENDER_ID",
    appId: "FIREBASE_APP_ID"
}

firebase.initializeApp(config);

export const dataBaseRef = firebase.firestore().collection('todos');
export const dataBaseRefUsers = firebase.firestore().collection('users');