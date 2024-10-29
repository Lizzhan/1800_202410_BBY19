import { 
    registerBtn,
    registerEmail,
    registerPwd
 } from "./dom.js";

 import { auth } from "./fb.js";

 import { createUserWithEmailAndPassword, 
    signInWithEmailAndPassword
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
        const user = await createUserWithEmailAndPassword(auth, rEmail, rPwd,);
        
    }catch (err){
        console.log(err);
    }
}


register();
