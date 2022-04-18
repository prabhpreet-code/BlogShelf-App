
const API_URL = "http://localhost:3000/api/posts";

const submitNewPost = () => {
    let input = document.querySelector('input[type="file"]');
    const title = document.getElementById("form-post-title").value;
    const content = document.getElementById("form-post-content").value;
    let data = new FormData();
    data.append('post-image', input.files[0]);
    data.append('title', title );
    data.append('content', content);
    fetch(API_URL, {
        method: 'POST',
        body: data
    })
    // .then(()=>{
    //     setTimeout(()=>{
    //         console.log("hello worlddd");
    //         window.location.href = "http://127.0.0.1:5500/my_blog_app/pwj-module-8-my-blog-app/exercises/index.html";
    //     //     // window.location.replace("index.html");
    //      }, 1000)
    // })
    // window.location.href = "http://127.0.0.1:5500/My-Blog-APP/APP/index.html";

}
