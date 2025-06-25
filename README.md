# React Responsive Iframe

A lightweight, TypeScript-ready React component and hook for automatically resizing iframes based on their content. Perfect for embedding responsive content that needs to adapt to its container.

## ✨ Features

- 🚀 **Automatic Resizing**: Automatically adjusts iframe height and width based on content
- 📱 **Responsive Design**: Supports multiple calculation methods for different use cases
- 🔧 **TypeScript Support**: Full TypeScript definitions included
- 🎯 **Flexible Configuration**: Customizable responsive behavior and options
- 🔒 **Security**: Built-in origin checking for secure cross-origin communication
- ⚡ **Performance**: Event-based resizing (no continuous intervals)
- 🎨 **Easy Integration**: Simple API that works with any React project
- 🕒 **No Initial Height Jump**: Optionally hide the iframe until the correct height is calculated (see `hideUntilResized`)

## 📦 Installation

```bash
npm install react-responsive-iframe
```

or

```bash
yarn add react-responsive-iframe
```

## 🚀 Quick Start

### Basic Usage

```jsx
import { ResponsiveIframe } from "react-responsive-iframe";

function App() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <h1>Responsive Iframe Example</h1>

      <ResponsiveIframe
        src="https://example.com"
        width="100%"
        height={300}
        onResized={(dimensions) => {
          console.log("Iframe resized:", dimensions);
        }}
      />
    </div>
  );
}
```

### Prevent Initial Height Jump (Recommended for Best UX)

If you don't set an explicit `height`, the iframe will start at a default height (e.g., 300px) and "jump" to the correct height after the first resize. To avoid this, use the `hideUntilResized` prop:

```jsx
<ResponsiveIframe
  src="https://example.com"
  width="100%"
  responsiveOptions={{ minHeight: 300, autoResize: true }}
  hideUntilResized
/>
```

- The iframe will be hidden until the first resize event is received, then shown at the correct height—no visible jump!

### Using the Hook (Inside Iframe)

```jsx
import { useIframeResizer } from "react-responsive-iframe";

function IframeContent() {
  const { resize, sendMessage, isInitialized } = useIframeResizer({
    heightCalculationMethod: "bodyScroll",
    autoResize: true,
  });

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h2>Iframe Content</h2>
      <p>Status: {isInitialized ? "✅ Connected" : "⏳ Connecting..."}</p>

      <div style={{ background: "#f5f5f5", padding: 15, margin: "10px 0" }}>
        <p>This content will automatically resize the parent iframe.</p>
      </div>
    </div>
  );
}
```

## 📚 API Reference

### ResponsiveIframe Component

#### Props

| Prop                | Type                                                    | Default | Description                                                                                            |
| ------------------- | ------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------ |
| `src`               | `string`                                                | -       | The URL of the iframe content                                                                          |
| `width`             | `string \| number`                                      | -       | Initial width of the iframe                                                                            |
| `height`            | `string \| number`                                      | -       | Initial height of the iframe                                                                           |
| `responsiveOptions` | `ResponsiveIframeOptions`                               | `{}`    | Configuration options for responsive behavior                                                          |
| `onResized`         | `(dimensions: {height: number, width: number}) => void` | -       | Callback when iframe is resized                                                                        |
| `onMessage`         | `(message: any) => void`                                | -       | Callback for messages from iframe                                                                      |
| `onInit`            | `(iframe: HTMLIFrameElement) => void`                   | -       | Callback when iframe is initialized                                                                    |
| `hideUntilResized`  | `boolean`                                               | `false` | If true, hides the iframe until the first resize event is received, preventing the initial height jump |

#### Responsive Options

```typescript
interface ResponsiveIframeOptions {
  // Height calculation method
  heightCalculationMethod?:
    | "bodyScroll"
    | "bodyOffset"
    | "documentElementScroll"
    | "documentElementOffset"
    | "max"
    | "min"
    | "grow"
    | "lowestElement";

  // Width calculation method
  widthCalculationMethod?: "scrollWidth" | "offsetWidth" | "max" | "min";

  // Resizing behavior
  tolerance?: number; // Minimum change in pixels before triggering resize
  autoResize?: boolean; // Enable/disable automatic resizing

  // Security
  checkOrigin?: boolean | string[]; // Check message origin for security

  // Size constraints
  maxHeight?: number; // Maximum height limit
  minHeight?: number; // Minimum height limit
  maxWidth?: number; // Maximum width limit
  minWidth?: number; // Minimum width limit

  // Additional options
  sizeWidth?: boolean; // Enable width resizing
  scrolling?: boolean; // Enable/disable scrolling
}
```

### useIframeResizer Hook

#### Parameters

```typescript
interface IframeChildResizerOptions {
  // Calculation methods
  heightCalculationMethod?: HeightCalculationMethod;
  widthCalculationMethod?: WidthCalculationMethod;

  // Behavior options
  autoResize?: boolean;
  manualOnly?: boolean; // Manual-only mode (no automatic resizing)

  // Constraints
  minHeight?: number;
  maxHeight?: number;
  minWidth?: number;
  maxWidth?: number;
  tolerance?: number;

  // Callbacks
  onParentMessage?: (message: any) => void;
}
```

#### Returns

```typescript
{
  sendMessage: (message: any) => void;
  resize: (customHeight?: number, customWidth?: number) => void;
  scrollTo: (x: number, y: number) => void;
  scrollToOffset: (x: number, y: number) => void;
  isInitialized: boolean;
}
```

## 🎯 Advanced Examples

### 1. Custom Responsive Configuration

```jsx
import { ResponsiveIframe } from "react-responsive-iframe";

function AdvancedExample() {
  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: 20 }}>
      <h1>Advanced Responsive Iframe</h1>

      <ResponsiveIframe
        src="https://example.com"
        width="100%"
        height={400}
        responsiveOptions={{
          heightCalculationMethod: "lowestElement",
          widthCalculationMethod: "scrollWidth",
          tolerance: 5,
          autoResize: true,
          maxHeight: 800,
          minHeight: 200,
          sizeWidth: true,
          checkOrigin: false, // Set to true in production
        }}
        onResized={(dimensions) => {
          console.log("New dimensions:", dimensions);
        }}
        onMessage={(message) => {
          console.log("Message from iframe:", message);
        }}
        onInit={(iframe) => {
          console.log("Iframe initialized:", iframe);
        }}
      />
    </div>
  );
}
```

### 2. Manual-Only Mode (No Auto-Resize)

```jsx
import { ResponsiveIframe } from "react-responsive-iframe";
import { useRef } from "react";

function ManualResizeExample() {
  const iframeRef = useRef();

  const handleManualResize = () => {
    iframeRef.current?.resize();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Manual Resize Example</h2>
      <button onClick={handleManualResize}>Manual Resize</button>

      <ResponsiveIframe
        ref={iframeRef}
        src="https://example.com"
        width="100%"
        height={300}
        responsiveOptions={{
          autoResize: false, // Disable automatic resizing
        }}
      />
    </div>
  );
}
```

### 3. Communication Between Parent and Child

**Parent Component:**

```jsx
import { ResponsiveIframe } from "react-responsive-iframe";
import { useRef } from "react";

function ParentComponent() {
  const iframeRef = useRef();

  const sendMessageToIframe = () => {
    iframeRef.current?.sendMessage({
      type: "customAction",
      data: "Hello from parent!",
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Parent Component</h2>
      <button onClick={sendMessageToIframe}>Send Message to Iframe</button>

      <ResponsiveIframe
        ref={iframeRef}
        src="http://localhost:3001" // Your child app URL
        width="100%"
        height={400}
        onMessage={(message) => {
          if (message.type === "response") {
            console.log("Response from iframe:", message.data);
          }
        }}
      />
    </div>
  );
}
```

**Child Component (Inside Iframe):**

```jsx
import { useIframeResizer } from "react-responsive-iframe";
import { useState } from "react";

function ChildComponent() {
  const [content, setContent] = useState("Initial content...");

  const { sendMessage, resize, isInitialized } = useIframeResizer({
    heightCalculationMethod: "bodyScroll",
    autoResize: true,
    onParentMessage: (message) => {
      if (message.type === "customAction") {
        // Handle message from parent
        sendMessage({
          type: "response",
          data: "Hello from child!",
        });
      }
    },
  });

  const addContent = () => {
    // Add content and trigger resize
    setContent((prev) => prev + "\n\nMore content added!");
    setTimeout(() => resize(), 100);
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h2>Child Component</h2>
      <p>Status: {isInitialized ? "✅ Connected" : "⏳ Connecting..."}</p>

      <button onClick={addContent}>Add Content</button>
      <button onClick={() => resize(500, 400)}>Resize to 500x400</button>

      <div style={{ background: "#f5f5f5", padding: 15, margin: "10px 0" }}>
        <pre style={{ whiteSpace: "pre-wrap" }}>{content}</pre>
      </div>
    </div>
  );
}
```

### 4. Event-Based Resizing (Recommended)

```jsx
import { ResponsiveIframe } from "react-responsive-iframe";

function EventBasedExample() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Event-Based Resizing</h2>
      <p>Only resizes when content changes or window resizes (no intervals)</p>

      <ResponsiveIframe
        src="http://localhost:3001"
        width="100%"
        height={300}
        responsiveOptions={{
          heightCalculationMethod: "lowestElement",
          autoResize: true, // Event-based only
          tolerance: 1,
          minHeight: 200,
          maxHeight: 800,
        }}
        onResized={(dimensions) => {
          console.log("✅ Iframe resized to:", dimensions);
        }}
      />
    </div>
  );
}
```

### 5. Complete Working Example

Here's a complete example showing both parent and child components working together:

**Parent App (main application):**

```jsx
import React, { useRef } from "react";
import { ResponsiveIframe } from "react-responsive-iframe";

function App() {
  const iframeRef = useRef();

  const handleResize = (dimensions) => {
    console.log("🔄 Iframe resized to:", dimensions);
  };

  const sendMessage = () => {
    iframeRef.current?.sendMessage({
      type: "updateContent",
      data: "New content from parent!",
    });
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 20 }}>
      <h1>🚀 React Responsive Iframe Demo</h1>

      <div style={{ marginBottom: 20 }}>
        <button onClick={sendMessage} style={{ marginRight: 10 }}>
          Send Message to Iframe
        </button>
        <button onClick={() => iframeRef.current?.resize()}>
          Force Resize
        </button>
      </div>

      <ResponsiveIframe
        ref={iframeRef}
        src="http://localhost:3001"
        width="100%"
        height={400}
        responsiveOptions={{
          heightCalculationMethod: "bodyScroll",
          autoResize: true,
          tolerance: 1,
          minHeight: 200,
          maxHeight: 1000,
          checkOrigin: false, // Set to true in production
        }}
        onResized={handleResize}
        onMessage={(message) => {
          console.log("📨 Message from iframe:", message);
        }}
        onInit={(iframe) => {
          console.log("✅ Iframe initialized");
        }}
      />
    </div>
  );
}

export default App;
```

**Child App (iframe content):**

```jsx
import React, { useState, useEffect } from "react";
import { useIframeResizer } from "react-responsive-iframe";

function IframeApp() {
  const [content, setContent] = useState("Welcome to the iframe content!");
  const [messageCount, setMessageCount] = useState(0);

  const { sendMessage, resize, isInitialized } = useIframeResizer({
    heightCalculationMethod: "bodyScroll",
    autoResize: true,
    minHeight: 200,
    maxHeight: 800,
    tolerance: 1,
    onParentMessage: (message) => {
      if (message.type === "updateContent") {
        setContent(message.data);
        setMessageCount((prev) => prev + 1);
      }
    },
  });

  const addContent = () => {
    setContent(
      (prev) =>
        prev +
        "\n\n📝 Additional content added at " +
        new Date().toLocaleTimeString()
    );
  };

  const sendResponse = () => {
    sendMessage({
      type: "response",
      data: `Response #${messageCount + 1} from iframe`,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div
      style={{
        padding: 20,
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
      }}
    >
      <h2>🎯 Iframe Content</h2>

      <div
        style={{
          background: "#fff",
          padding: 15,
          margin: "10px 0",
          borderRadius: "8px",
          border: "1px solid #ddd",
        }}
      >
        <p>
          <strong>Status:</strong>{" "}
          {isInitialized ? "✅ Connected" : "⏳ Connecting..."}
        </p>
        <p>
          <strong>Messages received:</strong> {messageCount}
        </p>
      </div>

      <div style={{ marginBottom: 20 }}>
        <button onClick={addContent} style={{ marginRight: 10 }}>
          ➕ Add Content
        </button>
        <button onClick={sendResponse} style={{ marginRight: 10 }}>
          📤 Send Response
        </button>
        <button onClick={() => resize(500, 400)}>📏 Resize to 500x400</button>
      </div>

      <div
        style={{
          background: "#fff",
          padding: 15,
          margin: "10px 0",
          borderRadius: "8px",
          border: "1px solid #ddd",
        }}
      >
        <h3>Content:</h3>
        <pre
          style={{
            whiteSpace: "pre-wrap",
            fontFamily: "monospace",
            fontSize: "14px",
          }}
        >
          {content}
        </pre>
      </div>

      <div
        style={{
          background: "#e8f4fd",
          padding: 15,
          margin: "10px 0",
          borderRadius: "8px",
          border: "1px solid #bee5eb",
        }}
      >
        <h3>📋 Instructions:</h3>
        <ul>
          <li>
            Click "Add Content" to add more text and see automatic resizing
          </li>
          <li>Click "Send Response" to send a message back to the parent</li>
          <li>Try resizing your browser window to see responsive behavior</li>
          <li>Check the browser console for resize and message logs</li>
        </ul>
      </div>
    </div>
  );
}

export default IframeApp;
```

## 📏 Height Calculation Methods

| Method                  | Description                                  | Use Case               |
| ----------------------- | -------------------------------------------- | ---------------------- |
| `bodyScroll`            | Uses `document.body.scrollHeight`            | Simple content         |
| `bodyOffset`            | Uses `document.body.offsetHeight`            | Content with margins   |
| `documentElementScroll` | Uses `document.documentElement.scrollHeight` | Full page content      |
| `documentElementOffset` | Uses `document.documentElement.offsetHeight` | Full page with margins |
| `max`                   | Uses maximum of all methods                  | Complex layouts        |
| `min`                   | Uses minimum of all methods                  | Conservative sizing    |
| `grow`                  | Only increases height, never decreases       | Growing content        |
| `lowestElement`         | Finds the lowest element on page             | Dynamic content        |

## 📐 Width Calculation Methods

| Method        | Description                                 | Use Case              |
| ------------- | ------------------------------------------- | --------------------- |
| `scrollWidth` | Uses `document.documentElement.scrollWidth` | Full content width    |
| `offsetWidth` | Uses `document.documentElement.offsetWidth` | Visible content width |
| `max`         | Uses maximum of both methods                | Wide content          |
| `min`         | Uses minimum of both methods                | Narrow content        |

## 🔧 Performance Tips

### ✅ Recommended Settings

```jsx
// For best performance
<ResponsiveIframe
  responsiveOptions={{
    heightCalculationMethod: "bodyScroll", // Faster than lowestElement
    autoResize: true, // Event-based only
    tolerance: 1, // Small tolerance for accuracy
    minHeight: 200, // Set constraints
    maxHeight: 1000,
  }}
/>
```

### ❌ Avoid These

```jsx
// Don't use for performance-sensitive apps
<ResponsiveIframe
  responsiveOptions={{
    heightCalculationMethod: "lowestElement", // Expensive calculation
    interval: 1000, // Continuous checking (not needed with event-based)
  }}
/>
```

## 🌐 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues and pull requests.

## 📞 Support

If you encounter any issues or have questions, please open an issue on our repository.

---

Made with ❤️ for the React community
