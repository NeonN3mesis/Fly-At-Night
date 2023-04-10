function applyDarkMode() {
  // Header
  document.querySelector('header').style.backgroundColor = '#141414';
  document.querySelector('header').style.borderBottom = '1px solid #303030';
  document.querySelectorAll('header a').forEach(el => el.style.color = '#f5f5f5');
document.querySelectorAll('header a:hover').forEach(el => el.style.color = '#00c7ff');

// Video titles and creator names
document.querySelectorAll('.card-title, .video-creator-name, .video-title').forEach(el => el.style.color = '#f5f5f5');

// Video cards
document.querySelectorAll('.video-card').forEach(el => {
el.style.backgroundColor = '#1e1e1e';
el.style.borderColor = '#303030';
});

// Video player controls
document.querySelectorAll('.vjs-control-bar').forEach(el => {
el.style.backgroundColor = '#1e1e1e';
el.style.color = '#f5f5f5';
});

// Comment section
document.querySelector('.comment-section').style.backgroundColor = '#1e1e1e';
document.querySelectorAll('.comment-body').forEach(el => el.style.color = '#d1d1d1');
document.querySelectorAll('.comment-author').forEach(el => el.style.color = '#00c7ff');

// Footer
document.querySelector('.footer').style.backgroundColor = '#141414';
document.querySelector('.footer').style.borderTop = '1px solid #303030';
document.querySelectorAll('.footer a').forEach(el => el.style.color = '#f5f5f5');
document.querySelectorAll('.footer a:hover').forEach(el => el.style.color = '#00c7ff');

document.documentElement.classList.add('dark-mode');
}

function removeDarkMode() {
// Header
document.querySelector('header').style.backgroundColor = '';
document.querySelector('header').style.borderBottom = '';
document.querySelectorAll('header a').forEach(el => el.style.color = '');

// Video titles and creator names
document.querySelectorAll('.card-title, .video-creator-name, .video-title').forEach(el => el.style.color = '');

// Video cards
document.querySelectorAll('.video-card').forEach(el => {
el.style.backgroundColor = '';
el.style.borderColor = '';
});

// Video player controls
document.querySelectorAll('.vjs-control-bar').forEach(el => {
el.style.backgroundColor = '';
el.style.color = '';
});

// Comment section
document.querySelector('.comment-section').style.backgroundColor = '';
document.querySelectorAll('.comment-body').forEach(el => el.style.color = '');
document.querySelectorAll('.comment-author').forEach(el => el.style.color = '');

// Footer
document.querySelector('.footer').style.backgroundColor = '';
document.querySelector('.footer').style.borderTop = '';
document.querySelectorAll('.footer a').forEach(el => el.style.color = '');
document.querySelectorAll('.footer a:hover').forEach(el => el.style.color = '');

document.documentElement.classList.remove('dark-mode');
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
if (request.action === "toggleDarkMode") {
if (document.documentElement.classList.contains('dark-mode')) {
removeDarkMode();
sendResponse({ isDarkModeEnabled: false });
} else {
applyDarkMode();
sendResponse({ isDarkModeEnabled: true });
}
}
});
