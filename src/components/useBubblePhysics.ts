import { useEffect, type RefObject } from 'react';

type Body = { element: HTMLElement; x: number; y: number; size: number; vx: number; vy: number; squash: number };

export function useBubblePhysics(ref: RefObject<HTMLUListElement | null>, count: number) {
  useEffect(() => {
    const field = ref.current;
    if (!field) return;
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    let bodies: Body[] = [];
    let width = 0, height = 0, measuredWidth = -1, frame = 0, resizeFrame = 0, previous = 0;
    let visible = false, disposed = false;
    const pointer = { x: 0, y: 0, active: false };
    const slots = [...field.querySelectorAll<HTMLElement>('.bubble-slot')];
    const reset = () => {
      delete field.dataset.physics;
      field.style.removeProperty('height');
      slots.forEach(slot => { slot.style.removeProperty('width'); slot.style.removeProperty('height'); slot.style.removeProperty('transform'); slot.style.removeProperty('--squash'); });
    };
    const clamp = (body: Body) => {
      const maxX = Math.max(8, width - body.size - 8), maxY = Math.max(8, height - body.size - 8);
      if (body.x < 8) { body.x = 8; body.vx = Math.abs(body.vx); body.squash = .025; }
      if (body.x > maxX) { body.x = maxX; body.vx = -Math.abs(body.vx); body.squash = .025; }
      if (body.y < 8) { body.y = 8; body.vy = Math.abs(body.vy); body.squash = .025; }
      if (body.y > maxY) { body.y = maxY; body.vy = -Math.abs(body.vy); body.squash = .025; }
    };
    const draw = () => bodies.forEach(body => {
      body.element.style.transform = `translate3d(${body.x}px,${body.y}px,0)`;
      body.element.style.setProperty('--squash', String(body.squash));
    });
    const tick = (now: number) => {
      frame = 0;
      if (disposed || media.matches || !visible || document.hidden) { previous = 0; return; }
      const dt = previous ? Math.min((now - previous) / 1000, .035) : .016;
      previous = now;
      bodies.forEach((body, index) => {
        body.vx += Math.sin(now / 5000 + index * 2) * dt * .7;
        body.vy += Math.cos(now / 6000 + index) * dt * .7;
        if (pointer.active) {
          const dx = body.x + body.size / 2 - pointer.x, dy = body.y + body.size / 2 - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance > 1 && distance < body.size / 2 + 70) {
            const force = (1 - distance / (body.size / 2 + 70)) * 40 * dt;
            body.vx += dx / distance * force; body.vy += dy / distance * force;
          }
        }
        const speed = Math.hypot(body.vx, body.vy) || 1;
        const limit = Math.min(24, Math.max(7, speed));
        body.vx *= limit / speed; body.vy *= limit / speed;
        body.x += body.vx * dt; body.y += body.vy * dt;
        body.squash *= Math.exp(-dt * 5);
      });
      // Small positional corrections and elastic impulses keep bubbles separate.
      for (let pass = 0; pass < 3; pass++) {
        for (let i = 0; i < bodies.length; i++) for (let j = i + 1; j < bodies.length; j++) {
          const a = bodies[i], b = bodies[j];
          const dx = b.x + b.size / 2 - a.x - a.size / 2, dy = b.y + b.size / 2 - a.y - a.size / 2;
          const distance = Math.hypot(dx, dy) || .001, minimum = (a.size + b.size) / 2 + 7;
          if (distance >= minimum) continue;
          const nx = dx / distance, ny = dy / distance, correction = (minimum - distance) / 2;
          a.x -= nx * correction; a.y -= ny * correction; b.x += nx * correction; b.y += ny * correction;
          const approach = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
          if (approach < 0) {
            const impulse = approach * .94;
            a.vx += impulse * nx; a.vy += impulse * ny; b.vx -= impulse * nx; b.vy -= impulse * ny;
            a.squash = b.squash = .025;
          }
        }
        bodies.forEach(clamp);
      }
      draw();
      frame = requestAnimationFrame(tick);
    };
    const resume = () => { if (!frame && !media.matches && visible && !document.hidden) frame = requestAnimationFrame(tick); };
    const measure = () => {
      cancelAnimationFrame(frame); frame = 0; previous = 0;
      reset();
      if (media.matches) return;
      const bounds = field.getBoundingClientRect();
      width = bounds.width; height = bounds.height; measuredWidth = width;
      if (!width || !height) return;
      bodies = slots.map((element, index) => {
        const rect = element.querySelector('.skill-bubble')!.getBoundingClientRect();
        const angle = (index * 137.5 + 43) * Math.PI / 180, speed = 10 + index % 3 * 2;
        return { element, x: rect.left - bounds.left, y: rect.top - bounds.top, size: rect.width, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, squash: 0 };
      });
      field.style.height = `${height}px`;
      field.dataset.physics = 'active';
      bodies.forEach(body => { body.element.style.width = `${body.size}px`; body.element.style.height = `${body.size}px`; clamp(body); });
      draw(); resume();
    };
    const resize = new ResizeObserver(entries => {
      if (Math.abs(entries[0].contentRect.width - measuredWidth) < 1) return;
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(measure);
    });
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) resume(); else { cancelAnimationFrame(frame); frame = 0; previous = 0; }
    });
    const move = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      const bounds = field.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left; pointer.y = event.clientY - bounds.top; pointer.active = true;
    };
    const leave = () => { pointer.active = false; };
    const visibility = () => { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; previous = 0; } else resume(); };
    // Defer layout until the browser has finished updating every media-query listener.
    const motionChange = () => {
      cancelAnimationFrame(frame); frame = 0; previous = 0;
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(measure);
    };
    measure(); resize.observe(field); observer.observe(field);
    media.addEventListener('change', motionChange);
    document.addEventListener('visibilitychange', visibility);
    field.addEventListener('pointermove', move, { passive: true });
    field.addEventListener('pointerleave', leave);
    return () => {
      disposed = true; cancelAnimationFrame(frame); cancelAnimationFrame(resizeFrame);
      resize.disconnect(); observer.disconnect(); media.removeEventListener('change', motionChange);
      document.removeEventListener('visibilitychange', visibility);
      field.removeEventListener('pointermove', move); field.removeEventListener('pointerleave', leave); reset();
    };
  }, [ref, count]);
}
