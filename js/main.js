function submit() {
    const name = document.getElementById('name').value;
    const achivement = document.getElementById('achivement').value;
    const info = document.getElementById('info');

    let newname = document.createElement("p");
    let newachivement = document.createElement('p');

    newname.textContent = name;
    newachivement.textContent = achivement;

    info.appendChild(newname);
    info.appendChild(newachivement);

   
    document.getElementById('name').value = '';
    document.getElementById('achivement').value = '';


    const imageFile = document.getElementById('img').files[0];
    const imageContainer = document.getElementById('imageContainer');
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const imgElement = document.createElement('img');
            imgElement.src = event.target.result;
            imgElement.alt = "Task Image";
            imgElement.style.maxWidth = "100%"; 
            imgElement.style.marginTop = '10px'; 

            
            info.appendChild(imgElement);
        };
        reader.readAsDataURL(imageFile);
    }
    document.getElementById('img').value = '';
}


function login(){
    const name =document.getElementById('a-name').value;
    const pwd = document.getElementById('pwd').value;
    const block = document.getElementById('admin');
    
    var a_name = "admin123";
    var a_pwd = "12345678";

    if(name === a_name){
        block.style.height = 'auto';
    }
    else{
        alert('wrong username');
    }
    if(pwd === a_pwd){
    }
    else{
        alert('wrong password');
    }
}


const postForm = document.getElementById('postForm');
const postsContainer = document.getElementById('posts');
const MAX_POSTS = 3; 


document.addEventListener('DOMContentLoaded', loadPosts);


postForm.addEventListener('submit', function (event) {
    event.preventDefault();

    
    const name = document.getElementById('name').value;
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const imageInput = document.getElementById('image');

    
    if (name && title && content && imageInput.files.length > 0) {
       
        const currentPosts = JSON.parse(localStorage.getItem('posts')) || [];
        if (currentPosts.length >= MAX_POSTS) {
            alert('You can only have up to three posts.');
            return;
        }

        
        const reader = new FileReader();
        reader.onload = function () {
            const imageBase64 = reader.result;

        
            const post = {
                name: name,
                title: title,
                content: content,
                image: imageBase64,
                id: Date.now() 
            };

           
            savePost(post);

            
            addPostToDOM(post);

            
            postForm.reset();
        };

        reader.readAsDataURL(imageInput.files[0]); 
    }
});


function savePost(post) {
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));
}


function loadPosts() {
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.forEach(post => addPostToDOM(post));
}


function addPostToDOM(post) {
    
    const postWrapperDiv = document.createElement('div');
    postWrapperDiv.classList.add('post-wrapper');
    postWrapperDiv.setAttribute('data-id', post.id);  

   
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');

    postDiv.innerHTML = `
        <img src="${post.image}" alt="${post.title}" class="post-image">
        <h3 class="post-title">${post.title}</h3>
        <p class="post-name">By: ${post.name}</p>
        <p class="post-content">${post.content}</p>
    `;

    
    const deletebtn = document.getElementById('delete-block');
    const removeButtonBlock = document.createElement('div');
    removeButtonBlock.classList.add('remove-button-block');

    removeButtonBlock.innerHTML =`
      <p class="post-name">By: ${post.name}</p>
    `;
    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-post');
    removeButton.textContent = 'Remove';

    removeButton.addEventListener('click', function () {
        removePost(post.id, postWrapperDiv,removeButtonBlock);
    });

    
    removeButtonBlock.appendChild(removeButton);

   
    postWrapperDiv.appendChild(postDiv);
    deletebtn.appendChild(removeButtonBlock);


    postsContainer.prepend(postWrapperDiv);
    deletebtn.prepend(removeButtonBlock);
}


function removePost(id, postWrapperDiv,removeButtonBlock) {
  
    postWrapperDiv.remove();
    removeButtonBlock.remove();

    
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts = posts.filter(post => post.id !== id);
    localStorage.setItem('posts', JSON.stringify(posts));
}



