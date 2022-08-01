//this is all global namespaced BAD IDEA
//this is all global namespaced BAD IDEA
//this is all global namespaced BAD IDEA
//this is all global namespaced BAD IDEA

function sendLikesToServer(url, currentLikes, postIDContainer, vote) {
  let httpRequest;
  httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function cb() {
    return updatePage(this, currentLikes, postIDContainer);
  };
  httpRequest.open("POST", url, true);
  httpRequest.setRequestHeader(
    "Content-Type",
    "application/x-www-form-urlencoded"
  );

  httpRequest.send(
    `likes=${currentLikes}&post_id=${postIDContainer.id}&vote=${vote}`
  );
}

function updatePage(e, currentLikes, postIDContainer) {
  try {
    if (e.readyState == 4 && e.status == 200) {
      postIDContainer.innerText = currentLikes;
    } else if (e.readyState == 4 && e.status === 403) {
      liveFlash(e.responseText);
    }
  } catch (e) {
    alert("Caught Exception: " + e.description);
  }
}

(function () {
  "use strict";
  // post container
  const postContainer = document.getElementById("post-likes-container");
  const postIDContainer = postContainer.getElementsByTagName("*")[0];
  // icons
  const thumbsUp = document.getElementById("thumbs-up");
  const thumbsDown = document.getElementById("thumbs-down");

  thumbsUp.addEventListener("click", function () {
    let currentLikes = parseInt(postContainer.innerText);
    let like = 1;
    currentLikes += like;
    sendLikesToServer("/post/updateLikes", currentLikes, postIDContainer, like);
  });

  thumbsDown.addEventListener("click", function () {
    let currentLikes = parseInt(postContainer.innerText);
    let dislike = -1;
    currentLikes += dislike;
    sendLikesToServer(
      "/post/updateLikes",
      currentLikes,
      postIDContainer,
      dislike
    );
  });
})();
