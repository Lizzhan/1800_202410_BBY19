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

//Registers user with Firebase authentication.
//user email and name is saved into the users collection in db.
const fbRegister = async (email, password, name) => {
    try{
        //register
        const userCredential = await createUserWithEmailAndPassword(auth, email, password,);
        //add name
        await updateProfile(userCredential.user, {
            displayName: name,
        });
        const user = userCredential.user;
        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, {
            email:user.email,
            name:user.displayName,
            posts: [],
            saved: []
        })
        //redirect
        window.location.href = "./login.html";        
    }catch (err){
        console.log(err);
    }
}

//user login with firebase authentication
const fbLogin = async (email, password) => {
    try{
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log(userCredential);
        //redirect
        window.location.href = "./index.html";        
        console.log(auth.currentUser);
    }catch (err){
        console.log(err);
    }
}

//change navbar display based on login status.
const userSignIn = async () => {
    try{
        await onAuthStateChanged(auth, (user) => {
            //if user is logged in
            if(user){
                $('#sidebar-placeholder').load('../pages/components/side_after.html');
                const userDisplayName = document.getElementById('username');
                userDisplayName.innerHTML = `, ${user.displayName}`;
                $('#sidebar-placeholder').on('click', '#signout-btn', () => {
                    userSignOut()
                });
            //if user is not logged in
            }else{
                $('#sidebar-placeholder').load('../pages/components/side_before.html');
            }
        })
    }catch (err){
        console.log(err);
    }
}

//user signout
const userSignOut = async () => {
    try{
        await signOut(auth);
    }catch (err){
        console.log(err);
    }
}

userSignIn();

export {
    fbRegister,
    fbLogin,
    userSignOut,
}
