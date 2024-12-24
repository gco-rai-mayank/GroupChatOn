// arrow-key-navigation.js
document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowLeft") {  // Left arrow key for "prev" page
      const prevButton = document.querySelector(".blog-pager-older-link");
      if (prevButton) {
          prevButton.click();
      }
  } else if (event.key === "ArrowRight") {  // Right arrow key for "next" page
      const nextButton = document.querySelector(".blog-pager-newer-link");
      if (nextButton) {
          nextButton.click();
      }
  }
});
