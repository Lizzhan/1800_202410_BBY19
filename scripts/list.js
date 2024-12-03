import {
    auth, db
} from "./firebase.js";
import { getFirestore, setDoc, collection, doc, getDoc, getDocs, query, where, addDoc, updateDoc, arrayUnion, arrayRemove, orderBy } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js'
import {
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";


const container = document.getElementById('stations');
const canada = document.getElementById('canada');
const expo = document.getElementById('expo');
const millennium = document.getElementById('millennium');


//DOM creation of stations
const cdropDown = document.getElementById('cdrop-down');
const edropDown = document.getElementById('edrop-down');
const mdropDown = document.getElementById('mdrop-down');

var uid = "";

//get user id
onAuthStateChanged(auth, (user) => {
    if (user) {
        uid = user.uid;

    } else {
        console.log("no user")
    }
})

//adds station to user's saved array in db
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


//add event listener to toggle display proeperty of dropdown div
const addClicks = () => {
    canada.addEventListener('click', () => {
        cdropDown.classList.toggle('show');
    })
    expo.addEventListener('click', () => {
        edropDown.classList.toggle('show');
    })
    millennium.addEventListener('click', () => {
        mdropDown.classList.toggle('show');
    })    
}
const renderCanada = async () => {
    //gets information of staion
    const q = query(collection(db, "stations"), where("train", "==", "Canada Line"), orderBy("name", "asc"));
    const querySnapshot = await getDocs(q);
    //DOM creation to be added to page
    querySnapshot.forEach((station) => {
        const card = document.createElement('div');;
        card.classList.add('stations');
        card.classList.add('canada-line')
        const link = document.createElement('a');
        link.innerHTML = station.data().name;
        link.href = "eachStation.html?docID=" + station.id;
        card.appendChild(link);
        cdropDown.appendChild(card);
        const icon = document.createElement('img');
        icon.classList.add("bookmark");
        icon.setAttribute('id', 'icon')
        icon.src = "../images/icon/unsaved.png";
        icon.addEventListener('click', (e) => {
            e.preventDefault();
            icon.src = "../images/icon/saved.png";
            addToSave(uid, station.id);
        })
        card.appendChild(icon);
        
    })
}
const renderExpo = async () => {
    //gets information of staion
    const q = query(collection(db, "stations"), where("train", "==", "Expo Line"),  orderBy("name", "asc"));
    const querySnapshot = await getDocs(q);
    //DOM creation to be added to page
    querySnapshot.forEach((station) => {
        const card = document.createElement('div');;
        card.classList.add('stations');
        card.classList.add('expo-line')
        const link = document.createElement('a');
        link.innerHTML = station.data().name;
        link.href = "eachStation.html?docID=" + station.id;
        card.appendChild(link);
        edropDown.appendChild(card);
        const icon = document.createElement('img');
        icon.classList.add("bookmark");
        icon.setAttribute('id', 'icon')
        icon.src = "../images/icon/unsaved.png";
        icon.addEventListener('click', (e) => {
            e.preventDefault();
            icon.src = "../images/icon/saved.png";
            addToSave(uid, station.id);
        })
        card.appendChild(icon);
    })
}
const renderMillennium = async () => {
    //gets information of staion
    const q = query(collection(db, "stations"), where("train", "==", "Millennium Line"),  orderBy("name", "asc"));
    const querySnapshot = await getDocs(q);
    //DOM creation to be added to page
    querySnapshot.forEach((station) => {
        const card = document.createElement('div');;
        card.classList.add('stations');
        card.classList.add('millennium-line')
        const link = document.createElement('a');
        link.innerHTML = station.data().name;
        link.href = "eachStation.html?docID=" + station.id;
        card.appendChild(link);
        mdropDown.appendChild(card);
        const icon = document.createElement('img');
        icon.classList.add("bookmark");
        icon.setAttribute('id', 'icon')
        icon.src = "../images/icon/unsaved.png";
        icon.addEventListener('click', (e) => {
            e.preventDefault();
            icon.src = "../images/icon/saved.png";
            addToSave(uid, station.id);
        })
        card.appendChild(icon);
    })
}
renderCanada();
renderExpo();
renderMillennium();

addClicks();

