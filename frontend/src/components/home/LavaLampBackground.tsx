'use client';

import { useEffect, useState } from 'react';

// Generate random box shadows for stars
const generateStars = (count: number, color: string = '#FFF') => {
  const shadows: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 2000);
    const y = Math.floor(Math.random() * 2000);
    shadows.push(`${x}px ${y}px ${color}`);
  }
  return shadows.join(', ');
};

export default function ParallaxStarsBackground() {
  const [shadowsSmall, setShadowsSmall] = useState('');
  const [shadowsMedium, setShadowsMedium] = useState('');
  const [shadowsBig, setShadowsBig] = useState('');

  useEffect(() => {
    // Generate stars on mount (client-side only) with dark navy color for better contrast
    setShadowsSmall(generateStars(700, '#1B2735'));
    setShadowsMedium(generateStars(200, '#1B2735'));
    setShadowsBig(generateStars(100, '#1B2735'));
  }, []);

  return (
    <>
      <div id="stars-layer" style={{ boxShadow: shadowsSmall }}></div>
      <div id="stars2-layer" style={{ boxShadow: shadowsMedium }}></div>
      <div id="stars3-layer" style={{ boxShadow: shadowsBig }}></div>

      <style jsx>{`
        #stars-layer,
        #stars2-layer,
        #stars3-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 1px;
          height: 1px;
          background: transparent;
          pointer-events: none;
        }

        #stars-layer {
          animation: animStar 50s linear infinite;
        }

        #stars-layer::after {
          content: ' ';
          position: absolute;
          top: 2000px;
          width: 1px;
          height: 1px;
          background: transparent;
          box-shadow: ${shadowsSmall};
        }

        #stars2-layer {
          width: 2px;
          height: 2px;
          animation: animStar 100s linear infinite;
        }

        #stars2-layer::after {
          content: ' ';
          position: absolute;
          top: 2000px;
          width: 2px;
          height: 2px;
          background: transparent;
          box-shadow: ${shadowsMedium};
        }

        #stars3-layer {
          width: 3px;
          height: 3px;
          animation: animStar 150s linear infinite;
        }

        #stars3-layer::after {
          content: ' ';
          position: absolute;
          top: 2000px;
          width: 3px;
          height: 3px;
          background: transparent;
          box-shadow: ${shadowsBig};
        }

        @keyframes animStar {
          from {
            transform: translateY(0px);
          }
          to {
            transform: translateY(-2000px);
          }
        }
      `}</style>
    </>
  );
}
