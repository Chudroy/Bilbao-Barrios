function scrollFunction(toTopButton) {
  if (document.documentElement.scrollTop < 1000) {
    toTopButton.classList.add("d-none");
    return;
  }
  if (this.oldScroll > this.scrollY) {
    toTopButton.classList.remove("d-none");
  } else {
    toTopButton.classList.add("d-none");
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
