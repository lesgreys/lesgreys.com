import React, { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';

interface Figure8ParticlesProps {
  width: number;
  height: number;
}

const Figure8Particles: React.FC<Figure8ParticlesProps> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const particleSystem = useMemo(() => {
    const particleCount = 25000; // Further reduced particle count for better performance
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    const radius = 10;
    const lemniscate = (t: number) => {
      const a = radius;
      const x = (a * Math.sqrt(2) * Math.cos(t)) / (Math.sin(t) * Math.sin(t) + 1);
      const y = (a * Math.sqrt(2) * Math.cos(t) * Math.sin(t)) / (Math.sin(t) * Math.sin(t) + 1);
      return new THREE.Vector3(x, y, 0);
    };

    for (let i = 0; i < particleCount; i++) {
      const t = (i / particleCount) * Math.PI * 2;
      const point = lemniscate(t);
      positions[i * 3] = point.x + (Math.random() - 0.5) * 5;
      positions[i * 3 + 1] = point.y + (Math.random() - 0.5) * 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;

      velocities[i * 3] = (Math.random() - 0.5) * 0.05;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.05;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.05;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 0.04,
      color: 0x000000,
      transparent: true,
      opacity: 0.8,
    });

    return { geometry, material, velocities };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for better performance

    camera.position.z = 25;

    const particles = new THREE.Points(particleSystem.geometry, particleSystem.material);
    scene.add(particles);

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const positions = particleSystem.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += particleSystem.velocities[i];
        positions[i + 1] += particleSystem.velocities[i + 1];
        positions[i + 2] += particleSystem.velocities[i + 2];

        if (Math.abs(positions[i]) > 15) particleSystem.velocities[i] *= -1;
        if (Math.abs(positions[i + 1]) > 15) particleSystem.velocities[i + 1] *= -1;
        if (Math.abs(positions[i + 2]) > 15) particleSystem.velocities[i + 2] *= -1;
      }

      particleSystem.geometry.attributes.position.needsUpdate = true;

      particles.rotation.y += 0.002;
      particles.rotation.x += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      particleSystem.geometry.dispose();
      particleSystem.material.dispose();
    };
  }, [width, height, particleSystem]);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />;
};

export default Figure8Particles;