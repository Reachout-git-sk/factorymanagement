// src/scripts/auth.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import { firebaseConfig } from "./firebaseConfig.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

window.loginUser = async function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;
    const docSnap = await getDoc(doc(db, "users", uid));

    if (docSnap.exists()) {
      const role = docSnap.data().role;
      localStorage.setItem("uid", uid);
      localStorage.setItem("role", role);
      localStorage.setItem("email", email);
      window.location.href = "dashboard.html";
    } else {
      alert("No role found. Contact Admin.");
    }
  } catch (error) {
    alert("Login failed: " + error.message);
  }
};

window.logoutUser = function () {
  signOut(auth).then(() => {
    localStorage.clear();
    window.location.href = "index.html";
  });
};
