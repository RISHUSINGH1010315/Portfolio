import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const NeuralHologram: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Dimensions
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 15;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Neural Group
    const group = new THREE.Group();
    scene.add(group);

    // Create a particle sphere (Nodes)
    const count = 80;
    const radius = 4;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const color1 = new THREE.Color('#b0c6ff'); // primary
    const color2 = new THREE.Color('#00dbe7'); // tertiary

    for (let i = 0; i < count; i++) {
      // Golden spiral distribution on sphere for uniform look
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const mixRatio = Math.random();
      const finalColor = color1.clone().lerp(color2, mixRatio);
      colors[i * 3] = finalColor.r;
      colors[i * 3 + 1] = finalColor.g;
      colors[i * 3 + 2] = finalColor.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom shader or Point Material for glow nodes
    const material = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });

    const points = new THREE.Points(geometry, material);
    group.add(points);

    // Draw lines between nearby nodes (neural connections)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x568dff,
      transparent: true,
      opacity: 0.25
    });

    const lineGeometry = new THREE.BufferGeometry();
    const linePositions: number[] = [];

    // Simple proximity algorithm
    for (let i = 0; i < count; i++) {
      const x1 = positions[i * 3];
      const y1 = positions[i * 3 + 1];
      const z1 = positions[i * 3 + 2];

      for (let j = i + 1; j < count; j++) {
        const x2 = positions[j * 3];
        const y2 = positions[j * 3 + 1];
        const z2 = positions[j * 3 + 2];

        const dist = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2);
        // Link nodes that are close to each other
        if (dist < 2.5) {
          linePositions.push(x1, y1, z1);
          linePositions.push(x2, y2, z2);
        }
      }
    }

    lineGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    group.add(lines);

    // Outer grid rings
    const ringGeo1 = new THREE.RingGeometry(4.3, 4.35, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0xb0c6ff, side: THREE.DoubleSide, transparent: true, opacity: 0.1 });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 2;
    group.add(ring1);

    const ringGeo2 = new THREE.RingGeometry(4.5, 4.52, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xdfb7ff, side: THREE.DoubleSide, transparent: true, opacity: 0.1 });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    group.add(ring2);

    // Animation variables
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      // Calculate coordinates relative to screen center (-1 to 1)
      mouseX = (event.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      mouseY = (event.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationId: number;
    const animate = () => {
      // Smooth rotation dampening based on mouse
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      group.rotation.y = targetX * 1.5 + performance.now() * 0.0001;
      group.rotation.x = targetY * 1.5;

      // Pulse connection lines slightly
      const time = performance.now() * 0.002;
      (lines.material as THREE.LineBasicMaterial).opacity = 0.15 + Math.sin(time) * 0.1;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-64 h-64 md:w-96 md:h-96 flex items-center justify-center"
    >
      {/* 3D Canvas rendering under layout overlay */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      {/* Central Core Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-16 h-16 bg-primary/20 blur-xl rounded-full glow-node"></div>
        <span className="material-symbols-outlined text-6xl text-primary drop-shadow-[0_0_15px_rgba(176,198,255,0.8)]" style={{ fontVariationSettings: "'FILL' 1" }}>
          deployed_code
        </span>
      </div>
    </div>
  );
};

export default NeuralHologram;
