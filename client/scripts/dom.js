import { auth, createUserWithEmailAndPassword } from "./fb.js";

//creating dom elements
const sidebar = document.getElementById('side-menu');
const hamMenu = document.getElementById('ham-menu');
const registerEmail = document.getElementById('register-username');
const registerPwd = document.getElementById('register-password');
const registerBtn = document.getElementById('register-button');

//toggling display property of sidebar menu
let menuHidden = false;
const hideBar = () => {
    hamMenu.addEventListener('click', ()=>{
        if(!menuHidden){
            sidebar.setAttribute('style', 'display:none');
            console.log("hello");
            menuHidden = true;
        }else if (menuHidden){
            sidebar.setAttribute('style', 'display:content');
            console.log("hello");
            menuHidden = false;
        }
    })
}

//register
const register = (e) => {
    e.preventDefault();
    registerBtn.addEventListener('click', ()=>{
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



//calling function
hideBar();
fbRegister();