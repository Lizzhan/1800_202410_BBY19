import { 
    auth, db
} from "./firebase.js";
import { getFirestore, setDoc, collection, doc, getDoc, getDocs, query, where, addDoc, updateDoc, arrayUnion, arrayRemove} from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js'
import { 
    onAuthStateChanged,
  } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";


const container = document.getElementById('container');
var uid = "";

onAuthStateChanged(auth, (user) => {
    if(user){
        uid = user.uid;

    }else{
        console.log("no user")
    }
})

// const renderList = async () => {
//     const querySnapshot = await getDocs(collection(db, "stations"));
//     querySnapshot.forEach((doc) => {
//         const card = document.createElement('div');
//         card.classList.add('card');
//         const content = document.createElement("div");
//         content.classList.add('station-content');
//         const icon = document.createElement('img');
//         icon.classList.add("bookmark");
//         icon.src = "../images/icon/unsaved.png";
//         icon.addEventListener('click', (e) => {
//             e.preventDefault();
//             icon.src = "../images/icon/saved.png";
//             addToSave(uid, doc.id);
//         })

//         const link = document.createElement('a');
//         link.innerHTML = doc.data().name;
//         link.href = "eachStation.html?docID=" + doc.id;

//         content.appendChild(link);
//         content.appendChild(icon);
//         container.appendChild(content);
//     });
    
// }

const renderList = async () => {
    const querySnapshot = await getDocs(collection(db, "stations"));
    querySnapshot.forEach((doc) => {
        const stationData = doc.data();

        // Create the column div
        const colDiv = document.createElement('div');
        colDiv.classList.add('col');

        // Create the card div
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card', 'card-cover', 'h-100', 'overflow-hidden', 'text-bg-dark', 'rounded-4', 'shadow-lg');
        cardDiv.style.backgroundImage = `url('/client/images/station/default.png')`;

        // Create the content div inside the card
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('d-flex', 'flex-column', 'h-100', 'pb-3', 'text-shadow-1');

        // Add station name as a link
        const link = document.createElement('a');
        link.innerHTML = stationData.name;
        link.href = "eachStation.html?docID=" + doc.id;
        link.classList.add('text-white', 'fw-bold', 'display-6', 'lh-1', 'mb-4', 'mt-5'); // Styling to match Bootstrap headings

        // Add bookmark icon
        const bookmarkIcon = document.createElement('img');
        bookmarkIcon.classList.add('bookmark', 'border', 'border-white');
        bookmarkIcon.src = "../images/icon/unsaved.png";
        bookmarkIcon.style.cursor = "pointer";
        bookmarkIcon.addEventListener('click', (e) => {
            e.preventDefault();
            bookmarkIcon.src = "../images/icon/saved.png";
            addToSave(uid, doc.id);
        });

        // Append elements
        contentDiv.appendChild(link); // Add the link as the heading
        contentDiv.appendChild(bookmarkIcon); // Add the bookmark icon

        cardDiv.appendChild(contentDiv);
        colDiv.appendChild(cardDiv);

        // Append the column to the container
        const container = document.getElementById('container'); 
        container.appendChild(colDiv);
    });
};


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