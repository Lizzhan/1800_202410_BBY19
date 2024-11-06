import { 
    db
} from "./firebase.js";
import { getFirestore, setDoc, collection, doc, getDocs} from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js'

const container = document.getElementById('stations');

const renderList = async () => {
    const querySnapshot = await getDocs(collection(db, "stations"));
    querySnapshot.forEach((doc) => {
        const div = document.createElement("div");
        const span = document.createElement('span');
        const link = document.createElement('a');
        link.innerHTML = doc.data().name;
        link.href = "eachStation.html?docID=" + doc.id;

        div.appendChild(link);
        div.appendChild(span);
        container.appendChild(div);
    });
    
}

renderList();