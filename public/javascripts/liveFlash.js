function liveFlash(message) {
  // Get Flash Live Message
  const flashMessage = document.getElementById("live-flash");
  // Get Flash Live Message Text
  const innerSpan = flashMessage.getElementsByTagName("span")[0];
  // Get Flash Live Message Close Button
  const closeLiveFlash = document.getElementById("close-live-flash");

  flashMessage.classList.remove("d-none");
  innerSpan.textContent = message;

  closeLiveFlash.addEventListener("click", () => {
    flashMessage.classList.add("d-none");
  });
}
