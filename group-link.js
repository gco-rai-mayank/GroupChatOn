document.getElementById("groupLinkForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const groupLink = document.getElementById("group_link").value;

    // Regular expression to check if it's a WhatsApp group link
    const whatsappLinkRegex = /https:\/\/chat\.whatsapp\.com\/[A-Za-z0-9]{20,}/;

    if (!whatsappLinkRegex.test(groupLink)) {
        // If the link is not a valid WhatsApp group link, show an error message and don't submit the form
        document.getElementById("formResponse").innerText = "Please provide a valid WhatsApp group link.";
        return;
    }

    const response = await fetch(webAppUrl, {
        method: "POST",
        body: JSON.stringify({ group_link: groupLink })
    });

    if (response.ok) {
        document.getElementById("formResponse").innerText = "Link shared successfully!";
    } else {
        document.getElementById("formResponse").innerText = "Error sharing the link. Please try again.";
    }
});
