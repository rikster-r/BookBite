import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBSZukp9HUMdxJFn7ohumUGdiLrECPPjAg',
  authDomain: 'library-bf484.firebaseapp.com',
  projectId: 'library-bf484',
  storageBucket: 'library-bf484.appspot.com',
  messagingSenderId: '756572754345',
  appId: '1:756572754345:web:0f7646f27405f481a674b8',
  measurementId: 'G-YY0S46WXFL',
};

const provider = new GoogleAuthProvider();
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const signIn = async () => await signInWithPopup(auth, provider);
export const signOutUser = () => signOut(auth);
export const isUserSignedIn = () => Boolean(auth.currentUser);

const db = getFirestore(app);
export const usersRef = collection(db, 'users');
export let userRef;
export let booksRef;

onAuthStateChanged(auth, async user => {
  if (!user) return;

  if (!userRef) {
    await setDoc(doc(usersRef, user.uid), { name: user.displayName, image: user.photoURL });
  }

  userRef = doc(usersRef, user.uid);
  booksRef = collection(usersRef, user.uid, 'books');
});

export async function saveBook(id, book) {
  try {
    await setDoc(doc(booksRef, id), book);
  } catch (error) {
    console.error('Error writing new message to Firebase Database', error); //todo
  }
}

export async function getBookbyId(id) {
  const bookRef = doc(booksRef, id);
  const docSnap = await getDoc(bookRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return;
  }
}

export async function deleteBookById(id) {
  await deleteDoc(doc(booksRef, id));
}
