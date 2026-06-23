'use client';

import { useEffect, useRef } from 'react';

// ── Gradient noise ─────────────────────────────────────────────────────────────
function gNoise(x: number, y: number, t: number): number {
  const v =
    Math.sin(x * 1.2 + t * 0.7) * Math.cos(y * 0.8 + t * 0.5) +
    Math.sin(x * 0.5 - y * 0.7 + t * 1.1) * 0.6 +
    Math.cos(x * 0.9 + y * 1.3 - t * 0.4) * 0.4;
  return (v / 2 + 1) / 2;
}

// ── Marching Squares ──────────────────────────────────────────────────────────
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
        (v00 > thresh ? 8 : 0) | (v01 > thresh ? 4 : 0) |
        (v11 > thresh ? 2 : 0) | (v10 > thresh ? 1 : 0);
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

// ── Constants ──────────────────────────────────────────────────────────────────
const COLS = 70;
const ROWS = 40;
const THRESHOLDS  = [0.25, 0.35, 0.45, 0.55, 0.65, 0.75] as const;
const LINE_COLORS = ['#00d9b8', '#00aadd', '#0066ff', '#5533ff', '#7b2fff', '#00ff88'] as const;

const LENS_RADIUS = 160;   // pixels
const LENS_STRENGTH = 2.4; // exponent >1 = magnify, <1 = pinch

// ── Building schematics ────────────────────────────────────────────────────────
type BuildingDef = {
  px: number; py: number; // top-left as fraction of W, H
  pw: number; ph: number; // size as fraction of W, H
  divs: Array<{ a: 'h' | 'v'; t: number }>;
  door: { side: 'top' | 'right' | 'bottom' | 'left'; t: number };
};

// Positions chosen to avoid the Hero text block (top-left region)
const BUILDINGS: BuildingDef[] = [
  {
    px: 0.73, py: 0.06, pw: 0.10, ph: 0.13,
    divs: [{ a: 'h', t: 0.55 }, { a: 'v', t: 0.48 }],
    door: { side: 'left', t: 0.28 },
  },
  {
    px: 0.05, py: 0.30, pw: 0.07, ph: 0.10,
    divs: [{ a: 'v', t: 0.50 }],
    door: { side: 'right', t: 0.50 },
  },
  {
    px: 0.59, py: 0.63, pw: 0.09, ph: 0.12,
    divs: [{ a: 'h', t: 0.42 }, { a: 'v', t: 0.60 }],
    door: { side: 'top', t: 0.72 },
  },
  {
    px: 0.84, py: 0.50, pw: 0.06, ph: 0.08,
    divs: [{ a: 'h', t: 0.50 }],
    door: { side: 'left', t: 0.30 },
  },
  {
    px: 0.13, py: 0.70, pw: 0.09, ph: 0.07,
    divs: [{ a: 'v', t: 0.38 }, { a: 'v', t: 0.68 }],
    door: { side: 'top', t: 0.52 },
  },
  {
    px: 0.44, py: 0.16, pw: 0.05, ph: 0.08,
    divs: [],
    door: { side: 'bottom', t: 0.40 },
  },
];

function drawBuildings(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.save();
  ctx.strokeStyle = 'rgba(0,217,184,0.28)';
  ctx.lineWidth = 0.7;
  ctx.shadowColor = 'rgba(0,217,184,0.5)';
  ctx.shadowBlur = 2;

  for (const b of BUILDINGS) {
    const bx = b.px * w;
    const by = b.py * h;
    const bw = b.pw * w;
    const bh = b.ph * h;
    const dr = Math.min(bw, bh) * 0.20;

    // Outer shell
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.rect(bx, by, bw, bh);
    ctx.stroke();

    // Interior wall divisions
    for (const div of b.divs) {
      ctx.beginPath();
      if (div.a === 'h') {
        const dy = by + div.t * bh;
        ctx.moveTo(bx, dy);
        ctx.lineTo(bx + bw, dy);
      } else {
        const dx = bx + div.t * bw;
        ctx.moveTo(dx, by);
        ctx.lineTo(dx, by + bh);
      }
      ctx.stroke();
    }

    // Door symbol: panel line + dashed quarter-arc swing
    const { side, t } = b.door;
    let hx: number, hy: number;   // hinge point
    let fex: number, fey: number; // door panel free end (closed)
    let sa: number, ea: number;
    let acw = false;

    switch (side) {
      case 'bottom':
        hx = bx + t * bw; hy = by + bh;
        fex = hx; fey = hy - dr;
        sa = -Math.PI / 2; ea = 0;
        break;
      case 'top':
        hx = bx + t * bw; hy = by;
        fex = hx; fey = hy + dr;
        sa = 0; ea = Math.PI / 2;
        break;
      case 'left':
        hx = bx; hy = by + t * bh;
        fex = hx + dr; fey = hy;
        sa = 0; ea = Math.PI / 2;
        break;
      case 'right':
      default:
        hx = bx + bw; hy = by + t * bh;
        fex = hx - dr; fey = hy;
        sa = Math.PI; ea = Math.PI / 2; acw = true;
        break;
    }

    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(hx, hy);
    ctx.lineTo(fex, fey);
    ctx.stroke();

    ctx.setLineDash([2, 2]);
    ctx.beginPath();
    ctx.arc(hx, hy, dr, sa, ea, acw);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  ctx.restore();
}

// ── Edge rulers ───────────────────────────────────────────────────────────────
const RULER_SZ = 22; // width of left ruler / height of bottom ruler in px
const MAJOR_PX = 80; // px between major ticks
const MINOR_PX = 20; // px between minor ticks

function drawRulers(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.save();
  const C = (a: number) => `rgba(0,217,184,${a})`;
  ctx.lineWidth = 0.5;
  ctx.font = '7px monospace';

  // ── Left ruler ──
  ctx.strokeStyle = C(0.25);
  ctx.beginPath();
  ctx.moveTo(RULER_SZ, 0);
  ctx.lineTo(RULER_SZ, h - RULER_SZ);
  ctx.stroke();

  for (let y = 0; y <= h - RULER_SZ; y += MINOR_PX) {
    const isMaj = y % MAJOR_PX === 0;
    ctx.strokeStyle = C(isMaj ? 0.36 : 0.16);
    ctx.beginPath();
    ctx.moveTo(RULER_SZ, y);
    ctx.lineTo(RULER_SZ - (isMaj ? 9 : 4), y);
    ctx.stroke();
    if (isMaj && y > 0) {
      ctx.fillStyle = C(0.40);
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(Math.round(y / MAJOR_PX) * 10), RULER_SZ - 11, y);
    }
  }

  // ── Bottom ruler ──
  ctx.strokeStyle = C(0.25);
  ctx.beginPath();
  ctx.moveTo(RULER_SZ, h - RULER_SZ);
  ctx.lineTo(w, h - RULER_SZ);
  ctx.stroke();

  for (let x = RULER_SZ; x <= w; x += MINOR_PX) {
    const off = x - RULER_SZ;
    const isMaj = off % MAJOR_PX === 0;
    ctx.strokeStyle = C(isMaj ? 0.36 : 0.16);
    ctx.beginPath();
    ctx.moveTo(x, h - RULER_SZ);
    ctx.lineTo(x, h - RULER_SZ + (isMaj ? 9 : 4));
    ctx.stroke();
    if (isMaj && off > 0) {
      ctx.fillStyle = C(0.40);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(String(Math.round(off / MAJOR_PX) * 10), x, h - RULER_SZ + 11);
    }
  }

  // ── Corner crosshair (intersection of left + bottom rulers) ──
  const cx = RULER_SZ / 2;
  const cy = h - RULER_SZ / 2;
  ctx.strokeStyle = C(0.32);
  ctx.beginPath();
  ctx.moveTo(cx - 4, cy); ctx.lineTo(cx + 4, cy);
  ctx.moveTo(cx, cy - 4); ctx.lineTo(cx, cy + 4);
  ctx.stroke();

  ctx.restore();
}

// ── Lens ring overlay ─────────────────────────────────────────────────────────
function drawLensRing(ctx: CanvasRenderingContext2D, mx: number, my: number) {
  const r = LENS_RADIUS;
  const C = 'rgba(0,217,184,';
  ctx.save();

  // Dashed perimeter
  ctx.strokeStyle = C + '0.40)';
  ctx.lineWidth = 0.7;
  ctx.setLineDash([3, 6]);
  ctx.shadowColor = '#00d9b8';
  ctx.shadowBlur = 4;
  ctx.beginPath();
  ctx.arc(mx, my, r, 0, Math.PI * 2);
  ctx.stroke();

  // N/S/E/W notch ticks
  ctx.setLineDash([]);
  ctx.lineWidth = 0.8;
  const N = 7;
  ctx.beginPath();
  ctx.moveTo(mx - r - N, my); ctx.lineTo(mx - r + N, my);
  ctx.moveTo(mx + r - N, my); ctx.lineTo(mx + r + N, my);
  ctx.moveTo(mx, my - r - N); ctx.lineTo(mx, my - r + N);
  ctx.moveTo(mx, my + r - N); ctx.lineTo(mx, my + r + N);
  ctx.stroke();

  // Center dot
  ctx.shadowBlur = 8;
  ctx.fillStyle = C + '0.80)';
  ctx.beginPath();
  ctx.arc(mx, my, 2.5, 0, Math.PI * 2);
  ctx.fill();

  // Coordinate readout (top-right of ring)
  ctx.shadowBlur = 0;
  ctx.font = '8px monospace';
  ctx.fillStyle = C + '0.50)';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  const xStr = Math.round(mx).toString().padStart(4, ' ');
  const yStr = Math.round(my).toString().padStart(4, ' ');
  ctx.fillText(`X:${xStr}  Y:${yStr}`, mx + r + 8, my - 6);

  ctx.restore();
}

// ── Survey canvas ──────────────────────────────────────────────────────────────
function SurveyCanvas({ fishEye, lensRing }: { fishEye: boolean; lensRing: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const FRAME_MS = isMobile ? 66 : 34;
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

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseLeave = () => { mouseRef.current = null; };
    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    const frame = (ts: number) => {
      raf = requestAnimationFrame(frame);
      if (ts - prev < FRAME_MS) return;
      prev = ts;

      const { width: ww, height: hh } = canvas;
      const cw = ww / (COLS - 1);
      const ch = hh / (ROWS - 1);

      const mouse = mouseRef.current;

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          let sx = (c / (COLS - 1)) * ww;
          let sy = (r / (ROWS - 1)) * hh;

          if (fishEye && mouse) {
            const dx = sx - mouse.x;
            const dy = sy - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < LENS_RADIUS && dist > 1e-6) {
              const tf = dist / LENS_RADIUS;
              const warpedDist = Math.pow(tf, LENS_STRENGTH) * LENS_RADIUS;
              const scale = warpedDist / dist;
              sx = mouse.x + dx * scale;
              sy = mouse.y + dy * scale;
            }
          }

          const nx = (sx / ww) * 5.5;
          const ny = (sy / hh) * 3.5;
          grid[r * COLS + c] = gNoise(nx, ny, t);
        }
      }

      ctx.clearRect(0, 0, ww, hh);

      // Neon topographic contours
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

      if (fishEye && lensRing && mouse) drawLensRing(ctx, mouse.x, mouse.y);

      drawBuildings(ctx, ww, hh);
      drawRulers(ctx, ww, hh);

      if (!reduced) t += 0.0025;
    };

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
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

export function TechnoBackground({ fishEye = true, lensRing = true }: { fishEye?: boolean; lensRing?: boolean }) {
  return <SurveyCanvas fishEye={fishEye} lensRing={lensRing} />;
}
