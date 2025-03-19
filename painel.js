 // Menu Toggle Script
 document.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector(".menu");
    const closeBtn = document.getElementById("btn");
    const searchBtn = document.querySelector(".bx-search");

    function menuBtnChange() {
        if (menu.classList.contains("open")) {
            closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
        } else {
            closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
        }
    }

    closeBtn.addEventListener("click", () => {
        menu.classList.toggle("open");
        menuBtnChange();
    });

    searchBtn.addEventListener("click", () => {
        menu.classList.toggle("open");
        menuBtnChange();
    });
});