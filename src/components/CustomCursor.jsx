'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const containerRef = useRef(null);
  const NUM_DOTS = 20;
  const trailDotsArray = Array.from({ length: NUM_DOTS });

  useEffect(() => {
    // Disable custom cursor on touch devices to avoid broken UX
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const container = containerRef.current;
    if (!container) return;

    const mainCursor = container.querySelector('.main-cursor');
    const trailDots = container.querySelectorAll('.trail-dot');
    if (!mainCursor) return;

    // ─── Mutable position & scale state ──────────────────────────────────
    let mouseX = -100;
    let mouseY = -100;
    let hasEntered = false;

    // Track coordinates for each dot (dots[0] = main cursor, dots[1..6] = trail)
    const dots = Array.from({ length: NUM_DOTS + 1 }, () => ({ x: -100, y: -100 }));

    // Scale tracking for hover effects
    let hoverScale = 1.0;
    let targetScale = 1.0;

    // ─── Lerp factors: lower = more ease/lag ─────────────────────────────
    const MAIN_EASE = 0.25; // Quick snap for main cursor
    const TRAIL_EASE = 0.20; // Smooth delay for trail dots
    const SCALE_EASE = 0.15; // Smooth scale animation

    let rafId;

    // ─── Passive mousemove: only updates variables, zero layout thrashing
    function onMouseMove(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!hasEntered) {
        hasEntered = true;
        // Snap all dots to mouse position initially to avoid trailing from (-100, -100)
        dots.forEach((dot) => {
          dot.x = mouseX;
          dot.y = mouseY;
        });
        container.style.opacity = '1';
      }
    }

    // ─── RAF tick: ONLY uses transform (compositor thread, extremely fast) 
    function tick() {
      if (!hasEntered) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      // 1. Interpolate scale
      hoverScale += (targetScale - hoverScale) * SCALE_EASE;

      // 2. Update main cursor (dots[0])
      dots[0].x += (mouseX - dots[0].x) * MAIN_EASE;
      dots[0].y += (mouseY - dots[0].y) * MAIN_EASE;
      mainCursor.style.transform = `translate(${dots[0].x}px, ${dots[0].y}px) translate(-50%, -50%) scale(${hoverScale})`;

      // 3. Update trailing dots (dots[1..NUM_DOTS])
      for (let i = 1; i <= NUM_DOTS; i++) {
        // Each dot follows the one in front of it (elastic physics effect)
        dots[i].x += (dots[i - 1].x - dots[i].x) * TRAIL_EASE;
        dots[i].y += (dots[i - 1].y - dots[i].y) * TRAIL_EASE;

        const trailDotEl = trailDots[i - 1];
        if (trailDotEl) {
          trailDotEl.style.transform = `translate(${dots[i].x}px, ${dots[i].y}px) translate(-50%, -50%)`;
        }
      }

      rafId = requestAnimationFrame(tick);
    }

    // ─── Interactive hover handling via event delegation ──────────────────
    const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label, [data-cursor-hover]';

    function onMouseOver(e) {
      if (e.target.closest(INTERACTIVE)) {
        targetScale = 1.4; // Scale up main cursor

        mainCursor.style.backgroundColor = 'rgba(244, 174, 82, 0.15)';
        mainCursor.style.border = '1px solid #F4AE52';
        mainCursor.style.boxShadow = '0 0 15px rgba(244, 174, 82, 0.8)';

        // Increase trail dots glow on hover
        trailDots.forEach((dot) => {
          dot.style.boxShadow = '0 0 8px rgba(244, 174, 82, 0.7)';
        });
      }
    }

    function onMouseOut(e) {
      if (e.target.closest(INTERACTIVE)) {
        targetScale = 2.0; // Reset main cursor scale

        mainCursor.style.backgroundColor = '#F4AE52';
        mainCursor.style.border = '0px solid transparent';
        mainCursor.style.boxShadow = '0 0 10px rgba(244, 174, 82, 0.6)';

        // Restore default trail dots glow
        trailDots.forEach((dot) => {
          dot.style.boxShadow = '0 0 4px rgba(244, 174, 82, 0.4)';
        });
      }
    }

    // ─── Event listeners ──────────────────────────────────────────────────
    rafId = requestAnimationFrame(tick);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });

    // ─── Cleanup ──────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 99999,
        opacity: 0, // Hidden until first mouse movement
        transition: 'opacity 0.3s ease',
      }}
    >
      {/* ── Trail Dots (smaller and fading) ── */}
      {trailDotsArray.map((_, index) => {
        // Calculate size and opacity ratio (smaller/fainter towards the tail end)
        const ratio = (NUM_DOTS - index) / NUM_DOTS;
        const size = Math.max(2, 6 * ratio); // sizing from 6px down to 2px
        const opacity = 0.8 * ratio; // opacity from 0.8 down to 0.13

        return (
          <div
            key={index}
            className="trail-dot"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: '50%',
              backgroundColor: '#af6708ff',
              opacity: opacity,
              boxShadow: '0 0 4px #af6708ff',
              willChange: 'transform',
              pointerEvents: 'none',
            }}
          />
        );
      })}

      {/* ── Main Cursor ── */}
      <div
        className="main-cursor"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          backgroundColor: '#af6708ff',
          boxShadow: '0 0 10px #af6708ff',
          willChange: 'transform',
          pointerEvents: 'none',
          // Note: position (transform) is updated instantly. Only visual styling properties are transitioned.
          transition: 'background-color 0.25s ease, border-color 0.25s ease, border-width 0.25s ease, box-shadow 0.25s ease',
        }}
      />
    </div>
  );
}
