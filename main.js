// Import modules from index.js
import * as IndexExports from "./index.js";

// Destructure the IndexExports object for usage
const {
  PixelColorLogger,
  MutationObserverHandler,
  BodyToCanvas,
  logMutations,
} = IndexExports;

// Create instances and setup callbacks
const renderer = new BodyToCanvas();
// IIFE to create callback-function and directly invoke for init
const renderCallback = () => {
    renderer.renderBodyToCanvas();
};
renderCallback()


const observerConfig = { childList: true, subtree: true, attributes: true };
const colorLogger = new PixelColorLogger(renderer.offscreenCtx);

const observerHandler = new MutationObserverHandler(
  observerConfig,
  logMutations,
  colorLogger.logPixelInfo,
  renderCallback
);
observerHandler.startObserving();



// Function to log pixel information
function logPixelInfo(e) {
  const { x, y } = e;
  if (!x || !y) return; // if event does NOT include coords!!!
  const pixelInfo = colorLogger.getPixelRGB(x, y);
  console.log(`${pixelInfo.rgba} at coord (${x}, ${y})`);
}

// Add click event listener to document
document.addEventListener("click", logPixelInfo);

// Mutation to trigger canvas rerender with a timeout
setTimeout(() => {
  const testElement = document.getElementById("green");
  testElement.style.background = "orange";
}, 5000);
