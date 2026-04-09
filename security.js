// Disable right click
document.addEventListener("contextmenu", e => e.preventDefault());

// Block devtools shortcuts (soft protection)
document.addEventListener("keydown", e => {
  if (
    e.key === "F12" ||
    (e.ctrlKey && e.shiftKey && ["I","C","J"].includes(e.key)) ||
    (e.ctrlKey && e.key === "U")
  ) {
    e.preventDefault();
  }
});

// IMPORTANT: do NOT block iframe interaction
// no window.stop()
// no preventDefault on clicks
