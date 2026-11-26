export type PortfolioLink = {
  label: string;
  href: string;
  kind: 'email' | 'linkedin' | 'cv' | 'whatsapp' | 'telegram';
  visible: boolean;
};

export type ProjectStatus = 'completed' | 'in-progress' | 'unspecified';
export type WorkplaceProject = {
  id: string;
  employerId: string;
  selectedProjectId?: string;
  name?: string;
  summary?: string;
  status: ProjectStatus;
  visible: boolean;
  order: number;
};

export const portfolio = {
  name: 'Mohammad Bajaa',
  location: 'Damascus, Syria',
  portrait: { src: 'mohammad-bajaa.jpg', alt: 'Mohammad Bajaa smiling outdoors' },
  ui: { skip: 'Skip to content', menu: 'Menu', close: 'Close', navigation: 'Main navigation', talk: 'Let’s talk', back: 'Back to top' },
  title: 'Full-Stack Software Engineer | Laravel & React',
  hero: {
    eyebrow: 'From complex workflows to clear experiences',
    headline: ['Thoughtful code.', 'Meaningful impact.'],
    summary: 'I develop internal systems with Laravel and React, turning operational needs into practical software. My work includes MySQL and MongoDB in banking environments, with a focus on the people and processes behind the data.',
    projectsLabel: 'Explore my work',
  },
  navigation: [
    { label: 'Work', href: '#work' },
    { label: 'Projects', href: '#workplaces' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Learning', href: '#learning' },
  ],
  // Work history is from the CV; contact links include the owner's updates.
  // Empty URLs are hidden automatically, even when visible is true.
  links: [
    { label: 'Download CV', href: 'cv.pdf', kind: 'cv', visible: true },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mohammad-bajaa-6b5a89223/', kind: 'linkedin', visible: true },
    { label: 'mohbaj2016@gmail.com', href: 'mailto:mohbaj2016@gmail.com', kind: 'email', visible: true },
    { label: 'WhatsApp', href: 'https://wa.me/963996454519', kind: 'whatsapp', visible: true },
    { label: 'Telegram', href: 'https://t.me/MohammadBj997', kind: 'telegram', visible: true },
  ] satisfies PortfolioLink[],
  impact: [
    { value: '50,000+', label: 'documents archived' },
    { value: '19', label: 'bank branches served' },
    { value: '4 min', label: 'PD processing, down from 4 hours' },
  ],
  work: {
    eyebrow: 'Selected projects',
    title: 'Built around real problems.',
    description: 'A selection of systems and improvements across banking operations, risk workflows, and the web.',
    labels: { problem: 'The challenge', contribution: 'My contribution', result: 'The outcome' },
  },
  // Change order to reorder projects; set visible: false to hide one.
  projects: [
    {
      id: 'transaction-archiving', visual: 'archive', order: 1, visible: true,
      category: 'Banking operations', name: 'Transaction Archiving',
      problem: 'Organize a growing collection of transaction documents across bank branches.',
      contribution: 'Developed and improved a Laravel system for archiving transaction documents.',
      result: '50,000+ documents across 19 branches, with new documents added every hour.',
      metric: '50,000+', metricLabel: 'documents. One archive.', tags: ['Laravel'],
    },
    {
      id: 'probability-of-default', visual: 'risk', order: 2, visible: true,
      category: 'Risk & data', name: 'Probability of Default Tool',
      problem: 'The risk team needed a faster way to calculate PD and validate repayment data.',
      contribution: 'Built a tool to calculate probability of default and check repayment data.',
      result: 'Reduced processing time from 4 hours to 4 minutes.',
      metric: '4 hours → 4 min', metricLabel: 'Less processing. More progress.', tags: ['Risk workflows', 'Data validation'],
    },
    {
      id: 'incident-reporting', visual: 'incident', order: 3, visible: true,
      category: 'Internal systems', name: 'Operational Incident Reporting',
      problem: 'Document operational incidents across branches with supporting evidence.',
      contribution: 'Built a Laravel module with image and media attachments for incident reports.',
      result: 'Used to document 60+ operational incidents across branches.',
      metric: '60+ Operational Incidents', metricLabel: 'Documented across branches', tags: ['Laravel', 'Media attachments'],
    },
    {
      id: 'blue-store', visual: 'frontend', order: 4, visible: true,
      category: 'Frontend performance', name: 'Blue Store',
      problem: 'Improve how a React storefront loads its interface.',
      contribution: 'Implemented code splitting and lazy loading in the React frontend.',
      result: 'Improved interface loading by loading code as needed.',
      metric: 'Load what matters.', metricLabel: 'A more considered loading experience.', tags: ['React', 'Code splitting', 'Lazy loading'],
    },
  ],
  workplaceWork: {
    eyebrow: 'Projects by workplace',
    title: 'The work behind each role.',
    description: 'Projects and contributions, grouped by the teams I worked with.',
    filterLabel: 'Filter projects by status',
    allLabel: 'All projects',
    countLabel: 'projects',
    singleLabel: 'project',
    empty: 'No projects with this status to show yet.',
    statusLabels: { completed: 'Completed', 'in-progress': 'In progress', unspecified: 'Status not specified' },
    // The owner confirmed that all currently listed projects are completed.
    // For future projects, choose completed, in-progress, or unspecified.
    // selectedProjectId reuses the name and contribution from Selected Projects.
    projects: [
      { id: 'archive', employerId: 'bank', selectedProjectId: 'transaction-archiving', status: 'completed', order: 1, visible: true },
      { id: 'pd', employerId: 'bank', selectedProjectId: 'probability-of-default', status: 'completed', order: 2, visible: true },
      { id: 'incidents', employerId: 'bank', selectedProjectId: 'incident-reporting', status: 'completed', order: 3, visible: true },
      { id: 'bank-reports', employerId: 'bank', name: 'Core Banking Reports', summary: 'Designed 80+ reports for Operations, Risk, and Compliance.', status: 'completed', order: 4, visible: true },
      { id: 'monitoring', employerId: 'bank', name: 'Production Monitoring Dashboard', summary: 'Contributed to a dashboard covering service status and CPU, memory, and disk usage.', status: 'completed', order: 5, visible: true },
      { id: 'rtgs-message-sender', employerId: 'bank', name: 'RTGS Message Sender', status: 'completed', order: 6, visible: true },
      { id: 'cbs-cmlc-letters', employerId: 'bank', name: 'CBS & CMLC Letters', status: 'completed', order: 7, visible: true },
      { id: 'store', employerId: 'blue-elite', selectedProjectId: 'blue-store', status: 'completed', order: 1, visible: true },
      { id: 'blue-tasks', employerId: 'blue-elite', name: 'Blue Tasks', summary: 'Led front-end development for Blue Tasks.', status: 'completed', order: 2, visible: true },
      { id: 'fuel', employerId: 'blue-elite', name: 'Fuel Management Application', summary: 'Built an application for tracking fuel operations.', status: 'completed', order: 3, visible: true },
      { id: 'hr', employerId: 'mar-assia', name: 'HR Application', summary: 'Built a rule-based HR application for 100+ employees, including automation of 50+ reports that reduced reporting time by 30%.', status: 'completed', order: 1, visible: true },
    ] satisfies WorkplaceProject[],
  },
  experience: {
    eyebrow: 'Experience', title: 'Across teams. Close to the work.',
    entries: [
      { id: 'bank', company: 'First MicroFinance Bank - Syria', role: 'Database Administrator', dates: 'Jul 2025 - Present', visible: true },
      { id: 'blue-elite', company: 'Blue Elite Tech', role: 'Front-End Engineer', dates: 'Apr 2024 - Apr 2026', visible: true },
      { id: 'mar-assia', company: 'Mar Assia Center', role: 'Full-Stack Engineer', dates: 'Oct 2023 - Aug 2024', visible: true },
    ],
  },
  skills: {
    eyebrow: 'Toolkit', title: 'Stack:',
    groups: [
      { label: 'Development', items: ['PHP', 'Laravel', 'Blade', 'JavaScript', 'React', 'Tailwind CSS'] },
      { label: 'Databases', items: ['MySQL', 'MongoDB', 'SQL'] },
      { label: 'Tools & environments', items: ['Linux', 'Docker', 'Git', 'GitLab'] },
      { label: 'Messaging & automation', items: ['Kafka', 'VM script automation'] },
    ],
    familiar: {
      title: 'Familiar with',
      items: ['C#', 'Java', 'Elasticsearch', 'Kibana', 'Ollama', 'Qwen'],
    },
  },
  learning: {
    eyebrow: 'Courses & certificates',
    title: 'Always building. Always learning.',
    description: 'Completed courses in frontend engineering and software delivery, with certificates you can verify.',
    completedLabel: 'Completed',
    platformLabel: 'Coursera',
    viewLabel: 'View certificate',
    courses: [
      {
        id: 'AY7ICS8S5488', order: 1, visible: true,
        title: 'Continuous Integration and Continuous Delivery (CI/CD)',
        issuer: 'IBM', visual: 'pipeline',
        description: 'Continuous integration, delivery, and deployment workflows.',
        completedOn: '2024-08-04', completedLabel: 'Aug 4, 2024',
        href: 'https://www.coursera.org/account/accomplishments/certificate/AY7ICS8S5488',
      },
      {
        id: '3ST47KCFU978', order: 2, visible: true,
        title: 'Advanced React', issuer: 'Meta', visual: 'react',
        description: 'Reusable components, API integration, and testing.',
        completedOn: '2024-07-08', completedLabel: 'Jul 8, 2024',
        href: 'https://www.coursera.org/account/accomplishments/verify/3ST47KCFU978',
      },
      {
        id: 'PWFNUSK9HM9L', order: 3, visible: true,
        title: 'React Basics', issuer: 'Meta', visual: 'react',
        description: 'Components, props, forms, and interactive interfaces.',
        completedOn: '2024-06-01', completedLabel: 'Jun 1, 2024',
        href: 'https://www.coursera.org/account/accomplishments/verify/PWFNUSK9HM9L',
      },
    ],
  },
  education: {
    eyebrow: 'Education & languages',
    title: 'A foundation to build on.',
    languageLabel: 'Languages',
    // Academic status and language levels are from the current public/cv.pdf.
    entries: [
      { degree: 'M.Sc. in Web Science', institution: 'Syrian Virtual University', detail: 'In progress - coursework completed', visible: true },
      { degree: 'Bachelor’s in Software Engineering', institution: 'Higher Institute for Applied Sciences and Technology (HIAST)', detail: '2022', visible: true },
    ],
    languages: [{ name: 'Arabic', level: 'Native' }, { name: 'English', level: 'B2' }],
  },
  contact: {
    eyebrow: 'Next chapter', title: 'Let’s build something useful.',
    description: 'Interested in my work? Let’s talk about Full-Stack and Laravel Backend opportunities.',
  },
  footer: 'Built with care. Designed for clarity.',
};
