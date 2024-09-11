'use client'
import React, { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Figure8Particles from "./Figure8Particles";

const WorkTile = ({ title, href }: { title: string; href: string }) => (
  <Link href={href} className="w-full block mb-2">
    <div className="bg-white bg-opacity-70 text-gray-800 rounded-lg shadow-lg p-6 flex justify-between items-center hover:shadow-xl transition-all duration-300 w-1/2 mx-auto hover:w-full">
      <h3 className="text-xl font-bold">{title}</h3>
      <ChevronRight size={24} className="text-gray-500" />
    </div>
  </Link>
);

const Work = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center bg-white overflow-hidden">
      <div className="absolute inset-0 z-10">
        <Figure8Particles width={dimensions.width} height={dimensions.height} />
      </div>
      <h2 className="text-2xl md:text-3xl font-bold mt-8 mb-12 text-gray-800 relative z-20">Work</h2>
      <div className="w-full max-w-4xl px-4 flex-grow flex flex-col justify-center relative z-20">
        <WorkTile title="Projects" href="/work" />
        <WorkTile title="Writings" href="/work" />
        <WorkTile title="Activities" href="/work" />
      </div>
      <p className="mt-8 mb-4 text-sm text-gray-500 relative z-20">Press 'Esc' to return to timeline</p>
    </div>
  );
};

export default Work;