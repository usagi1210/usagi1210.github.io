export const person = {
  nameEn: 'Yuan Junhao',
  nameCn: '袁俊豪',
  eyebrow: 'Computer Vision · Computational Imaging',
  subtitle: 'Visiting Student @ SCI Lab, Westlake University · B.Eng. Candidate, Hangzhou Dianzi University',
  bio: 'I study how cameras and algorithms can be co-designed to capture and understand the visual world more faithfully. Currently working on neural scene representations, low-level restoration, and the physics of imaging systems.',
  email: 'yuanjunhao1210@gmail.com',
  github: 'https://github.com/yuanjunhao',
  scholar: 'https://scholar.google.com',
  cvUrl: '/cv.pdf',
}

export const education = [
  {
    period: '2026.02 – 2026.06',
    institution: 'Westlake University',
    institutionZh: '西湖大学',
    department: 'School of Engineering · SCI Lab',
    departmentZh: '工学院 · 感知与计算成像实验室',
    role: 'Visiting Student',
    roleZh: '访问学生',
    current: true,
  },
  {
    period: '2023.09 – Present',
    institution: 'Hangzhou Dianzi University',
    institutionZh: '杭州电子科技大学',
    department: 'School of Automation (College of Artificial Intelligence)',
    departmentZh: '自动化学院（人工智能学院）',
    role: 'B.Eng. in Intelligent Science & Technology',
    roleZh: '智能科学与技术 本科',
    current: true,
  },
]

export const stats = [
  { value: 1,  label: 'Publication' },
  { value: 2,  label: 'Awards' },
  { value: 0,  label: 'Projects' },
]

export const interests = [
  {
    name: 'Computational Imaging',
    desc: 'Rethinking the optical–digital pipeline; coded apertures, event cameras, single-photon sensing.',
  },
  {
    name: 'Neural Scene Representation',
    desc: 'NeRF and 3D Gaussian Splatting for photorealistic synthesis and physical reasoning.',
  },
  {
    name: 'Low-level Vision',
    desc: 'Image restoration, deblurring, HDR reconstruction under real-world degradations.',
  },
  {
    name: 'Vision Geometry',
    desc: 'Geometry-aware architectures; robustness and generalization across imaging conditions.',
  },
]

export const publications = [
  {
    venue: 'Optics & Laser Technology · 2025',
    title: 'Degradation-learning spatial-sparsity transformation unfolding network for reflective spectral compressive imaging',
    authors: ['Ji Xu', 'Ping Xu', 'Wenjie Zhu', 'Yicheng Feng', 'Junhao Yuan'],
    selfAuthor: 'Junhao Yuan',
    links: {
      paper: 'https://doi.org/10.1016/j.optlastec.2025.113639',
      sciencedirect: 'https://www.sciencedirect.com/science/article/pii/S0030399225012307',
      code: '#',
      bibtex: '#',
    },
  },
]

export const awards = [
  {
    year: '2025',
    name: 'National Scholarship — Ministry of Education, P.R. China',
    nameZh: '国家奖学金 — 中华人民共和国教育部',
    level: 'National',
    image: '/awards/national-scholarship.jpeg',
  },
  {
    year: '2025',
    name: 'Mathematical Contest in Modeling (MCM) — Finalist (Top 2% Worldwide)',
    nameZh: '美国大学生数学建模竞赛 — F 奖（全球前 2%）',
    level: 'International',
    image: '/awards/mcm-finalist.png',
  },
]

export const projects = [
  {
    name: 'Project Alpha',
    desc: 'One sharp sentence on what this project does and why it matters in the CV research context.',
    tags: ['PyTorch', 'NeRF', 'In Progress'],
    url: 'https://github.com/yuanjunhao',
  },
  {
    name: 'Project Beta',
    desc: 'One sharp sentence on what this project does.',
    tags: ['CUDA', 'OpenCV'],
    url: 'https://github.com/yuanjunhao',
  },
  {
    name: 'Computational Photography',
    desc: 'Notable coursework project description.',
    tags: ['Python', 'NumPy'],
    url: 'https://github.com/yuanjunhao',
  },
  {
    name: 'Ongoing Research',
    desc: 'Exploratory research in progress.',
    tags: ['In Progress'],
    url: 'https://github.com/yuanjunhao',
  },
]

export const marqueeItems = [
  'Computer Vision',
  'Computational Imaging',
  'Neural Scene Representation',
  'Low-level Vision',
  '3D Gaussian Splatting',
  'NeRF',
]
