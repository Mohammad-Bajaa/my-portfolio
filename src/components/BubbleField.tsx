import { useRef, type CSSProperties } from 'react';
import { useBubblePhysics } from './useBubblePhysics';
import { SkillLogo } from './SkillLogo';

export function BubbleField({ items, label, familiar = false }: { items: string[]; label: string; familiar?: boolean }) {
  const field = useRef<HTMLUListElement>(null);
  useBubblePhysics(field, items.length);

  return <ul ref={field} className={`bubble-field ${familiar ? 'bubble-field--familiar' : ''}`} data-long={items.some(item => item.length > 18)} aria-label={label}>
    {items.map(item => <li className="bubble-slot" key={item} style={{
      '--bubble-size': `${item.length > 18 ? 148 : item.length > 10 ? 128 : 108}px`,
    } as CSSProperties}><span className="skill-bubble"><SkillLogo name={item} /><span className="bubble-label">{item}</span></span></li>)}
  </ul>;
}
