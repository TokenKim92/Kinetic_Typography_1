export class TextFrame {
  #ctx;

  constructor(ctx) {
    this.#ctx = ctx;
  }

  setText(text, density, stageWidth, stageHeight) {
    const fontWidth = 700;
    const fontSize = 800;
    const fontName = 'Hind';

    this.#ctx.clearRect(0, 0, stageWidth, stageHeight);
    this.#ctx.font = `${fontWidth} ${fontSize}px ${fontName}`;
    this.#ctx.fillStyle = `rgba(0, 0, 0, 0.3)`;
    this.#ctx.textBaseline = `middle`;
    const fontPos = this.#ctx.measureText(text);

    this.#ctx.fillText(
      text,
      (stageWidth - fontPos.width) / 2,
      fontPos.actualBoundingBoxAscent +
        fontPos.actualBoundingBoxDescent +
        (stageHeight - fontSize) / 2
    );

    return this.#getParticlePos(density, stageWidth, stageHeight);
  }

  #getParticlePos(density, stageWidth, stageHeight) {
    const imageData = this.#ctx.getImageData(
      0,
      0,
      stageWidth,
      stageHeight
    ).data;

    const particles = [];
    let i = 0;
    let x;
    let alpha;

    for (let y = 0; y < stageHeight; y += density) {
      x = 6 * !(i++ % 2);

      for (x; x < stageWidth; x += density) {
        alpha = imageData[(x + y * stageWidth) * 4 + 3];

        if (alpha) {
          particles.push({
            x: x,
            y: y,
          });
        }
      }
    }

    return particles;
  }
}
