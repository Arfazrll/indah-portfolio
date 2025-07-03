import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

interface DataPoint {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

interface BarData {
  id: number;
  height: number;
  x: number;
  delay: number;
}

const AnimatedBackground: React.FC = () => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate random data points for floating particles
  const generateDataPoints = (count: number): DataPoint[] => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
    }));
  };

  // Generate bar chart data
  const generateBarData = (count: number): BarData[] => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      height: Math.random() * 60 + 20,
      x: (i / count) * 100,
      delay: i * 0.1,
    }));
  };

  const dataPoints = generateDataPoints(20);
  const barData = generateBarData(0);

  // Canvas animation for trend lines
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationId: number;
    let time = 0;

    const drawTrendLine = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Set line style based on theme
      ctx.strokeStyle = theme === 'dark' 
        ? 'rgba(56, 189, 248, 0.2)' // light blue for dark mode
        : 'rgba(14, 165, 233, 0.15)'; // darker blue for light mode
      ctx.lineWidth = 2;

      // Draw multiple trend lines
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 5) {
          const y = canvas.height / 2 + 
            Math.sin((x + time + i * 100) * 0.01) * 50 * (i + 1) +
            Math.sin((x + time + i * 200) * 0.005) * 30;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      time += 1;
      animationId = requestAnimationFrame(drawTrendLine);
    };

    drawTrendLine();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [theme]);

  const getColorClass = (type: 'primary' | 'secondary' | 'accent') => {
    if (theme === 'dark') {
      switch (type) {
        case 'primary': return 'bg-cyan-400';
        case 'secondary': return 'bg-green-400';
        case 'accent': return 'bg-orange-400';
      }
    } else {
      switch (type) {
        case 'primary': return 'bg-blue-500';
        case 'secondary': return 'bg-green-500';
        case 'accent': return 'bg-blue-600';
      }
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Canvas for trend lines */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-50"
      />

      {/* Animated grid pattern */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-10">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke={theme === 'dark' ? '#1e40af' : '#3b82f6'}
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating data points */}
      {dataPoints.map((point) => (
        <motion.div
          key={point.id}
          className={`absolute rounded-full ${
            point.id % 3 === 0 
              ? getColorClass('primary')
              : point.id % 3 === 1 
              ? getColorClass('secondary')
              : getColorClass('accent')
          } ${theme === 'dark' ? 'opacity-60' : 'opacity-40'}`}
          style={{
            width: `${point.size}px`,
            height: `${point.size}px`,
            left: `${point.x}%`,
            top: `${point.y}%`,
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 20 + point.delay * 2,
            repeat: Infinity,
            delay: point.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Animated bar chart */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 flex items-end justify-around px-8">
        {barData.map((bar) => (
          <motion.div
            key={bar.id}
            className={`relative ${
              bar.id % 3 === 0 
                ? theme === 'dark' ? 'bg-cyan-400/20' : 'bg-blue-500/20'
                : bar.id % 3 === 1 
                ? theme === 'dark' ? 'bg-green-400/20' : 'bg-green-500/20'
                : theme === 'dark' ? 'bg-orange-400/20' : 'bg-blue-600/20'
            }`}
            style={{
              width: '4%',
              maxWidth: '40px',
            }}
            initial={{ height: 0 }}
            animate={{
              height: [`${bar.height}%`, `${bar.height + 20}%`, `${bar.height}%`],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: bar.delay,
              ease: 'easeInOut',
            }}
          >
            {/* Bar top indicator */}
            <motion.div
              className={`absolute -top-1 left-0 right-0 h-1 ${
                bar.id % 3 === 0 
                  ? getColorClass('primary')
                  : bar.id % 3 === 1 
                  ? getColorClass('secondary')
                  : getColorClass('accent')
              }`}
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: bar.delay,
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Risk percentage indicators */}
      <div className="absolute top-10 right-10 space-y-4">
        <motion.div
          className={`text-xs font-mono ${
            theme === 'dark' ? 'text-cyan-400/60' : 'text-blue-600/60'
          }`}
          animate={{
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        >
          Risk: 23.5%
        </motion.div>
        <motion.div
          className={`text-xs font-mono ${
            theme === 'dark' ? 'text-green-400/60' : 'text-green-600/60'
          }`}
          animate={{
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 1,
          }}
        >
          Premium: ↑ 2.3%
        </motion.div>
      </div>

      {/* Actuarial formula decoration */}
      <motion.div
        className={`absolute top-1/4 left-10 font-mono text-xs ${
          theme === 'dark' ? 'text-blue-400/30' : 'text-blue-600/30'
        }`}
        animate={{
          opacity: [0.2, 0.5, 0.2],
          y: [-10, 10, -10],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        P = Σ(Li × Pi)
      </motion.div>

      {/* Connecting lines between data points */}
      <svg className="absolute inset-0 w-full h-full">
        <motion.path
          d={`M ${dataPoints[0].x}% ${dataPoints[0].y}% Q ${dataPoints[5].x}% ${dataPoints[5].y}%, ${dataPoints[10].x}% ${dataPoints[10].y}%`}
          stroke={theme === 'dark' ? '#67e8f9' : '#3b82f6'}
          strokeWidth="0.5"
          fill="none"
          opacity="0.3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </svg>

      {/* Gradient overlays for depth */}
      <div className={`absolute inset-0 bg-gradient-to-t ${
        theme === 'dark'
          ? 'from-black/50 via-transparent to-transparent'
          : 'from-white/50 via-transparent to-transparent'
      }`} />
      
      <div className={`absolute inset-0 bg-gradient-to-r ${
        theme === 'dark'
          ? 'from-black/30 via-transparent to-black/30'
          : 'from-white/30 via-transparent to-white/30'
      }`} />
    </div>
  );
};

export default AnimatedBackground;