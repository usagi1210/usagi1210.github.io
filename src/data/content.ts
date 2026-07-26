export const person = {
  nameEn: 'Yuan Junhao',
  nameCn: '袁俊豪',
  eyebrow: 'AI for Science',
  subtitle: 'Visiting Student @ SCI Lab, Westlake University · B.Eng. Candidate, Hangzhou Dianzi University',
  bio: 'Broadly interested in AI for Science, especially how learning-based, generative, and agentic systems can support scientific discovery. I hope to explore how foundation models and AI agents can help researchers reason, experiment, and create more effectively. Here\'s hoping the work adds up to something. Always happy to chat over ideas or a coffee!',
  bioZh: '我广泛关注 AI for Science，尤其是学习方法、生成式模型与智能体系统如何支持科学发现。我希望探索基础模型和 AI 智能体如何帮助研究者更高效地推理、实验与创造。希望这些工作终能积少成多、有所意义。随时欢迎交流想法，或一起喝杯咖啡！',
  emails: [
    { label: 'Educational', addr: '23061739@hdu.edu.cn' },
    { label: 'Gmail',       addr: 'yuanjunhao1210@gmail.com' },
    { label: 'QQ',          addr: '1498422682@qq.com' },
  ],
  github: 'https://github.com/usagi1210',
  scholar: 'https://scholar.google.com/citations?user=KmAsYbUAAAAJ&hl=en',
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
    logo: '/logos/westlake.png',
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
    logo: '/logos/hdu.png',
  },
]

export const stats = [
  { value: 1,  label: 'Publication' },
  { value: 6,  label: 'Awards', suffix: '+' },
  { value: 4,  label: 'Projects', suffix: '+' },
]

export const interests = [
  {
    name: 'AI for Science',
    zh: '人工智能驱动科学发现',
    desc: 'Exploring how artificial intelligence can make scientific discovery more efficient, reliable, and accessible across disciplines.',
    descZh: '探索人工智能如何在跨学科场景中，让科学发现更高效、更可靠、更可及。',
  },
  {
    name: 'Intelligent Agents',
    zh: '智能体系统',
    desc: 'Interested in agentic systems that can reason, plan, use tools, and collaborate with people on complex research workflows.',
    descZh: '关注能够推理、规划、调用工具并与人协作的智能体系统，用于支持复杂科研流程。',
  },
  {
    name: 'Computer Vision',
    zh: '计算机视觉',
    desc: 'Building systems that see and understand visual data, enabling perception, recognition, and scene understanding.',
    descZh: '构建能够感知与理解视觉信息的智能系统，涵盖感知、识别与场景理解。',
  },
  {
    name: 'Computational Imaging',
    zh: '计算成像',
    desc: 'Exploring the co-design of optics, sensing, and algorithms to extend what imaging systems can capture and infer.',
    descZh: '探索光学、感知与算法的协同设计，拓展成像系统的采集与推断能力。',
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
  {
    year: '2025',
    name: '15th MathorCup Mathematical Application Challenge — Regional Third Prize',
    nameZh: '第十五届MathorCup数学应用挑战赛 — 赛区三等奖',
    level: 'Provincial',
    image: '/awards/mama-cup-provincial-3rd.png',
  },
  {
    year: '2025',
    name: '20th Zhejiang Provincial College E-Commerce Competition — First Prize',
    nameZh: '第二十届浙江省大学生电子商务竞赛 — 省级一等奖',
    level: 'Provincial',
    image: '/awards/ecommerce-1st.jpg',
  },
  {
    year: '2024',
    name: 'Zhejiang Provincial Government Scholarship',
    nameZh: '浙江省政府奖学金',
    level: 'Provincial',
    image: '/awards/provincial-scholarship.jpeg',
  },
  {
    year: '2024',
    name: 'Zhejiang Provincial College Higher Mathematics Competition — First Prize (Engineering)',
    nameZh: '浙江省大学生高等数学竞赛 — 工科类一等奖',
    level: 'Provincial',
    image: '/awards/math-competition-provincial-1st.jpeg',
  },
]

export const projects = [
  {
    name: 'TicTacToe Robot',
    zh: '基于 Dobot Magician 机械臂的人机井字棋系统',
    desc: 'Human-robot Tic-Tac-Toe on a Dobot Magician arm — computer vision for real-time board detection, automated move planning and physical execution.',
    tags: ['Python', 'Dobot Magician', 'Computer Vision', 'Robotics'],
    url: 'https://github.com/usagi1210/tictactoe-dobot-magician',
  },
  {
    name: 'Single-Pixel Imaging',
    zh: '单像素成像系统稀疏重建算法研究',
    desc: 'Algorithm research for single-pixel camera systems; sparse reconstruction under extreme sub-Nyquist measurement budgets.',
    tags: ['PyTorch', 'Single-Pixel Imaging', 'In Progress'],
    url: 'https://github.com/usagi1210/SPI_research',
  },
  {
    name: 'CASSI-116 Benchmark',
    zh: '116 通道高光谱 CASSI 成像基准算法设计',
    desc: 'Spectral reconstruction algorithms for a 116-channel hyperspectral imaging benchmark built on the CASSI coded-aperture architecture.',
    tags: ['PyTorch', 'CASSI', 'Hyperspectral', 'In Progress', 'Private'],
    url: 'https://github.com/usagi1210/CASSI_116',
  },
  {
    name: 'Paper Reproductions',
    zh: '光谱压缩成像与视觉 Transformer 经典论文复现',
    desc: 'Reproductions of key SCI papers: MST spectral compressive imaging toolbox, SCM-DUN Mamba network (TCSVT 2025), and ToMe vision transformer acceleration.',
    tags: ['PyTorch', 'Spectral Compressive Imaging', 'Reproduction'],
    url: 'https://github.com/usagi1210/MST',
  },
]

export const marqueeItems = [
  'AI FOR SCIENCE',
  'COMPUTER VISION',
  'INTELLIGENT AGENTS',
  'GENERATIVE AI',
  'SCIENTIFIC DISCOVERY',
]
