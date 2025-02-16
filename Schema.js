document.addEventListener("DOMContentLoaded", function () {
  // Check if it's a post page by detecting the post title
  const isPostPage = document.querySelector("h1.post-title") !== null;

  // Extract the slug from the URL (removes .html if present)
  let postSlug = window.location.pathname.split("/").pop().replace(".html", "");
  if (!isPostPage) postSlug = "home"; // Default to 'home' for non-post pages

  // Extract title dynamically
  const postTitleElement = document.querySelector("h1.post-title") || document.querySelector("title");
  const postTitle = postTitleElement ? postTitleElement.textContent.trim() : "Default Title";

  // Extract description dynamically (uses meta description if available)
  const postDescriptionElement = document.querySelector("meta[name='description']");
  const postDescription = postDescriptionElement ? postDescriptionElement.content : "Default Description";

  // Construct JSON-LD schema
  const ldJson = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": postTitle,  // Uses dynamic post title
    "description": postDescription,  // Uses dynamic description
    "url": `https://groupchaton.com/${postSlug}`,  // Dynamic URL
    "publisher": {
      "@type": "Organization",
      "name": "GroupChatOn"
    },
    "mainEntity": {
      "@type": "WebPageElement",
      "name": postTitle,
      "description": postDescription
    },
    "author": {
      "@type": "Person",
      "name": "Mayank Rai",
      "url": "https://www.blogger.com/profile/14808761783847941471"
    }
  };

  // Inject JSON-LD schema into <head>
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(ldJson);
  document.head.appendChild(script);
});
