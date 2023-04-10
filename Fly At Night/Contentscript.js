if (chrome.extension.getStorage().get("nightMode") === "true") {
  if (document.querySelector("body").classList.contains("floatplane-page")) {
    document.body.classList.add("night-mode");
  }
}
