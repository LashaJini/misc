import React from "react";
/* import "./Particles.css"; */
import Box from "@material-ui/core/Box";

const getPixelRatio = (context: any) => {
  let backingStore =
    context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1;

  return (window.devicePixelRatio || 1) / backingStore;
};

const NUMBER_OF_PARTICLES = 200;
const ADJUST_X = 10;
const ADJUST_Y = 10;
type MouseType = {
  x: number | null;
  y: number | null;
  radius: number;
};
const mouse: MouseType = {
  x: null,
  y: null,
  radius: 150,
};

class Particle {
  ctx: any;
  x: number;
  y: number;
  size: number;
  baseX: number;
  baseY: number;
  density: number;
  constructor(ctx: any, x: number, y: number) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.size = 3;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 30 + 1;
  }
  draw() {
    this.ctx.fillStyle = "white";
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fill();
  }

  update() {
    let dx = (mouse.x as number) - this.x;
    // FIX: this
    let dy = (mouse.y as number) - this.y - 140;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    let maxDistance = mouse.radius;

    let force = (maxDistance - distance) / maxDistance;
    let directionX = forceDirectionX * force * this.density;
    let directionY = forceDirectionY * force * this.density;

    if (distance < mouse.radius) {
      /* this.size = 10; */
      /* this.x += directionX; */
      /* this.y += directionY; */
      this.x -= directionX;
      this.y -= directionY;
    } else {
      /* this.size = 5; */
      if (this.x !== this.baseX) {
        let dx = this.x - this.baseX;
        this.x -= dx / 10;
      }
      if (this.y !== this.baseY) {
        let dy = this.y - this.baseY;
        this.y -= dy / 10;
      }
    }
  }
}

class ParticlesLogic extends React.Component {
  canvasRef: any;
  canvas: any;
  ctx: any;
  ratio: any;
  particleArray: any;
  textCoordinates: any;
  width: any;
  height: any;
  constructor(props: any) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.canvas = this.canvasRef.current;

    this.init = this.init.bind(this);
    this.animate = this.animate.bind(this);
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.ctx = this.canvas.getContext("2d");
    this.ratio = getPixelRatio(this.ctx);
    this.width = getComputedStyle(this.canvas)
      .getPropertyValue("width")
      .slice(0, -2);
    this.height = getComputedStyle(this.canvas)
      .getPropertyValue("height")
      .slice(0, -2);

    this.canvas.width = this.width * this.ratio;
    this.canvas.height = this.height * this.ratio;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.particleArray = [];

    /* this.ctx.fillStyle = "white"; */
    /* this.ctx.font = "30px Verdana"; */
    /* this.ctx.fillText("J", 0, 30); */

    this.ctx.fillStyle = "white";
    /* this.ctx.textAlign = "center"; */
    this.ctx.font = "30px Verdana";
    this.ctx.fillText("ĳに", 0, 30);

    this.textCoordinates = this.ctx.getImageData(0, 0, 300, 300);

    this.canvas.addEventListener("mousemove", function (event: any) {
      mouse.x = event.x;
      mouse.y = event.y;
    });
    /* this.canvas.addEventListener("touchmove", function (event: any) { */
    /*   const touch = event.changedTouches; */
    /*   // 1 finger only */
    /*   mouse.x = touch[0].screenX; */
    /*   mouse.y = touch[0].screenY; */
    /* }); */
  }

  /* componentDidUnmount() { */
  /*   window.removeEventListener("mousemove", () => {}); */
  /*   window.removeEventListener("touchmove", () => {}); */
  /* } */

  init = () => {
    this.particleArray = [];

    for (let y = 0, y2 = this.textCoordinates.height; y < y2; y += 4) {
      for (let x = 0, x2 = this.textCoordinates.width; x < x2; x += 4) {
        // 50% opacity
        if (
          this.textCoordinates.data[y * this.textCoordinates.width + x] > 128
        ) {
          let positionX = x;
          let positionY = y;
          this.particleArray.push(
            new Particle(this.ctx, positionX * 2, positionY * 2)
          );
        }
      }
    }
    /* console.log(this.particleArray); */

    /* for (let i = 0; i < NUMBER_OF_PARTICLES; i++) { */
    /*   let x = Math.random() * this.canvas.width; */
    /*   let y = Math.random() * this.canvas.height; */
    /*   this.particleArray.push(new Particle(this.ctx, x, y)); */
    /* } */
  };

  animate = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    /* for (let i = 0; i < this.particleArray.length; i++) { */
    /*   this.particleArray[i].draw(); */
    /*   this.particleArray[i].update(); */
    /* } */
    this.particleArray.forEach((particle: Particle) => {
      particle.draw();
      particle.update();
    });
    requestAnimationFrame(this.animate);
  };

  render() {
    return (
      <>
        <h1>Particles</h1>
        <button
          onClick={() => {
            this.init();
            this.animate();
          }}
        >
          generate
        </button>
        <Box justifyContent="center">
          <canvas ref={this.canvasRef}></canvas>
        </Box>
      </>
    );
  }
}

export default ParticlesLogic;
