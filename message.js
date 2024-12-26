// Load html content
    fetch('https://cdn.jsdelivr.net/gh/gco-rai-mayank/GroupChatOn@main/Message.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('myDiv').innerHTML = data;
        });
