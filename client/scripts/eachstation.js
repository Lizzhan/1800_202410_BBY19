import { 
    db
} from "./firebase.js";

import { getFirestore, setDoc, collection, doc, getDocs, getDoc} from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js';
import "./node_modules/mapbox-gl/dist/mapbox-gl.js";


var stationName = "";
var train = "";
var incidents = "";
var longitude = "";
var latitude = "";
const container = document.querySelector('.content');

//get station's information from db based on the ID in url.
const renderStation = () => {
    let url = new URL(window.location.href);
    let id = url.searchParams.get("docID");
    //ID passed as parameter into this function to get detailed information.
    getTitle(id);
}

//getting detailed information and add to page via DOM
const getTitle = async (id) => {
    const docRef = doc(db, "stations", id);
    try{
        const docSnap = await getDoc(docRef);
        stationName = docSnap.data().name;
        train = docSnap.data().train;
        incidents = docSnap.data().incidents;
        latitude = docSnap.data().latitude;
        longitude = docSnap.data().longitude;
        //renders mapbox
        createMap();
        const trainHolder = document.getElementById("train-name");
        const nameHolder = document.getElementById("station-name");
        trainHolder.textContent = stationName;
        nameHolder.textContent = train;
        //iterate through incidents array in DB and add to page
        incidents.forEach((id) => {
            getIncidents(id);
        })
    }catch (err){
        console.log(err);
    }
}

//fetch incident details and add to page via DOM
const getIncidents = async (id) => {
    try{
        const docRef = doc(db, "incidents", id);
        const docSnap = await getDoc(docRef);
        let title = docSnap.data().title;
        let detail = docSnap.data().detail;
        let time = docSnap.data().time.toDate().toLocaleString();
        //DOM creation
        createIncidentUI(title, detail, time);
    }catch (err){
        console.log(err);
    }
}

//DOM creation
const createIncidentUI = (title, detail, time) =>{
    const content = document.createElement('div');
    content.classList.add('incident');
    const postTitle = document.createElement('p');
    postTitle.textContent = title;
    postTitle.setAttribute('style', 'font-weight:bold');
    postTitle.classList.add('title');
    const postTime = document.createElement('span');
    postTime.classList.add('time');
    postTime.textContent = time;
    postTime.setAttribute('style', 'font-weight:bold');

    const details = document.createElement('p');
    details.classList.add('detail');
    details.textContent = detail;
    const straightLine = document.createElement('hr');

    content.appendChild(straightLine);
    content.appendChild(postTime);
    content.appendChild(postTitle);
    content.appendChild(details);

    container.appendChild(content);

}

//creates map
const createMap = () => {
    mapboxgl.accessToken = 'pk.eyJ1IjoibGVzbGllemhxeSIsImEiOiJjbTN3ZGk0cWMxNDZ0MmlxMnQyNmt2MG5tIn0.RlwrbiwwyARn4FaXfUGJgw';
    var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [longitude, latitude],
    zoom: 15
    });
}




renderStation()
