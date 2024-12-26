  // Function to check if a div with ID "message" is visible
function isMessageDivVisible() {
  const messageDiv = document.getElementById("message");
  return messageDiv && messageDiv.offsetHeight > 0 && messageDiv.offsetWidth > 0;
}

// Function to create and show the visitor message
function showVisitorMessage() {
  if (isMessageDivVisible()) {
    console.log("The #message div is visible. The visitor message will not be displayed.");
    return;
  }

  // Create a new div for the visitor message
  const newMessageDiv = document.createElement("div");
  newMessageDiv.id = "visitor-message"; // Assign an ID to the new div

  // Set the message content
  newMessageDiv.innerHTML = `
    <p>
      🚨 <strong>Heads Up!</strong> The group links shared in this post are provided by visitors, so they might not match the post's description. Keep in mind, humans are naturally lazy! 😅
    </p>
    <p>
      📌 The <strong>group name, purpose,</strong> and <strong>content</strong> might differ from the post. It's your call whether to stay in the group or leave it. Choose wisely! 🧐
    </p>
    <p>
      ⚠️ Some links may not work as they could be revoked, deleted by the group admin, or even banned by WhatsApp due to security or policy violations. Stay aware! 🚫
    </p>
  `;

  // Append the new div to the body or a specific container
  document.body.appendChild(newMessageDiv);
}

// Call the function to check and potentially display the visitor message
showVisitorMessage();
