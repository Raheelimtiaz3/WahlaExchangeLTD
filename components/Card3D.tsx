'use client';

import React, { useState, useRef } from 'react';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  maxTilt?: number;
  glareOpacity?: number;
}

export default function Card3D({
  children,
  className = '',
  onClick,
  maxTilt = 12,
  glareOpacity = 0.2,
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rY = ((mouseX - width / 2) / (width / 2)) * maxTilt;
    const rX = -((mouseY - height / 2) / (height / 2)) * maxTilt;

    setRotateX(rX);
    setRotateY(rY);

    const glareX = (mouseX / width) * 100;
    const glareY = (mouseY / height) * 100;
    setGlare({ x: glareX, y: glareY, opacity: glareOpacity });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-all duration-200 ease-out select-none cursor-pointer ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.025, 1.025, 1.025)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        boxShadow: isHovered
          ? '0 20px 40px -15px rgba(45, 212, 191, 0.22), 0 0 25px rgba(0, 0, 0, 0.8)'
          : '0 10px 20px -10px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* Specular Glare Reflection Layer */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl z-20 transition-opacity duration-300 overflow-hidden"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 65%)`,
          opacity: glare.opacity,
        }}
      />
      {children}
    </div>
  );
}
