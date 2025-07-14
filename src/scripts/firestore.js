// src/scripts/firestore.js

import { getFirestore, collection, addDoc, getDocs, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { firebaseConfig } from "./firebaseConfig.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function submitEntry(data) {
  data.timestamp = serverTimestamp();
  await addDoc(collection(db, "entries"), data);
  await addDoc(collection(db, "logs"), {
    action: "submit",
    data,
    timestamp: serverTimestamp(),
    user: localStorage.getItem("email")
  });
}

export async function getAllEntries() {
  const snapshot = await getDocs(collection(db, "entries"));
  const entries = [];
  snapshot.forEach(doc => entries.push(doc.data()));
  return entries;
}
