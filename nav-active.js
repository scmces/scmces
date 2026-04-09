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
 document.addEventListener("DOMContentLoaded", function () {

  /* ===== Sticky Navbar ===== */
  const navbar = document.querySelector(".navbar");
  const banner = document.querySelector(".brandrow");
  const body = document.body;

  if (navbar && banner) {
    let navbarHeight = navbar.offsetHeight;
    const bannerHeight = banner.offsetHeight;

    window.addEventListener("resize", () => {
      navbarHeight = navbar.offsetHeight;
    });

    window.addEventListener("scroll", function () {
      if (window.scrollY >= bannerHeight) {
        navbar.classList.add("sticky");
        body.style.paddingTop = navbarHeight + "px";
      } else {
        navbar.classList.remove("sticky");
        body.style.paddingTop = "0";
      }
    });
  }

  /* ===== Active Link Highlight ===== */
  const links = document.querySelectorAll(".navbar .nav a");
  const currentPage = window.location.pathname.split("/").pop();

  links.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

const toggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

toggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// Close menu when clicking link (hamburger stays!)
document.querySelectorAll("#nav-menu a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

});