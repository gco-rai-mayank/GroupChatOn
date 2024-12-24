let startX;
let startY;
let distX;
let distY;
let threshold = 150; // Minimum distance for swipe to trigger

document.addEventListener('touchstart', function(e) {
  const touchObj = e.changedTouches[0];
  startX = touchObj.pageX;
  startY = touchObj.pageY;
}, false);

document.addEventListener('touchend', function(e) {
  const touchObj = e.changedTouches[0];
  distX = touchObj.pageX - startX;
  distY = touchObj.pageY - startY;

  if (Math.abs(distX) > Math.abs(distY) && Math.abs(distX) > threshold) {
    if (distX > 0) {
      // Swipe right (Next page)
      const nextButton = document.querySelector(".blog-pager-newer-link");
      if (nextButton) {
        nextButton.click();
      }
    } else {
      // Swipe left (Previous page)
      const prevButton = document.querySelector(".blog-pager-older-link");
      if (prevButton) {
        prevButton.click();
      }
    }
  }
}, false);
