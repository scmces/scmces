/* document.addEventListener("DOMContentLoaded", function () {
  let currentPage = window.location.pathname.split("/").pop();

  if (currentPage === "") {
    currentPage = "index.html";
  }

  document.querySelectorAll(".nav a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");   // ✅ THIS is the key line
    }
  }); */

  

  /* making the changes for nav-bar to be active all over the page */
  document.addEventListener("DOMContentLoaded", function() {

  const navbar = document.querySelector(".navbar");
  const banner = document.querySelector(".brandrow");
  const body = document.body;

  let navbarHeight = navbar.offsetHeight;
  const bannerHeight = banner.offsetHeight;

  window.addEventListener("resize", () => {
    navbarHeight = navbar.offsetHeight;
  });

  window.addEventListener("scroll", function() {

    if (window.scrollY >= bannerHeight) {
      navbar.classList.add("sticky");
      body.style.paddingTop = navbarHeight + "px";
    } 
    else {
      navbar.classList.remove("sticky");
      body.style.paddingTop = "0";
    }

  });

  /* Highlight active page */
  const links = document.querySelectorAll(".navbar .nav a");
  const currentPage = window.location.pathname.split("/").pop();

  links.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

});

