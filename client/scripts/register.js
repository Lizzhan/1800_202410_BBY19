import{
    registerBtn,
    registerEmail,
    registerPwd,
    registerName,
} from "./dom.js";

import{
    fbRegister,
} from "./authentication.js"

const register = () => {
    registerBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        console.log(registerEmail.value);
        fbRegister(registerEmail.value, registerPwd.value, registerName.value);
});
}

register();