// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  "use strict";

  // Get Share Icon
  const copyLink = document.getElementById("copy-link");
  // Get Flash Live Message
  const flashMessage = document.getElementById("live-flash");
  // Get Flash Live Message Text
  const innerSpan = flashMessage.getElementsByTagName("span")[0];
  // Get Flash Live Message Close Button
  const closeLiveFlash = document.getElementById("close-live-flash");

  copyLink.addEventListener("click", () => {
    navigator.clipboard.writeText(window.location.href);
    flashMessage.classList.remove("d-none");
    innerSpan.textContent = "Copied Link!";
  });

  closeLiveFlash.addEventListener("click", () => {
    flashMessage.classList.add("d-none");
  });
})();
