  function showHiddenLinks() {
      const hiddenLinksList = document.getElementById("hidden-links");

      if (hiddenLinksList.style.display === "none") {
          hiddenLinksList.style.display = "block"; // Show the hidden links
          updateHiddenLinksList(); // Update the list when shown
      } else {
          hiddenLinksList.style.display = "none"; // Hide the hidden links
      }
  }

  function unhideLink(link) {
      // Get current broken links from localStorage
      const brokenLinks = JSON.parse(localStorage.getItem("brokenLinks")) || [];

      // Remove the link from the broken links list
      const updatedLinks = brokenLinks.filter(brokenLink => brokenLink !== link);

      // Save updated broken links back to localStorage
      localStorage.setItem("brokenLinks", JSON.stringify(updatedLinks));

      // Refresh the main links list after unhide
      fetchLinks();

      // Update the hidden links list after unhide
      updateHiddenLinksList();
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

      // Refresh the main links list after hiding
      fetchLinks();

      // Update the hidden links list after hide
      updateHiddenLinksList();
  }

  // Updated formatDate function to display date in DD-MM-YY format
  function formatDate(timestamp) {
      const date = new Date(timestamp);
      const day = String(date.getDate()).padStart(2, '0'); // Pad single digit days
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Pad single digit months
      const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year

      return `${day}-${month}-${year}`; // Return date in DD-MM-YY format
  }

  function updateHiddenLinksList() {
      const hiddenLinksList = document.getElementById("hidden-links");
      hiddenLinksList.innerHTML = ""; // Clear the list first

      const brokenLinks = JSON.parse(localStorage.getItem("brokenLinks")) || [];

      if (brokenLinks.length === 0) {
          hiddenLinksList.innerHTML = "<p>No hidden links found.</p>";
          return;
      }

      // Create table structure for displaying hidden links, with "Links", "Date", and "Action" columns
      const table = document.createElement("table");
      const headerRow = document.createElement("tr");
      headerRow.innerHTML = `
          <th>#</th>
          <th>Links</th>
          <th>Shared Date</th>
          <th>Action</th>
      `;
      table.appendChild(headerRow);

      // Counter for numbering rows
      let rowNumber = 1;

      // Create rows for each hidden link with the shared date
      brokenLinks.forEach(link => {
          const timestamp = new Date().getTime(); // Assuming current timestamp for hidden links, replace as needed
          const formattedDate = formatDate(timestamp);

          const row = document.createElement("tr");
          row.innerHTML = `
              <td style="color: inherit;">${rowNumber}</td>
              <td><a class="wg-link" href="${link}" target="_blank">${link}</a></td>
              <td style="color: inherit;">${formattedDate}</td>
              <td><button style="font-family: inherit;" class="unhide-btn" data-link="${link}">Unhide</button></td>
          `;
          table.appendChild(row);
          rowNumber++; // Increment the row number
      });

      // Append the table to the hidden links list
      hiddenLinksList.appendChild(table);

      // Attach event listeners to unhide buttons
      document.querySelectorAll(".unhide-btn").forEach(button => {
          button.addEventListener("click", function () {
              const linkToUnhide = this.getAttribute("data-link");
              unhideLink(linkToUnhide);
          });
      });
  }

  // Attach event listener to the "Show Hidden Links" button
  document.getElementById("show-hidden-links-btn").addEventListener("click", showHiddenLinks);
