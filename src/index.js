document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  const $form = document.querySelector("form")
  let imageId = 4380 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  $form.addEventListener("submit", submitCommit)

  function submitCommit(event){
    event.preventDefault()

    const commitData = new FormData(event.target)
    const commit = commitData.get("comment")
    
    fetch(imageURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({commit})
    }).then(function(){
      event.target.reset()
    })
  }

  const $commits = document.querySelector("#comments")
  fetch(imageURL)
    .then(parseJson)
    .then(addCommits)

    function parseJson(httpResponse){
      return httpResponse.json()
    }

    function addCommits(commits){
      commits.forEach(addCommit)
    }

    function addCommit(commit){
      $commits.append(createComment(commit))
    }

    function createCommit(commit){
      const $li = document.createElement("li")
      $li.textContent = `Comments ${commit.comment}`
      return $li
    }

})
