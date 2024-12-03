import { 
    loginBtn,
    loginEmail,
    loginPwd
 } from "./dom.js";
import {
    fbLogin
} from "./authentication.js";

//DOM add event listner to login
const login = () => {
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        fbLogin(loginEmail.value, loginPwd.value);
    })
}

login();