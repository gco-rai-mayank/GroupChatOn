  // Function to wrap text within the canvas width
  function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    var words = text.split(" ");
    var line = "";
    var lines = [];

    for (var i = 0; i < words.length; i++) {
      var testLine = line + words[i] + " ";
      var metrics = ctx.measureText(testLine);
      var testWidth = metrics.width;
      
      if (testWidth > maxWidth) {
        lines.push(line);
        line = words[i] + " ";
      } else {
        line = testLine;
      }
    }
    lines.push(line);

    for (var j = 0; j < lines.length; j++) {
      ctx.fillText(lines[j], x, y + (j * lineHeight));
    }
  }

  window.onload = function() {
    // 1. Get the post title
    var postTitle = document.title; // The title of the Blogger post

    // 2. Create a canvas to generate the image
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");

    // Set canvas size (you can adjust these)
    canvas.width = 600;
    canvas.height = 180; // Increased height for multiple lines

    // Set the background color
    ctx.fillStyle = "#4CAF50"; // Background color (green)
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set text style for the title (bolder and white)
    ctx.fillStyle = "#FFFFFF"; // Text color (white)
    ctx.font = "bold 30px Jacques Francois"; // Make the font bold
    ctx.textAlign = "center";
    ctx.textBaseline = "top";

    // 3. Call the wrapText function to handle long post titles
    var maxWidth = canvas.width - 40; // Margin around the text
    var lineHeight = 40; // Space between lines
    wrapText(ctx, postTitle, canvas.width / 2, 50, maxWidth, lineHeight);

    // 4. Set the style for the "GroupChatOn" text
    ctx.fillStyle = "#FFFFFF"; // White color for the initials
    ctx.font = "bold 20px Jacques Francois"; // Smaller font size for the initials
    ctx.textAlign = "right"; // Align to the right
    ctx.textBaseline = "bottom"; // Align to the bottom

    // 5. Draw the "GroupChatOn" text at the bottom-right corner
    ctx.fillText("GroupChatOn", canvas.width - 10, canvas.height - 10);

    // 6. Convert the canvas to a PNG image (base64)
    var imgData = canvas.toDataURL("image/png");

    // 7. Create an img element and set the src to the generated image
    var imgElement = document.createElement("img");
    imgElement.src = imgData;
    imgElement.alt = "Post Title Image"; // Alt text for the image

    // 8. Insert the image into the post dynamically
    var container = document.getElementById("image-container");
    container.appendChild(imgElement);
  };
