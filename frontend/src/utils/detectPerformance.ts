const FPS_THRESHOLD = 15;
const MEASURE_DURATION_MS = 1000;
const WARMUP_MS = 500;

function measureFPS(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      let frames = 0;
      const start = performance.now();

      function tick(now: number) {
        frames++;
        if (now - start < MEASURE_DURATION_MS) {
          requestAnimationFrame(tick);
        } else {
          const fps = frames / ((now - start) / 1000);
          resolve(fps);
        }
      }

      requestAnimationFrame(tick);
    }, WARMUP_MS);
  });
}

export function getReduceMotion(): boolean {
  const stored = localStorage.getItem("reduce-motion");
  if (stored !== null) return stored === "true";
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export async function detectPerformance(): Promise<boolean> {
  const cachedFps = localStorage.getItem("fps");
  let fps: number;

  if (cachedFps !== null) {
    fps = parseFloat(cachedFps);
  } else if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    fps = 0;
    localStorage.setItem("fps", "0");
  } else {
    fps = await measureFPS();
    localStorage.setItem("fps", String(fps));
  }

  const reduce = fps < FPS_THRESHOLD;
  console.log(
    `FPS: ${fps.toFixed(1)} (threshold: ${FPS_THRESHOLD}) → ${reduce ? "low" : "high"} performance`,
  );

  if (localStorage.getItem("reduce-motion") === null) {
    localStorage.setItem("reduce-motion", String(reduce));
  }

  return reduce;
}
