document.addEventListener('DOMContentLoaded', function () {
    // DOM elements
    const postButtons = document.querySelectorAll('.post-btn');
    const blogPosts = document.querySelectorAll('.blog-post');
    const commentForms = document.querySelectorAll('.comment-form');

    // Show first post by default
    if (postButtons.length > 0) {
        postButtons[0].classList.add('active');
        const firstPostId = postButtons[0].getAttribute('data-post-id');
        document.getElementById(`post${firstPostId}`).classList.add('active');
    }

    // Post button click handler
    postButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons and posts
            postButtons.forEach(btn => btn.classList.remove('active'));
            blogPosts.forEach(post => post.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Show corresponding post
            const postId = this.getAttribute('data-post-id');
            document.getElementById(`post${postId}`).classList.add('active');
        });
    });


    document.getElementById("searchInput").addEventListener("input", function () {
        const filter = this.value.toLowerCase();
        const postButtons = document.querySelectorAll(".post-btn");

        postButtons.forEach(button => {
            const title = button.querySelector(".title").textContent.toLowerCase();
            if (title.includes(filter)) {
                button.style.display = "inline-block";
            } else {
                button.style.display = "none";
            }
        });
    });


    // Comment form submission
    commentForms.forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const commentInput = this.querySelector('.comment-input');
            const commentText = commentInput.value.trim();

            if (commentText) {
                const commentsList = this.previousElementSibling;
                const newComment = document.createElement('div');
                newComment.className = 'comment';
                newComment.innerHTML = `
                    <div class="comment-author">You</div>
                    <div class="comment-text">${commentText}</div>
                `;

                commentsList.appendChild(newComment);
                commentInput.value = '';

                // Update comment count
                const commentsTitle = commentsList.previousElementSibling;
                const currentCount = parseInt(commentsTitle.textContent.match(/\d+/)[0]) || 0;
                commentsTitle.textContent = `Comments (${currentCount + 1})`;

                // Scroll to new comment
                newComment.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    });

    // Social share buttons
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const platform = this.classList.contains('facebook') ? 'Facebook' :
                this.classList.contains('twitter') ? 'Twitter' : 'LinkedIn';
            const activePost = document.querySelector('.blog-post.active');
            const postTitle = activePost.querySelector('.card-title').textContent;

            alert(`Sharing "${postTitle}" to ${platform} would be implemented here!`);
        });
    });
});