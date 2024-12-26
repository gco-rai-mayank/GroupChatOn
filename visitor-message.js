// Create a new div for the message
const newMessageDiv = document.createElement("div");
newMessageDiv.id = "visitor-message"; // Assign an ID to the new div

// Create the message content
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

// Append the new div to the body or another container
document.body.appendChild(newMessageDiv);
