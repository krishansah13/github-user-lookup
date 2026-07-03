const githubAPI = "https://api.github.com"

const search = document.getElementById('search-icon');

const loader = document.getElementById("loader");

search.addEventListener("click", async () => {
    const username = document.getElementById("search").value.trim();
    const errorPara = document.getElementById("error-message");
    const userDetail = document.getElementById("user-details");

    if (username === "") {
        errorPara.innerHTML = "The Username Cannot Be Empty";
        userDetail.style.display = "none";
        return;
    }

    errorPara.innerHTML = "";

    // Hide previous card and show loader
    userDetail.style.display = "none";
    loader.style.display = "block";

    const data = await searchData(username);

    // Hide loader after fetch finishes
    loader.style.display = "none";

    if (!data) {
        errorPara.innerHTML = "User Not Found";
        return;
    }

    showData(data);
});

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
    const joinedOn = document.getElementById('joinedOn');
    const profileUrl = document.getElementById('profile-url');

    const username = data.name || data.login;
    const userBioData = data.bio;

    userNameSelector.innerHTML = `<h2>${username}</h2>`
  userBio.innerHTML = userBioData
                                    ? `<i>${userBioData}</i>`
                                    : "<i>No bio available</i>"

    let joiningDate = data.created_at;
    joiningDate = joiningDate.slice(0, 10);

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

    joinedOn.innerHTML = `
        <i>Joined on : ${joiningDate}</i>
    `

    profileUrl.setAttribute("href", `${data.html_url}`);

    profileUrl.innerHTML = `
        <i>${data.html_url}</i>
    `
}