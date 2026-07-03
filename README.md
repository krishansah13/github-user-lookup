# GitHub User Lookup

A simple web application that lets users search for GitHub profiles by username using the GitHub API.

## Features

- Search for a GitHub user
- Display user profile information:
  - Avatar
  - Name
  - Bio
  - Public Repositories
  - Followers
  - Profile Link
- Loading indicator while fetching data
- Friendly error message for invalid usernames
- Handle network errors gracefully

## Technologies Used

- HTML
- CSS
- JavaScript (ES6+)
- Fetch API
- Async/Await
- GitHub REST API

## API Endpoint

```text
https://api.github.com/users/{username}
```

## Optional Enhancement

Fetch and display the user's repositories sorted by highest star count using:

```text
https://api.github.com/users/{username}/repos
```

## How to Run

1. Clone this repository.
2. Open the project folder.
3. Open `index.html` in your browser or use Live Server.

## Learning Objectives

- Use `async/await`
- Fetch data from an API
- Work with JSON responses
- Handle loading, success, and error states
- Validate API responses with `response.ok`

## License

This project is for learning purposes.