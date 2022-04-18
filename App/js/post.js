/**
 * TODO (Together): Create getPostIdParam to get the id of the post to use in the request later
 * TODO: Complete getPost function to get post data from API
 * TODO: Complete buildPost function to fill in the post data in the post.html file using ids
 */


const API_URL = "http://localhost:3000/api/posts/";
const API_BASE_URL = "http://localhost:3000/";

window.onload = () => {
    getPosts();
    getPostIdParam() ;
}

const getPosts = () => {
    const postId = getPostIdParam() ;
    const postUrl = `${API_URL}${postId}` ;
    fetch(postUrl,{
        method:"GET"
    }).then((response)=>{
        return response.json();
    }).then((data)=>{
        buildPosts(data) ;
    })
}

const getPostIdParam=()=>{
    const queryString = window.location.search ;
    const urlParams = new URLSearchParams(queryString) ;
    return urlParams.get("id");
}

const buildPosts = (blogPosts) => {
    const date = new Date(parseInt(blogPosts.added_date)).toDateString();
    const finalImage = `${API_BASE_URL}${blogPosts.post_image}`;
    document.getElementById("background-image-post").style.backgroundImage = `url(${finalImage})`;
    console.log(blogPosts) ;
    document.getElementById("individual-post-title").innerText = blogPosts.title ;
    document.getElementById("individual-post-content").innerText = blogPosts.content ; 
    document.getElementById("individual-post-date").innerText = `Published on ${date}` ; 

}

