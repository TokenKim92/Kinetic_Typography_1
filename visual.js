import { TextFrame } from './textframe.js';
import { Particle } from './particle.js';
import { RANDOM_TEXT } from './utils.js';

export class Visual {
  #textFrame;
  #particles;
  #mouse;

  constructor(ctx) {
    this.#textFrame = new TextFrame(ctx);
    this.#particles = [];
    this.#mouse = {
      x: 0,
      y: 0,
      radius: 100,
    };

    document.addEventListener(
      'pointermove',
      this.onMouseMove.bind(this),
      false
    );
  }

  show(stageWidth, stageHeight) {
    const textList = RANDOM_TEXT.split('');
    const curChar = textList[Math.round(Math.random() * (textList.length - 1))];
    const particlePosList = this.#textFrame.setText(
      curChar,
      26,
      stageWidth,
      stageHeight
    );

    this.#particles = [];
    for (let i = 0; i < particlePosList.length; i++) {
      const particle = new Particle(particlePosList[i]);
      this.#particles.push(particle);
    }
  }

  animate(ctx, curTime) {
    let particle;
    let dx, dy, dist, minDist;
    let angle, tx, ty, ax, ay;

    for (let i = 0; i < this.#particles.length; i++) {
      particle = this.#particles[i];

      dx = this.#mouse.x - particle.x;
      dy = this.#mouse.y - particle.y;
      dist = Math.sqrt(dx * dx + dy * dy);
      minDist = Particle.RADIUS + this.#mouse.radius;

      if (dist < minDist) {
        angle = Math.atan2(dy, dx);
        tx = particle.x + Math.cos(angle) * minDist;
        ty = particle.y + Math.sin(angle) * minDist;
        ax = tx - this.#mouse.x;
        ay = ty - this.#mouse.y;

        particle.vx -= ax;
        particle.vy -= ay;
        particle.collide();
      }

      particle.draw(ctx, curTime);
    }
  }

  onMouseMove(e) {
    this.#mouse.x = e.clientX;
    this.#mouse.y = e.clientY;
  }
}
