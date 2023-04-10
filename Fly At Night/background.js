chrome.browserAction.onClicked.addListener(function() {
  if (chrome.extension.getStorage().get("nightMode") === "true") {
    if (!chrome.extension.isActive) {
      chrome.browserAction.setActive(true);
    }
    chrome.tabs.query({active: true}).then(function(tabs) {
      tabs[0].executeScript({
        code: "document.body.classList.add('night-mode');"
      });
    });
  } else {
    if (chrome.extension.isActive) {
      chrome.browserAction.setActive(false);
    }
    chrome.tabs.query({active: true}).then(function(tabs) {
      tabs[0].executeScript({
        code: "document.body.classList.remove('night-mode');"
      });
    });
  }
});
