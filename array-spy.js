// Global state for array spy
const array_spy_state = {
  originals: {},
  current_array: null,
  previous_array: null
};

// Make the tracking array accessible globally
window.__arraySpy = {
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

// Listen for initialization and configuration changes
window.addEventListener('message', (event) => {
  if (!event?.data?.type) {
    return;
  }

  if (!event.data.type.startsWith('array-spy')) {
    return;
  }

  const method = event.data.type.split(':')[1];

  if (method === 'update') {
    // Restore original methods
    for (const method in array_spy_state.originals) {
      Array.prototype[method] = array_spy_state.originals[method];
    }
  }

  initializeArraySpy(event.data.methods);
}); 