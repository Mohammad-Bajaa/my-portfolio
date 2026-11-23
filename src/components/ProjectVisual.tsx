import { useEffect, useRef, useState } from 'react';

/** Conceptual illustrations, not screenshots or representations of internal systems. */
export function ProjectVisual({ variant }: { variant: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: '40px' });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={`project-visual visual-${variant}`} data-in-view={inView} aria-hidden="true">
    <svg viewBox="0 0 480 180" fill="none" focusable="false">
      <path className="visual-grid" d="M0 45H480M0 90H480M0 135H480M60 0V180M120 0V180M180 0V180M240 0V180M300 0V180M360 0V180M420 0V180" />
      {variant === 'archive' && <>
        <path className="visual-line" d="M110 54H172Q192 54 192 74V106Q192 126 212 126H278M110 126H170Q192 126 192 106V74Q192 54 212 54H278" />
        <path className="visual-travel" d="M110 54H172Q192 54 192 74V106Q192 126 212 126H278" />
        <path className="visual-travel travel-delayed" d="M110 126H170Q192 126 192 106V74Q192 54 212 54H278" />
        {[30, 102].map((y, i) => <g key={y} className={`svg-float float-${i}`}><rect x="65" y={y} width="46" height="51" rx="7" className="visual-panel" /><path d={`M77 ${y + 17}h22M77 ${y + 26}h22M77 ${y + 35}h14`} className="visual-detail" /></g>)}
        <g className="svg-float float-1"><rect x="278" y="32" width="125" height="116" rx="12" className="visual-panel" /><path d="M298 52h32l9 10h44v60h-85z" className="visual-accent-fill" /><path d="M315 88h51M315 101h32" className="visual-detail" /><rect x="314" y="138" width="53" height="4" rx="2" className="visual-accent" /></g>
        <circle cx="192" cy="90" r="6" className="visual-accent" />
        <circle cx="192" cy="90" r="14" className="visual-ripple" />
      </>}
      {variant === 'risk' && <>
        <path d="M62 34V144H284M62 108H284M62 72H284" className="visual-line" />
        <path d="M63 126L105 115L144 120L187 81L230 91L277 44V144H63Z" className="visual-chart-fill" />
        <path d="M63 126L105 115L144 120L187 81L230 91L277 44" className="visual-chart-line" />
        {[ [105,115], [187,81], [277,44] ].map(([cx,cy]) => <circle key={cx} cx={cx} cy={cy} r="5" className="visual-accent svg-node" />)}
        <g className="svg-float"><circle cx="364" cy="90" r="47" className="visual-panel" /><circle cx="364" cy="90" r="34" className="visual-clock-ring" /><path d="M364 65V90L381 101M351 31H377M364 31V43" className="visual-detail" /><circle cx="364" cy="90" r="4" className="visual-accent" /><circle cx="364" cy="56" r="4" className="clock-hand visual-accent" /></g>
      </>}
      {variant === 'incident' && <>
        <g className="svg-float float-1"><rect x="128" y="29" width="142" height="128" rx="11" className="visual-panel" /><rect x="144" y="20" width="142" height="128" rx="11" className="visual-panel" /><path d="M165 44H233M165 58H259M165 72H221" className="visual-detail" /><rect x="165" y="89" width="47" height="37" rx="4" className="visual-accent-fill" /><path d="M168 119l13-14 10 8 9-12 10 18M228 96h30M228 109h30M228 122h18" className="visual-detail" /><circle cx="199" cy="100" r="3" className="visual-accent" /></g>
        <path d="M286 83H337" className="visual-line" /><path d="M286 83H337" className="visual-travel" />
        <g className="svg-float"><circle cx="356" cy="83" r="27" className="visual-accent-fill" /><path d="M343 83l9 9 17-19" className="visual-check" /></g>
        <circle cx="356" cy="83" r="35" className="visual-ripple" />
        <circle cx="87" cy="70" r="4" className="visual-accent svg-node" /><path d="M79 122H95M87 114V130M319 143H329M324 138V148" className="visual-detail" />
      </>}
      {variant === 'frontend' && <>
        <rect x="80" y="25" width="320" height="132" rx="11" className="visual-panel" />
        <path d="M80 50H400" className="visual-line" /><circle cx="96" cy="38" r="3" className="visual-accent" /><circle cx="107" cy="38" r="3" className="visual-muted-fill" /><circle cx="118" cy="38" r="3" className="visual-muted-fill" />
        <rect x="98" y="67" width="70" height="72" rx="5" className="visual-accent-fill module-fixed" /><path d="M112 84h42M112 96h30M112 124h23" className="visual-detail" />
        {[0,1,2].map(i => <g key={i} className={`svg-module module-${i}`}><rect x={184+i*66} y="67" width="53" height="45" rx="5" className="visual-accent-fill" /><path d={`M${195+i*66} 83h29M${195+i*66} 94h18`} className="visual-detail" /><rect x={184+i*66} y="123" width="53" height="16" rx="4" className="visual-muted-fill" /></g>)}
      </>}
      {variant === 'sender' && <>
        <g className="svg-float"><rect x="65" y="53" width="112" height="76" rx="8" className="visual-panel" /><path d="m67 58 54 39 54-39M68 123l35-29M174 123l-35-29" className="visual-detail" /></g>
        <path d="M190 91H303" className="visual-line" /><path d="M190 91H303" className="visual-travel" />
        <g className="svg-float float-1"><rect x="316" y="36" width="92" height="112" rx="10" className="visual-panel" /><path d="M334 60h55M334 78h55M334 96h32" className="visual-detail" /><circle cx="362" cy="126" r="5" className="visual-accent svg-node" /></g>
      </>}
      {variant === 'letters' && <>
        <g className="svg-float"><rect x="122" y="36" width="119" height="121" rx="9" className="visual-panel" /><rect x="140" y="23" width="119" height="121" rx="9" className="visual-panel" /><path d="M162 50h74M162 65h74M162 80h45M162 117h30" className="visual-detail" /></g>
        <g className="svg-float float-1"><rect x="244" y="83" width="105" height="67" rx="7" className="visual-accent-fill" /><path d="m246 87 51 34 50-34" className="visual-detail" /></g>
        <circle cx="358" cy="44" r="5" className="visual-accent svg-node" />
      </>}
      <path className="visual-scan" d="M-20 0V180" />
    </svg>
  </div>;
}
