// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

// Your Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBgBNXEulF2unLTOFx20u2M1dYbFGcVgL4",
    authDomain: "comp1800pj.firebaseapp.com",
    projectId: "comp1800pj",
    storageBucket: "comp1800pj.appspot.com",
    messagingSenderId: "897211712944",
    appId: "1:897211712944:web:d42938444c6267ee748275"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to fetch and log stations
const fetchStations = async () => {
  try {
    // Reference to the 'stations' collection
    const stationsCollection = collection(db, "stations");

    // Get all documents in the 'stations' collection
    const querySnapshot = await getDocs(stationsCollection);

    // Iterate over each document and log its data
    querySnapshot.forEach((doc) => {
      console.log(`Document ID: ${doc.id}`);
      console.log("Data:", doc.data());
    });
  } catch (error) {
    console.error("Error fetching stations:", error);
  }
};

// Call the function
fetchStations();
