// Initialize default configuration if not set
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(['tracked_methods'], (result) => {
    if (!result.tracked_methods) {
      chrome.storage.local.set({
        tracked_methods: ['map', 'filter', 'flatMap']
      });
    }
  });
}); 