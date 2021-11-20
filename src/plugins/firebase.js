import firebase from 'firebase'


if (!firebase.apps.length) {
  firebase.initializeApp(
    {
      apiKey: "AIzaSyB9XMqxFqKUzz59cUPJz1kH0rZFknopwR4",
      authDomain: "delivery-app-69dc4.firebaseapp.com",
      projectId: "delivery-app-69dc4",
      storageBucket: "delivery-app-69dc4.appspot.com",
      messagingSenderId: "930688328257",
      appId: "1:930688328257:web:fd190116076c9017f79cc0",
      measurementId: "G-FJ9NMYYS9K"
    }
  )
}

export default firebase
