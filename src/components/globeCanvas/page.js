"use client";
import React, { useRef, useEffect } from "react";
import createGlobe from "cobe";

export default function GlobeCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let phi = 0;

    const onResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width =
          canvasRef.current.offsetWidth * devicePixelRatio;
        canvasRef.current.height =
          canvasRef.current.offsetHeight * devicePixelRatio;
      }
    };

    onResize();
    window.addEventListener("resize", onResize);

    let globe;
    if (canvasRef.current) {
      globe = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: canvasRef.current.offsetWidth * 2,
        height: canvasRef.current.offsetHeight * 2,
        phi: 0,
        theta: 0.3,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 10,
        baseColor: [0.85, 0.7, 0.29],
        markerColor: [1, 1, 1], 
        glowColor: [0.9, 0.75, 0.3],
        markers: [],
        onRender: (state) => {
          state.phi = phi;
          phi += 0.01;
        },
      });
    }

    return () => {
      window.removeEventListener("resize", onResize);
      globe?.destroy?.();
    };
  }, []);

  return (
    <div className="w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-100"
        style={{ display: "block" }}
      />
    </div>
  );
}
