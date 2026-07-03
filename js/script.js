const githubAPI = "https://api.github.com"

const cards = document.getElementById("cards");
const search = document.getElementById('search-icon');
const loader = document.getElementById("loader");
const errorPara = document.getElementById("error-message");
const openedCard = document.getElementById('openedCard');
const searchInput = document.getElementById('search');
const userDetail = document.getElementById("user-details");

search.addEventListener("click", setData);
searchInput.addEventListener('input', clearCards);

async function setData() {
    const username = document.getElementById("search").value.trim();

    if (username === "") {
        errorPara.innerHTML = "The Username Cannot Be Empty";
        userDetail.style.display = "none";
        return;
    }

    errorPara.innerHTML = "";

    cards.innerHTML = "";
    cards.style.display = "none";

    openedCard.innerHTML = "";
    openedCard.style.display = "none";

    userDetail.style.display = "none";
    loader.style.display = "block";

    const result = await searchData(username);

    loader.style.display = "none";

    let errorMsg;

    if (!result.success) {
        if (result.status === 404) {
            errorMsg = "User not found";
        } else if (result.status === "NETWORK_ERROR") {
            errorMsg = "No internet connection";
        } else if(result.status === 403) {
            errorMsg = "API RATE LIMIT EXCEEEDED"
        } else {
            errorMsg = "Unknown error";
            console.error(result.message);
        }
        errorPara.innerHTML = errorMsg;
        return;
    }

    showData(result.data);

}
// search.removeEventListener('click', setData);

async function searchData(username) {
    try {
        const response = await fetch(`${githubAPI}/users/${username}`);
        if (!response.ok) {
            return {
                success: false,
                status: response.status
            };
        }
        return {
            success: true,
            data: await response.json()
        };
    } catch (err) {
        return {
            success: false,
            status: "NETWORK_ERROR",
            message: err.message
        };
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

    userNameSelector.textContent = `${username}`
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


    repos.onclick = () => showRepos(data, cards, openedCard);
    followers.onclick = () => showFollowers(data, cards, openedCard);
    following.onclick = () => showFollowing(data, cards, openedCard);
}

async function showRepos(data, cards, openedCard) {

    cards.style.display = "none";
    loader.style.display = "block";

    const response = await fetch(data.repos_url);
    const repos = await response.json();

    loader.style.display = "none";
    cards.style.display = "grid";
    openedCard.style.display = "block";
    openedCard.innerHTML = "<h2>Repositories</h2>"

    cards.innerHTML = "";

    repos.forEach(repo => {
        cards.innerHTML += `
            <div class="repo-card">
                <h3>${repo.name}</h3>
                <br>
                <p>${repo.description || "No description available"}</p>
                <a href="${repo.html_url}" target="_blank">
                    View Repository
                </a>
            </div>
        `;
    });
}

async function showFollowers(data, cards, openedCard) {

    cards.style.display = "none";
    loader.style.display = "block";

    const response = await fetch(data.followers_url);
    const followers = await response.json();

    loader.style.display = "none";
    cards.style.display = "grid";
    openedCard.style.display = "block";
    openedCard.innerHTML = "<h2>Followers</h2>"

    cards.innerHTML = "";


    followers.forEach(user => {
        cards.innerHTML += `
            <div class="user-card">
                <img src="${user.avatar_url}" alt="${user.login}">
                <h3>${user.login}</h3>
                <a href="${user.html_url}" target="_blank">
                    Visit Profile
                </a>
            </div>
        `;
    });
}

async function showFollowing(data, cards, openedCard) {

    cards.style.display = "none";
    loader.style.display = "block";

    const response = await fetch(
        `${githubAPI}/users/${data.login}/following`
    );

    const following = await response.json();

    loader.style.display = "none";
    cards.style.display = "grid";
    openedCard.style.display = "block";

    openedCard.innerHTML = "<h2>Following</h2>"

    cards.innerHTML = "";

    following.forEach(user => {
        cards.innerHTML += `
            <div class="user-card">
                <img src="${user.avatar_url}" alt="${user.login}">
                <h3>${user.login}</h3>
                <a href="${user.html_url}" target="_blank">
                    Visit Profile
                </a>
            </div>
        `;
    });
}

function clearCards() {
    cards.innerHTML = "";
    userDetail.style.display = "none";
    errorPara.innerHTML = "";
    openedCard.innerHTML = "";
    openedCard.style.display = "none";
}