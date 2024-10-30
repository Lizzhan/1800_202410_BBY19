import {sidebar, hamMenu} from "./dom.js";

//toggling display property of sidebar menu
let menuHidden = false;
function hideBar(){
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
$('#sidebar-placeholder').load('../pages/components/side_before.html');

hideBar();