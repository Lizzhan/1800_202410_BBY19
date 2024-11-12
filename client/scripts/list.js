import { 
    auth, db
} from "./firebase.js";
import { getFirestore, setDoc, collection, doc, getDoc, getDocs, query, where, addDoc, updateDoc, arrayUnion, arrayRemove} from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js'
import { 
    onAuthStateChanged,
  } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";


const container = document.getElementById('stations');
var uid = "";

onAuthStateChanged(auth, (user) => {
    if(user){
        uid = user.uid;

    }else{
        console.log("no user")
    }
})

const renderList = async () => {
    const querySnapshot = await getDocs(collection(db, "stations"));
    querySnapshot.forEach((doc) => {
        const card = document.createElement('div');
        card.classList.add('card');
        const content = document.createElement("div");
        content.classList.add('station-content');
        const icon = document.createElement('img');
        icon.classList.add("bookmark");
        icon.src = "../images/icon/unsaved.png";
        icon.addEventListener('click', (e) => {
            e.preventDefault();
            icon.src = "../images/icon/saved.png";
            addToSave(uid, doc.id);
        })

        const link = document.createElement('a');
        link.innerHTML = doc.data().name;
        link.href = "eachStation.html?docID=" + doc.id;

        content.appendChild(link);
        content.appendChild(icon);
        container.appendChild(content);
    });
    
}

const addToSave = async(uid, stationID) => {
    try{
        const userRef = doc(db, "users", uid);
        await updateDoc(userRef, {
            saved: arrayUnion(stationID)
        });


        
    }catch (err){
        console.log(err);
    }
}

renderList();