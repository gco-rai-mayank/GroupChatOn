document.getElementById("groupLinkForm").addEventListener("submit", async function (event) {
  event.preventDefault();
  
  // Retrieve and trim the input value.
  const groupLink = document.getElementById("group_link").value.trim();
  
  // Updated regex:
  //  - Matches WhatsApp group links: https://chat.whatsapp.com/ with an optional "invite/" part,
  //    followed by at least 20 alphanumeric characters.
  //  - Matches WhatsApp channel links: https://www.whatsapp.com/channel/ followed by at least 20 alphanumeric characters.
  const whatsappLinkRegex = /^(https:\/\/chat\.whatsapp\.com\/(invite\/)?[A-Za-z0-9]{20,}|https:\/\/www\.whatsapp\.com\/channel\/[A-Za-z0-9]{20,})$/;
  
  if (!whatsappLinkRegex.test(groupLink)) {
    document.getElementById("formResponse").innerText = "Please provide a valid WhatsApp group or channel link.";
    document.getElementById("formResponse").style.color = "red";
    document.getElementById("groupLinkForm").reset();
    return;
  }
  
  if (sharedLinks.includes(groupLink)) {
    document.getElementById("formResponse").innerText = "This link has already been shared.";
    document.getElementById("formResponse").style.color = "orange";
    document.getElementById("groupLinkForm").reset();
    return;
  }
  
  document.getElementById("formResponse").innerText = "Submitting... Please wait.";
  document.getElementById("formResponse").style.color = "blue";
  
  // Continue with your form submission logic here...    
      try {
        const response = await fetch(webAppUrl, {
          method: "POST",
          body: JSON.stringify({ group_link: groupLink }),
        });
        if (response.ok) {
          document.getElementById("formResponse").innerText = "Link shared successfully!";
          document.getElementById("formResponse").style.color = "green";
          sharedLinks.push(groupLink);
          document.getElementById("groupLinkForm").reset();
          fetchLinks(); // Refresh list (defaults to page 1)
        } else {
          document.getElementById("formResponse").innerText = "Error sharing the link. Please try again.";
          document.getElementById("formResponse").style.color = "red";
        }
      } catch (error) {
        document.getElementById("formResponse").innerText = "An unexpected error occurred. Please check your network and try again.";
        document.getElementById("formResponse").style.color = "red";
      }
    });
    
    // Function to handle a click on the share icon.
    function shareButtonClicked(event, groupLink, groupName, shareMessage) {
      if (navigator.share) {
        // Use native share dialog on supported devices.
        navigator.share({
          title: groupName,
          text: shareMessage,
          url: groupLink,
        }).catch((err) => console.error("Sharing failed:", err));
      } else {
        // Otherwise, show our custom share options.
        showShareOptions(event, groupLink, groupName, shareMessage);
      }
    }
    
function showShareOptions(event, groupLink, groupName, shareMessage) {
  // Remove any existing popup
  const existingPopups = document.querySelectorAll("#shareOptionsPopup");
  existingPopups.forEach((popup) => popup.remove());

  // Find the card that contains the clicked share icon.
  const card = event.currentTarget.closest(".card");
  if (!card) {
    console.error("Could not find the parent card element.");
    return;
  }

  // Create the popup element.
  const popup = document.createElement("div");
  popup.id = "shareOptionsPopup";

  // Build the inner HTML using Font Awesome icons with a round button style.
  popup.innerHTML = `
    <div style="display: flex; justify-content: center; gap: 10px;">
      <!-- Facebook -->
      <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(groupLink)}" 
         target="_blank" title="Share on Facebook" 
         style="display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 50%; background: #f0f0f0; text-decoration: none;">
         <i class="fab fa-facebook-f" style="color: #3b5998; font-size: 18px;"></i>
      </a>
      <!-- Twitter -->
      <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(groupLink)}&text=${encodeURIComponent(shareMessage)}" 
         target="_blank" title="Share on Twitter" 
         style="display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 50%; background: #f0f0f0; text-decoration: none;">
         <i class="fab fa-twitter" style="color: #1DA1F2; font-size: 18px;"></i>
      </a>
      <!-- WhatsApp -->
      <a href="https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}" 
         target="_blank" title="Share on WhatsApp" 
         style="display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 50%; background: #f0f0f0; text-decoration: none;">
         <i class="fab fa-whatsapp" style="color: #25D366; font-size: 18px;"></i>
      </a>
      <!-- LinkedIn -->
      <a href="https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(groupLink)}&title=${encodeURIComponent(groupName)}&summary=${encodeURIComponent(shareMessage)}" 
         target="_blank" title="Share on LinkedIn" 
         style="display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 50%; background: #f0f0f0; text-decoration: none;">
         <i class="fab fa-linkedin-in" style="color: #0077B5; font-size: 18px;"></i>
      </a>
    </div>
    <button style="margin-top: 10px; display: block; margin-left: auto; margin-right: auto;" onclick="this.parentElement.remove()">Close</button>
  `;

  // Append the popup to the card.
  card.appendChild(popup);

  // Additional styling for the popup.
  popup.style.width = "100%";
  popup.style.boxSizing = "border-box";
  popup.style.marginTop = "10px";
  popup.style.backgroundColor = "transparent";
  popup.style.border = "1px solid #ccc";
  popup.style.padding = "10px";
  popup.style.boxShadow = "0 0 5px rgba(0,0,0,0.2)";
  popup.style.textAlign = "center";
}
    
    // Fetch group links and render cards with pagination.
    async function fetchLinks(page = 1) {
      try {
        const response = await fetch(webAppUrl);
        const data = await response.json();
        const linksContainer = document.getElementById("linksContainer");
        linksContainer.innerHTML = "";
    
        // Sort data by timestamp (newest first).
        data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
        // Pagination settings.
        const cardsPerPage = 30;
        const totalCards = data.length;
        const totalPages = Math.ceil(totalCards / cardsPerPage);
        page = Math.max(1, Math.min(page, totalPages));
        const startIndex = (page - 1) * cardsPerPage;
        const paginatedData = data.slice(startIndex, startIndex + cardsPerPage);
    
        paginatedData.forEach((item) => {
          const groupLink = item.group_link || "No Link Available";
          const groupName = item.group_name;
          let groupImage = item.group_image;
          if (groupName === "Error fetching name") return;
          if (groupImage === "Error fetching image") {
            groupImage = "https://example.com/placeholder.jpg";
          }
          const formattedDate = item.timestamp
            ? formatDate(item.timestamp)
            : "N/A";
    
          // Decode HTML entities so any emoji appear properly.
          const decodedGroupName = decodeHTMLEntities(groupName);
          const shareMessage = `Hi, check this out! I found this Group: '${decodedGroupName}' on GroupChatOn.
#GroupChatOn 
@GroupChatOn`;
    
          // Create the card element.
          const card = document.createElement("div");
          card.classList.add("card");
          card.innerHTML = `
            <img src="${groupImage}" alt="Group Image" loading="lazy">
            <h3>${decodedGroupName}</h3>
            <p>Posted on: ${formattedDate}</p>
            <a href="${groupLink}" target="_blank">Join Now</a>
            <div class="card-footer">
              <div class="share-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="24" height="24">
                  <defs>
                    <linearGradient id="shareGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style="stop-color:#ff5722; stop-opacity:1" />
                      <stop offset="100%" style="stop-color:#ffc107; stop-opacity:1" />
                    </linearGradient>
                  </defs>
                  <circle cx="32" cy="32" r="30" fill="url(#shareGradient)" />
                  <path d="M22,30 L42,30" stroke="#ffffff" stroke-width="4" stroke-linecap="round" />
                  <path d="M32,20 L32,40" stroke="#ffffff" stroke-width="4" stroke-linecap="round" />
                </svg>
              </div>
              <p class="group-chat-on">GroupChatOn</p>
            </div>
          `;
    
          // Attach event listener for share functionality.
          const shareIcon = card.querySelector(".share-icon");
          shareIcon.style.cursor = "pointer";
          shareIcon.addEventListener("click", function (event) {
            shareButtonClicked(event, groupLink, decodedGroupName, shareMessage);
          });
    
          linksContainer.appendChild(card);
        });
    
        // Create or update pagination controls.
        let paginationContainer = document.getElementById("paginationContainer");
        if (!paginationContainer) {
          paginationContainer = document.createElement("div");
          paginationContainer.id = "paginationContainer";
          paginationContainer.style.textAlign = "center";
          paginationContainer.style.marginTop = "20px";
          linksContainer.parentNode.insertBefore(paginationContainer, linksContainer.nextSibling);
        }
        paginationContainer.innerHTML = "";
        if (totalPages > 1) {
          if (page > 1) {
            const prevButton = document.createElement("button");
            prevButton.innerText = "Previous";
            prevButton.addEventListener("click", () => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              fetchLinks(page - 1);
            });
            paginationContainer.appendChild(prevButton);
          }
          for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement("button");
            pageButton.innerText = i;
            if (i === page) {
              pageButton.disabled = true;
              pageButton.style.fontWeight = "bold";
            }
            pageButton.addEventListener("click", () => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              fetchLinks(i);
            });
            paginationContainer.appendChild(pageButton);
          }
          if (page < totalPages) {
            const nextButton = document.createElement("button");
            nextButton.innerText = "Next";
            nextButton.addEventListener("click", () => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              fetchLinks(page + 1);
            });
            paginationContainer.appendChild(nextButton);
          }
        }
      } catch (error) {
        console.error("Failed to fetch group links:", error);
      }
    }
    
    function formatDate(timestamp) {
      const date = new Date(timestamp);
      return `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
    }
    
    document.addEventListener("DOMContentLoaded", () => fetchLinks());
