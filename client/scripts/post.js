import { 
    db
} from "./firebase.js";
import { getFirestore, setDoc, collection, doc, getDoc, getDocs, query, where, addDoc} from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js'

var train = "";
var station = "";
var stationID = "";
var incidentDetail = "";
var incidentTitle = "";

const trainSelect = document.getElementById("trains");
const stationSelect = document.getElementById("stations");
const submitBtn = document.getElementById("submit-incident");

const inputField = document.getElementById("detail-input");
const inputTitle = document.getElementById("title-input");

const trainSelected = () => {
    trainSelect.addEventListener("change", (e) => {
    console.log(e.target.value);
    train = e.target.value;
    getStations();
    })
    stationSelect.addEventListener("change", e => {
        console.log(e.target.value);
        station = e.target.value;
        getStationID(station);
    })
}


const getStations = async () => {
    stationSelect.innerHTML = "";
    const q = query(collection(db, "stations"), where("train", "==", train));
    const querySnapshot = await getDocs(q);
    const empty = document.createElement('option');
    stationSelect.appendChild(empty);
    querySnapshot.forEach((station) => {
        const option = document.createElement('option');
        option.value = station.data().name;
        option.innerHTML = station.data().name;
        stationSelect.appendChild(option);
    })
}

const getStationID = async (name) => {
    // const q = query(collection(db, "stations"), where("name", "==", station));
    const q = collection(db, "stations");
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((station) => {
        if(name == station.data().name){
            stationID = station.id;
            console.log(stationID);
        }
    })
}

const submitIncident = () => {
    submitBtn.addEventListener('click', e => {
        e.preventDefault();
        incidentDetail = inputField.value;
        incidentTitle = inputTitle.value;
        uploadToDB(incidentTitle, incidentDetail, stationID);
    })
}

//submit input value to database collection where id==stationID
const uploadToDB = async (title, detail, id) => {
    try{
    const incidentDocRef = collection(db, "incidents");
    let date = new Date()
    await addDoc(incidentDocRef, {
        title: title,
        detail: detail,
        stationID: id,
        time: date
    })
    }catch (err){
        console.log(err);
    }
}

trainSelected();
submitIncident();