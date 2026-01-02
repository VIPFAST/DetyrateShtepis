const fetch = require('node-fetch');

async function getUserGit(username) {
  if (!username) {
    console.error("Username is required!");
    return;
  }

  const userUrl = `https://api.github.com/users/${username}`;
  const reposUrl = `https://api.github.com/users/${username}/repos`;

  try {
    const userResponse = await fetch(userUrl);
    if (!userResponse.ok) throw new Error(`User not found: ${username}`);
    const userData = await userResponse.json();

    const reposResponse = await fetch(reposUrl);
    if (!reposResponse.ok) throw new Error(`Repos not found for user: ${username}`);
    const reposData = await reposResponse.json();

    console.log(`User: ${userData.login}`);
    console.log(`Name: ${userData.name || 'N/A'}`);
    console.log(`Public Repositories: ${reposData.length}`);
    console.log(`Profile URL: ${userData.html_url}`);
  } catch (err) {
    console.error("Error fetching GitHub data:", err.message);
  }
}

module.exports = getUserGit;
