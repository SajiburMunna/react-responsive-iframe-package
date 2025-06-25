"use client";

import { useIframeResizer } from "react-responsive-iframe";
import { useState, useEffect } from "react";

export default function IframeContent() {
  const [content, setContent] = useState(
    "Welcome to the responsive iframe content!"
  );
  const [messageCount, setMessageCount] = useState(0);
  const [dynamicContent, setDynamicContent] = useState<string[]>([]);

  const { sendMessage, resize, isInitialized } = useIframeResizer({
    heightCalculationMethod: "min",
    autoResize: true,
    minHeight: 200,
    tolerance: 1,

    onParentMessage: (message) => {
      console.log("📨 Message received from parent:", message);
      if (message.type === "updateContent") {
        setContent(message.data);
        setMessageCount((prev) => prev + 1);
      }
    },
  });

  // Trigger resize when content changes
  useEffect(() => {
    if (isInitialized) {
      setTimeout(() => resize(), 50);
    }
  }, [content, dynamicContent, isInitialized, resize]);

  const addContent = () => {
    const newContent = `📝 Additional content added at ${new Date().toLocaleTimeString()}`;
    setContent((prev) => prev + "\n\n" + newContent);
  };

  const sendResponse = () => {
    sendMessage({
      type: "response",
      data: `Response #${messageCount + 1} from iframe`,
      timestamp: new Date().toISOString(),
    });
  };

  const addDynamicContent = () => {
    const newItem = `Dynamic item #${
      dynamicContent.length + 1
    } - ${new Date().toLocaleTimeString()}`;
    setDynamicContent((prev) => [...prev, newItem]);
  };

  const removeDynamicContent = () => {
    setDynamicContent((prev) => prev.slice(0, -1));
    resize();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            🎯 Responsive Iframe Content
          </h1>
          <p className="text-gray-600 mb-4">
            This content automatically resizes the parent iframe based on its
            height.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
              <strong>Status:</strong>{" "}
              {isInitialized ? "✅ Connected" : "⏳ Connecting..."}
            </div>
            <div className="p-3 bg-green-50 border border-green-200 rounded-md">
              <strong>Messages received:</strong> {messageCount}
            </div>
            <div className="p-3 bg-purple-50 border border-purple-200 rounded-md">
              <strong>Dynamic items:</strong> {dynamicContent.length}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            🎮 Interactive Controls
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              onClick={addContent}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
            >
              ➕ Add Content
            </button>
            <button
              onClick={sendResponse}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
            >
              📤 Send Response
            </button>
            <button
              onClick={addDynamicContent}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm"
            >
              🔄 Add Dynamic Item
            </button>
            <button
              onClick={removeDynamicContent}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
            >
              🗑️ Remove Item
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            📄 Main Content
          </h2>
          <div className="bg-gray-50 p-4 rounded-md border">
            <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800">
              {content}
            </pre>
          </div>
        </div>

        {/* Dynamic Content Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            🔄 Dynamic Content
          </h2>
          <div className="space-y-2">
            {dynamicContent.length === 0 ? (
              <p className="text-gray-500 italic">
                No dynamic content yet. Click &quot;Add Dynamic Item&quot; to
                add some!
              </p>
            ) : (
              dynamicContent.map((item, index) => (
                <div
                  key={index}
                  className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-md"
                >
                  <span className="text-purple-800">{item}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Features Demo */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            ✨ Features Demonstration
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">
                📊 Real-time Resizing
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Content automatically adjusts iframe height</p>
                <p>• No manual calculations needed</p>
                <p>• Smooth transitions without jumps</p>
                <p>• Responsive across all screen sizes</p>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-3">
                💬 Parent-Child Communication
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Secure message passing</p>
                <p>• Bidirectional communication</p>
                <p>• Event-driven architecture</p>
                <p>• Type-safe message handling</p>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            📋 How to Test
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <h3 className="font-medium mb-2">🎯 Responsive Behavior:</h3>
              <ul className="space-y-1 list-disc list-inside">
                <li>Click &quot;Add Content&quot; to see automatic resizing</li>
                <li>Add/remove dynamic items to see height changes</li>
                <li>Resize your browser window to test responsiveness</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">💬 Communication:</h3>
              <ul className="space-y-1 list-disc list-inside">
                <li>Click &quot;Send Response&quot; to message the parent</li>
                <li>Use parent&apos;s &quot;Send Message&quot; button</li>
                <li>Check browser console for message logs</li>
                <li>Watch the message counter update</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-6 text-gray-500 text-sm">
          <p>🔄 This iframe automatically resizes based on its content</p>
          <p>📱 Try different screen sizes to see responsive behavior</p>
        </div>
      </div>
    </div>
  );
}
