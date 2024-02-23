export class BodyToCanvas {
	constructor() {
		this.isRendering = false;
		this.offscreenCanvas = document.createElement('canvas');
		this.offscreenCtx = this.offscreenCanvas.getContext('2d', {
			willReadFrequently: true,
		});
		
	}

	renderBodyToCanvas() {
		if (this.isRendering) return;
        this.isRendering = true;

		html2canvas(document.body, {
			backgroundColor: 'transparent',
			scale: 1,
			logging: false, // Disable logging
        }).then((bodyCanvas) => {

			const { width, height } = bodyCanvas;
			this.offscreenCanvas.width = width;
			this.offscreenCanvas.height = height;
			this.offscreenCtx.drawImage(bodyCanvas, 0, 0);
			this.isRendering = false;
		});
	}
}
