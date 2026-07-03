const githubAPI = "https://api.github.com"

const search = document.getElementById('search-icon');

search.addEventListener('click', ()=> {
    const username = document.getElementById("search").value;
    const errorPara = document.getElementById('error-message');
    if(username==="") {
        errorPara.innerHTML = "The Username Cannot Be Empty";
        return ;
    } else {
        errorPara.innerHTML = "";
    }
})

