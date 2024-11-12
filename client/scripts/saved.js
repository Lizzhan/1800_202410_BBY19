import { 
    db, auth,
} from "./firebase.js";
import { getFirestore, setDoc, collection, doc, getDoc, getDocs, query, where, addDoc, updateDoc, arrayUnion, arrayRemove} from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js'
import { 
    onAuthStateChanged,
  } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";

const container = document.getElementsByClassName("container");
const name = document.getElementById("name");
var userName = "";

onAuthStateChanged(auth, (user) => {
    if(user){
        userName = user.displayName;
        console.log(user.displayName);
        name.textContent = userName;
    }else{
        console.log("no user")
    }
})

const getSaved = async () => {
    // const collections = 
}