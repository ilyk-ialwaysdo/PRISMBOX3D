import React from 'react';

const PrismBackground = () => {
  // 🎯 MANUAL POSITIONING CONTROLS - CHANGE THESE NUMBERS TO MOVE ELEMENTS
  const CUBE_X = 0;      // Move cube left/right (negative = left, positive = right)
  const CUBE_Y = 0;      // Move cube up/down (negative = up, positive = down)
  
  const LIGHT_X = 35;   // Light beam position from cube center (try: 100, 120, 140)
  const LIGHT_Y = -15;     // Light beam vertical offset (try: -10, 0, 10)
  
  const RAINBOW_X = -1025; // Rainbow position from cube center (try: 260, 280, 300)
  const RAINBOW_Y = -30; // Rainbow vertical offset (try: -40, -30, -20)

  return (
    <>
      {/* Background gradient */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -2,
        background: 'radial-gradient(circle at 50% 50%, #1a1a1a 0%, #0a0a0a 100%)'
      }} />
      
      {/* 3D Prism Cube - MANUALLY POSITIONED */}
      <div style={{
        position: 'fixed',
        top: '50vh',
        left: '50vw',
        transform: `translate(${CUBE_X - 60}px, ${CUBE_Y - 60}px) rotateX(20deg) rotateY(25deg)`,
        width: '120px',
        height: '120px',
        transformStyle: 'preserve-3d',
        zIndex: -1
      }}>
        {/* Cube faces */}
        <div style={{
          position: 'absolute',
          width: '120px',
          height: '120px',
          background: 'rgba(34, 197, 94, 0.15)',
          border: '2px solid rgba(34, 197, 94, 0.4)',
          backdropFilter: 'blur(5px)',
          transform: 'translateZ(60px)',
          boxShadow: '0 0 20px rgba(34, 197, 94, 0.3)'
        }} />
        <div style={{
          position: 'absolute',
          width: '120px',
          height: '120px',
          background: 'rgba(34, 197, 94, 0.1)',
          border: '2px solid rgba(34, 197, 94, 0.3)',
          backdropFilter: 'blur(5px)',
          transform: 'translateZ(-60px) rotateY(180deg)'
        }} />
        <div style={{
          position: 'absolute',
          width: '120px',
          height: '120px',
          background: 'rgba(34, 197, 94, 0.12)',
          border: '2px solid rgba(34, 197, 94, 0.35)',
          backdropFilter: 'blur(5px)',
          transform: 'rotateY(90deg) translateZ(60px)'
        }} />
        <div style={{
          position: 'absolute',
          width: '120px',
          height: '120px',
          background: 'rgba(34, 197, 94, 0.08)',
          border: '2px solid rgba(34, 197, 94, 0.25)',
          backdropFilter: 'blur(5px)',
          transform: 'rotateY(-90deg) translateZ(60px)'
        }} />
        <div style={{
          position: 'absolute',
          width: '120px',
          height: '120px',
          background: 'rgba(34, 197, 94, 0.2)',
          border: '2px solid rgba(34, 197, 94, 0.5)',
          backdropFilter: 'blur(5px)',
          transform: 'rotateX(90deg) translateZ(60px)'
        }} />
        <div style={{
          position: 'absolute',
          width: '120px',
          height: '120px',
          background: 'rgba(34, 197, 94, 0.05)',
          border: '2px solid rgba(34, 197, 94, 0.2)',
          backdropFilter: 'blur(5px)',
          transform: 'rotateX(-90deg) translateZ(60px)'
        }} />
      </div>
      
      {/* White light beam - MANUALLY POSITIONED */}
      <div style={{
        position: 'fixed',
        top: '50vh',
        left: '50vw',
        transform: `translate(${CUBE_X + LIGHT_X}px, ${CUBE_Y + LIGHT_Y}px)`,
        width: '1000px',
        height: '6px',
        background: 'linear-gradient(90deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 70%, rgba(255,255,255,0.3) 100%)',
        zIndex: -1,
        animation: 'pulse 2s ease-in-out infinite',
        borderRadius: '3px',
        boxShadow: '0 0 20px rgba(255,255,255,0.4)'
      }} />
      
      {/* Rainbow spectrum - MANUALLY POSITIONED */}
      <div style={{
        position: 'fixed',
        top: '50vh',
        left: '50vw',
        transform: `translate(${CUBE_X + RAINBOW_X}px, ${CUBE_Y + RAINBOW_Y}px)`,
        zIndex: -1
      }}>
        {['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'].map((color, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: `${i * 9}px`,
            width: '1000px',
            height: '5px',
            background: `linear-gradient(90deg, ${color} 0%, ${color}AA 40%, ${color}60 70%, transparent 100%)`,
            borderRadius: '2px',
            opacity: 0.9,
            animation: `rainbowPulse 2s ease-in-out infinite ${i * 0.1}s`,
            boxShadow: `0 0 12px ${color}60`
          }} />
        ))}
      </div>
      
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{
          position: 'fixed',
          left: `${20 + i * 12}vw`,
          width: '4px',
          height: '4px',
          background: 'rgba(34, 197, 94, 0.8)',
          borderRadius: '50%',
          zIndex: -1,
          animation: `float ${6 + i * 2}s infinite linear ${i * 1}s`,
          boxShadow: '0 0 12px rgba(34, 197, 94, 0.6)'
        }} />
      ))}
      
      <style>{`
        @keyframes pulse {
          0%, 100% { 
            opacity: 0.7;
            box-shadow: 0 0 20px rgba(255,255,255,0.4);
          }
          50% { 
            opacity: 1;
            box-shadow: 0 0 35px rgba(255,255,255,0.6);
          }
        }
        
        @keyframes rainbowPulse {
          0%, 100% { 
            opacity: 0.8;
            transform: scaleX(1);
          }
          50% { 
            opacity: 1;
            transform: scaleX(1.02);
          }
        }
        
        @keyframes float {
          0% { 
            transform: translateY(100vh); 
            opacity: 0; 
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { 
            transform: translateY(-100px); 
            opacity: 0; 
          }
        }
      `}</style>
    </>
  );
};

export default PrismBackground;
