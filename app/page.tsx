'use client'
import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';
import NumberedReference from '../components/NumberedReference';  
import Link from 'next/link';
import dynamic from 'next/dynamic';

interface Event {
  year: number;
  description: string;
  position: number;
}

const TimelineEvent: React.FC<Event> = ({ year, description }) => (
  <div className="text-white text-center">
    <h3 className="text-xl font-bold">{year}</h3>
    <p>{description}</p>
  </div>
);

interface AboutMeProps {
  onNext: () => void;
}

const AboutMe: React.FC<AboutMeProps> = ({ onNext }) => (
  <div className="fixed inset-0 bg-white text-black flex flex-col items-center justify-center p-4 md:p-8 z-50 overflow-y-auto">
    <div className="flex-1 flex items-center">
      <div className="max-w-2xl text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-black">About Me</h2>
        <p className="text-base md:text-lg mb-4 md:mb-6 text-black">
          Hello! I'm Les, a life long problem-solver, learner, and renewed technocapitalist
          <NumberedReference 
            number={1} 
            content="Technocapitalism refers to a form of capitalism that is driven by technological innovation and the knowledge economy."
          />. 
          Currently based in Miami, FL, I help independent business owners and startups research & adopt technology -- consulting and building products leveraging AI, blockchains, data, and more. 
        </p>
        <p className="text-base md:text-lg mb-4 md:mb-6 text-black">
          The purpose of this site is to create a digital home of information for a future generation.
        </p>
      </div>
    </div>
    <div className="flex flex-col items-center mt-4">
      <button 
        onClick={onNext}
        className="text-gray-800 hover:text-gray-600 transition-colors flex flex-col items-center"
      >
        <ChevronDown size={24} />
        <span className="mt-1">Work</span>
      </button>
      <p className="text-sm text-gray-500 mt-2">Press 'Esc' to return to timeline</p>
    </div>
  </div>
);

const WorkTile = ({ title, href }: { title: string; href: string }) => (
  <Link href={href} className="w-full block mb-2">
    <div className="bg-white bg-opacity-70 text-gray-800 rounded-lg shadow-lg p-6 flex justify-between items-center hover:shadow-xl transition-all duration-300 w-1/2 mx-auto hover:w-full">
      <h3 className="text-xl font-bold">{title}</h3>
      <ChevronRight size={24} className="text-gray-500" />
    </div>
  </Link>
);

const Work = dynamic(() => import('../components/Work'), { ssr: false });

const VerticalTransition = ({ children, isVisible }) => (
  <div className={`fixed inset-0 transition-transform duration-500 ease-in-out ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
    {children}
  </div>
);

const InteractiveTimeline = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const curveRef = useRef<THREE.CurvePath<THREE.Vector3>>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const isDraggingRef = useRef(false);
  const tRef = useRef(0);
  const lastInteractionTimeRef = useRef(0);
  const [showAboutMe, setShowAboutMe] = useState(false);
  const [showWork, setShowWork] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const lineRef = useRef<THREE.Line>(null);
  const lastEventRef = useRef<Event | null>(null);

  const events = useMemo(() => [
    { year: 2017, description: "AI & Data", position: 0.01 },
    { year: 2018, description: "Awake", position: 0.2 },
    { year: 2020, description: "Data Science", position: 0.4 },
    { year: 2021, description: "Digital Identity", position: 0.6 },
    { year: 2022, description: "Web3", position: 0.8 },
    { year: 2023, description: "Founding", position: 0.99 },
  ], []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = isMobile ? 7 : 5;

    // Create infinity shape
    const curve = new THREE.CurvePath<THREE.Vector3>();
    const radius = 2;
    const lemniscate = (t: number): THREE.Vector3 => {
      const a = radius;
      const x = (a * Math.sqrt(2) * Math.cos(t)) / (Math.sin(t) * Math.sin(t) + 1);
      const y = (a * Math.sqrt(2) * Math.cos(t) * Math.sin(t)) / (Math.sin(t) * Math.sin(t) + 1);
      return new THREE.Vector3(x, y, 0);
    };

    for (let t = 0; t <= 2 * Math.PI; t += 0.1) {
      const point1 = lemniscate(t);
      const point2 = lemniscate(t + 0.1);
      curve.add(new THREE.LineCurve3(point1, point2));
    }

    // Create line representation
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(
      curve.getPoints(200).map((p: THREE.Vector3 | THREE.Vector2) => {
        if (p instanceof THREE.Vector3) {
          return p;
        } else if (p instanceof THREE.Vector2) {
          return new THREE.Vector3(p.x, p.y, 0);
        } else {
          console.warn('Unexpected point type:', p);
          return new THREE.Vector3(0, 0, 0);
        }
      })
    );
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 });
    const lineObject = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(lineObject);
    lineRef.current = lineObject;

    // Create points representation
    const pointsGeometry = new THREE.BufferGeometry().setFromPoints(
      curve.getPoints(200).map((p: THREE.Vector3 | THREE.Vector2) => {
        if (p instanceof THREE.Vector3) {
          return p;
        } else if (p instanceof THREE.Vector2) {
          return new THREE.Vector3(p.x, p.y, 0);
        } else {
          console.warn('Unexpected point type:', p);
          return new THREE.Vector3(0, 0, 0);
        }
      })
    );
    const pointsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.05, transparent: true, opacity: 0.8 });
    const pointsObject = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(pointsObject);
    pointsRef.current = pointsObject;

    curveRef.current = curve;


    // Create moving sphere
    const sphereGeometry = new THREE.SphereGeometry(0.1, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);
    sphereRef.current = sphere;

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: 0xffffff,
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    const updateSpherePosition = (t: number) => {
      const point = curveRef.current?.getPoint(t);
      if (point && sphereRef.current) {
        sphereRef.current.position.copy(point as THREE.Vector3);
      }

      const currentEventData = events.reduce((prev, curr) => 
        (Math.abs(t - curr.position) < Math.abs(t - prev.position)) ? curr : prev
      );

      if (currentEventData !== lastEventRef.current) {
        setCurrentEvent(currentEventData);
        lastEventRef.current = currentEventData;
      }
    };
    
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Autonomous movement
      if (!isDraggingRef.current && Date.now() - lastInteractionTimeRef.current > 2000) {
        tRef.current += 0.001;
        if (tRef.current > 1) tRef.current -= 1;
        updateSpherePosition(tRef.current);
      }

      // Animate infinity curve
      const time = Date.now() * 0.001;
      lineObject.rotation.y = Math.sin(time) * 0.1;
      pointsObject.rotation.y = Math.sin(time) * 0.1;

      // Pulse effect for points
      const scale = 1 + Math.sin(time * 2) * 0.1;
      pointsObject.scale.set(scale, scale, scale);

      // Rotate particles
      particlesMesh.rotation.y += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    const handleMouseDown = (event: MouseEvent) => {
      event.preventDefault();
      isDraggingRef.current = true;
      lastInteractionTimeRef.current = Date.now();
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDraggingRef.current) return;

      const rect = canvas.getBoundingClientRect();
      const mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), camera);

      const closestPoint = new THREE.Vector3();
      const closestPointT = curveRef.current?.getUtoTmapping(0, 0) ?? 0;
      let minDistance = Infinity;
      let closestT = 0;

      for (let t = 0; t <= 1; t += 0.01) {
        const point = curveRef.current?.getPointAt(t);
        if (point) {
          const distance = raycaster.ray.distanceToPoint(point);
          if (distance < minDistance) {
            minDistance = distance;
            closestT = t;
          }
        }
      }

      tRef.current = closestT;
      updateSpherePosition(closestT);
      lastInteractionTimeRef.current = Date.now();
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      
      // Adjust camera position for mobile
      camera.position.z = isMobile ? 7 : 5;
    };

    window.addEventListener('resize', handleResize);

    // Initial sphere position
    updateSpherePosition(0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowWork(false);
        setShowAboutMe(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobile, events]);

  return (
    <div className="relative w-full h-screen bg-gray-900 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-x-0 top-0 p-4 flex flex-col items-center text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">Les Greys</h1>
        <p className="text-lg md:text-xl mb-4 text-white px-4">Entrepreneur, Writer, Prompt Engineer</p>
        {currentEvent && (
          <div className="mt-4 text-white text-center">
            <h3 className="text-xl font-bold">{currentEvent.year}</h3>
            <p>{currentEvent.description}</p>
          </div>
        )}
      </div>
      <div className="absolute inset-x-0 bottom-1/4 md:bottom-8 flex justify-center items-center bg-opacity-30 py-2">
        <button 
          onClick={() => setShowAboutMe(true)} 
          className="text-white hover:text-gray-300 transition-colors flex flex-col items-center mb-4 md:mb-0"
        >
          <ChevronDown size={24} />
          <span className="mt-1">About</span>
        </button>
      </div>
      <VerticalTransition isVisible={showAboutMe}>
        <AboutMe onNext={() => {
          setShowAboutMe(false);
          setTimeout(() => setShowWork(true), 500);
        }} />
      </VerticalTransition>
      <VerticalTransition isVisible={showWork}>
        <Work />
      </VerticalTransition>
    </div>
  );
};

export default InteractiveTimeline;