
document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('postsContainer');
    const newPostBtn = document.getElementById('newPostBtn');
    const loginBtn = document.getElementById('loginBtn');

    // Mock posts data
    const posts = [
        { user: "User1", content: "Hello, this is my first post on Meemon!" },
        { user: "User2", content: "Meemon is awesome!" }
    ];

    // Function to render posts
    function renderPosts() {
        postsContainer.innerHTML = '';
        posts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.classList.add('post');
            postDiv.innerHTML = `<strong>${post.user}:</strong> <p>${post.content}</p>`;
            postsContainer.appendChild(postDiv);
        });
    }

    // Add a new post
    newPostBtn.addEventListener('click', () => {
        const newContent = prompt("Enter your post content:");
        if (newContent) {
            posts.push({ user: "You", content: newContent });
            renderPosts();
        }
    });

    // Mock login
    loginBtn.addEventListener('click', () => {
        alert("Login functionality coming soon!");
    });

    renderPosts();
});
