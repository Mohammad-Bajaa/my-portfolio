import { StrictMode, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { portfolio as data, type PortfolioLink } from './data/portfolio';
import { ProjectVisual } from './components/ProjectVisual';
import { usePageMotion } from './components/usePageMotion';
import { WorkplaceProjects } from './components/WorkplaceProjects';
import { BubbleField } from './components/BubbleField';
import { Learning, Education } from './components/Learning';
import './styles.css';
import './enhancements.css';
import './motion.css';
import './dark-theme.css';
import './bubbles.css';
import './learning.css';

function Link({ link, className = '', iconOnly = false }: { link: PortfolioLink; className?: string; iconOnly?: boolean }) {
  const external = /^https?:\/\//.test(link.href);
  const href = link.kind === 'cv' && !external && !link.href.startsWith('/')
    ? `${import.meta.env.BASE_URL}${link.href}` : link.href;
  return <a className={`${className} contact-${link.kind}`} href={href} aria-label={iconOnly ? link.label : undefined} download={link.kind === 'cv' || undefined}
    target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>
    {link.kind === 'email' && <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></svg>}
    {link.kind === 'linkedin' && <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M7.5 10v7M11.5 17v-7M11.5 13a3 3 0 0 1 6 0v4" /><circle cx="7.5" cy="7" r=".9" fill="currentColor" stroke="none" /></svg>}
    {link.kind === 'cv' && <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M12 3v12m-4-4 4 4 4-4M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" /></svg>}
    {link.kind === 'whatsapp' && <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true" focusable="false"><path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.3-4.8a8.5 8.5 0 1 1 16.2-4Z" /><path d="m8.4 7.5 1.7 2.7-1.1 1.2a8.9 8.9 0 0 0 3.6 3.4l1.1-1.2 2.9 1.5c-.2 2.8-3.1 2.6-6.4.2-3.2-2.4-4.2-5.7-1.8-7.8Z" /></svg>}
    {link.kind === 'telegram' && <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="m3 10 18-7-4 18-6-7-8-4Z" /><path d="m11 14 6-7M11 14v5l3-2" /></svg>}
    {!iconOnly && link.label}</a>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const page = useRef<HTMLDivElement>(null);
  usePageMotion(page);
  const links = data.links.filter(link => link.visible && link.href.trim());
  const contactLinks = links.filter(link => link.kind !== 'cv');
  const whatsapp = links.find(link => link.kind === 'whatsapp');
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menuOpen) { setMenuOpen(false); menuButton.current?.focus(); }
    };
    const outside = (event: PointerEvent) => {
      if (header.current && !header.current.contains(event.target as Node)) setMenuOpen(false);
    };
    window.addEventListener('keydown', close);
    window.addEventListener('pointerdown', outside);
    return () => { window.removeEventListener('keydown', close); window.removeEventListener('pointerdown', outside); };
  }, [menuOpen]);

  return <div ref={page}>
    <div className="reading-progress" aria-hidden="true" />
    <a className="skip-link" href="#main">{data.ui.skip}</a>
    <div className="site-header" id="top">
      <header className="header wrap" ref={header} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setMenuOpen(false); }}>
        <div className="header-person"><a href="#top" className="header-identity" onClick={() => setMenuOpen(false)}><span>{data.name}</span><small>{data.location}</small></a>{whatsapp && <Link link={whatsapp} className="header-whatsapp" iconOnly />}</div>
        <button ref={menuButton} className={`menu-toggle ${menuOpen ? 'is-open' : ''}`} aria-label={menuOpen ? data.ui.close : data.ui.menu} aria-expanded={menuOpen} aria-controls="navigation" onClick={() => setMenuOpen(!menuOpen)}><span>{menuOpen ? data.ui.close : data.ui.menu}</span><span className="burger-icon" aria-hidden="true"><span /><span /></span></button>
        <nav id="navigation" inert={!menuOpen} className={menuOpen ? 'navigation open' : 'navigation'} aria-label={data.ui.navigation}>
          {data.navigation.map(link => <a href={link.href} key={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>)}
          {contactLinks.length > 0 && <a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>{data.ui.talk}</a>}
        </nav>
      </header>
    </div>
      <main id="main" tabIndex={-1}>
      <div className="hero-shell">
        <section className="hero wrap hero-grid" aria-labelledby="hero-title">
          <div className="hero-content">
          <div className="eyebrow hero-eyebrow"><span className="hero-loader" aria-hidden="true" />{data.hero.eyebrow}</div>
          <p className="hero-name">{data.name}</p>
          <h1 id="hero-title">{data.hero.headline[0]}<br /><span>{data.hero.headline[1]}</span></h1>
          <div className="hero-bottom">
            <div className="hero-copy"><p className="professional-title">{data.title}</p></div>
          </div>
          </div>
          <figure className="portrait profile-card">
            <div className="profile-identity"><div className="avatar"><img src={`${import.meta.env.BASE_URL}${data.portrait.src}`} alt={data.portrait.alt} width="1280" height="1280" fetchPriority="high" /></div><div><span className="profile-name">{data.name}</span><span className="profile-location">{data.location}</span></div></div>
            <figcaption className="summary">{data.hero.summary}</figcaption>
          </figure>
        </section>
        <div className="impact wrap">{data.impact.map(item => <div key={item.value}><strong>{item.value}</strong><span>{item.label}</span></div>)}</div>
    </div>
    <section className="work-section section wrap" id="work" aria-labelledby="work-title">
      <div className="section-heading reveal"><p className="eyebrow">{data.work.eyebrow}</p><div className="heading-row"><h2 id="work-title">{data.work.title}</h2><p className="work-description">{data.work.description}</p></div></div>
      <div className="project-grid">{data.projects.filter(project => project.visible).sort((a, b) => a.order - b.order).map(project =>
        <article key={project.id} className={`project-card reveal ${project.id === 'transaction-archiving' ? 'featured' : ''}`}>
          <div className="project-top"><span className="eyebrow">{project.category}</span></div>
          <h3>{project.name}</h3>
          <ProjectVisual variant={project.visual} />
          <div className="project-metric"><strong>{project.metric}</strong><span>{project.metricLabel}</span></div>
          {(['problem', 'contribution', 'result'] as const).some(key => project[key]) && <dl>{(['problem', 'contribution', 'result'] as const).filter(key => project[key]).map(key => <div key={key}><dt>{data.work.labels[key]}</dt><dd>{project[key]}</dd></div>)}</dl>}
          {project.tags.length > 0 && <div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>}
        </article>)}</div>
    </section>
    <WorkplaceProjects />
    <section className="experience-section" id="experience" aria-labelledby="experience-title"><div className="section wrap experience-layout">
      <div className="reveal"><p className="eyebrow">{data.experience.eyebrow}</p><h2 id="experience-title">{data.experience.title}</h2></div>
      <div className="experience-list">{data.experience.entries.filter(entry => entry.visible).map(entry => <article key={entry.company} className="experience-item reveal"><span className="experience-marker" aria-hidden="true" /><div><h3>{entry.company}</h3>{entry.role && <p>{entry.role}</p>}</div>{entry.dates && <span className="dates">{entry.dates}</span>}</article>)}</div>
    </div></section>
    <section className="section wrap skills-section" id="skills" aria-labelledby="skills-title"><div className="reveal"><p className="eyebrow">{data.skills.eyebrow}</p><h2 id="skills-title">{data.skills.title}</h2></div>
      <div className="skills-grid">{data.skills.groups.map(group => <section key={group.label} className="skill-ocean reveal" aria-label={group.label}><h3>{group.label}</h3><BubbleField items={group.items} label={group.label} /></section>)}</div>
      <section className="familiar-section" aria-labelledby="familiar-title">
        <h3 id="familiar-title" className="reveal">{data.skills.familiar.title}</h3>
        <BubbleField items={data.skills.familiar.items} label={data.skills.familiar.title} familiar />
      </section>
    </section>
    <Learning />
    <Education />
    {links.length > 0 && <section className="contact-section" id="contact" aria-labelledby="contact-title"><div className="wrap section reveal"><p className="eyebrow">{data.contact.eyebrow}</p><h2 id="contact-title">{data.contact.title}</h2><p>{data.contact.description}</p><div className="contact-links">{links.map(link => <Link link={link} key={link.kind} className={`button ${link.kind === 'cv' ? 'secondary' : 'primary'}`} />)}</div></div></section>}
    </main>
    <footer className="wrap footer"><a href="#top" className="footer-name">{data.name}<span>.</span></a><p>{data.footer}</p><a href="#top">{data.ui.back}</a></footer>
  </div>;
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
