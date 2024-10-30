 import { auth } from "./firebase.js";
 import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signOut,
  } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";

const fbRegister = async (email, password, name) => {
    try{
        const userCredential = await createUserWithEmailAndPassword(auth, email, password,);
        await updateProfile(userCredential.user, {
            displayName: name,
        });
        window.location.href = "./login.html";        
    }catch (err){
        console.log(err);
    }
}

const fbLogin = async (email, password) => {
    try{
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
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
    fbLogin
}
