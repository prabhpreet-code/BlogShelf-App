const API_URL = "http://localhost:3000/api/posts/";
const API_BASE_URL = "http://localhost:3000/";

window.onload = () => {
    getPost();
}

const getPost = () => {
    // CODE GOES HERE
    fetch(API_URL , {
        method: 'GET'
    }).then((response)=>{
        return response.json() ;
    }).then((data)=>{
        buildPost(data) ;
    })
}

const buildPost = (blogPosts) => {
    // HINT: Convert the date number to a Date string
    console.log(blogPosts);
    let blogPostsContent = " " ;
    for(blogPost of blogPosts ){
        const date = new Date(parseInt(blogPost.added_date)).toDateString();
        const postLink = `post.html?id=${blogPost.id}`;
        const finalImage = `${API_BASE_URL}${blogPost.post_image}`;
        blogPostsContent += `
        <a href="${postLink}">
        <div class="post">
          <div class="post-image" style="background-image:url(${finalImage})"></div>
         <div class="post-content">
               <div class="post-date">${date}</div>
               <div class="post-title"><h4>${blogPost.title}</h4></div>
     <div class="post-text">${blogPost.content}</div>
         </div>
     </div>
     </a> `
    }
    document.querySelector(".blog-posts").innerHTML = blogPostsContent ;
}
