import { RANDOM_TEXT } from './utils.js';

export class Particle {
  static FPS = 15;
  static FPS_TIME = 1000 / Particle.FPS;
  static FRICTION = 0.86;
  static COLOR_SPEED = 0.36;
  static RADIUS = 10;

  #prevTime;
  #x;
  #y;
  #vx;
  #vy;
  #textList;
  #textCount;
  #curIndex;
  #rgb;

  constructor(pos) {
    //this.savedX = pos.x;
    //this.savedY = pos.y;´
    //this.savedRgb = 0x000000;
    this.#x = pos.x;
    this.#y = pos.y;
    this.#vx = 0;
    this.#vy = 0;

    this.#textList = RANDOM_TEXT.split('');
    this.#textCount = this.#textList.length;
    this.#curIndex = 0;

    this.#prevTime = 0;

    this.#rgb = 0x000000;
  }

  collide() {
    this.#rgb = 0xffffff;
    this.#textList = this.shuffle(this.#textList);
  }

  draw(ctx, curTime) {
    if (!this.#prevTime) {
      this.#prevTime = curTime;
    }

    if (curTime - this.#prevTime > Particle.FPS_TIME) {
      this.#prevTime = curTime;
      this.#curIndex = (this.#curIndex + 1) % this.#textCount;
      this.#rgb -= this.#rgb * Particle.COLOR_SPEED;
    }

    this.#vx *= Particle.FRICTION;
    this.#vy *= Particle.FRICTION;

    this.#x += this.#vx;
    this.#y += this.#vy;

    const r = (this.#rgb >> 16) & 0xff;
    const g = (this.#rgb >> 8) & 0xff;
    const b = this.#rgb & 0xff;
    const text = this.#textList[this.#curIndex];

    const fontWidth = 700;
    const fontSize = 14;
    const fontName = 'Hind';

    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.font = `${fontWidth} ${fontSize}px ${fontName}`;
    ctx.textBaseline = 'middle';
    const textPos = ctx.measureText(text);
    ctx.fillText(
      text,
      this.#x - textPos.width / 2,
      this.#y + (fontSize - textPos.actualBoundingBoxAscent) / 2
    );
  }

  shuffle(str) {
    return str.sort(() => Math.random() - 0.5);
  }

  get x() {
    return this.#x;
  }

  set x(x) {
    this.#x = x;
  }

  get y() {
    return this.#y;
  }

  set y(y) {
    this.#y = y;
  }

  get vx() {
    return this.#vx;
  }

  set vx(vx) {
    this.#vx = vx;
  }

  get vy() {
    return this.#vy;
  }

  set vy(vy) {
    this.#vy = vy;
  }
}
