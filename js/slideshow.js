document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".slideshow").forEach(slideshow => {

    let index = 0;
    const slides = slideshow.querySelectorAll(".slide");

    if (slides.length === 0) return;

    function showSlide(i) {
      slides.forEach(s => s.classList.remove("active"));
      index = (i + slides.length) % slides.length;
      slides[index].classList.add("active");
    }

    // autoplay every 3 seconds
    setInterval(() => {
      showSlide(index + 1);
    }, 3000);

    // buttons (optional but supported)
    const prev = slideshow.querySelector(".prev");
    const next = slideshow.querySelector(".next");

    if (prev) prev.addEventListener("click", () => showSlide(index - 1));
    if (next) prev && next.addEventListener("click", () => showSlide(index + 1));

    showSlide(0);
  });

});
