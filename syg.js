// WhatsApp Group Link Submission Script
// Concept by Mayank Rai
// Developed with ChatGPT

document.getElementById("groupLinkForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  let groupLink = document.getElementById("group_link").value.trim();

  // ✅ Remove everything after "?" if present
  if (groupLink.includes("?")) {
    groupLink = groupLink.split("?")[0];
  }

  const whatsappLinkRegex = /^(https:\/\/chat\.whatsapp\.com\/(invite\/)?[A-Za-z0-9]{20,}|https:\/\/(www\.)?whatsapp\.com\/channel\/[A-Za-z0-9]{20,})$/;

  if (!whatsappLinkRegex.test(groupLink)) {
    setFormResponse("Please provide a valid WhatsApp group or channel link.", "red");
    this.reset();
    return;
  }

  if (sharedLinks.includes(groupLink)) {
    setFormResponse("This link has already been shared.", "orange");
    this.reset();
    return;
  }

  setFormResponse("Submitting... Please wait.", "blue");

  try {
    const response = await fetch(webAppUrl, {
      method: "POST",
      body: JSON.stringify({ group_link: groupLink }),
    });

    if (response.ok) {
      setFormResponse("Link shared successfully!", "green");
      sharedLinks.push(groupLink);
      this.reset();
      fetchLinks();
    } else {
      throw new Error("Submission failed");
    }
  } catch (error) {
    setFormResponse("An unexpected error occurred. Please try again.", "red");
  }
});


  function setFormResponse(message, color) {
    const responseEl = document.getElementById("formResponse");
    responseEl.innerText = message;
    responseEl.style.color = color;
  }

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    return `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
  }

  async function fetchLinks() {
    try {
      const response = await fetch(webAppUrl);
      const data = await response.json();

      // Sort data by timestamp (newest first)
      data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      const linksContainer = document.getElementById("linksContainer");
      linksContainer.innerHTML = "";

      // Create table
      const table = document.createElement("table");
      table.style.width = "100%";
      table.style.borderCollapse = "collapse";
      table.innerHTML = `
        <thead>
          <tr>
            <th style="padding: 10px; text-align: left;">Group Name</th>
            <th style="padding: 10px; text-align: center;">Date</th>
            <th style="padding: 10px; text-align: center;">Join Now</th>
          </tr>
        </thead>
        <tbody></tbody>
      `;

      const tbody = table.querySelector("tbody");

      data.forEach(item => {
        const groupLink = item.group_link || "#";
        const groupName = item.group_name;
        let groupImage = item.group_image;

        if (groupName === "Error fetching name") return;
        if (groupImage === "Error fetching image") {
          groupImage = "https://example.com/placeholder.jpg";
        }

        const formattedDate = item.timestamp ? formatDate(item.timestamp) : "N/A";
        const decodedGroupName = decodeHTMLEntities(groupName);

        const row = document.createElement("tr");
        row.innerHTML = `
          <td style="padding: 10px; word-wrap: break-word; max-width: 300px;">${decodedGroupName}</td>
          <td style="padding: 10px; text-align: center;">${formattedDate}</td>
          <td style="padding: 10px; text-align: center;">
            <a href="${groupLink}" onclick="event.stopPropagation();" target="_blank" rel="noopener noreferrer"
   style="display: inline-block; padding: 6px 12px; background-color: #25D366; color: white; border-radius: 5px; text-decoration: none;">
  Join Now
</a>
          </td>
        `;
        tbody.appendChild(row);
      });

      linksContainer.appendChild(table);
    } catch (error) {
      console.error("Error loading links:", error);
      document.getElementById("linksContainer").innerText = "Failed to load group links.";
    }
  }

  document.addEventListener("DOMContentLoaded", fetchLinks);
