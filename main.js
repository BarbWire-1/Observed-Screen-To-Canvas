// Unfortunately html2canvas uses document.write()
// Also it creates a canvas in DOM although I drawImage to an offscreen canvas, therefore blocked logging for mutation on childList - need to test consequences

import * as IndexExports from "./src/index.js";
const {
  PixelColorLogger,
  MutationObserverHandler,
  BodyToCanvas,
  logMutations,
} = IndexExports;

// Instantiate objects
const renderer = new BodyToCanvas();
const colorLogger = new PixelColorLogger(renderer.offscreenCtx);

// Initialize canvas rendering
renderer.renderBodyToCanvas();

// Create mutation observer
// configuration, elements to observe, and callbacks
const observerConfig = {
  childList: true,
  subtree: true,
  attributes: true,
  attributeOldValue: true,
};
const observedElements = [document.body];
const callbacks = [
  logMutations,
  colorLogger.logPixelInfo,
  renderer.renderBodyToCanvas.bind(renderer),
];

// Create an instance of MutationObserverHandler
const observerHandler = new MutationObserverHandler(
  observerConfig,
  observedElements,
  ...callbacks
);

observerHandler.startObserving();

document.addEventListener("click", (e) => colorLogger.logPixelInfo(e));

//TESTING
// Mutation to trigger canvas rerender with a timeout
setTimeout(() => {
  const testElement = document.getElementById("green");
  testElement.style.background = "orange";
}, 5000);

function getRandomHex() {
  return (
    "#" +
    Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padEnd(6, "0")
  );
}
function changeBackgroundColorRandomly(elementId) {
  const randomColor = getRandomHex();
  const element = document.getElementById(elementId);
  if (element) {
    element.style.background = randomColor;
  }
}

setInterval(() => {
  changeBackgroundColorRandomly("green");
}, 5000);
