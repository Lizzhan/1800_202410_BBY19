import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBgBNXEulF2unLTOFx20u2M1dYbFGcVgL4",
  authDomain: "comp1800pj.firebaseapp.com",
  projectId: "comp1800pj",
  storageBucket: "comp1800pj.appspot.com",
  messagingSenderId: "897211712944",
  appId: "1:897211712944:web:d42938444c6267ee748275"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

module.exports = auth;