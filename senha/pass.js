/**
 * Script para controle do menu lateral
 */
document.addEventListener('DOMContentLoaded', function() {
  // Elementos do menu
  const menu = document.querySelector(".menu");
  const btnMenu = document.querySelector("#btn");
  const searchBtn = document.querySelector(".bx-search");
  
  // Função para alternar o estado do menu
  function toggleMenu() {
      menu.classList.toggle("open");
      updateMenuButtonIcon();
  }
  
  // Atualiza o ícone do botão do menu dependendo do estado
  function updateMenuButtonIcon() {
      if (menu.classList.contains("open")) {
          btnMenu.classList.replace("bx-menu", "bx-menu-alt-right");
      } else {
          btnMenu.classList.replace("bx-menu-alt-right", "bx-menu");
      }
  }
  
  // Event listeners
  if (btnMenu) {
      btnMenu.addEventListener("click", toggleMenu);
  }z
  
  if (searchBtn) {
      searchBtn.addEventListener("click", toggleMenu);
  }
});