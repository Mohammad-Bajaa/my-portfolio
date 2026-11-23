import {
  siPhp, siLaravel, siJavascript, siReact, siTailwindcss, siMysql,
  siMongodb, siLinux, siDocker, siGit, siGitlab, siApachekafka,
  siElasticsearch, siKibana, siOllama, siQwen,
} from 'simple-icons';

const brands: Record<string, { path: string }> = {
  PHP: siPhp, Laravel: siLaravel, Blade: siLaravel, JavaScript: siJavascript,
  React: siReact, 'Tailwind CSS': siTailwindcss, MySQL: siMysql, MongoDB: siMongodb,
  Linux: siLinux, Docker: siDocker, Git: siGit, GitLab: siGitlab, Kafka: siApachekafka,
  Elasticsearch: siElasticsearch, Kibana: siKibana, Ollama: siOllama, Qwen: siQwen,
};

export function SkillLogo({ name }: { name: string }) {
  const brand = brands[name];
  if (brand) return <svg className="skill-logo" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d={brand.path} /></svg>;
  return <svg className="skill-logo" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {name === 'C#' ? <><path d="m12 2 9 5v10l-9 5-9-5V7Z" /><text x="12" y="15.5" textAnchor="middle" fill="currentColor" stroke="none" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700">C#</text></>
      : name === 'Java' ? <><path d="M5 10h12v5a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5ZM17 11h2a2 2 0 0 1 0 4h-2M3 22h17M10 8c-5-3 5-3 0-6M14 8c-3-2 4-3 2-6" /></>
      : name === 'SQL' ? <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0" /></>
      : name === 'VM script automation' ? <><rect x="3" y="3" width="18" height="14" rx="2" /><path d="m7 7 3 3-3 3M13 13h4M8 21h8M12 17v4" /></>
      : name === 'Working under pressure' ? <><path d="M4 15a8 8 0 1 1 16 0M6 15l3-2 3 2 4-7M3 20h18" /><circle cx="12" cy="15" r="1.5" /></>
      : <><path d="M19 8a8 8 0 0 0-13-3L3 8m0-5v5h5M5 16a8 8 0 0 0 13 3l3-3m0 5v-5h-5" /></>}
  </svg>;
}
