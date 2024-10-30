import { 
    loginBtn,
    loginEmail,
    loginPwd
 } from "./dom.js";
import {
    fbLogin
} from "./authentication.js";

const login = () => {
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        fbLogin(loginEmail.value, loginPwd.value);
    })
}

login();