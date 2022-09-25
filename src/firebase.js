// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { getStorage, ref, uploadBytes } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFvsmP1vXDZrWPPoAioibxw-Fv6jGVos0",
  authDomain: "auth-user-profile.firebaseapp.com",
  projectId: "auth-user-profile",
  storageBucket: "auth-user-profile.appspot.com",
  messagingSenderId: "948054138804",
  appId: "1:948054138804:web:0699b09e175c1ff79f1ce1"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}


export function logout() {
 return signOut(auth);
}


export function useAuth() {
  const [ currentUser, setCurrentUser ] = useState();
  
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])

  return currentUser;
}

//storage
export async function upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, currentUser.uid + '.png');

  setLoading(true);

  const snapshot = await uploadBytes(fileRef, file);

  setLoading(false);
  alert("File uploaded succefully");
}