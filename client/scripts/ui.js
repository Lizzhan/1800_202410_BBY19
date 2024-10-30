import {sidebar, hamMenu} from "./dom.js";
import {auth} from "./firebase.js";

//toggling display property of sidebar menu
let menuHidden = false;
function hideBar(){
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
hideBar();
