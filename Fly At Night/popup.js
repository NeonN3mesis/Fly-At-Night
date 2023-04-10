let isDarkModeEnabled = false;

function toggleDarkMode() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: "toggleDarkMode" }, function(response) {
      if (chrome.runtime.lastError) {
        // The content script was not injected yet, try again
        chrome.tabs.executeScript(tabs[0].id, { file: "content.js" }, function() {
          chrome.tabs.sendMessage(tabs[0].id, { action: "toggleDarkMode" }, function(response) {
            if (chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError.message);
            } else {
              isDarkModeEnabled = response.isDarkModeEnabled;
              updateButtonText();
            }
          });
        });
      } else {
        isDarkModeEnabled = response.isDarkModeEnabled;
        updateButtonText();
      }
    });
  });
}

function updateButtonText() {
  var button = document.getElementById("toggle-dark-mode-button");
  if (isDarkModeEnabled) {
    button.innerText = "Disable Dark Mode";
  } else {
    button.innerText = "Enable Dark Mode";
  }
}

document.addEventListener("DOMContentLoaded", function() {
  var button = document.getElementById("toggle-dark-mode-button");

  button.addEventListener("click", toggleDarkMode);

  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo, tab) {
        if (tab.id === tabs[0].id && changeInfo.status === "complete") {
            chrome.tabs.executeScript(tab.id, { file: "content.js" }, function() {
                chrome.tabs.sendMessage(tabs[0].id, { action: "toggleDarkMode" }, function(response) {
                    if (chrome.runtime.lastError) {
                        console.error(chrome.runtime.lastError.message);
                    } else {
                        isDarkModeEnabled = response.isDarkModeEnabled;
                        updateButtonText();
                    }
                });
            });
            chrome.tabs.onUpdated.removeListener(listener);
        }
    });
});
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "isDarkModeEnabled") {
    sendResponse({ isDarkModeEnabled });
  }
});
