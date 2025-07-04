"use client";
import React, { useEffect, useRef } from "react";

const NetworkVisual = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = canvas.clientWidth * window.devicePixelRatio;
      canvas.height = canvas.clientHeight * window.devicePixelRatio;
      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset any scaling
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    // Node class for network visualization
    class Node {
      constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.connections = [];
      }

      update(width, height) {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x <= 0 || this.x >= width) this.speedX *= -1;
        if (this.y <= 0 || this.y >= height) this.speedY *= -1;
      }

      draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "#D4AF37";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size + 2, 0, Math.PI * 2);
        ctx.fillStyle = "#cea640c2";
        ctx.fill();
      }

      drawConnections(ctx) {
        for (const node of this.connections) {
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(node.x, node.y);
          ctx.strokeStyle = "rgba(212, 175, 55, 0.2)";
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    const nodes = [];
    const nodeCount = 15;

    for (let i = 0; i < nodeCount; i++) {
      const x = Math.random() * canvas.clientWidth;
      const y = Math.random() * canvas.clientHeight;
      const size = Math.random() * 3 + 1;
      nodes.push(new Node(x, y, size));
    }

    for (const node of nodes) {
      const connectionCount = Math.floor(Math.random() * 3) + 1;
      const otherNodes = [...nodes].filter((n) => n !== node);

      for (let i = 0; i < connectionCount && otherNodes.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * otherNodes.length);
        const connectedNode = otherNodes.splice(randomIndex, 1)[0];
        node.connections.push(connectedNode);
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

      for (const node of nodes) {
        node.update(canvas.clientWidth, canvas.clientHeight);
        node.drawConnections(ctx);
      }

      for (const node of nodes) {
        node.draw(ctx);
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
    };
  }, []);

  return (
    <div className="h-[400px] w-full flex justify-center items-center relative">
      {/* 3D geometric elements */}
      <div className="absolute w-[250px] h-[250px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-float">
        <div className="absolute w-24 h-24 top-0 right-0 transform rotate-45 border gold-gradient-border rounded-xl backdrop-blur-lg bg-black/40"></div>
        <div className="absolute w-32 h-32 bottom-12 left-12 transform rotate-12 border gold-gradient-border rounded-xl backdrop-blur-lg bg-black/40"></div>
        <div className="absolute w-28 h-28 top-16 left-8 transform -rotate-12 border gold-gradient-border rounded-xl backdrop-blur-lg bg-black/40"></div>
      </div>

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10" />
    </div>
  );
};

export default NetworkVisual;
