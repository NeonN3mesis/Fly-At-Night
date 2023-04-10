if (chrome.extension.getStorage().get("nightMode") === "true") {
  document.body.classList.add("night-mode");
}