/* Menu */
let menu = document.querySelector(".menu");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");

closeBtn.addEventListener("click", ()=>{
  menu.classList.toggle("open");
  menuBtnChange();//calling the function(optional)
});
/**
     * Altera a aparência do botão do menu dependendo do estado
     */
function menuBtnChange() {
    if (menu.classList.contains("open")) {
        closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else {
        closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
    }
}
searchBtn.addEventListener("click", ()=>{ // Sidebar open when you click on the search iocn
  menu.classList.toggle("open");
  menuBtnChange(); //calling the function(optional)
});

