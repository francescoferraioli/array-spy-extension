function arraySpyCode(tracked_methods) {
  // Global state for array spy
  const array_spy_state = {
    originals: {},
    current_array: null,
    previous_array: null
  };

  // Make the tracking array accessible globally
  window.arraySpyExtensionValue = {
    get current() {
      return array_spy_state.current_array;
    },
    get previous() {
      return array_spy_state.previous_array;
    }
  };

  function initializeArraySpy(methods_to_track) {
    // Extend each array method
    for (const method of methods_to_track) {
      if (Array.prototype[method]) {
        array_spy_state.originals[method] = Array.prototype[method];

        Array.prototype[method] = function(fn, thisArg) {
          const result = array_spy_state.originals[method].call(this, fn, thisArg);

          array_spy_state.previous_array = this;
          array_spy_state.current_array = result;

          return result;
        };
      }
    }
  }

  // Initialize with initial methods
  initializeArraySpy(tracked_methods);

  // Listen for configuration changes
  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === 'updateTrackedMethods') {
      // Restore original methods
      for (const method in array_spy_state.originals) {
        Array.prototype[method] = array_spy_state.originals[method];
      }
      // Reinitialize with new methods
      initializeArraySpy(message.methods);
    }
  });
}

window.addEventListener('load', () => {
  // Get tracked methods from storage
  chrome.storage.local.get(['tracked_methods'], (result) => {
    // Default methods to track
    const default_methods = ['map', 'filter', 'flatMap'];
    const tracked_methods = result.tracked_methods || default_methods;
    
    // Create script element to inject code into page context
    const script = document.createElement('script');
    script.textContent = `(${arraySpyCode.toString()})(${JSON.stringify(tracked_methods)});`;
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