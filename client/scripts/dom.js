const sidebar = document.getElementById('side-menu');
const hamMenu = document.getElementById('ham-menu');
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

hideBar();