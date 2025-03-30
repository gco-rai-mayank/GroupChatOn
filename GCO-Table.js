document.getElementById("groupLinkForm").addEventListener("submit", async function (event) {
  event.preventDefault();
  
  const groupLink = document.getElementById("group_link").value.trim();
  const whatsappLinkRegex = /^(https:\/\/chat\.whatsapp\.com\/(invite\/)?[A-Za-z0-9]{20,}|https:\/\/www\.whatsapp\.com\/channel\/[A-Za-z0-9]{20,})$/;
  
  if (!whatsappLinkRegex.test(groupLink)) {
    document.getElementById("formResponse").innerText = "Please provide a valid WhatsApp group or channel link.";
    document.getElementById("formResponse").style.color = "red";
    document.getElementById("groupLinkForm").reset();
    return;
  }
  
  document.getElementById("formResponse").innerText = "Submitting... Please wait.";
  document.getElementById("formResponse").style.color = "blue";
  
  try {
    const response = await fetch(webAppUrl, {
      method: "POST",
      body: JSON.stringify({ group_link: groupLink }),
    });
    if (response.ok) {
      document.getElementById("formResponse").innerText = "Link shared successfully!";
      document.getElementById("formResponse").style.color = "green";
      document.getElementById("groupLinkForm").reset();
      fetchLinks();
    } else {
      document.getElementById("formResponse").innerText = "Error sharing the link. Please try again.";
      document.getElementById("formResponse").style.color = "red";
    }
  } catch (error) {
    document.getElementById("formResponse").innerText = "An unexpected error occurred. Please check your network and try again.";
    document.getElementById("formResponse").style.color = "red";
  }
});

async function fetchLinks() {
  try {
    const response = await fetch(webAppUrl);
    const data = await response.json();
    const linksContainer = document.getElementById("linksContainer");
    linksContainer.innerHTML = "";

    data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    const table = document.createElement("table");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";
    table.style.margin = "20px 0";
    table.style.fontSize = "18px";
    table.style.textAlign = "left";
    
    const thead = document.createElement("thead");
    thead.innerHTML = `<tr style="background-color: #f2f2f2; border-bottom: 2px solid #ddd;">
      <th style="padding: 10px; border: 1px solid #ddd;">S.No</th>
      <th style="padding: 10px; border: 1px solid #ddd;">Group Name</th>
      <th style="padding: 10px; border: 1px solid #ddd;">Date</th>
      <th style="padding: 10px; border: 1px solid #ddd;">Group Link</th>
    </tr>`;
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    let serialNumber = 1;
    data.forEach((item) => {
      const groupLink = item.group_link || "No Link Available";
      const groupName = item.group_name || "Unknown Group";
      const formattedDate = item.timestamp ? formatDate(item.timestamp) : "N/A";
      
      if (groupName === "Error fetching name") return;
      
      const row = document.createElement("tr");
      row.style.borderBottom = "1px solid #ddd";
      row.innerHTML = `
        <td style="padding: 10px; border: 1px solid #ddd;">${serialNumber++}</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${groupName}</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${formattedDate}</td>
        <td style="padding: 10px; border: 1px solid #ddd;"><a href="${groupLink}" target="_blank">Join Now</a></td>
      `;
      tbody.appendChild(row);
    });
    table.appendChild(tbody);
    linksContainer.appendChild(table);
  } catch (error) {
    console.error("Failed to fetch group links:", error);
  }
}

function formatDate(timestamp) {
  const date = new Date(timestamp);
  return `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
}

document.addEventListener("DOMContentLoaded", () => fetchLinks());

document.addEventListener("DOMContentLoaded", function() {
    let postTitle = document.title;
    document.getElementById("postTitle").innerText = postTitle;
});
