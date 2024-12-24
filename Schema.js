  document.addEventListener("DOMContentLoaded", function() {
    // Get dynamic data from the page content
    const postSlug = window.location.pathname.split("/").pop(); // Extract slug from URL
    const postTitle = document.querySelector("#postTitle") ? document.querySelector("#postTitle").textContent : "Default Title";
    const postDescription = document.querySelector(".post-description") ? document.querySelector(".post-description").textContent : "Default Description";

    // Create JSON-LD structure dynamically
    const ldJson = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Share WhatsApp Group Links",
      "description": "A platform to share and discover WhatsApp group links for various communities.",
      "url": `https://groupchaton.com/${postSlug}`,  // Dynamic URL based on postSlug
      "publisher": {
        "@type": "Organization",
        "name": "GroupChatOn"
      },
      "mainEntity": {
        "@type": "WebPageElement",
        "name": postTitle, // Dynamically filled title
        "description": postDescription // Dynamically filled description
      },
      "author": {
        "@type": "Person",
        "name": "Mayank Rai",
        "url": "https://www.blogger.com/profile/14808761783847941471"  // Add a valid URL for the author's profile
      }
    };

    // Create a <script> tag and append it to the <head> of the page
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(ldJson);
    document.head.appendChild(script);
  });
