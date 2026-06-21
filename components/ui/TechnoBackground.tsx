'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';

// ── Trigonometric gradient noise (no external deps) ──────────────────────────
// Four overlapping sine/cosine waves at different frequencies produce
// the organic, slowly-evolving field that drives the topographic contours.
function gNoise(x: number, y: number, t: number): number {
  const v =
    Math.sin(x * 1.2 + t * 0.7) * Math.cos(y * 0.8 + t * 0.5) +
    Math.sin(x * 0.5 - y * 0.7 + t * 1.1) * 0.6 +
    Math.cos(x * 0.9 + y * 1.3 - t * 0.4) * 0.4;
  return (v / 2 + 1) / 2; // normalize to [0, 1]
}

// ── Marching Squares ─────────────────────────────────────────────────────────
// Returns iso-line segments for a single threshold over a regular grid.
// Bit encoding: v00(top-left)=8, v01(top-right)=4, v11(btm-right)=2, v10(btm-left)=1
type Seg = readonly [number, number, number, number];

function marchSquares(
  grid: Float32Array,
  rows: number,
  cols: number,
  thresh: number,
  cw: number,
  ch: number,
): Seg[] {
  const out: Seg[] = [];

  const lerp = (pa: number, pb: number, va: number, vb: number) =>
    Math.abs(vb - va) < 1e-6 ? (pa + pb) / 2 : pa + ((thresh - va) * (pb - pa)) / (vb - va);

  for (let r = 0; r < rows - 1; r++) {
    for (let c = 0; c < cols - 1; c++) {
      const v00 = grid[r * cols + c];
      const v01 = grid[r * cols + c + 1];
      const v11 = grid[(r + 1) * cols + c + 1];
      const v10 = grid[(r + 1) * cols + c];

      const b =
        (v00 > thresh ? 8 : 0) |
        (v01 > thresh ? 4 : 0) |
        (v11 > thresh ? 2 : 0) |
        (v10 > thresh ? 1 : 0);
      if (b === 0 || b === 15) continue;

      const x0 = c * cw, y0 = r * ch, x1 = x0 + cw, y1 = y0 + ch;
      const top:    [number, number] = [lerp(x0, x1, v00, v01), y0];
      const right:  [number, number] = [x1,  lerp(y0, y1, v01, v11)];
      const bottom: [number, number] = [lerp(x0, x1, v10, v11), y1];
      const left:   [number, number] = [x0,  lerp(y0, y1, v00, v10)];

      switch (b) {
        case 1:  case 14: out.push([...left,   ...bottom]); break;
        case 2:  case 13: out.push([...right,  ...bottom]); break;
        case 3:  case 12: out.push([...left,   ...right]);  break;
        case 4:  case 11: out.push([...top,    ...right]);  break;
        case 5:
          out.push([...top,  ...right]);
          out.push([...left, ...bottom]);
          break;
        case 6:  case 9:  out.push([...top,    ...bottom]); break;
        case 7:  case 8:  out.push([...top,    ...left]);   break;
        case 10:
          out.push([...top,   ...left]);
          out.push([...right, ...bottom]);
          break;
      }
    }
  }
  return out;
}

// ── Topographic canvas ────────────────────────────────────────────────────────
const COLS = 70;
const ROWS = 40;
const THRESHOLDS = [0.25, 0.35, 0.45, 0.55, 0.65, 0.75] as const;
const LINE_COLORS = ['#00d9b8', '#00aadd', '#0066ff', '#5533ff', '#7b2fff', '#00ff88'] as const;

function TopoCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const FRAME_MS = isMobile ? 66 : 34; // ~15fps mobile, ~30fps desktop
    const grid = new Float32Array(ROWS * COLS);
    let t = 0;
    let raf = 0;
    let prev = 0;

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    onResize();
    window.addEventListener('resize', onResize);

    const frame = (ts: number) => {
      raf = requestAnimationFrame(frame);
      if (ts - prev < FRAME_MS) return;
      prev = ts;

      const { width: w, height: h } = canvas;
      const cw = w / (COLS - 1);
      const ch = h / (ROWS - 1);

      for (let r = 0; r < ROWS; r++)
        for (let c = 0; c < COLS; c++)
          grid[r * COLS + c] = gNoise(
            (c / (COLS - 1)) * 5.5,
            (r / (ROWS - 1)) * 3.5,
            t,
          );

      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < THRESHOLDS.length; i++) {
        const segs = marchSquares(grid, ROWS, COLS, THRESHOLDS[i], cw, ch);
        if (!segs.length) continue;

        ctx.save();
        ctx.strokeStyle = LINE_COLORS[i];
        ctx.lineWidth = 0.9;
        ctx.globalAlpha = 0.42;
        ctx.shadowColor = LINE_COLORS[i];
        ctx.shadowBlur = 4;
        ctx.beginPath();
        for (const [x1, y1, x2, y2] of segs) {
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
        }
        ctx.stroke();
        ctx.restore();
      }

      if (!reduced) t += 0.0025;
    };

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: -2 }}
    />
  );
}

// ── Perspective grid ──────────────────────────────────────────────────────────
function PerspectiveGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-0 left-0 right-0"
      style={{
        height: '55vh',
        backgroundImage: [
          'linear-gradient(rgba(0,217,184,0.07) 1px, transparent 1px)',
          'linear-gradient(90deg, rgba(0,217,184,0.07) 1px, transparent 1px)',
        ].join(','),
        backgroundSize: '7% 12%',
        transform: 'perspective(700px) rotateX(58deg)',
        transformOrigin: '50% 100%',
        maskImage:
          'linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.2) 35%, transparent 75%)',
        WebkitMaskImage:
          'linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.2) 35%, transparent 75%)',
        zIndex: -2,
      }}
    />
  );
}

// ── Holographic floating panels ───────────────────────────────────────────────
const PANELS: {
  style: CSSProperties;
  rotation: string;
  delay: string;
  lines: readonly string[];
}[] = [
  {
    style: { top: '14%', right: '2.5%' },
    rotation: '-7deg',
    delay: '0s',
    lines: ['SYS.REF ▸ 0x4A3F', 'DELTA:   +0.003ms', 'NODE:    07 / 12', '──────────────────', '▸ STATUS: [ACTIVE]'],
  },
  {
    style: { top: '44%', left: '1.5%' },
    rotation: '5deg',
    delay: '-3.2s',
    lines: ['LAT:  −27.4698°', 'LON:  153.0251°', '──────────────────', 'SIG:  ████░░ 72%', 'PING: 0.14ms'],
  },
  {
    style: { bottom: '22%', right: '3%' },
    rotation: '-4deg',
    delay: '-6.5s',
    lines: ['PROC:  0.12ms', 'MEM:   38/256mb', '──────────────────', 'UPTIME: 47d 03h', '▸ SYNC: [OK]'],
  },
];

type Corner = 'tl' | 'tr' | 'bl' | 'br';
const CORNERS: Corner[] = ['tl', 'tr', 'bl', 'br'];

function cornerStyle(c: Corner): CSSProperties {
  return {
    position: 'absolute',
    width: 7,
    height: 7,
    ...(c[0] === 't' ? { top: 4 } : { bottom: 4 }),
    ...(c[1] === 'l' ? { left: 4 } : { right: 4 }),
    borderTop:    c[0] === 't' ? '1px solid rgba(0,217,184,0.38)' : 'none',
    borderBottom: c[0] === 'b' ? '1px solid rgba(0,217,184,0.38)' : 'none',
    borderLeft:   c[1] === 'l' ? '1px solid rgba(0,217,184,0.38)' : 'none',
    borderRight:  c[1] === 'r' ? '1px solid rgba(0,217,184,0.38)' : 'none',
  };
}

function HoloPanels() {
  return (
    <>
      {PANELS.map((p, i) => (
        <div
          key={i}
          aria-hidden="true"
          className="pointer-events-none fixed hidden md:block"
          style={{ ...p.style, width: 158, transform: `rotate(${p.rotation})`, zIndex: -1 }}
        >
          <div
            className="techo-holo-panel"
            style={{ animation: 'holo-float 9s ease-in-out infinite', animationDelay: p.delay }}
          >
            <div
              style={{
                background: 'rgba(0,8,8,0.55)',
                border: '1px solid rgba(0,217,184,0.15)',
                boxShadow: '0 0 16px rgba(0,217,184,0.06), inset 0 0 28px rgba(0,217,184,0.02)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                padding: '12px 14px',
                fontFamily: 'var(--font-jetbrains-mono)',
                fontSize: '9px',
                letterSpacing: '0.06em',
                color: 'rgba(0,217,184,0.46)',
                lineHeight: '1.9',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* scanlines */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.1) 3px,rgba(0,0,0,0.1) 4px)',
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
              />
              {/* corner brackets */}
              {CORNERS.map(c => <div key={c} style={cornerStyle(c)} />)}
              {/* text content */}
              <div style={{ position: 'relative', zIndex: 2 }}>
                {p.lines.map((line, j) => <div key={j}>{line}</div>)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export function TechnoBackground() {
  return (
    <>
      <TopoCanvas />
      <PerspectiveGrid />
      <HoloPanels />
    </>
  );
}
