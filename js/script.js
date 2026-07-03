const githubAPI = "https://api.github.com"

const search = document.getElementById('search-icon');

search.addEventListener('click', async () => {
    const username = document.getElementById("search").value;
    const errorPara = document.getElementById('error-message');

    if (username === "") {
        errorPara.innerHTML = "The Username Cannot Be Empty";
        return;
    } else {
        errorPara.innerHTML = "";
    }
    const data = await searchData(username);
    if (!data || !username) {
        errorPara.innerHTML = "User Not Found";
        document.getElementById("user-details").style.display = "none";
        return;
    }
    showData(data);
})

async function searchData(username) {
    try {
        const response = await fetch(`${githubAPI}/users/${username}`);
        if (!response.ok) {
            return null;
        }
        return await response.json();
    } catch (err) {
        console.error(err);
        return null;
    }
}

function showData(data) {
    const userDetail = document.getElementById('user-details');
    userDetail.style.display = "flex";
    const avatar = document.getElementById('user-avatar');
    const githubDetails = document.getElementById('user-github-details');

    avatar.setAttribute("src", `${data.avatar_url}`);

    const repos = document.getElementById("repos");
    const followers = document.getElementById("followers");
    const following = document.getElementById("following");
    const userNameSelector = document.getElementById('username');
    const userBio = document.getElementById('bio');

    const username = data.name;
    const userBioData = data.bio;

    userNameSelector.innerHTML = `<h2>${username}</h2>`
    if(!userBioData) userBio.style.display = null;
    else userBio.innerHTML = `<i>${userBioData}</i>`

    repos.innerHTML = `
    <h3>Repositories</h3>
    ${data.public_repos}
    `

    followers.innerHTML = `
        <h3>Followers</h3>
        ${data.followers}
    `
    following.innerHTML = `
        <h3>Following</h3>
        ${data.following}
    `
}