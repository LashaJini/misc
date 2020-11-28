import React from "react";
import Box from "@material-ui/core/Box";
import { IStats, CanvasStyle, getPixelRatio } from "./ParticleInterfaces";
import { useWindowSize } from "../../../hooks/useWindowSize";
import {
  defaultParticle,
  defaultCircularParticle,
  defaultRectangularParticle,
  defaultTriangularParticle,
  Particle,
  CircularParticle,
  RectangularParticle,
  TriangularParticle,
  MouseType,
} from "./ParticleClass";
import {
  IParticle,
  ICircularParticle,
  IRectangularParticle,
  ITriangularParticle,
} from "./ParticleInterfaces";

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

type ParticleStats =
  | IParticle
  | ICircularParticle
  | IRectangularParticle
  | ITriangularParticle;

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
  /* const [globalCanMove, setGlobalCanMove] = React.useState(false); */
  /* const [anim, setAnim] = React.useState<number>(0); */
  const anim = React.useRef(1);
  const ratio = React.useRef<number>(1);
  /* const [helper, setHelper] = React.useState<any>(""); */

  const init: any = React.useRef(() => {});

  React.useEffect(() => {
    const canvas: any = canvasRef.current;
    function doit() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const ctx = canvas.getContext("2d");

      /* const tempRatio = getPixelRatio(ctx); */
      ratio.current = getPixelRatio(ctx);

      canvas.width = ww * ratio.current;
      canvas.height = wh * ratio.current;
      canvas.style.width = `${ww || canvas.width}px`;
      canvas.style.height = `${wh || canvas.height}px`;

      ctx.fillStyle = classes.ctx.backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = ctxFont;
      ctx.textBaseline = "bottom";

      init.current(ctx);
    }
    canvas.addEventListener("touchstart", function (event: any) {
      mouse.x = event.touches.item(0).pageX;
      mouse.y = event.touches.item(0).pageY;
    });
    canvas.addEventListener("touchmove", function (event: any) {
      mouse.x = event.touches.item(0).pageX;
      mouse.y = event.touches.item(0).pageY;
    });
    canvas.addEventListener("mousemove", function (event: any) {
      mouse.x = event.x;
      mouse.y = event.y;
    });
    doit();
    return () => {
      window.removeEventListener("touchstart", doit);
      window.removeEventListener("touchmove", doit);
      window.removeEventListener("mousemove", doit);
    };
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

    const currParticleA =
      Number((particleT as ITriangularParticle).a) > 0
        ? Number((particleT as ITriangularParticle).a)
        : defaultTriangularParticle.a;
    const currParticleB =
      Number((particleT as ITriangularParticle).b) > 0
        ? Number((particleT as ITriangularParticle).b)
        : defaultTriangularParticle.b;
    const currParticleC =
      Number((particleT as ITriangularParticle).c) > 0
        ? Number((particleT as ITriangularParticle).c)
        : defaultTriangularParticle.c;

    let tempParticlesStats: ParticleStats = {
      ...particleT,
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
      case "tri": {
        tempParticlesStats = {
          ...tempParticlesStats,
          a: currParticleA,
          b: currParticleB,
          c: currParticleC,
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

    const p = createNewParticle(ctx, particleStats);

    animate(ctx, CA, imageData, p);
  };

  const createNewParticle = (ctx: any, particleStats: ParticleStats) => {
    let p;
    switch (particleStats.type) {
      case "rect": {
        p = new RectangularParticle(
          ctx,
          mouse,
          particleStats as IRectangularParticle
        );
        break;
      }
      case "circle": {
        p = new CircularParticle(
          ctx,
          mouse,
          particleStats as ICircularParticle
        );
        break;
      }
      case "tri": {
        p = new TriangularParticle(
          ctx,
          mouse,
          particleStats as ITriangularParticle
        );
        break;
      }
      default: {
        p = new Particle(ctx, mouse, particleStats as IParticle);
        break;
      }
    }
    return p;
  };

  const drawParticles = (
    ctx: any,
    CA: Canvas,
    imageData: CtxImageDataType,
    p: Particle
  ): Array<Particle> => {
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
          const particle: ParticleStats = {
            ...p.getParticle(),
            initialX: x,
            initialY: y,
            x,
            y,
            val: val,
          };
          const newP = createNewParticle(ctx, p.getParticle());
          newP.setParticle(particle);
          newP.draw(ctx);

          tempParticles.push(newP);
        }
      }
    }
    return tempParticles;
  };

  const animateHelper = (
    ctx: any,
    particles: Array<Particle>,
    reactWrapper: (p: Particle) => void
  ) => {
    particles.forEach((p) => {
      p.draw(ctx);
      reactWrapper(p);
    });
  };

  const animate = (
    ctx: any,
    CA: Canvas,
    imageData: CtxImageDataType,
    p: Particle
  ) => {
    let particles = drawParticles(ctx, CA, imageData, p);
    let canMove: boolean | null = p.getParticle().movementType.canMove;

    let reactHelper = (p: Particle) => {};

    if (canMove) {
      reactHelper = (p: Particle) => {
        react(ratio.current, mouse, p.particle);
      };
    }

    const requestAnimationFrame = window.requestAnimationFrame;
    const cancelAnimationFrame = window.cancelAnimationFrame;

    const moveParticles = () => {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      animateHelper(ctx, particles, reactHelper);

      if (canMove) {
        anim.current = requestAnimationFrame(moveParticles);
      }
    };

    const staticParticles = () => {
      animateHelper(ctx, particles, reactHelper);
    };

    if (canMove) {
      /* setGlobalCanMove(true); */
      anim.current = requestAnimationFrame(moveParticles);
    } else {
      /* setGlobalCanMove(false); */
      cancelAnimationFrame(anim.current);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      staticParticles();
    }
    // called twice? does this component render twice?
  };

  return (
    <>
      <Box>
        <canvas ref={canvasRef}></canvas>
      </Box>
    </>
  );
};

const react = (ratio: number, mouse: MouseType, particle: IParticle) => {
  const { distance, movementOnY, movementOnX } = movementParameters(
    ratio,
    mouse,
    particle
  );

  if (distance < mouse.radius) {
    particle.x += movementOnX;
    particle.y += movementOnY;
    /* } else if (this.goesBack) { */
    /*   this.goBack(); */
  }
};

const movementParameters = (
  ratio: number,
  mouse: MouseType,
  particle: IParticle
): { distance: number; movementOnY: number; movementOnX: number } => {
  const dx = mouse.x - particle.x / ratio;
  const dy = mouse.y - particle.y / ratio;
  const distance = Math.sqrt(dx * dx + dy * dy);

  const args = {
    distance,
    mouse: mouse,
  };
  const moveBy = movementAlgorithm(args);
  const movementOnX = moveBy(dx);
  const movementOnY = moveBy(dy);

  const params = {
    distance,
    movementOnX,
    movementOnY,
  };
  return params;
};

const movementAlgorithm = (args: {
  mouse: MouseType;
  distance: number;
}): ((n: number) => number) => {
  const { mouse, distance } = args;
  const maxDistance = mouse.radius;
  const force = (maxDistance - distance) / maxDistance;

  return (d: number) => (d * force) / 10;
};

export default ParticlesLogic;
