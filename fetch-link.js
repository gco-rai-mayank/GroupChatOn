  // Function to format timestamps into the desired date format (DD-MM-YY)
  function formatDate(timestamp) {
      const date = new Date(timestamp);
      const day = String(date.getDate()).padStart(2, '0'); // Pad single digit days
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Pad single digit months
      const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year

      return `${day}-${month}-${year}`;
  }

  // Function to validate WhatsApp group links
  function isValidWhatsAppGroupLink(link) {
      const regex = /^(https:\/\/chat\.whatsapp\.com\/[A-Za-z0-9]{22})$/;
      return regex.test(link);
  }

  async function fetchLinks() {
      const response = await fetch(webAppUrl);
      const data = await response.json();

      // Log data to check the timestamps
      console.log(data);

      // Ensure timestamp is a valid number and sort the array by descending timestamp
      data.sort((a, b) => {
          const timestampA = Number(a.timestamp) || 0;  // Ensure it's a number
          const timestampB = Number(b.timestamp) || 0;  // Ensure it's a number
          return timestampB - timestampA;  // Sort in descending order
      });

      const linksList = document.getElementById("linksList");
      const messageContainer = document.getElementById("message");
      const linksHeading = document.getElementById("links-heading");

      linksList.innerHTML = ""; // Clear the list

      // Create table structure for displaying Links, Date, and Action
      const table = document.createElement("table");
      const headerRow = document.createElement("tr");
      headerRow.innerHTML = `
          <th>#</th>
          <th>Links</th>
          <th>Shared Date</th>
          <th>Action</th>
      `;
      table.appendChild(headerRow);

      // Get broken links from localStorage
      const brokenLinks = JSON.parse(localStorage.getItem("brokenLinks")) || [];

      // Create a Set to track unique links
      const uniqueLinks = new Set();
      let visibleLinksFound = false;

      // Counter for numbering
      let rowNumber = 1;

      data.forEach(item => {
          const groupLink = item.group_link;

          // Validate the link and check if it's not already processed
          if (isValidWhatsAppGroupLink(groupLink) && !uniqueLinks.has(groupLink) && !brokenLinks.includes(groupLink)) {
              uniqueLinks.add(groupLink); // Add to the set

              // Check if timestamp exists and format it
              const formattedDate = item.timestamp ? formatDate(item.timestamp) : "N/A";

              // Create and append a row with number, link, date, and action
              const row = document.createElement("tr");
              row.innerHTML = `
                  <td style="color: inherit;">${rowNumber}</td>
                  <td><a class="wg-link" href="${groupLink}" target="_blank">${groupLink}</a></td>
                  <td style="color: inherit;">${formattedDate}</td>
                  <td><button style="font-family: inherit;" class="hide-btn" data-link="${groupLink}">Hide</button></td>
              `;
              table.appendChild(row);
              rowNumber++;  // Increment the row number
              visibleLinksFound = true;
          }
      });

      // If no visible links are found, display a custom message, hide the links section and heading
      if (!visibleLinksFound) {
          messageContainer.innerHTML = `
              <div style="text-align: center; padding: 20px; font-size: 18px;">
                  <p>Oops! 😬</p>
                  <p>It seems like there are currently no group links available. We're truly sorry for the inconvenience! 🙏</p>
                  <p>Please bear with us as we work on updating the list as soon as possible. ⏳</p>
                  <p>In the meantime, if you happen to have any working group links related to this post, we would greatly appreciate it if you could share them with us. 💌</p>
                  <p>Your contribution will help us keep the community engaged and connected. 🤝</p>
                  <p>Thank you for your patience and support! 💖</p>
              </div>
          `;
          linksList.style.display = "none"; // Hide the links section
          linksHeading.style.display = "none"; // Hide the heading
      } else {
          // Append the table to the links list if links exist
          linksList.appendChild(table);
          messageContainer.innerHTML = ""; // Clear message if links exist
          linksList.style.display = "block"; // Show the links section
          linksHeading.style.display = "block"; // Show the heading
      }

      // Attach event listeners to hide buttons
      document.querySelectorAll(".hide-btn").forEach(button => {
          button.addEventListener("click", function () {
              const linkToHide = this.getAttribute("data-link");
              hideLink(linkToHide);
          });
      });

      // Automatically fetch related posts and display titles
      fetchRelatedPosts();
  }

  function hideLink(link) {
      // Get current broken links from localStorage
      const brokenLinks = JSON.parse(localStorage.getItem("brokenLinks")) || [];

      // Add the link to the broken links list if it's not already there
      if (!brokenLinks.includes(link)) {
          brokenLinks.push(link);
      }

      // Save updated broken links back to localStorage
      localStorage.setItem("brokenLinks", JSON.stringify(brokenLinks));

      // Refresh the list to update with the hidden link
      fetchLinks();
  }

  fetchLinks();
