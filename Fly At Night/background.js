chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, { action: "toggleDarkMode" }, function(response) {
    if (chrome.runtime.lastError) {
      // The content script was not injected yet, try again
      chrome.tabs.executeScript(tab.id, { file: "content.js" }, function() {
        chrome.tabs.sendMessage(tab.id, { action: "toggleDarkMode" });
      });
    }
  });
});
