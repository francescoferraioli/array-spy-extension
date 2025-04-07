const available_methods = [
  'map',
  'filter',
  'flatMap',
  'reduce',
  'forEach',
  'some',
  'every',
  'find',
  'findIndex'
];

const default_methods = ['map', 'filter', 'flatMap'];

document.addEventListener('DOMContentLoaded', () => {
  const method_list = document.getElementById('methodList');
  const save_button = document.getElementById('saveButton');

  // Load current configuration
  chrome.storage.local.get(['tracked_methods'], (result) => {
    const tracked_methods = result.tracked_methods || default_methods;
    
    // Create checkboxes for each method
    available_methods.forEach(method => {
      const method_item = document.createElement('div');
      method_item.className = 'method-item';
      
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = method;
      checkbox.checked = tracked_methods.includes(method);
      
      const label = document.createElement('label');
      label.htmlFor = method;
      label.textContent = method;
      
      method_item.appendChild(checkbox);
      method_item.appendChild(label);
      method_list.appendChild(method_item);
    });
  });

  // Handle save button click
  save_button.addEventListener('click', () => {
    const tracked_methods = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
      .map(checkbox => checkbox.id);

    // Save to storage
    chrome.storage.local.set({ tracked_methods }, () => {
      // Notify content script of changes
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'CONFIG_UPDATED' });
      });
    });
  });
}); 