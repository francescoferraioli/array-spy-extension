window.addEventListener('load', () => {
  // Get tracked methods from storage
  chrome.storage.local.get(['tracked_methods'], (result) => {
    // Default methods to track
    const default_methods = ['map', 'filter', 'flatMap'];
    const tracked_methods = result.tracked_methods || default_methods;
    
    // Create script element to inject code into page context
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('array-spy.js');
    script.onload = () => {
      // After the script loads, initialize it with the tracked methods
      window.postMessage({
        type: 'array-spy:initialize',
        methods: tracked_methods
      }, '*');
    };
    document.documentElement.appendChild(script);
  });

  // Listen for storage changes and notify the page
  chrome.storage.onChanged.addListener((changes) => {
    if (changes.tracked_methods) {
      // Send message to the page to update tracked methods
      window.postMessage({
        type: 'array-spy:update',
        methods: changes.tracked_methods.newValue
      }, '*');
    }
  });
}); 