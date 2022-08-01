// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  "use strict";

  // Get Share Icon
  const copyLink = document.getElementById("copy-link");

  copyLink.addEventListener("click", () => {
    navigator.clipboard.writeText(window.location.href);
    liveFlash("Copied Link!");
  });
})();
