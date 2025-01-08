const form = document.querySelector('form')
const getPosts = document.getElementById('getPosts')
const output = document.getElementById('output')

async function showPosts() {
    try {
        const res = await fetch('http://localhost:8000/posts')

        if(!res.ok) {
            throw new Error('Failed to fetch posts')
        }

        const posts = await res.json();
        output.innerHTML = ""

        for(let post of posts) {
            const postEl = document.createElement('div')

            postEl.textContent = post.title
            output.appendChild(postEl)
        }
    } catch (error) {
        console.log('Error fetching post')
    }
}

async function createPost(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const title = formData.get('title');

    try {
        const res = await fetch('http://localhost:8000/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title})
        });

        if(!res.ok) {
            throw new Error('Failed to add post');
        }

        const newPost = await res.json();
        const postEl = document.createElement('div');
        postEl.textContent = newPost.title;
        output.appendChild(postEl);
        showPosts();
    } catch (error) {
        console.error('Error adding post');
    }
}

getPosts.addEventListener('click', showPosts);
form.addEventListener('submit', createPost);


async function createTable(url, table) {
    const tableBody = table.querySelector('tbody')
    const response = await fetch(url)
    const data = await response.json()

    tableBody.innerHTML = ""

    data.forEach(item => {
        const row = document.createElement('tr')
        row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.title}</td>`;
        tableBody.appendChild(row)
    })
}

createTable('http://localhost:8000/posts', document.querySelector('.table'))