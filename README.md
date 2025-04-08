# ArraySpy Chrome Extension

ArraySpy is a powerful Chrome extension designed to make debugging functional programming operations easier and more intuitive. It's particularly valuable for developers who work with array transformations in JavaScript, helping them understand exactly what's happening at each step of their data transformations.

## Why Functional Programming is Great (But Hard to Debug)

Functional programming offers numerous benefits:

1. **Immutability**: Data transformations create new arrays instead of modifying existing ones, preventing side effects
2. **Composability**: Functions can be easily combined to create complex transformations
3. **Predictability**: Pure functions always return the same output for the same input
4. **Readability**: Chainable operations make code more declarative and easier to understand
5. **Testability**: Pure functions are easier to test in isolation

However, debugging functional code can be challenging because:
- Each transformation creates a new array, making it hard to see the intermediate states
- Complex chains of operations can make it difficult to identify where things go wrong
- Traditional debugging tools don't show you the state of arrays before and after each transformation
- You often need to add multiple `console.log` statements to track the data flow

## How ArraySpy Helps

ArraySpy solves these debugging challenges by:

1. **Real-time Tracking**: Automatically tracks array transformations as they happen
2. **Easy Access**: Provides a global `__arraySpy` object with:
   - `__arraySpy.current`: Shows the current array after the latest transformation
   - `__arraySpy.previous`: Shows the array before the latest transformation
3. **Configurable**: Track only the array methods you care about:
   - Default tracking for `map`, `filter`, and `flatMap`
   - Optional tracking for `reduce`, `forEach`, `some`, `every`, `find`, and `findIndex`
4. **Non-intrusive**: Works without modifying your code or adding console.log statements

## Features

- Track array methods like `map`, `filter`, `flatMap`, and more
- Access the currently tracked array through the global `__arraySpy.current` variable
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
5. Access the currently tracked array through `__arraySpy.current` in the browser console

## Example

```javascript
const numbers = [1, 2, 3, 4, 5];

// Without ArraySpy, you'd need multiple console.logs to see the transformations
const doubled = numbers.map(x => x * 2);
const evenNumbers = doubled.filter(x => x % 2 === 0);

// With ArraySpy, you can instantly see:
console.log(__arraySpy.previous); // Original array: [1, 2, 3, 4, 5]
console.log(__arraySpy.current);  // After latest transformation: [2, 4, 6, 8, 10]
```

## Why You Should Install It

1. **Save Debugging Time**: No more adding and removing console.log statements
2. **Better Understanding**: See exactly how your data transforms at each step
3. **Clean Code**: Keep your code clean without debugging statements
4. **Flexible Configuration**: Track only the array methods you need
5. **Zero Code Changes**: Works with your existing code without modifications

ArraySpy is particularly valuable for:
- Developers working with complex data transformations
- Teams using functional programming patterns
- Anyone who needs to debug array operations frequently
- Developers learning functional programming concepts

The extension seamlessly integrates into your development workflow, making it easier to understand and debug array transformations while maintaining the clean, functional style of your code.
