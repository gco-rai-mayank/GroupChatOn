window.addEventListener("load", function() {
    const message = document.getElementById("navigationMessage");
    const closeMessage = document.getElementById("closeMessage");

    // Check if the screen width is larger than 768px (for desktops/laptops)
    if (window.innerWidth >= 768) {
        message.style.visibility = "visible";  // Show the message
    } else {
        message.style.visibility = "hidden";  // Hide the message on mobile
    }

    closeMessage.addEventListener("click", function() {
        message.style.transform = "translateY(-100%)";  // Hide when clicked
    });
});
