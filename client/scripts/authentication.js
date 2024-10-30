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
        console.log(userCredential);
        await updateProfile(userCredential.user, {
            displayName: name,
        });
        console.log(userCredential.user.displayName);
        
    }catch (err){
        console.log(err);
    }
}

const fbLogin = async (email, password) => {
    try{
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log(userCredential);
        console.log(userCredential.user.displayName)
        console.log(auth);
    }catch (err){
        console.log(err);
    }
}

const userSignIn = () => {
    onAuthStateChanged(auth, (user) => {
        if(user){
            $('#sidebar-placeholder').load('../pages/components/side_after.html');
            const userDisplayName = document.getElementById('username');
            userDisplayName.textContent = user.displayName;
        }else{
            console.log($('#sidebar-placeholder').load('../pages/components/side_before.html'));

        }
    })
}

const userSignOut = () => {

}

userSignIn();

export {
    fbRegister,
    fbLogin
}
