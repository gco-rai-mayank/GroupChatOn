  // Fetch the post title from the meta tag
  document.addEventListener("DOMContentLoaded", function () {
      let postTitle = document.querySelector('meta[property="og:title"]').content; // Fetch title from meta tag
      const postTitlePlaceholder = document.getElementById("postTitlePlaceholder");
      const postTitlePlaceholder2 = document.getElementById("postTitlePlaceholder2");
      const postTitlePlaceholder3 = document.getElementById("postTitlePlaceholder3");

      // Remove "WhatsApp Group Links" from the title for placeholders 2 and 3
      const modifiedTitle = postTitle.replace("WhatsApp Group Links", "").trim();

      if (postTitlePlaceholder) {
          postTitlePlaceholder.textContent = postTitle; // Insert full title dynamically in first location
      }
      if (postTitlePlaceholder2) {
          postTitlePlaceholder2.textContent = modifiedTitle; // Insert modified title dynamically in second location
      }
      if (postTitlePlaceholder3) {
          postTitlePlaceholder3.textContent = modifiedTitle; // Insert modified title dynamically in third location
      }
  });
