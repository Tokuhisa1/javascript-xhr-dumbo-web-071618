// The second part of XHR is handling the response once we've made the request.
function showRepositories(event, data) {
  //this is set to the XMLHttpRequest object that fired the event
  var repos = JSON.parse(this.responseText)
  // let's start by simply listing the repository names.
  console.log(repos)
  // we'll need to add a "Get Commits" link to our output in showRepositories,
  // make a new XHR request when that link is clicked, and then show the
  // commits in the second column.
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}
// let's create our getRepositories function and initiate our XHR request.
function getRepositories() {
  const req = new XMLHttpRequest()
  // When we add the event listener to our req object, we set it up so that
  // "this" will be our req object inside our callback function.
  req.addEventListener("load", showRepositories);
  req.open("GET", 'https://api.github.com/users/octocat/repos')
  req.send()
}
// The first interesting thing is that we're using a data attribute to hold the
// repo name.
// The second thing is our onclick is explicitly passing this to the getCommits
// function.
function getCommits(el) {
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener("load", showCommits)
  req.open("GET", 'https://api.github.com/repos/octocat/' + name + '/commits')
  req.send()
}
// Finally, let's handle that request with our callback function.
function showCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("commits").innerHTML = commitsList
}
