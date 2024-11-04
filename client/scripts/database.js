import { 
    db, 
} from "./firebase.js"
import { getFirestore, setDoc, collection, doc, addDoc} from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js'



const usersCollection = collection(db, "users");

const createUser = async (user) => {
    try{
    await setDoc(doc(db, "users", user.uid));
    }catch (err){
        console.log(err);
    }
}

// const addStation = async (train, station) => {
//     try{
//         await addDoc(collection(db, "stations"), {
//             name:station,
//             train:train
//         })
//     }catch (err){
//         console.log(err);
//     }
// } 

// console.log(trains);