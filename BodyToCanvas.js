export class BodyToCanvas {
     constructor() {
          this.isRendering = false;
          this.offscreenCanvas = document.createElement("canvas");
         this.offscreenCtx = this.offscreenCanvas.getContext("2d", { willReadFrequently: true });
               this.offscreenCtx.willReadFrequently = true;
     }

     renderBodyToCanvas() {
          if (this.isRendering) return;
          this.isRendering = true;

          html2canvas(document.body, {
               backgroundColor: "transparent",
               scale: 1,
               logging: false // Disable logging
          }).then((bodyCanvas) => {
               const { width, height } = bodyCanvas;
               this.offscreenCanvas.width = width;
               this.offscreenCanvas.height = height;
               this.offscreenCtx.drawImage(bodyCanvas, 0, 0);

               // Set a timeout to reset the isRendering flag after a delay
        setTimeout(() => {
            this.isRendering = false;
        }, 100); // Adjust the delay time as needed
          });
     }
}