import { portfolio as data } from '../data/portfolio';
import { SkillLogo } from './SkillLogo';

function CertificateMark({ pipeline = false }: { pipeline?: boolean }) {
  if (!pipeline) return <SkillLogo name="React" />;
  return <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M12 15h24M12 33h24M9 19v10M39 19v10" className="certificate-pipeline" />
    <rect x="4" y="8" width="10" height="10" rx="3" /><rect x="34" y="8" width="10" height="10" rx="3" />
    <rect x="4" y="30" width="10" height="10" rx="3" /><rect x="34" y="30" width="10" height="10" rx="3" />
    <path d="m20 24 3 3 6-7" />
  </svg>;
}

export function Learning() {
  const copy = data.learning;
  const courses = copy.courses.filter(course => course.visible).sort((a, b) => a.order - b.order);
  if (!courses.length) return null;
  return <section className="learning-section section" id="learning" aria-labelledby="learning-title"><div className="wrap">
    <div className="section-heading reveal"><p className="eyebrow">{copy.eyebrow}</p><div className="heading-row"><h2 id="learning-title">{copy.title}</h2><p>{copy.description}</p></div></div>
    <div className="certificate-grid">{courses.map(course => <article className="certificate-card reveal" key={course.id}>
      <div className="certificate-top"><span className="certificate-issuer">{course.issuer}</span><span className="certificate-platform">{copy.platformLabel}</span></div>
      <div className="certificate-mark"><CertificateMark pipeline={course.visual === 'pipeline'} /></div>
      <h3>{course.title}</h3><p className="certificate-description">{course.description}</p>
      <div className="certificate-completion"><span className="certificate-check" aria-hidden="true"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="10" cy="10" r="8" /><path d="m6 10 3 3 5-6" /></svg></span><span>{copy.completedLabel}<time dateTime={course.completedOn}>{course.completedLabel}</time></span></div>
      <a className="certificate-link" href={course.href} target="_blank" rel="noopener noreferrer" aria-label={`${copy.viewLabel}: ${course.title}`}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z" /><path d="M14 3v6h6m-12 6 3 3 5-6" /></svg>{copy.viewLabel}</a>
    </article>)}</div>
  </div></section>;
}

export function Education() {
  const copy = data.education;
  return <section className="education-section section wrap" id="education" aria-labelledby="education-title">
    <div className="education-heading reveal"><p className="eyebrow">{copy.eyebrow}</p><h2 id="education-title">{copy.title}</h2></div>
    <div className="education-layout"><div className="education-list">{copy.entries.filter(entry => entry.visible).map(entry => <article className="education-entry reveal" key={entry.degree}>
      <svg className="education-icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" aria-hidden="true"><path d="m2 12 14-7 14 7-14 7ZM7 15v9c5 4 13 4 18 0v-9M30 12v11" /></svg>
      <div><h3>{entry.degree}</h3><p>{entry.institution}</p><span className="education-detail">{entry.detail}</span></div>
    </article>)}</div>
    <aside className="languages-card reveal" aria-label={copy.languageLabel}><h3>{copy.languageLabel}</h3>{copy.languages.map(language => <div className="language-row" key={language.name}><span>{language.name}</span><strong>{language.level}</strong></div>)}</aside></div>
  </section>;
}
