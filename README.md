# ArraySpy Chrome Extension

A Chrome extension that allows you to track array methods and their values in real-time.

## Features

- Track array methods like `map`, `filter`, `flatMap`, and more
- Access the currently tracked array through the global `arraySpyExtensionValue.currentArray` variable
- Configurable through the extension popup
- Default tracking for `map`, `filter`, and `flatMap`

## Installation

1. Clone this repository or download the files
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory

## Usage

1. Click the extension icon to open the configuration popup
2. Select which array methods you want to track
3. Click "Save Configuration"
4. The extension will now track the selected array methods
5. Access the currently tracked array through `arraySpyExtensionValue.currentArray` in the browser console

## Example

```javascript
const numbers = [1, 2, 3, 4, 5];

numbers.map(x => x * 2);
console.log(arraySpyExtensionValue.currentArray); // [1, 2, 3, 4, 5]
```
