chrome.browserAction.onClicked.addListener(function() {
  if (chrome.extension.getStorage().get("nightMode") === "true") {
    chrome.tabs.query({active: true}).then(function(tabs) {
      tabs[0].executeScript({
        code: "document.body.classList.add('night-mode');"
      });
    });
  } else {
    chrome.tabs.query({active: true}).then(function(tabs) {
      tabs[0].executeScript({
        code: "document.body.classList.remove('night-mode');"
      });
    });
  }
});

// In the file `contentscript.js`, add the following code:

if (chrome.extension.getStorage().get("nightMode") === "true") {
  document.body.classList.add("night-mode");
}
