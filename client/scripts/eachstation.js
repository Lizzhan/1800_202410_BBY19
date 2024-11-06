import { 
    db
} from "./firebase.js";

import { getFirestore, setDoc, collection, doc, getDocs, getDoc} from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js'

var stationName = "";
var train = "";
const container = document.querySelector('.content');

const renderStation = () => {
    let url = new URL(window.location.href);
    let id = url.searchParams.get("docID");
    getTitle(id);

}

const getTitle = async (id) => {
    const docRef = doc(db, "stations", id);
    try{
        const docSnap = await getDoc(docRef);
        stationName = docSnap.data().name;
        train = docSnap.data().train;
        const trainHolder = document.getElementById("train-name");
        const nameHolder = document.getElementById("station-name");
        trainHolder.innerHTML = stationName;
        nameHolder.innerHTML = train;

        const incidentContainer = document.createElement('div');
        incidentContainer.id = "incidents";
        const eachIncident = document.createElement('div');
        eachIncident.classList.add("each-incident");
        incidentContainer.appendChild(eachIncident);
        container.appendChild(incidentContainer);


    }catch (err){
        console.log(err);
    }

}

renderStation()
