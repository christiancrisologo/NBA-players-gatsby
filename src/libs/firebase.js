import firebase from "firebase/app"
import 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCncW8H7Pn310Y4ZwSpsLFei2VIx9Xz79g",
    authDomain: "gatsbytest-95e39.firebaseapp.com",
    databaseURL: "https://gatsbytest-95e39.firebaseio.com",
    projectId: "gatsbytest-95e39",
    storageBucket: "gatsbytest-95e39.appspot.com",
    messagingSenderId: "731514773642",
    appId: "1:731514773642:web:d1938caf103df884c54d73"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//firebase.analytics()

export default firebase