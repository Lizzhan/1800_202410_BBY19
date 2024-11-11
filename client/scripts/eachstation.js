import { 
    db
} from "./firebase.js";

import { getFirestore, setDoc, collection, doc, getDocs, getDoc} from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js'

var stationName = "";
var train = "";
var incidents = "";
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
        incidents = docSnap.data().incidents;

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

        incidents.forEach((id) => {
            getIncidents(id);
        })
    }catch (err){
        console.log(err);
    }
}

const getIncidents = async (id) => {
    try{
        const docRef = doc(db, "incidents", id);
        const docSnap = await getDoc(docRef);
        let title = docSnap.data().title;
        let detail = docSnap.data().detail;
        let time = docSnap.data().time.toDate().toLocaleString();
        createIncidentUI(title, detail, time);
    }catch (err){
        console.log(err);
    }
}

const createIncidentUI = (title, detail, time) =>{
    const content = document.createElement('div');
    content.classList.add('incident');
    const postTitle = document.createElement('p');
    postTitle.textContent = title;
    postTitle.classList.add('title');
    const postTime = document.createElement('span');
    postTime.classList.add('time');
    postTime.textContent = time;
    const details = document.createElement('p');
    details.classList.add('detail');
    details.textContent = detail;

    content.appendChild(postTitle);
    content.appendChild(postTime);
    content.appendChild(details);

    container.appendChild(content);

}

renderStation()
