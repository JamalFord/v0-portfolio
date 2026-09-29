export const profile = {
  name: 'Jordan Kim',
  handle: 'jordankim',
  title: 'Full-Stack & AI Engineer',
  location: 'San Francisco, CA',
  email: 'hello@jordankim.dev',
  tagline:
    'I build fast, reliable web products and ship LLM features that people actually use — from the database schema to the last pixel.',
  socials: {
    github: 'https://github.com/jordankim',
    linkedin: 'https://www.linkedin.com/in/jordankim',
    twitter: 'https://x.com/jordankim',
  },
}

export type ProjectCategory = 'Web' | 'AI' | 'Tools'

export type Project = {
  slug: string
  title: string
  category: ProjectCategory
  description: string
  tags: string[]
  image: string
  demoUrl: string
  repoUrl: string
}

export const projects: Project[] = [
  {
    slug: 'lumen',
    title: 'Lumen Analytics',
    category: 'Web',
    description:
      'Privacy-first product analytics with real-time funnels, streaming ingestion, and sub-100ms dashboards over 2B+ events.',
    tags: ['Next.js', 'Postgres', 'ClickHouse', 'Tailwind'],
    image: '/projects/lumen.png',
    demoUrl: 'https://lumen.jordankim.dev',
    repoUrl: 'https://github.com/jordankim/lumen',
  },
  {
    slug: 'docmind',
    title: 'DocMind',
    category: 'AI',
    description:
      'RAG assistant that answers questions over PDFs and wikis with inline citations, hybrid search, and eval-driven prompts.',
    tags: ['AI SDK', 'pgvector', 'TypeScript', 'RAG'],
    image: '/projects/docmind.png',
    demoUrl: 'https://docmind.jordankim.dev',
    repoUrl: 'https://github.com/jordankim/docmind',
  },
  {
    slug: 'shipkit',
    title: 'ShipKit CLI',
    category: 'Tools',
    description:
      'Zero-config deployment CLI that previews every branch, runs smoke tests, and posts status checks back to pull requests.',
    tags: ['Go', 'Docker', 'GitHub Actions', 'CLI'],
    image: '/projects/shipkit.png',
    demoUrl: 'https://shipkit.jordankim.dev',
    repoUrl: 'https://github.com/jordankim/shipkit',
  },
  {
    slug: 'streetsense',
    title: 'StreetSense',
    category: 'AI',
    description:
      'Browser-based object detection for city footage using ONNX + WebGPU, with a labeling UI for active-learning loops.',
    tags: ['Python', 'ONNX', 'WebGPU', 'React'],
    image: '/projects/vision.png',
    demoUrl: 'https://streetsense.jordankim.dev',
    repoUrl: 'https://github.com/jordankim/streetsense',
  },
]

export type Skill = {
  name: string
  years: number
  level: 1 | 2 | 3 | 4 | 5
  note: string
}

export type SkillGroup = {
  id: 'frontend' | 'backend' | 'cloud'
  label: string
  skills: Skill[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    skills: [
      { name: 'React', years: 5, level: 5, note: 'Server Components, Suspense, concurrent UI.' },
      { name: 'Next.js', years: 4, level: 5, note: 'App Router, caching, edge rendering.' },
      { name: 'TypeScript', years: 5, level: 5, note: 'Strict mode everywhere, typed APIs end to end.' },
      { name: 'Tailwind CSS', years: 4, level: 5, note: 'Design tokens and scalable component systems.' },
      { name: 'Framer Motion', years: 2, level: 4, note: 'Purposeful, accessible motion.' },
      { name: 'WebGPU', years: 1, level: 3, note: 'In-browser model inference and visualization.' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    skills: [
      { name: 'Node.js', years: 5, level: 5, note: 'Streaming APIs, queues, and workers.' },
      { name: 'Python', years: 4, level: 4, note: 'FastAPI services and ML pipelines.' },
      { name: 'PostgreSQL', years: 4, level: 5, note: 'Schema design, indexing, pgvector.' },
      { name: 'Go', years: 2, level: 3, note: 'CLIs and high-throughput services.' },
      { name: 'GraphQL', years: 3, level: 4, note: 'Federated schemas and persisted queries.' },
      { name: 'LLM APIs', years: 2, level: 5, note: 'Tool calling, structured output, evals.' },
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud & DevOps',
    skills: [
      { name: 'Vercel', years: 4, level: 5, note: 'Preview workflows and edge functions.' },
      { name: 'AWS', years: 3, level: 4, note: 'Lambda, S3, RDS, and IAM hardening.' },
      { name: 'Docker', years: 4, level: 4, note: 'Reproducible builds and local parity.' },
      { name: 'Kubernetes', years: 2, level: 3, note: 'Helm charts and autoscaling workloads.' },
      { name: 'Terraform', years: 2, level: 3, note: 'Infrastructure as code across accounts.' },
      { name: 'GitHub Actions', years: 4, level: 5, note: 'CI pipelines with caching and matrix runs.' },
    ],
  },
]

export type Milestone = {
  id: string
  kind: 'Education' | 'Internship' | 'Role'
  period: string
  title: string
  org: string
  summary: string
  highlights: string[]
}

export const milestones: Milestone[] = [
  {
    id: 'current',
    kind: 'Role',
    period: '2025 — Now',
    title: 'Full-Stack & AI Engineer',
    org: 'Northwind Labs',
    summary: 'Leading AI product features for a B2B knowledge platform.',
    highlights: [
      'Shipped a RAG assistant used by 40k+ weekly users.',
      'Cut p95 API latency from 820ms to 190ms with streaming and caching.',
      'Built an eval harness that gates every prompt change in CI.',
    ],
  },
  {
    id: 'ms',
    kind: 'Education',
    period: '2023 — 2025',
    title: 'M.S. Computer Science — Machine Learning',
    org: 'University of California, Berkeley',
    summary: 'Research on retrieval-augmented generation and efficient inference.',
    highlights: [
      'Thesis: Hybrid retrieval for long-document question answering.',
      'TA for CS 189 — Introduction to Machine Learning.',
    ],
  },
  {
    id: 'intern-2',
    kind: 'Internship',
    period: 'Summer 2024',
    title: 'Software Engineering Intern — AI Platform',
    org: 'Cloudframe',
    summary: 'Built model-serving tooling for internal ML teams.',
    highlights: [
      'Designed a GPU job scheduler dashboard in Next.js.',
      'Reduced cold-start times by 60% with container snapshotting.',
    ],
  },
  {
    id: 'intern-1',
    kind: 'Internship',
    period: 'Summer 2022',
    title: 'Frontend Engineering Intern',
    org: 'Brightpath',
    summary: 'Worked on the design system and checkout experience.',
    highlights: [
      'Migrated 120+ components to TypeScript and Tailwind.',
      'Improved checkout Lighthouse score from 62 to 97.',
    ],
  },
  {
    id: 'bs',
    kind: 'Education',
    period: '2019 — 2023',
    title: 'B.S. Computer Science',
    org: 'University of Washington',
    summary: 'Focus on systems and human-computer interaction.',
    highlights: [
      'Graduated magna cum laude.',
      'Won 1st place at DubHacks with a real-time captioning app.',
    ],
  },
]
