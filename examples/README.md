# React Responsive Iframe - Demo Site

This is a comprehensive demonstration of the `react-responsive-iframe` package, showcasing its capabilities and the problems it solves.

## 🚀 Quick Start

1. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

2. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 What This Demo Shows

### 1. **Before vs After Comparison**

- **Traditional iframe**: Fixed height, content overflow, scrollbars, poor UX
- **Responsive iframe**: Automatic height adjustment, perfect content fit, smooth UX

### 2. **Key Problems Solved**

- ✅ **Height Jump**: Eliminates layout shifts when iframe loads
- ✅ **Responsive Issues**: Works across all screen sizes
- ✅ **Manual Resizing**: No need to calculate dimensions manually
- ✅ **Performance**: Event-based resizing (no continuous polling)
- ✅ **Security**: Built-in origin checking for cross-origin communication
- ✅ **UX Problems**: No scrollbars, no cut-off content

### 3. **Advanced Features**

- **Real-time Resizing**: Automatic height adjustment as content changes
- **Parent-Child Communication**: Secure message passing between parent and iframe
- **Multiple Calculation Methods**: Different algorithms for height calculation
- **Configuration Options**: Customizable behavior and constraints

## 🧪 Interactive Testing

### Responsive Behavior Testing:

1. **Add Content**: Click "Add Content" button to see automatic resizing
2. **Expand/Collapse**: Toggle the "Expand" button to show/hide dynamic content
3. **Dynamic Items**: Add/remove dynamic items to see height changes
4. **Browser Resize**: Resize your browser window to test responsiveness

### Communication Testing:

1. **Send Response**: Click "Send Response" in iframe to message parent
2. **Parent Message**: Use "Send Message" button in parent to update iframe content
3. **Console Logs**: Check browser console for detailed message logs
4. **Message Counter**: Watch the message counter update in real-time

## 📁 Project Structure

```
examples/
├── src/
│   └── app/
│       ├── page.tsx              # Main demo page with tabs
│       ├── iframe-content/
│       │   └── page.tsx          # Iframe content with interactive features
│       ├── layout.tsx            # Root layout
│       └── globals.css           # Global styles
├── package.json                  # Dependencies including react-responsive-iframe
└── README.md                     # This file
```

## 🔧 Technical Implementation

### Main Demo Page (`page.tsx`)

- **Tab Navigation**: Four different demonstration sections
- **Side-by-side Comparison**: Traditional vs responsive iframe
- **Interactive Controls**: Buttons to test communication and resizing
- **Real-time Feedback**: Message counters and status indicators

### Iframe Content (`iframe-content/page.tsx`)

- **useIframeResizer Hook**: Demonstrates the hook for iframe content
- **Dynamic Content**: Shows how content changes trigger automatic resizing
- **Message Handling**: Receives and responds to parent messages
- **Interactive Controls**: Buttons to test various features

## 🎨 Features Demonstrated

### 1. **Automatic Resizing**

```jsx
<ResponsiveIframe
  src="/iframe-content"
  width="100%"
  height={300}
  responsiveOptions={{
    heightCalculationMethod: "bodyScroll",
    autoResize: true,
    tolerance: 1,
    minHeight: 200,
    maxHeight: 800,
  }}
  hideUntilResized
/>
```

### 2. **Parent-Child Communication**

```jsx
// Parent sending message
iframeRef.current?.sendMessage({
  type: "updateContent",
  data: "New content from parent!",
});

// Child receiving message
const { sendMessage } = useIframeResizer({
  onParentMessage: (message) => {
    if (message.type === "updateContent") {
      setContent(message.data);
    }
  },
});
```

### 3. **Hook Usage in Iframe**

```jsx
const { sendMessage, resize, isInitialized } = useIframeResizer({
  heightCalculationMethod: "bodyScroll",
  autoResize: true,
  minHeight: 200,
  maxHeight: 800,
  tolerance: 1,
});
```

## 🚨 Common Issues & Solutions

### Issue: Iframe not resizing

**Solution**: Ensure the iframe content uses the `useIframeResizer` hook and has `autoResize: true`

### Issue: Content getting cut off

**Solution**: Use `hideUntilResized` prop to prevent initial height jump

### Issue: Communication not working

**Solution**: Check that `checkOrigin` is set appropriately for your domain

### Issue: Performance problems

**Solution**: Use `bodyScroll` instead of `lowestElement` for better performance

## 📊 Performance Tips

### ✅ Recommended Settings

```jsx
responsiveOptions={{
  heightCalculationMethod: "bodyScroll", // Fastest method
  autoResize: true, // Event-based only
  tolerance: 1, // Small tolerance for accuracy
  minHeight: 200, // Set constraints
  maxHeight: 1000,
}}
```

### ❌ Avoid These

```jsx
responsiveOptions={{
  heightCalculationMethod: "lowestElement", // Expensive
  interval: 1000, // Continuous polling (not needed)
}}
```

## 🔍 Browser Console

Open your browser's developer console to see:

- Resize events and dimensions
- Message passing between parent and iframe
- Initialization status
- Error messages (if any)

## 🎯 Use Cases

This package is perfect for:

- **Embedded Forms**: Contact forms, surveys, applications
- **Content Widgets**: News feeds, social media embeds
- **Interactive Tools**: Calculators, configurators, demos
- **Document Viewers**: PDFs, presentations, reports
- **Third-party Integrations**: Maps, charts, external services

## 📚 Next Steps

1. **Explore the Code**: Look at the implementation details in both files
2. **Modify Content**: Try changing the iframe content to see resizing in action
3. **Test Communication**: Experiment with different message types
4. **Adjust Settings**: Try different calculation methods and options
5. **Integrate**: Use this package in your own projects

## 🤝 Contributing

Found an issue or have a suggestion? Please open an issue or submit a pull request to the main repository.

---

**Happy coding! 🚀**
