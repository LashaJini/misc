import {
  defaultParticle,
  defaultCircularParticle,
  defaultRectangularParticle,
  defaultTriangularParticle,
  IParticle,
  ICircularParticle,
  IRectangularParticle,
  ITriangularParticle,
} from "./ParticleInterfaces";

interface Draw {
  draw(ctx: any): void;
}
export type MouseType = {
  x: number;
  y: number;
  radius: number;
};

export class Particle implements Draw {
  particle: IParticle;
  mouse: MouseType;
  ctx: any;
  constructor(
    ctx: any,
    mouse: MouseType,
    particle: IParticle = defaultParticle
  ) {
    this.ctx = ctx;
    this.particle = particle;
    this.mouse = mouse;
  }

  setParticle(particle: IParticle) {
    this.particle = particle;
  }

  getParticle(): IParticle {
    return this.particle;
  }

  draw(ctx: any): void {}
}

export class CircularParticle extends Particle {
  particle: ICircularParticle;
  mouse: MouseType;
  ctx: any;
  constructor(
    ctx: any,
    mouse: MouseType,
    particle: ICircularParticle = defaultCircularParticle
  ) {
    super(ctx, mouse, particle);
    this.ctx = ctx;
    this.particle = particle;
    this.mouse = mouse;
  }

  draw(ctx: any): void {
    ctx.fillStyle = this.particle.color;
    ctx.beginPath();
    ctx.arc(
      this.particle.x,
      this.particle.y,
      this.particle.radius,
      0,
      Math.PI * 2
    );
    ctx.closePath();
    ctx.fill();
  }

  setParticle(particle: ICircularParticle) {
    /* super.setParticle(particle); */
    this.particle = particle;
  }

  getParticle(): ICircularParticle {
    return this.particle;
  }
}

export class RectangularParticle extends Particle {
  particle: IRectangularParticle;
  mouse: MouseType;
  ctx: any;
  constructor(
    ctx: any,
    mouse: MouseType,
    particle: IRectangularParticle = defaultRectangularParticle
  ) {
    super(ctx, mouse, particle);
    this.ctx = ctx;
    this.particle = particle;
    this.mouse = mouse;
  }

  draw(ctx: any): void {
    ctx.fillStyle = this.particle.color;
    ctx.beginPath();
    ctx.fillRect(
      this.particle.x,
      this.particle.y,
      this.particle.w,
      this.particle.h
    );
    ctx.closePath();
    ctx.fill();
  }

  setParticle(particle: IRectangularParticle) {
    /* super.setParticle(particle); */
    this.particle = particle;
  }

  getParticle(): IRectangularParticle {
    return this.particle;
  }
}

export class TriangularParticle extends Particle {
  particle: ITriangularParticle;
  mouse: MouseType;
  ctx: any;
  constructor(
    ctx: any,
    mouse: MouseType,
    particle: ITriangularParticle = defaultTriangularParticle
  ) {
    super(ctx, mouse, particle);
    this.ctx = ctx;
    this.particle = particle;
    this.mouse = mouse;
  }

  draw(ctx: any): void {
    ctx.fillStyle = this.particle.color;
    ctx.beginPath();
    ctx.moveTo(this.particle.x, this.particle.y);
    ctx.lineTo(this.particle.a, this.particle.b);
    ctx.lineTo(this.particle.a, this.particle.c);
    /* ctx.closePath(); */
    ctx.fill();
  }

  setParticle(particle: ITriangularParticle) {
    /* super.setParticle(particle); */
    this.particle = particle;
  }

  getParticle(): ITriangularParticle {
    return this.particle;
  }
}

export {
  defaultParticle,
  defaultRectangularParticle,
  defaultCircularParticle,
  defaultTriangularParticle,
};
