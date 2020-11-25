import React from "react";
/* import "./Particles.css"; */
import Box from "@material-ui/core/Box";
import { IStats, CanvasStyle, getPixelRatio } from "./ParticleInterfaces";
import { defaultStats } from "./ParticleInterfaces";
import { useWindowSize } from "../../../components/useWindowSize";

type MouseType = {
  x: number | null;
  y: number | null;
  radius: number;
};

const mouse: MouseType = {
  x: window.innerWidth,
  y: window.innerHeight,
  radius: 75,
};

type CtxImageDataType = {
  width: number;
  height: number;
  data: Array<number>;
};

interface Canvas {
  baseHeight: number;
  baseWidth: number;
  newWidth: number;
  newHeight: number;
  distanceFromTopX: number;
  distanceFromTopY: number;
  scaleXby: number;
  scaleYby: number;
  stepX: number;
  stepY: number;
  paddingX: number;
  paddingY: number;
  opacity: number;
  textStartX: number;
  textStartY: number;
}

interface Particle {
  radius: number;
  initialX: number;
  initialY: number;
  x: number;
  y: number;
  val: number;
  color: string;
}

const defaultParticle: Particle = {
  radius: defaultStats.particleRadius,
  initialX: 0,
  initialY: 0,
  x: 0,
  y: 0,
  val: 0,
  color: defaultStats.particleColor,
};

interface Props {
  stats: IStats;
}

const ParticlesLogic = (props: Props) => {
  const classes = CanvasStyle;
  const canvasRef: any = React.useRef(null);
  const [w, h] = useWindowSize();
  const { text, px, font, particleRadius, particleColor } = props.stats;
  /* const [canvasSize, setCanvasSize] = React.useState<[number, number]>([0, 0]); */
  const ctxFont = `${px}px ${font}`;
  const [CA, setCA] = React.useState<Canvas>({
    baseHeight: 0,
    baseWidth: 0,
    newWidth: 0,
    newHeight: 0,
    distanceFromTopX: 0,
    distanceFromTopY: 0,
    scaleXby: 5,
    scaleYby: 5,
    stepX: 2,
    stepY: 2,
    paddingX: 50,
    paddingY: 50,
    opacity: 128,
    textStartX: 0,
    textStartY: 10,
  });

  const init: any = React.useRef(() => {});

  React.useEffect(() => {
    const canvas: any = canvasRef.current;
    function doit() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const ctx = canvas.getContext("2d");

      const ratio = getPixelRatio(ctx);

      /* const width: number = parseInt( */
      /*   getComputedStyle(canvas).getPropertyValue("width").slice(0, -2) */
      /* ); */
      /* const height = parseInt( */
      /*   getComputedStyle(canvas).getPropertyValue("height").slice(0, -2) */
      /* ); */
      /* canvas.width = width * ratio; */
      /* canvas.height = height * ratio; */
      /* canvas.style.width = `${w}px`; */
      /* canvas.style.height = `${h}px`; */

      canvas.width = w * ratio;
      canvas.height = h * ratio;
      canvas.style.width = `${w || canvas.width}px`;
      canvas.style.height = `${h || canvas.height}px`;

      ctx.fillStyle = classes.ctx.backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = ctxFont;
      ctx.textBaseline = "bottom";

      init.current(ctx);
    }
    canvas.addEventListener("mousemove", function (event: any) {
      mouse.x = event.x;
      mouse.y = event.y;
    });
    doit();
    return () => window.removeEventListener("mousemove", doit);
  }, [w, h, classes, props.stats, ctxFont, init]);

  init.current = (ctx: any) => {
    const textStats: any = ctx.measureText(text);
    CA.baseHeight =
      textStats.actualBoundingBoxAscent - textStats.actualBoundingBoxDescent;
    CA.baseWidth = textStats.width;
    CA.newWidth = CA.baseWidth * CA.scaleXby;
    CA.newHeight = CA.baseHeight * CA.scaleYby;
    CA.distanceFromTopX = (ctx.canvas.width - CA.newWidth) / 2;
    CA.distanceFromTopY = (ctx.canvas.height - CA.newHeight) / 2;

    ctx.fillStyle = "white";
    ctx.fillText(text, CA.textStartX, px + CA.textStartY);

    const imageWidth = textStats.width + CA.paddingX + CA.textStartX;
    const imageHeight = CA.baseHeight + CA.paddingY + CA.textStartY;
    const tempImageData: CtxImageDataType = ctx.getImageData(
      0,
      0,
      imageWidth,
      imageHeight
    );
    /* console.log(tempImageData.data.length); */

    drawInitialParticles(ctx, tempImageData, imageWidth, imageHeight);
  };

  const drawInitialParticles = (
    ctx: any,
    imageData: CtxImageDataType,
    imageWidth: number,
    imageHeight: number
  ) => {
    ctx.fillStyle = classes.ctx.backgroundColor;
    // clear input text
    ctx.fillRect(0, 0, imageWidth, imageHeight);
    /* ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height); */

    const getIndex = (
      x: number,
      y: number,
      width: number,
      rgba: number = 0
    ) => {
      return y * (width * 4) + x * 4 + rgba;
    };

    let tempParticles: Array<Particle> = [];
    for (let i = CA.textStartX; i < imageData.width; i += CA.stepX) {
      // TODO: 15
      for (let j = CA.textStartY - 15; j < imageData.height; j += CA.stepY) {
        const index = getIndex(i, j, imageData.width);
        const val = imageData.data[index];
        if (val > CA.opacity) {
          const x = (i - CA.textStartX) * CA.scaleXby + CA.distanceFromTopX;
          const y = (j - CA.textStartY) * CA.scaleYby + CA.distanceFromTopY;
          const particle: Particle = {
            ...defaultParticle,
            initialX: x,
            initialY: y,
            x,
            y,
            val: val,
            radius: particleRadius,
            color: particleColor,
          };
          drawCircle(ctx, particle);
          tempParticles.push(particle);
        }
      }
    }
    /* console.log(imageData.data.length, imageData.width, imageData.height); */
    /* console.log(tempParticles.length); */
  };

  const drawCircle = (ctx: any, particle: Particle) => {
    ctx.fillStyle = particle.color;
    ctx.beginPath();

    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  };

  return (
    <>
      <Box>
        <canvas ref={canvasRef}></canvas>
      </Box>
    </>
  );
};

export default ParticlesLogic;
