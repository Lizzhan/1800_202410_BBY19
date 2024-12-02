import { 
    db, auth,
} from "./firebase.js";
import { getFirestore, setDoc, collection, doc, getDoc, getDocs, query, where, addDoc, updateDoc, arrayUnion, arrayRemove} from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js'
import { 
    onAuthStateChanged,
  } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";


var train = "";
var station = "";
var stationID = "";
var incidentDetail = "";
var incidentTitle = "";
var uid = "";
var incidentID = "";

//DOM creation
const trainSelect = document.getElementById("trains");
const stationSelect = document.getElementById("stations");
const submitBtn = document.getElementById("submit-incident");

const inputField = document.getElementById("detail-input");
const inputTitle = document.getElementById("title-input");


//gets user id
onAuthStateChanged(auth, (user) => {
    if(user){
        uid = user.uid;

    }else{
        console.log("no user")
    }
})

//add event listenr to train selection, then fetch that train's stations fromm db
const trainSelected = () => {
    trainSelect.addEventListener("change", (e) => {
    //grabs user input
    train = e.target.value;
    //gets station
    getStations();
    })
    stationSelect.addEventListener("change", e => {
        console.log(e.target.value);
        station = e.target.value;
        getStationID(station);
    })
}


//gets station
//iterate throuhg the staions collection
const getStations = async () => {
    stationSelect.innerHTML = "";
    //gets information of staion
    const q = query(collection(db, "stations"), where("train", "==", train));
    const querySnapshot = await getDocs(q);
    const empty = document.createElement('option');
    stationSelect.appendChild(empty);
    //DOM creation to be added to page
    querySnapshot.forEach((station) => {
        const option = document.createElement('option');
        option.value = station.data().name;
        option.innerHTML = station.data().name;
        stationSelect.appendChild(option);
    })
}

//gets ID of the selected station from DB
const getStationID = async (name) => {
    const q = collection(db, "stations");
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((station) => {
        if(name == station.data().name){
            stationID = station.id;
            console.log(stationID);
        }
    })
}

//Post
const submitIncident = () => {
    //grabs user input
    submitBtn.addEventListener('click', e => {
        e.preventDefault();
        incidentDetail = inputField.value;
        incidentTitle = inputTitle.value;
        //pass input to database
        uploadToDB(incidentTitle, incidentDetail, stationID);
    })
}

//adds incident report to incidents database
//Incident ID is then saved to the current user's and the station's incidents array
const uploadToDB = async (title, detail, id) => {
    try{
        const incidentDocRef = collection(db, "incidents");
        let date = new Date()
        const incident = await addDoc(incidentDocRef, {
            title: title,
            detail: detail,
            stationID: id,
            time: date,
            uid : uid
        });
        incidentID = incident.id;
        console.log(incidentID);
        addToStation(stationID);
        addToUser();
        window.location.href = `eachStation.html?docID=${stationID}`;
    }catch (err){
        console.log(err);
    }
}

//add incident id to station's incident array
const addToStation = async (stationID) => {
    try{
        const stationRef = doc(db, "stations", stationID);
        await updateDoc(stationRef, {
            incidents: arrayUnion(incidentID)
        })

    }catch(err){
        console.log(err);
    }
    
}

//add incident id to user's incident array
const addToUser = async () => {
    try{
        const userRef = doc(db, "users", uid);
        await updateDoc(userRef, {
            posts: arrayUnion(incidentID)
        });
    }catch (err){
        console.log(err);
    }
}


trainSelected();
submitIncident();

