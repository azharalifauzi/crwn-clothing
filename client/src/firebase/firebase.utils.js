import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyCILG9y8U1SEVL5prAPMCcle5YvM4Syr9E",
    authDomain: "crwn-db-201dd.firebaseapp.com",
    databaseURL: "https://crwn-db-201dd.firebaseio.com",
    projectId: "crwn-db-201dd",
    storageBucket: "crwn-db-201dd.appspot.com",
    messagingSenderId: "738366650851",
    appId: "1:738366650851:web:39e8b64800278b0d70c8d6",
    measurementId: "G-QEB56J1GYE"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.massage);
    }
  }

  return userRef
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const addCollectionAndDocument = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit()
}

export const convertCollectionsSnapshotToMap = (collection) => {
  const transformedCollection = collection.docs.map(doc => {
    const {title, items} = doc.data();

    return {
      routeName : encodeURI(title.toLowerCase()),
      id : doc.id,
      items,
      title
    }
  });

  return transformedCollection.reduce((acc, collection) => {
    acc[collection.title.toLowerCase()] = collection;
    return acc;
  } , {});
};

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
