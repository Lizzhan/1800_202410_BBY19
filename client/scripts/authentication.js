 import { 
    auth,
    db
 } from "./firebase.js";
 import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signOut,
  } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";
import { getFirestore, setDoc, collection, doc,} from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js'


const fbRegister = async (email, password, name) => {
    try{
        const userCredential = await createUserWithEmailAndPassword(auth, email, password,);
        await updateProfile(userCredential.user, {
            displayName: name,
        });
        const user = userCredential.user;
        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, {
            email:user.email,
            name:user.displayName
        })
        window.location.href = "./login.html";        
        console.log(userCredential);
    }catch (err){
        console.log(err);
    }
}

const fbLogin = async (email, password) => {
    try{
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log(userCredential);
        window.location.href = "./index.html";        
    }catch (err){
        console.log(err);
    }
}

const userSignIn = async () => {
    try{
        await onAuthStateChanged(auth, (user) => {
            if(user){
                $('#sidebar-placeholder').load('../pages/components/side_after.html');
                const userDisplayName = document.getElementById('username');
                userDisplayName.innerHTML = user.displayName;
            }else{
                $('#sidebar-placeholder').load('../pages/components/side_before.html');

            }
        })
    }catch (err){
        console.log(err);
    }
}

const userSignOut = async () => {
    try{
        await signOut(auth);
    }catch (err){
        console.log(err);
    }
}

const clickSignOut = () => {
    const signout = document.getElementById('signout-btn');
    signout.addEventListener('click', () => {
        userSignOut();
    })
}
userSignIn();
// clickSignOut();
// userSignOut()

export {
    fbRegister,
    fbLogin,
    userSignOut,
}
