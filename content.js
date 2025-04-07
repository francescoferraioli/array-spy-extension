(() => {
  // Default methods to track
  const default_methods = ['map', 'filter', 'flatMap'];
  
  // Get tracked methods from storage
  chrome.storage.local.get(['tracked_methods'], (result) => {
    const tracked_methods = result.tracked_methods || default_methods;
    initializeArraySpy(tracked_methods);
  });

  function initializeArraySpy(methods_to_track) {
    const originals = {};
    let _array_spies_tracking_array = null;

    // Make the tracking array accessible globally
    window.arraySpyExtensionValue = {
      get currentArray() {
        return _array_spies_tracking_array;
      }
    };

    // Extend each array method
    for (const method of methods_to_track) {
      if (Array.prototype[method]) {
        originals[method] = Array.prototype[method];

        Array.prototype[method] = function(fn, thisArg) {
          // Set the global variable to the current array before the method is executed
          _array_spies_tracking_array = this;

          // Call the original method
          return originals[method].call(this, fn, thisArg);
        };
      }
    }

    // Listen for configuration changes
    chrome.storage.onChanged.addListener((changes) => {
      if (changes.tracked_methods) {
        // Restore original methods
        for (const method of methods_to_track) {
          if (originals[method]) {
            Array.prototype[method] = originals[method];
          }
        }
        // Reinitialize with new methods
        initializeArraySpy(changes.tracked_methods.newValue);
      }
    });
  }
})(); 