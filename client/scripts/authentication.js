import { 
    registerBtn,
    registerEmail,
    registerPwd,
    registerName,
    loginBtn,
    loginEmail,
    loginPwd
 } from "./dom.js";
 import { auth } from "./firebase.js";
 import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signOut,
  } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";



//register
const register = () => {
    registerBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        console.log(registerEmail.value);
        fbRegister()
});
    }

const fbRegister = async () => {
    try{
        const rEmail = registerEmail.value;
        const rPwd = registerPwd.value;
        const rName = registerName.value;
        const userCredential = await createUserWithEmailAndPassword(auth, rEmail, rPwd,);
        console.log(userCredential);
        await updateProfile(userCredential.user, {
            displayName: rName,
        });
        console.log(userCredential.user.displayName);
        
    }catch (err){
        console.log(err);
    }
}

const login = () => {
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(loginEmail.value);
        console.log(loginPwd.value);

        // fbLogin();
    })
}

const fbLogin = async () => {
    try{
        const lEmail = loginEmail.value;
        const lPwd = loginPwd.value;
        const userCredential = await signInWithEmailAndPassword(auth, lEmail, lPwd);
        console.log(lEmail);
        console.log(userCredential);
    }catch (err){
        console.log(err);
    }
}

const userSignIn = () => {
    auth.onAuthStateChanged(auth, (user) => {
        if(user){
            $('#sidebar-placeholder').load('../pages/components/side_after.html');
            console.log(user.displayName);
        }else{
            $('#sidebar-placeholder').load('../pages/components/side_before.html');

        }
    })
}
// const signOut = async () => {
//     try{
//         signOut(auth);

//     }catch (err){
//         console.log(err);
//     }
// }


register();
login();
userSignIn();
