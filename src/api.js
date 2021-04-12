import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyBlKrTZay2L-3XIUchV_-2Xw974h9yL7wo",
    authDomain: "todo-react-27cef.firebaseapp.com",
    databaseURL: "https://todo-react-27cef.firebaseio.com",
    projectId: "todo-react-27cef",
    storageBucket: "todo-react-27cef.appspot.com",
    messagingSenderId: "689805188245",
    appId: "1:689805188245:web:c128ab6b22e52a0698cf9c"
  };

firebase.initializeApp(config);

export const dataBaseRef = firebase.firestore().collection('todos');
export const dataBaseRefUsers = firebase.firestore().collection('users');
export const dataBaseRefLists = firebase.firestore().collection('lists');