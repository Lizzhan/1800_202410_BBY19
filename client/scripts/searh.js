import { 
    db, auth,
} from "./firebase.js";
import { getFirestore, setDoc, collection, doc, getDoc, getDocs, query, where, addDoc, updateDoc, arrayUnion, arrayRemove} from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js'
import { 
    onAuthStateChanged,
  } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const searchResult = document.getElementById("search-result");

const trimString = (str) => {
    return str.toLowerCase().replace(/\s+/g, "");
}

const searchClick = async () =>  {
    let input = trimString(searchInput.value);
    console.log(input)
    const querySnapshot = await getDocs(collection(db, "stations"));
    querySnapshot.forEach((doc) => {
        let data = trimString(doc.data().name);
        if(data == input) {
            window.location.href = "eachStation.html?docID=" + doc.id;
        }
    })
}

searchButton.addEventListener('click', ()=>{
    searchClick();
})


