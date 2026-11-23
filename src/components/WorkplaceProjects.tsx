import { useState } from 'react';
import { portfolio as data, type ProjectStatus, type WorkplaceProject } from '../data/portfolio';

export function WorkplaceProjects() {
  const [filter, setFilter] = useState<'all' | ProjectStatus>('all');
  const copy = data.workplaceWork;
  const projects: WorkplaceProject[] = copy.projects;
  const visible = projects.filter(project => project.visible && (!project.selectedProjectId || data.projects.some(selected => selected.id === project.selectedProjectId && selected.visible)));
  const filtered = visible.filter(project => filter === 'all' || project.status === filter);
  const employers = data.experience.entries.filter(employer => employer.visible && filtered.some(project => project.employerId === employer.id));
  const filters = ['all', 'completed', 'in-progress'] as const;

  return <section id="workplaces" className="workplace-section section wrap" aria-labelledby="workplaces-title">
    <div className="section-heading reveal"><p className="eyebrow">{copy.eyebrow}</p><h2 id="workplaces-title">{copy.title}</h2><p className="workplace-intro">{copy.description}</p></div>
    <div className="status-filters" role="group" aria-label={copy.filterLabel}>{filters.map(status => <button key={status} type="button" aria-pressed={filter === status} onClick={() => setFilter(status)}>{status === 'all' ? copy.allLabel : copy.statusLabels[status]}<span>{visible.filter(project => status === 'all' || project.status === status).length}</span></button>)}</div>
    <div className="workplace-groups">
      {employers.map(employer => {
        const items = filtered.filter(project => project.employerId === employer.id).sort((a, b) => a.order - b.order);
        return <details className="workplace-group" key={employer.id} open>
          <summary><div className="workplace-heading"><h3>{employer.company}</h3><p>{employer.role}</p></div><span className="workplace-count">{items.length} {items.length === 1 ? copy.singleLabel : copy.countLabel}</span><span className="workplace-chevron" aria-hidden="true" /></summary>
          <ul className="workplace-projects">{items.map(project => {
            const selected = data.projects.find(item => item.id === project.selectedProjectId);
            const summary = selected?.contribution ?? project.summary;
            return <li key={project.id}><div><h4>{selected?.name ?? project.name}</h4>{summary && <p>{summary}</p>}</div><span className={`project-status status-${project.status}`}><span aria-hidden="true" />{copy.statusLabels[project.status]}</span></li>;
          })}</ul>
        </details>;
      })}
      {employers.length === 0 && <p className="workplace-empty" role="status">{copy.empty}</p>}
    </div>
  </section>;
}
