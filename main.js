// Import modules from index.js
import * as IndexExports from "./index.js";
const {
  PixelColorLogger,
  MutationObserverHandler,
  BodyToCanvas,
  logMutations,
} = IndexExports;

// Instantiate objects
const renderer = new BodyToCanvas();
const colorLogger = new PixelColorLogger(renderer.offscreenCtx);
const observerConfig = {
  childList: true,
  subtree: true,
  attributes: true
};

// Initialize canvas rendering
renderer.renderBodyToCanvas();

// Create mutation observer
const observerHandler = new MutationObserverHandler(
  observerConfig,
  logMutations,
  colorLogger.logPixelInfo,
  renderer.renderBodyToCanvas.bind(renderer)
);
observerHandler.startObserving();

// Add click event listener to document
document.addEventListener("click", (e) => colorLogger.logPixelInfo(e));

// Mutation to trigger canvas rerender with a timeout
setTimeout(() => {
  const testElement = document.getElementById("green");
  testElement.style.background = "orange";
}, 5000);
