//this is all global namespaced BAD IDEA
//this is all global namespaced BAD IDEA
//this is all global namespaced BAD IDEA
//this is all global namespaced BAD IDEA

const postContainer = document.getElementById("post-likes-container");
const postIDContainer = postContainer.getElementsByTagName("*")[0];
const thumbsUp = document.getElementById("thumbs-up");
const thumbsDown = document.getElementById("thumbs-down");
let httpRequest;

function sendLikesToServer(url, currentLikes, IDContainer) {
  httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = updatePage;
  httpRequest.open("POST", url);
  httpRequest.setRequestHeader(
    "Content-Type",
    "application/x-www-form-urlencoded"
  );

  httpRequest.send(`likes=${currentLikes}&post_id=${IDContainer.id}`);
}

function changeLikes(postIDContainer, currentLikes, likeNum) {
  currentLikes += likeNum;
}

function updatePage() {
  try {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        alert("Success");
      } else if (httpRequest.status === 403) {
        alert("You already liked this post");
      }
    }
  } catch (e) {
    alert("Caught Exception: " + e.description);
  }
}

(function () {
  "use strict";

  thumbsUp.addEventListener("click", function () {
    let currentLikes = parseInt(postContainer.innerText);
    currentLikes += 1;
    sendLikesToServer("/post/updateLikes", currentLikes, postIDContainer);
    postIDContainer.innerText = currentLikes;
  });

  thumbsDown.addEventListener("click", function () {
    changeLikes(-1);
  });
})();
