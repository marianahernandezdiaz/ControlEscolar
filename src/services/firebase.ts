import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAu-ORf5iybVaeYVXRWcpJyW-ybAvyydmg",
  authDomain: "segundatecno.firebaseapp.com",
  projectId: "segundatecno",
  storageBucket: "segundatecno.firebasestorage.app",
  messagingSenderId: "474028861424",
  appId: "1:474028861424:web:54a0f15b446008a961df35",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);