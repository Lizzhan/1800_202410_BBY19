import { auth } from "./fb.mjs";

//creating dom elements
const sidebar = document.getElementById('side-menu');
const hamMenu = document.getElementById('ham-menu');
const registerEmail = document.getElementById('register-username');
const registerPwd = document.getElementById('register-password');
const registerBtn = document.getElementById('register-bu    tton');

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
const register = () => {
    registerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const rEmail = registerEmail.value;
        const rPwd = registerPwd.value;
        console.log(rEmail);
        console.log(rPwd);
    })
}



//calling function
hideBar();
register();