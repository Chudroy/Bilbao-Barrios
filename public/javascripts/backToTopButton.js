function scrollFunction(toTopButton) {
  console.log(document.documentElement.scrollTop);
  if (document.documentElement.scrollTop < 1000) {
    console.log("disable");
    toTopButton.classList.remove("d-sm-inline");
    return;
  }
  if (this.oldScroll > this.scrollY) {
    toTopButton.classList.add("d-sm-inline");
  } else {
    toTopButton.classList.remove("d-sm-inline");
  }
  this.oldScroll = this.scrollY;
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

(function () {
  //Get the button
  const toTopButton = document.getElementById("back-to-top-button");

  if (!toTopButton) return;

  toTopButton.addEventListener("click", (e) => {
    topFunction();
  });

  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function () {
    scrollFunction(toTopButton);
  };
})();
