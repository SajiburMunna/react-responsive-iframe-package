"use client";

import { ResponsiveIframe } from "react-responsive-iframe";
import { useRef, useState } from "react";

export default function Home() {
  const iframeRef = useRef<{
    sendMessage: (message: Record<string, unknown>) => void;
    resize: () => void;
  } | null>(null);
  const [activeTab, setActiveTab] = useState("comparison");
  const [messageCount, setMessageCount] = useState(0);

  const handleResize = (dimensions: { height: number; width: number }) => {
    console.log("🔄 Iframe resized to:", dimensions);
  };

  const sendMessage = () => {
    iframeRef.current?.sendMessage({
      type: "updateContent",
      data: "New content from parent!",
    });
  };

  const forceResize = () => {
    iframeRef.current?.resize();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                React Responsive Iframe Demo
              </h1>
              <p className="mt-2 text-gray-600">
                Demonstrating automatic iframe resizing and responsive behavior
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={sendMessage}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Send Message
              </button>
              <button
                onClick={forceResize}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Force Resize
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: "comparison", label: "Before vs After" },
              { id: "features", label: "Advanced Features" },
              { id: "communication", label: "Parent-Child Communication" },
              { id: "methods", label: "Calculation Methods" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "comparison" && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                🚫 Traditional Iframe Issues
              </h2>
              <p className="text-gray-600 mb-6">
                Traditional iframes have fixed heights, causing content overflow
                and poor user experience.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Traditional Iframe */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    ❌ Traditional Iframe (Fixed Height)
                  </h3>
                  <div className="border-2 border-red-200 rounded-lg overflow-hidden">
                    <iframe
                      src="/iframe-content"
                      width="100%"
                      height="300"
                      className="border-0"
                      title="Traditional iframe"
                    />
                  </div>
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-800">
                      <strong>Issues:</strong> Content gets cut off, scrollbars
                      appear, poor UX
                    </p>
                  </div>
                </div>

                {/* Responsive Iframe */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    ✅ Responsive Iframe (Auto-Adjusting)
                  </h3>
                  <div className="border-2 border-green-200 rounded-lg overflow-hidden">
                    <ResponsiveIframe
                      src="/iframe-content"
                      width="100%"
                      height={300}
                      responsiveOptions={{
                        heightCalculationMethod: "bodyOffset",
                        autoResize: true,
                        minHeight: 200,
                      }}
                    />
                  </div>
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-sm text-green-800">
                      <strong>Benefits:</strong> Perfect fit, no scrollbars,
                      smooth UX
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                🎯 Key Problems Solved
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    📏 Height Jump
                  </h3>
                  <p className="text-sm text-gray-600">
                    Traditional iframes start with a default height and jump to
                    the correct size, causing layout shifts.
                  </p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    📱 Responsive Issues
                  </h3>
                  <p className="text-sm text-gray-600">
                    Fixed heights dont work well across different screen sizes
                    and content lengths.
                  </p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    🔄 Manual Resizing
                  </h3>
                  <p className="text-sm text-gray-600">
                    Developers often need to manually calculate and set iframe
                    dimensions based on content.
                  </p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    📊 Performance
                  </h3>
                  <p className="text-sm text-gray-600">
                    Continuous polling for size changes is inefficient and
                    resource-intensive.
                  </p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    🔒 Security
                  </h3>
                  <p className="text-sm text-gray-600">
                    Cross-origin communication needs proper origin checking for
                    security.
                  </p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    🎨 UX Problems
                  </h3>
                  <p className="text-sm text-gray-600">
                    Scrollbars, cut-off content, and layout shifts create poor
                    user experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "features" && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                🚀 Advanced Features Demo
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    📊 Real-time Resizing
                  </h3>
                  <ResponsiveIframe
                    src="/iframe-content"
                    width="100%"
                    height={300}
                    responsiveOptions={{
                      heightCalculationMethod: "lowestElement",
                      widthCalculationMethod: "scrollWidth",
                      tolerance: 5,
                      autoResize: true,
                      minHeight: 200,
                      sizeWidth: true,
                    }}
                    onResized={(dimensions) => {
                      console.log("📏 Resized to:", dimensions);
                    }}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    ⚙️ Configuration Options
                  </h3>
                  <div className="space-y-4 text-sm">
                    <div className="p-3 bg-gray-50 rounded-md">
                      <strong>Height Calculation:</strong> lowestElement
                    </div>
                    <div className="p-3 bg-gray-50 rounded-md">
                      <strong>Width Calculation:</strong> scrollWidth
                    </div>
                    <div className="p-3 bg-gray-50 rounded-md">
                      <strong>Tolerance:</strong> 5px
                    </div>
                    <div className="p-3 bg-gray-50 rounded-md">
                      <strong>Constraints:</strong> 200px - 600px height
                    </div>
                    <div className="p-3 bg-gray-50 rounded-md">
                      <strong>Auto Resize:</strong> Enabled
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "communication" && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                💬 Parent-Child Communication
              </h2>
              <p className="text-gray-600 mb-6">
                Demonstrating secure message passing between parent and iframe
                content.
              </p>

              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-sm text-blue-800">
                  <strong>Messages received from iframe:</strong> {messageCount}
                </p>
              </div>

              <ResponsiveIframe
                src="/iframe-content"
                width="100%"
                height={400}
                responsiveOptions={{
                  heightCalculationMethod: "bodyScroll",
                  autoResize: true,
                  tolerance: 1,
                  minHeight: 200,
                  checkOrigin: false, // Set to true in production
                }}
                onResized={handleResize}
                onMessage={(message) => {
                  console.log("📨 Message from iframe:", message);
                  if (message.type === "response") {
                    setMessageCount((prev) => prev + 1);
                  }
                }}
              />
            </div>
          </div>
        )}

        {activeTab === "methods" && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                📐 Height Calculation Methods
              </h2>
              <p className="text-gray-600 mb-6">
                Different methods for calculating iframe height based on
                content.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[
                  {
                    method: "bodyScroll",
                    description: "Uses document.body.scrollHeight",
                    useCase: "Simple content",
                  },
                  {
                    method: "bodyOffset",
                    description: "Uses document.body.offsetHeight",
                    useCase: "Content with margins",
                  },
                  {
                    method: "documentElementScroll",
                    description: "Uses document.documentElement.scrollHeight",
                    useCase: "Full page content",
                  },
                  {
                    method: "lowestElement",
                    description: "Finds the lowest element on page",
                    useCase: "Dynamic content",
                  },
                ].map((item) => (
                  <div
                    key={item.method}
                    className="p-4 border border-gray-200 rounded-lg"
                  >
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {item.method}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {item.description}
                    </p>
                    <p className="text-xs text-gray-500">
                      <strong>Use case:</strong> {item.useCase}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            React Responsive Iframe Package Demo - Showing the power of
            automatic iframe resizing
          </p>
        </div>
      </footer>
    </div>
  );
}
