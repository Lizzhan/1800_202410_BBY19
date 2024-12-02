import { 
    db, auth,
} from "./firebase.js";
import { getFirestore, setDoc, collection, doc, getDoc, getDocs, query, where, addDoc, updateDoc, arrayUnion, arrayRemove} from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js'
import { 
    onAuthStateChanged,
  } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";

const container = document.querySelector(".content");
const name = document.getElementById("name");
var userName = "";
var uid = "";

//only gets saved information if user is logged in.
onAuthStateChanged(auth, (user) => {
    if(user){
        userName = user.displayName;
        name.textContent = userName;
        uid = user.uid;
        console.log(uid);
        getSaved();
    }else{
        console.log("no user")
    }
})

const getSaved = async () => {
    const docRef = doc(db, "users", uid);
    try{
        const docSnap = await getDoc(docRef);
        const arr = docSnap.data().saved;
        arr.forEach(stationID => {
                getStation(stationID);
            });
    }catch (err){
        console.log(err);
    }
}

const getStation = async (stationID) => {
    const stationRef = doc(db, "stations", stationID);
    try{
        const stationSnap = await getDoc(stationRef);
        const station = stationSnap.data();
        console.log(station.name);
        console.log(stationSnap.id)

        const card = document.createElement('div');
        card.classList.add('card');
        const content = document.createElement("div");
        content.classList.add('station-content');
        const link = document.createElement('a');
        link.innerHTML = station.name;
        link.href = "eachStation.html?docID=" + stationSnap.id;
        
        content.appendChild(link);
        container.appendChild(content);


    }catch (err){
        console.log(err);
    }
}

