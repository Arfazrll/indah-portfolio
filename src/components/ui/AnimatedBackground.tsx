// src/components/ui/AnimatedBackground.tsx
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

interface DataPoint {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  type: 'risk' | 'premium' | 'claim';
}

interface ChartBar {
  id: number;
  height: number;
  x: number;
  delay: number;
  type: 'profit' | 'loss' | 'neutral';
}

const AnimatedBackground: React.FC = () => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate insurance-themed data points
  const generateDataPoints = (count: number): DataPoint[] => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 5,
      type: ['risk', 'premium', 'claim'][Math.floor(Math.random() * 3)] as DataPoint['type'],
    }));
  };

  // Generate actuarial chart data
  const generateChartData = (count: number): ChartBar[] => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      height: Math.random() * 50 + 30,
      x: (i / count) * 100,
      delay: i * 0.1,
      type: ['profit', 'loss', 'neutral'][Math.floor(Math.random() * 3)] as ChartBar['type'],
    }));
  };

  const dataPoints = generateDataPoints(25);
  const chartBars = generateChartData(10);

  // Canvas animation for actuarial curves
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

    const drawActuarialCurves = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw multiple probability distribution curves
      const curves = [
        { amplitude: 80, frequency: 0.008, phase: 0, opacity: 0.15 },
        { amplitude: 60, frequency: 0.012, phase: Math.PI / 3, opacity: 0.12 },
        { amplitude: 100, frequency: 0.006, phase: Math.PI / 2, opacity: 0.1 },
      ];

      curves.forEach((curve, index) => {
        ctx.beginPath();
        ctx.strokeStyle = theme === 'dark' 
          ? `rgba(56, 189, 248, ${curve.opacity})` 
          : `rgba(14, 165, 233, ${curve.opacity})`;
        ctx.lineWidth = 2;

        for (let x = 0; x < canvas.width; x += 5) {
          const normalizedX = (x / canvas.width) * 4 * Math.PI;
          const gaussian = Math.exp(-Math.pow((normalizedX - 2 * Math.PI) / 2, 2));
          const y = canvas.height / 2 + 
            Math.sin(normalizedX + time * 0.002 + curve.phase) * curve.amplitude * gaussian +
            Math.sin(normalizedX * 2 + time * 0.003) * 20;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });

      time += 1;
      animationId = requestAnimationFrame(drawActuarialCurves);
    };

    drawActuarialCurves();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [theme]);

  const getColorByType = (type: string) => {
    const colors = {
      risk: theme === 'dark' ? 'bg-red-400' : 'bg-red-500',
      premium: theme === 'dark' ? 'bg-green-400' : 'bg-green-500',
      claim: theme === 'dark' ? 'bg-orange-400' : 'bg-orange-500',
      profit: theme === 'dark' ? 'bg-emerald-400' : 'bg-emerald-500',
      loss: theme === 'dark' ? 'bg-rose-400' : 'bg-rose-500',
      neutral: theme === 'dark' ? 'bg-blue-400' : 'bg-blue-500',
    };
    return colors[type as keyof typeof colors] || colors.neutral;
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Canvas for actuarial curves */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-50"
      />

      {/* Grid pattern with insurance theme */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-5">
          <defs>
            <pattern
              id="insurance-grid"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 50 0 L 0 0 0 50"
                fill="none"
                stroke={theme === 'dark' ? '#3b82f6' : '#1e40af'}
                strokeWidth="0.5"
              />
              <circle
                cx="25"
                cy="25"
                r="1"
                fill={theme === 'dark' ? '#3b82f6' : '#1e40af'}
                opacity="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#insurance-grid)" />
        </svg>
      </div>

      {/* Floating insurance data points */}
      {dataPoints.map((point) => (
        <motion.div
          key={point.id}
          className={`absolute rounded-full ${getColorByType(point.type)} ${
            theme === 'dark' ? 'opacity-40' : 'opacity-30'
          }`}
          style={{
            width: `${point.size}px`,
            height: `${point.size}px`,
            left: `${point.x}%`,
            top: `${point.y}%`,
          }}
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -60, 40, 0],
            scale: [1, 1.3, 0.9, 1],
          }}
          transition={{
            duration: 25 + point.delay * 3,
            repeat: Infinity,
            delay: point.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Animated bar chart for premiums/claims */}
      <div className="absolute bottom-0 left-0 right-0 h-1/4 flex items-end justify-around px-8 opacity-20">
        {chartBars.map((bar) => (
          <motion.div
            key={bar.id}
            className={`relative ${getColorByType(bar.type)}`}
            style={{
              width: '8%',
              maxWidth: '60px',
            }}
            initial={{ height: 0 }}
            animate={{
              height: [`${bar.height}%`, `${bar.height + 15}%`, `${bar.height}%`],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              delay: bar.delay,
              ease: 'easeInOut',
            }}
          >
            <motion.div
              className={`absolute -top-2 left-0 right-0 h-1 ${getColorByType(bar.type)}`}
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

      {/* Actuarial formulas and percentages */}
      <div className="absolute top-10 right-10 space-y-4">
        <motion.div
          className={`text-xs font-mono ${
            theme === 'dark' ? 'text-cyan-400/40' : 'text-blue-600/40'
          }`}
          animate={{
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        >
          Loss Ratio: 68.5%
        </motion.div>
        <motion.div
          className={`text-xs font-mono ${
            theme === 'dark' ? 'text-green-400/40' : 'text-green-600/40'
          }`}
          animate={{
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: 1,
          }}
        >
          Combined Ratio: 95.2%
        </motion.div>
        <motion.div
          className={`text-xs font-mono ${
            theme === 'dark' ? 'text-orange-400/40' : 'text-orange-600/40'
          }`}
          animate={{
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: 2,
          }}
        >
          Solvency II: 168%
        </motion.div>
      </div>

      {/* Actuarial formula decorations */}
      <motion.div
        className={`absolute top-1/3 left-10 font-mono text-sm ${
          theme === 'dark' ? 'text-blue-400/20' : 'text-blue-600/20'
        }`}
        animate={{
          opacity: [0.1, 0.4, 0.1],
          y: [-20, 20, -20],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        PV = Σ(CFt / (1+r)^t)
      </motion.div>

      <motion.div
        className={`absolute bottom-1/3 right-1/4 font-mono text-xs ${
          theme === 'dark' ? 'text-purple-400/20' : 'text-purple-600/20'
        }`}
        animate={{
          opacity: [0.1, 0.4, 0.1],
          x: [-10, 10, -10],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 3,
        }}
      >
        σ² = E[(X-μ)²]
      </motion.div>

      {/* Gradient overlays */}
      <div className={`absolute inset-0 bg-gradient-to-t ${
        theme === 'dark'
          ? 'from-black/30 via-transparent to-transparent'
          : 'from-white/30 via-transparent to-transparent'
      }`} />
      
      <div className={`absolute inset-0 bg-gradient-to-br ${
        theme === 'dark'
          ? 'from-blue-950/10 via-transparent to-purple-950/10'
          : 'from-blue-50/20 via-transparent to-purple-50/20'
      }`} />
    </div>
  );
};

export default AnimatedBackground;