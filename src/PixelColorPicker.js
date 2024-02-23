class PixelColorPicker {
	constructor(ctx) {
		this.ctx = ctx;
	}

	getPixelRGB(x, y) {
		if (!x || !y) return;

		const pixel = this.ctx.getImageData(x, y, 1, 1);
		const [r, g, b, a] = pixel.data;
		return {
			rgba: `rgba(${r}, ${g}, ${b}, ${a / 255})`,
		};
	}
}

export class PixelColorLogger extends PixelColorPicker {
	constructor(ctx) {
		super(ctx);
    }

	logPixelInfo(e) {
		const { x, y } = e;
		if (!x || !y) return; // mutation does NOT serve coords!!!
		const pixelInfo = this.getPixelRGB(x, y);
		console.log(`${pixelInfo.rgba} at coord (${x}, ${y})`);
	}
}
