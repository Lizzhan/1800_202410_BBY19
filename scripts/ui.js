import {sidebar, hamMenu} from "./dom.js";
import {auth} from "./firebase.js";
import { userSignOut } from "./authentication.js";

//toggling display property of sidebar menu
let menuHidden = false;
const hideBar = () => {
    hamMenu.addEventListener('click', ()=>{
        if(!menuHidden){
            sidebar.setAttribute('style', 'display:none');
            menuHidden = true;
        }else if (menuHidden){
            sidebar.setAttribute('style', 'display:content');
            menuHidden = false;
        }
    })
}

const clickSignOut = () => {
    const signout = document.getElementById('signout-btn');
    signout.addEventListener('click', () => {
        userSignOut();
    })
}

hideBar();
// clickSignOut();
