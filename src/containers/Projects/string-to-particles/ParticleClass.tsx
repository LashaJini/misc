import {
  defaultParticle,
  defaultCircularParticle,
  defaultRectangularParticle,
  IParticle,
  ICircularParticle,
  IRectangularParticle,
} from "./ParticleInterfaces";

interface Draw {
  draw(ctx: any): void;
}

export class Particle implements Draw {
  particle: IParticle;
  constructor(particle: IParticle = defaultParticle) {
    this.particle = particle;
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
  constructor(particle: ICircularParticle = defaultCircularParticle) {
    super(particle);
    this.particle = particle;
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
  constructor(particle: IRectangularParticle = defaultRectangularParticle) {
    super(particle);
    this.particle = particle;
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

export { defaultParticle, defaultRectangularParticle, defaultCircularParticle };
