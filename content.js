window.addEventListener('load', () => {
  // Default methods to track
  const default_methods = ['map', 'filter', 'flatMap'];
  
  // Get tracked methods from storage
  chrome.storage.local.get(['tracked_methods'], (result) => {
    const tracked_methods = result.tracked_methods || default_methods;
    
    // Create script element to inject code into page context
    const script = document.createElement('script');
    
    function arraySpyCode(tracked_methods, default_methods) {
      const originals = {};
      let _array_spy_current_array = null;
      let _array_spy_previous_array = null;

      // Make the tracking array accessible globally
      window.arraySpyExtensionValue = {
        get current() {
          return _array_spy_current_array;
        },
        get previous() {
          return _array_spy_previous_array;
        }
      };

      function initializeArraySpy(methods_to_track) {
        // Extend each array method
        for (const method of methods_to_track) {
          if (Array.prototype[method]) {
            originals[method] = Array.prototype[method];

            Array.prototype[method] = function(fn, thisArg) {
              const result = originals[method].call(this, fn, thisArg);

              _array_spy_previous_array = this;
              _array_spy_current_array = result;

              return result;
            };
          }
        }
      }

      // Initialize with initial methods
      initializeArraySpy(tracked_methods);

      // Listen for configuration changes
      chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.type === 'updateTrackedMethods') {
          // Restore original methods
          for (const method of default_methods) {
            if (originals[method]) {
              Array.prototype[method] = originals[method];
            }
          }
          // Reinitialize with new methods
          initializeArraySpy(message.methods);
        }
      });
    }

    script.textContent = `(${arraySpyCode.toString()})(${JSON.stringify(tracked_methods)}, ${JSON.stringify(default_methods)});`;
    document.documentElement.appendChild(script);
  });

  // Listen for storage changes and notify the page
  chrome.storage.onChanged.addListener((changes) => {
    if (changes.tracked_methods) {
      // Send message to the page to update tracked methods
      window.postMessage({
        type: 'updateTrackedMethods',
        methods: changes.tracked_methods.newValue
      }, '*');
    }
  });
}); 