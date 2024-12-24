        document.addEventListener(&quot;keydown&quot;, function(event) {
    if (event.key === &quot;ArrowLeft&quot;) {  // Left arrow key for &quot;prev&quot; page
        const prevButton = document.querySelector(&quot;.blog-pager-older-link&quot;);
        if (prevButton) {
            prevButton.click();
        }
    } else if (event.key === &quot;ArrowRight&quot;) {  // Right arrow key for &quot;next&quot; page
        const nextButton = document.querySelector(&quot;.blog-pager-newer-link&quot;);
        if (nextButton) {
            nextButton.click();
        }
    }
});
