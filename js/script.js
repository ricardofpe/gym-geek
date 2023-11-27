// HEADER //
const SVGMenuTab = document.querySelector('#menu-responsive')
const MenuTabDrop= document.querySelector('.container-menu-tab')

const SVGAcconutTab = document.querySelector('#svg-account')
const MenuAccountTabDrop= document.querySelector('.container-account-tab')


SVGMenuTab.addEventListener("click", function (event) {
    
    event.stopPropagation();
    
    const menuAberto = MenuTabDrop.style.display === "flex";

    MenuTabDrop.style.display = menuAberto ? "none" : "flex";
    MenuAccountTabDrop.style.display = "none"

    if(MenuAccountTabDrop.style.contains("flex")){
        MenuTabDrop.style("none")
    }
     
});

document.addEventListener("click", function (event) {
    
    if (!MenuTabDrop.contains(event.target) && MenuTabDrop.style.display === "flex") {
        MenuTabDrop.style.display = "none";
    }
});

SVGAcconutTab.addEventListener("click", function (event) {

    event.stopPropagation();
    
    const accountAberto = MenuAccountTabDrop.style.display === "flex";

    MenuAccountTabDrop.style.display = accountAberto ? "none" : "flex";
    MenuTabDrop.style.display = "none"

if(MenuTabDrop.style.contains("flex")){
    MenuAccountTabDrop.style("none")
}
 
});

document.addEventListener("click", function (event) {
    
    if (!MenuAccountTabDrop.contains(event.target) && MenuAccountTabDrop.style.display === "flex") {
        MenuAccountTabDrop.style.display = "none";
    }
});



