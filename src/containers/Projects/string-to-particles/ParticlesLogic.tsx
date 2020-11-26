import React from "react";
/* import "./Particles.css"; */
import Box from "@material-ui/core/Box";
import { IStats, CanvasStyle, getPixelRatio } from "./ParticleInterfaces";
import { useWindowSize } from "../../../hooks/useWindowSize";
import {
  defaultParticle,
  defaultCircularParticle,
  defaultRectangularParticle,
  Particle,
  CircularParticle,
  RectangularParticle,
} from "./ParticleClass";
import {
  IParticle,
  ICircularParticle,
  IRectangularParticle,
} from "./ParticleInterfaces";

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

type ParticleStats = IParticle | ICircularParticle | IRectangularParticle;

interface Props {
  stats: IStats;
}

const ParticlesLogic = (props: Props) => {
  const {
    text,
    px,
    font,
    particleT,
    /* particleColor, */
    particleType,
    scale,
    step,
  } = props.stats;
  const [CA, setCA] = React.useState<Canvas>({
    baseHeight: 0,
    baseWidth: 0,
    newWidth: 0,
    newHeight: 0,
    distanceFromTopX: 0,
    distanceFromTopY: 0,
    scaleXby: scale[0] || 5,
    scaleYby: scale[1] || 5,
    stepX: step[0] || 2,
    stepY: step[1] || 2,
    paddingX: 50,
    paddingY: 50,
    opacity: 128,
    textStartX: 0,
    textStartY: 10,
  });
  const classes = CanvasStyle;
  const canvasRef: any = React.useRef(null);
  const [ww, wh] = useWindowSize();
  const ctxFont = `${px}px ${font}`;
  const [particleStats, setParticleStats] = React.useState<ParticleStats>(
    defaultParticle
  );

  const init: any = React.useRef(() => {});

  React.useEffect(() => {
    const canvas: any = canvasRef.current;
    function doit() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const ctx = canvas.getContext("2d");

      const ratio = getPixelRatio(ctx);

      canvas.width = ww * ratio;
      canvas.height = wh * ratio;
      canvas.style.width = `${ww || canvas.width}px`;
      canvas.style.height = `${wh || canvas.height}px`;

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
  }, [ww, wh, classes, props.stats, ctxFont, init]);

  init.current = (ctx: any) => {
    const textStats: any = ctx.measureText(text);

    const currScaleXBy = scale[0] || CA.scaleXby;
    const currScaleYBy = scale[1] || CA.scaleYby;
    const currBaseHeight =
      textStats.actualBoundingBoxAscent - textStats.actualBoundingBoxDescent;
    const currBaseWidth = textStats.width;
    const currNewWidth = currBaseWidth * currScaleXBy;
    const currNewHeight = currBaseHeight * currScaleYBy;
    const currDistanceFromTopX = (ctx.canvas.width - currNewWidth) / 2;
    const currDistanceFromTopY = (ctx.canvas.height - currNewHeight) / 2;
    const currStepX = step[0] || CA.stepX;
    const currStepY = step[1] || CA.stepY;

    const currCA = {
      ...CA,
      scaleXby: currScaleXBy,
      scaleYby: currScaleYBy,
      baseHeight: currBaseHeight,
      baseWidth: currBaseWidth,
      newWidth: currNewWidth,
      newHeight: currNewHeight,
      distanceFromTopX: currDistanceFromTopX,
      distanceFromTopY: currDistanceFromTopY,
      stepX: currStepX,
      stepY: currStepY,
    };

    const currParticleRadius =
      Number((particleT as ICircularParticle).radius) > 0
        ? Number((particleT as ICircularParticle).radius)
        : defaultCircularParticle.radius;
    const currParticleColor = particleT.color;
    const currParticleType = particleType;
    const currParticleW =
      Number((particleT as IRectangularParticle).w) > 0
        ? Number((particleT as IRectangularParticle).w)
        : defaultRectangularParticle.w;
    const currParticleH =
      Number((particleT as IRectangularParticle).h) > 0
        ? Number((particleT as IRectangularParticle).h)
        : defaultRectangularParticle.h;

    let tempParticlesStats: ParticleStats = {
      ...defaultParticle,
      color: currParticleColor,
      type: currParticleType,
    };
    switch (currParticleType) {
      case "rect": {
        tempParticlesStats = {
          ...tempParticlesStats,
          w: currParticleW,
          h: currParticleH,
        };
        break;
      }
      default: {
        tempParticlesStats = {
          ...tempParticlesStats,
          radius: currParticleRadius,
        };
        break;
      }
    }

    const currParticleStats: ParticleStats = {
      ...particleStats,
      ...tempParticlesStats,
    };

    ctx.fillStyle = "white";
    ctx.fillText(text, CA.textStartX, (px || 0) + CA.textStartY);

    const imageWidth = textStats.width + CA.paddingX + CA.textStartX;
    const imageHeight = currBaseHeight + CA.paddingY + CA.textStartY;
    const tempImageData: CtxImageDataType = ctx.getImageData(
      0,
      0,
      imageWidth,
      imageHeight
    );
    /* console.log(tempImageData.data.length); */
    setCA({
      ...currCA,
    });
    setParticleStats({
      ...currParticleStats,
    });

    drawInitialParticles(
      ctx,
      currCA,
      currParticleStats,
      tempImageData,
      imageWidth,
      imageHeight
    );
  };

  const drawInitialParticles = (
    ctx: any,
    CA: Canvas,
    particleStats: ParticleStats,
    imageData: CtxImageDataType,
    imageWidth: number,
    imageHeight: number
  ) => {
    ctx.fillStyle = classes.ctx.backgroundColor;
    // clear input text
    ctx.fillRect(0, 0, imageWidth, imageHeight);

    const getIndex = (
      x: number,
      y: number,
      width: number,
      rgba: number = 0
    ) => {
      return y * (width * 4) + x * 4 + rgba;
    };

    /* let tempParticles: Array<Particle> = []; */
    let p;
    switch (particleStats.type) {
      case "rect": {
        p = new RectangularParticle(particleStats as IRectangularParticle);
        break;
      }
      case "circle": {
        p = new CircularParticle(particleStats as ICircularParticle);
        break;
      }
      default: {
        p = new Particle(particleStats as IParticle);
        break;
      }
    }

    for (let i = CA.textStartX; i < imageData.width; i += CA.stepX) {
      // TODO: 15
      for (let j = CA.textStartY - 15; j < imageData.height; j += CA.stepY) {
        const index = getIndex(i, j, imageData.width);
        const val = imageData.data[index];
        if (val > CA.opacity) {
          const x = (i - CA.textStartX) * CA.scaleXby + CA.distanceFromTopX;
          const y = (j - CA.textStartY) * CA.scaleYby + CA.distanceFromTopY;
          const particle: ParticleStats = {
            ...p.getParticle(),
            initialX: x,
            initialY: y,
            x,
            y,
            val: val,
          };
          p.setParticle(particle);
          p.draw(ctx);
          /* tempParticles.push(p); */
        }
      }
    }
    /* console.log(imageData.data.length, imageData.width, imageData.height); */
    /* console.log(tempParticles.length); */
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
