# 个人主页实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**目标：** 从零搭建袁俊豪个人学术主页，包含所有 v9 动效，静态导出部署到 GitHub Pages。

**架构：** Next.js 14 App Router 单页面应用，内容硬编码于 `data/content.ts`，动效逻辑封装为自定义 hook，组件按职责拆分。无服务端逻辑，`output: 'export'` 生成纯静态文件。

**Tech Stack：** Next.js 14、TypeScript、Framer Motion、`next/font/google`（Big Shoulders Display / Spectral / Geist）、CSS 自定义属性（OKLCH 调色板）、GitHub Actions 部署。

---

## 文件结构

```
src/
  app/
    layout.tsx              # 根布局：字体注入、metadata、全局 CSS 变量
    page.tsx                # 页面组合：按序渲染所有 section
    globals.css             # CSS 变量、base reset、@keyframes
  components/
    CursorEffect.tsx        # 自定义鼠标（红点 + 延迟环）
    LoaderWipe.tsx          # 页面加载遮罩擦除
    Spotlight.tsx           # 全局鼠标聚光灯（fixed radial-gradient）
    Nav.tsx                 # 固定导航 + scrollspy 高亮
    Hero.tsx                # Hero 区：乱码名字 + 磁性按钮 + 入场动画
    StatsRow.tsx            # 统计数字行（计数动画）
    Marquee.tsx             # 横向无限滚动字幕条
    SectionWrapper.tsx      # 双列布局容器 + clip-path 擦入动画
    ResearchSection.tsx     # 研究兴趣：2×2 格子 + 3D 倾斜 + 追光
    PublicationsSection.tsx # 论文列表
    AwardsSection.tsx       # 奖项列表
    ProjectsSection.tsx     # 项目网格（2×2，3D 倾斜）
    Footer.tsx              # 页脚
  hooks/
    useScramble.ts          # 文字乱码重组动画
    useMagneticButton.ts    # 磁性按钮偏移计算
    useTilt3D.ts            # 3D 透视倾斜 + 追光坐标
    useScrollspy.ts         # 监听板块可见性，返回当前活跃 id
    useCounter.ts           # 数字从 0 计数到目标值
  data/
    content.ts              # 全部页面内容（论文、奖项、项目等）
  lib/
    motion.ts               # 复用的 Framer Motion variants 定义
.github/
  workflows/
    deploy.yml              # GitHub Actions：build → gh-pages
```

---

## Task 1：项目脚手架

**Files:**
- Create: `package.json`（由 create-next-app 生成）
- Modify: `next.config.ts`
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1：初始化 Next.js 项目**

```bash
cd "F:/Research/homepage"
npx create-next-app@latest . --typescript --no-tailwind --app --src-dir --no-eslint --import-alias "@/*"
```

出现提示时全部选 Yes / 默认。

- [ ] **Step 2：安装依赖**

```bash
npm install framer-motion
```

- [ ] **Step 3：配置静态导出**

修改 `next.config.ts`：

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  // 如果 GitHub Pages 使用子路径（如 username.github.io/homepage），取消注释：
  // basePath: '/homepage',
  // assetPrefix: '/homepage/',
  images: { unoptimized: true },
}

export default nextConfig
```

- [ ] **Step 4：创建 GitHub Actions 部署工作流**

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to gh-pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

- [ ] **Step 5：验证构建**

```bash
npm run build
```

预期：`out/` 目录生成，无报错。

- [ ] **Step 6：提交**

```bash
git init
git add .
git commit -m "feat: scaffold Next.js project with static export and deploy workflow"
```

---

## Task 2：全局样式与设计 Token

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1：替换 globals.css**

```css
/* src/app/globals.css */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --bg:      oklch(0.972 0.009 55);
  --ink:     oklch(0.11  0.000 0);
  --red:     oklch(0.50  0.195 7);
  --red-hi:  oklch(0.42  0.180 7);
  --red-lo:  oklch(0.50  0.195 7 / 0.08);
  --muted:   oklch(0.50  0.000 0);
  --rule:    oklch(0.86  0.004 55);
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
}

body {
  background: var(--bg);
  color: var(--ink);
  overflow-x: hidden;
  cursor: none;
}

/* Reduced motion: restore cursor and kill all transitions */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  body { cursor: auto; }
}

/* Marquee keyframe */
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

/* Loader wipe keyframe */
@keyframes wipeUp {
  from { transform: scaleY(1); transform-origin: top; }
  to   { transform: scaleY(0); transform-origin: top; }
}
```

- [ ] **Step 2：提交**

```bash
git add src/app/globals.css
git commit -m "feat: add design tokens and global styles"
```

---

## Task 3：字体配置

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1：配置三套字体并注入 CSS 变量**

```tsx
// src/app/layout.tsx
import type { Metadata } from 'next'
import { Big_Shoulders_Display, Spectral, Geist } from 'next/font/google'
import './globals.css'

const bigShoulders = Big_Shoulders_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-display',
  display: 'swap',
})

const spectral = Spectral({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const geist = Geist({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Yuan Junhao — Computer Vision & Computational Imaging',
  description:
    'Undergraduate researcher in Computer Vision and Computational Imaging. Intelligent Science & Technology, Class of 2026.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bigShoulders.variable} ${spectral.variable} ${geist.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 2：在 globals.css 中应用字体变量**

在 globals.css 的 `:root` 块末尾追加：

```css
  --font-display: var(--font-display, 'Big Shoulders Display', Impact, sans-serif);
  --font-serif:   var(--font-serif, 'Spectral', Georgia, serif);
  --font-sans:    var(--font-sans, 'Geist', system-ui, sans-serif);
```

body 中追加：

```css
body {
  font-family: var(--font-sans);
}
```

- [ ] **Step 3：提交**

```bash
git add src/app/layout.tsx src/app/globals.css
git commit -m "feat: configure Big Shoulders Display, Spectral, Geist via next/font"
```

---

## Task 4：内容数据

**Files:**
- Create: `src/data/content.ts`

- [ ] **Step 1：创建内容数据文件**

```ts
// src/data/content.ts

export const person = {
  nameEn: 'Yuan Junhao',
  nameCn: '袁俊豪',
  eyebrow: 'Computer Vision · Computational Imaging · Class of 2026',
  subtitle: 'Undergraduate researcher — Intelligent Science & Technology',
  bio: 'I study how cameras and algorithms can be co-designed to capture and understand the visual world more faithfully. Currently working on neural scene representations, low-level restoration, and the physics of imaging systems.',
  email: 'yuanjunhao@university.edu',
  github: 'https://github.com/yuanjunhao',
  scholar: 'https://scholar.google.com',
  cvUrl: '/cv.pdf',
}

export const stats = [
  { value: 1,  label: 'Publication' },
  { value: 3,  label: 'National Awards' },
  { value: 4,  label: 'Research Areas' },
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
    venue: 'CVPR 2024',
    title: 'Full Title of the Paper: A Subtitle Explaining the Core Contribution',
    authors: ['First Author', 'Second Author', 'Third Author', 'Fourth Author', 'Yuan Junhao'],
    selfAuthor: 'Yuan Junhao',
    links: {
      paper: '#',
      code: '#',
      project: '#',
      bibtex: '#',
    },
  },
]

export const awards = [
  { year: '2024', name: 'First Award Name — Competition or Program Title',  level: 'National' },
  { year: '2023', name: 'Second Award Name — Competition Title',             level: 'National' },
  { year: '2023', name: 'Third Award Name',                                  level: 'National' },
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
```

- [ ] **Step 2：提交**

```bash
git add src/data/content.ts
git commit -m "feat: add hardcoded content data"
```

---

## Task 5：Framer Motion Variants

**Files:**
- Create: `src/lib/motion.ts`

- [ ] **Step 1：创建复用的动画 variants**

```ts
// src/lib/motion.ts
import type { Variants } from 'framer-motion'

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.15, 0, 0, 1], delay },
  }),
}

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut', delay },
  }),
}

export const clipReveal: Variants = {
  hidden:  { clipPath: 'inset(0 0 100% 0)' },
  visible: {
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 0.8, ease: [0.2, 0, 0, 1] },
  },
}

export const scaleX: Variants = {
  hidden:  { scaleX: 0, originX: 0 },
  visible: (delay: number = 0) => ({
    scaleX: 1,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1], delay },
  }),
}
```

- [ ] **Step 2：提交**

```bash
git add src/lib/motion.ts
git commit -m "feat: add shared Framer Motion variants"
```

---

## Task 6：自定义 Hooks

**Files:**
- Create: `src/hooks/useScramble.ts`
- Create: `src/hooks/useMagneticButton.ts`
- Create: `src/hooks/useTilt3D.ts`
- Create: `src/hooks/useScrollspy.ts`
- Create: `src/hooks/useCounter.ts`

- [ ] **Step 1：useScramble — 文字乱码重组**

```ts
// src/hooks/useScramble.ts
'use client'
import { useCallback, useRef } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&'

export function useScramble() {
  const frameRef = useRef<number | null>(null)

  const scramble = useCallback(
    (el: HTMLElement | null, target: string, startDelay = 0) => {
      if (!el) return
      const len = target.length
      let frame = 0
      const total = len * 6

      const run = () => {
        let out = ''
        for (let i = 0; i < len; i++) {
          if (frame > i * 6 + 5) {
            out += target[i]
          } else if (frame > i * 4) {
            out += CHARS[Math.floor(Math.random() * CHARS.length)]
          } else {
            out += '<span style="opacity:0">' + target[i] + '</span>'
          }
        }
        el.innerHTML = out
        frame++
        if (frame <= total + 4) {
          frameRef.current = requestAnimationFrame(run)
        }
      }

      setTimeout(() => {
        frameRef.current = requestAnimationFrame(run)
      }, startDelay)
    },
    []
  )

  const cancel = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current)
  }, [])

  return { scramble, cancel }
}
```

- [ ] **Step 2：useMagneticButton — 磁性按钮偏移**

```ts
// src/hooks/useMagneticButton.ts
'use client'
import { useRef, useCallback } from 'react'

export function useMagneticButton(strength = 0.35) {
  const btnRef = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null)

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const btn = btnRef.current
      if (!btn) return
      const rect = btn.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) * strength
      const y = (e.clientY - rect.top - rect.height / 2) * strength
      btn.style.transform = `translate(${x}px, ${y}px)`
    },
    [strength]
  )

  const onMouseLeave = useCallback(() => {
    if (btnRef.current) btnRef.current.style.transform = ''
  }, [])

  return { btnRef, onMouseMove, onMouseLeave }
}
```

- [ ] **Step 3：useTilt3D — 3D 透视倾斜**

```ts
// src/hooks/useTilt3D.ts
'use client'
import { useRef, useCallback } from 'react'

export function useTilt3D(maxX = 10, maxY = 8) {
  const ref = useRef<HTMLDivElement | null>(null)

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width  - 0.5
      const y = (e.clientY - r.top)  / r.height - 0.5
      el.style.transform = `perspective(700px) rotateY(${x * maxX}deg) rotateX(${-y * maxY}deg) scale(1.02)`
      // Shine position as CSS custom properties
      el.style.setProperty('--sx', (e.clientX - r.left) + 'px')
      el.style.setProperty('--sy', (e.clientY - r.top)  + 'px')
    },
    [maxX, maxY]
  )

  const onMouseLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = ''
  }, [])

  return { ref, onMouseMove, onMouseLeave }
}
```

- [ ] **Step 4：useScrollspy — 滚动高亮导航**

```ts
// src/hooks/useScrollspy.ts
'use client'
import { useEffect, useState } from 'react'

export function useScrollspy(ids: string[], threshold = 0.25): string {
  const [active, setActive] = useState('')

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { threshold }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [ids, threshold])

  return active
}
```

- [ ] **Step 5：useCounter — 数字计数动画**

```ts
// src/hooks/useCounter.ts
'use client'
import { useEffect, useRef, useState } from 'react'

export function useCounter(target: number, duration = 1200) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLDivElement | null>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            setValue(Math.round(eased * target))
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [target, duration])

  return { value, ref }
}
```

- [ ] **Step 6：提交**

```bash
git add src/hooks/
git commit -m "feat: add useScramble, useMagneticButton, useTilt3D, useScrollspy, useCounter hooks"
```

---

## Task 7：CursorEffect 组件

**Files:**
- Create: `src/components/CursorEffect.tsx`

- [ ] **Step 1：创建组件**

```tsx
// src/components/CursorEffect.tsx
'use client'
import { useEffect, useRef } from 'react'

export default function CursorEffect() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouse   = useRef({ x: 0, y: 0 })
  const ring    = useRef({ x: 0, y: 0 })
  const rafRef  = useRef<number>(0)

  useEffect(() => {
    const dot  = dotRef.current
    const ringEl = ringRef.current
    if (!dot || !ringEl) return

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      dot.style.left    = e.clientX + 'px'
      dot.style.top     = e.clientY + 'px'
      dot.style.opacity = '1'
      ringEl.style.opacity = '1'
    }

    const onLeave = () => {
      dot.style.opacity    = '0'
      ringEl.style.opacity = '0'
    }

    const animateRing = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.1
      ring.current.y += (mouse.current.y - ring.current.y) * 0.1
      ringEl.style.left = ring.current.x + 'px'
      ringEl.style.top  = ring.current.y + 'px'
      rafRef.current = requestAnimationFrame(animateRing)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    rafRef.current = requestAnimationFrame(animateRing)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed', pointerEvents: 'none', zIndex: 8000,
          width: 8, height: 8, borderRadius: '50%',
          background: 'var(--red)',
          transform: 'translate(-50%,-50%)',
          opacity: 0, transition: 'opacity 0.3s',
          left: 0, top: 0,
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed', pointerEvents: 'none', zIndex: 7999,
          width: 36, height: 36, borderRadius: '50%',
          border: '1.5px solid oklch(0.50 0.195 7 / 0.4)',
          transform: 'translate(-50%,-50%)',
          opacity: 0, transition: 'opacity 0.3s, width 0.2s, height 0.2s, border-color 0.2s',
          left: 0, top: 0,
        }}
      />
    </>
  )
}
```

- [ ] **Step 2：在 page.tsx 中引入（先创建骨架 page.tsx）**

```tsx
// src/app/page.tsx
import CursorEffect from '@/components/CursorEffect'

export default function Home() {
  return (
    <main>
      <CursorEffect />
      {/* 后续任务逐步添加组件 */}
    </main>
  )
}
```

- [ ] **Step 3：本地验证**

```bash
npm run dev
```

访问 http://localhost:3000，移动鼠标，应看到红色小点和跟随环。

- [ ] **Step 4：提交**

```bash
git add src/components/CursorEffect.tsx src/app/page.tsx
git commit -m "feat: add custom cursor effect (dot + lagging ring)"
```

---

## Task 8：LoaderWipe 组件

**Files:**
- Create: `src/components/LoaderWipe.tsx`

- [ ] **Step 1：创建加载遮罩**

```tsx
// src/components/LoaderWipe.tsx
'use client'
import { useEffect, useRef } from 'react'

export default function LoaderWipe() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // 短暂停顿后触发擦除
    const t = setTimeout(() => {
      el.style.transform = 'scaleY(0)'
    }, 200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        background: 'var(--ink)',
        transformOrigin: 'top',
        transition: 'transform 0.9s cubic-bezier(0.76, 0, 0.24, 1)',
        pointerEvents: 'none',
      }}
    />
  )
}
```

- [ ] **Step 2：添加到 page.tsx**

```tsx
import LoaderWipe from '@/components/LoaderWipe'
// page.tsx <main> 内第一行加入 <LoaderWipe />
```

- [ ] **Step 3：本地验证**

刷新页面，深色遮罩应在 200ms 后向上收起。

- [ ] **Step 4：提交**

```bash
git add src/components/LoaderWipe.tsx src/app/page.tsx
git commit -m "feat: add loader wipe reveal animation"
```

---

## Task 9：Spotlight 组件

**Files:**
- Create: `src/components/Spotlight.tsx`

- [ ] **Step 1：创建全局聚光灯**

```tsx
// src/components/Spotlight.tsx
'use client'
import { useEffect, useRef } from 'react'

export default function Spotlight() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      el.style.setProperty('--mx', e.clientX + 'px')
      el.style.setProperty('--my', e.clientY + 'px')
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        background:
          'radial-gradient(circle 480px at var(--mx, 50%) var(--my, 50%), oklch(0.50 0.195 7 / 0.05) 0%, transparent 70%)',
      }}
    />
  )
}
```

- [ ] **Step 2：添加到 page.tsx，置于 CursorEffect 之后**

- [ ] **Step 3：提交**

```bash
git add src/components/Spotlight.tsx src/app/page.tsx
git commit -m "feat: add mouse-tracking spotlight overlay"
```

---

## Task 10：Nav 导航栏

**Files:**
- Create: `src/components/Nav.tsx`

- [ ] **Step 1：创建 Nav 组件**

```tsx
// src/components/Nav.tsx
'use client'
import { motion } from 'framer-motion'
import { useScrollspy } from '@/hooks/useScrollspy'
import { fadeIn } from '@/lib/motion'

const NAV_SECTIONS = ['research', 'pubs', 'projects', 'awards']
const NAV_LABELS: Record<string, string> = {
  research: 'Research',
  pubs:     'Publications',
  projects: 'Projects',
  awards:   'Awards',
}

export default function Nav() {
  const active = useScrollspy(NAV_SECTIONS, 0.25)

  return (
    <motion.nav
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      custom={0.9}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
        height: 52,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 52px',
        background: 'oklch(0.972 0.009 55 / 0.93)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--rule)',
      }}
    >
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.125rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        Yuan Junhao
      </span>

      <ul style={{ display: 'flex', gap: 28, listStyle: 'none' }}>
        {NAV_SECTIONS.map((id) => (
          <li key={id}>
            <a
              href={`#${id}`}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem', fontWeight: 500,
                letterSpacing: '0.07em', textTransform: 'uppercase',
                color: active === id ? 'var(--ink)' : 'var(--muted)',
                textDecoration: 'none',
                position: 'relative', paddingBottom: 2,
                transition: 'color 0.2s',
              }}
            >
              {NAV_LABELS[id]}
              {/* Red underline — visible when active or on hover via CSS */}
              <span
                style={{
                  position: 'absolute', bottom: -1, left: 0, right: 0, height: 1,
                  background: 'var(--red)',
                  transformOrigin: 'left',
                  transform: active === id ? 'scaleX(1)' : 'scaleX(0)',
                  transition: 'transform 0.25s cubic-bezier(.4,0,.2,1)',
                  display: 'block',
                }}
              />
            </a>
          </li>
        ))}
        <li>
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--muted)', textDecoration: 'none' }}
          >
            CV ↓
          </a>
        </li>
      </ul>
    </motion.nav>
  )
}
```

- [ ] **Step 2：添加到 page.tsx**

- [ ] **Step 3：本地验证**

滚动页面，导航应随各板块高亮对应链接。

- [ ] **Step 4：提交**

```bash
git add src/components/Nav.tsx src/app/page.tsx
git commit -m "feat: add fixed nav with scrollspy highlight"
```

---

## Task 11：Hero 区

**Files:**
- Create: `src/components/Hero.tsx`

- [ ] **Step 1：创建 Hero 组件**

```tsx
// src/components/Hero.tsx
'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, fadeIn, scaleX } from '@/lib/motion'
import { useScramble } from '@/hooks/useScramble'
import { useMagneticButton } from '@/hooks/useMagneticButton'
import { person } from '@/data/content'

export default function Hero() {
  const nameYuanRef   = useRef<HTMLParagraphElement>(null)
  const nameJunhaoRef = useRef<HTMLParagraphElement>(null)
  const { scramble } = useScramble()
  const { btnRef, onMouseMove, onMouseLeave } = useMagneticButton(0.35)

  useEffect(() => {
    // Trigger scramble after loader wipe + entrance delay
    const t1 = setTimeout(() => scramble(nameYuanRef.current,   'YUAN',     0),   850)
    const t2 = setTimeout(() => scramble(nameJunhaoRef.current, 'JUNHAO.', 180),  850)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [scramble])

  const nameStyle: React.CSSProperties = {
    fontFamily: 'var(--font-display)',
    fontWeight: 900,
    fontSize: 'clamp(6rem, 17vw, 13rem)',
    lineHeight: 0.9,
    letterSpacing: '0.01em',
    textTransform: 'uppercase',
    display: 'block',
    minHeight: '1em',
  }

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '100px 52px 60px',
        maxWidth: 1080, margin: '0 auto',
        position: 'relative',
      }}
    >
      {/* Eyebrow */}
      <motion.p
        variants={fadeUp} initial="hidden" animate="visible" custom={0.1}
        style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 20 }}
      >
        <motion.span variants={scaleX} initial="hidden" animate="visible" custom={0.15} style={{ display: 'inline-block', width: 20, height: 1, background: 'var(--red)', flexShrink: 0 }} />
        {person.eyebrow}
      </motion.p>

      {/* "Hi, I'm" */}
      <motion.p
        variants={fadeUp} initial="hidden" animate="visible" custom={0.22}
        style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(1.8rem,4.5vw,3.5rem)', lineHeight: 1, letterSpacing: '0.02em', textTransform: 'uppercase', color: 'var(--muted)' }}
      >
        Hi, I&apos;m
      </motion.p>

      {/* YUAN — scramble target */}
      <p ref={nameYuanRef} aria-label="Yuan" style={{ ...nameStyle, color: 'var(--ink)' }} />

      {/* JUNHAO. — scramble target, red */}
      <p ref={nameJunhaoRef} aria-label="Junhao." style={{ ...nameStyle, color: 'var(--red)', marginBottom: 24 }} />

      {/* Subtitle */}
      <motion.p
        variants={fadeUp} initial="hidden" animate="visible" custom={0.85}
        style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(0.95rem,1.6vw,1.25rem)', color: 'var(--muted)', marginBottom: 18 }}
      >
        {person.subtitle}
      </motion.p>

      {/* Rule */}
      <motion.div
        variants={scaleX} initial="hidden" animate="visible" custom={0.92}
        style={{ height: 1, background: 'var(--rule)', marginBottom: 18, width: 40 }}
      />

      {/* Bio */}
      <motion.p
        variants={fadeUp} initial="hidden" animate="visible" custom={0.98}
        style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.9375rem', lineHeight: 1.82, maxWidth: '50ch', marginBottom: 28 }}
        dangerouslySetInnerHTML={{ __html: person.bio.replace('co-designed', '<em>co-designed</em>').replace('neural scene representations', '<strong>neural scene representations</strong>') }}
      />

      {/* CTAs */}
      <motion.div
        variants={fadeUp} initial="hidden" animate="visible" custom={1.06}
        style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}
      >
        {/* Magnetic CV button */}
        <span onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} style={{ display: 'inline-block' }}>
          <a
            ref={btnRef as React.Ref<HTMLAnchorElement>}
            href={person.cvUrl}
            style={{
              padding: '12px 26px', background: 'var(--red)', color: '#fff',
              fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 600,
              border: 'none', borderRadius: 2, textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 6,
              transition: 'background 0.2s',
            }}
          >
            Download CV ↓
          </a>
        </span>

        {[
          { label: 'GitHub ↗',         href: person.github },
          { label: 'Google Scholar ↗', href: person.scholar },
          { label: 'Email',            href: `mailto:${person.email}` },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            style={{
              padding: '11px 22px', background: 'transparent', color: 'var(--ink)',
              fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 400,
              border: '1px solid var(--rule)', borderRadius: 2, textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 5,
              transition: 'border-color 0.2s',
            }}
          >
            {label}
          </a>
        ))}
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2：添加到 page.tsx**

- [ ] **Step 3：本地验证**

加载后 ~0.85s 出现名字乱码重组，鼠标靠近 "Download CV" 按钮应有磁性吸附效果。

- [ ] **Step 4：提交**

```bash
git add src/components/Hero.tsx src/app/page.tsx
git commit -m "feat: Hero section with scramble name, magnetic CTA, and staggered entrance"
```

---

## Task 12：StatsRow 统计行

**Files:**
- Create: `src/components/StatsRow.tsx`

- [ ] **Step 1：创建组件**

```tsx
// src/components/StatsRow.tsx
'use client'
import { useCounter } from '@/hooks/useCounter'
import { stats } from '@/data/content'

function StatItem({ value, label }: { value: number; label: string }) {
  const { value: count, ref } = useCounter(value)

  return (
    <div
      ref={ref}
      style={{ padding: '28px 52px', borderRight: '1px solid var(--rule)', display: 'flex', flexDirection: 'column', gap: 4 }}
    >
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(3rem,6vw,5rem)', lineHeight: 1, letterSpacing: '-0.02em' }}>
        {count}
      </span>
      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 400, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted)' }}>
        {label}
      </span>
    </div>
  )
}

export default function StatsRow() {
  return (
    <div style={{ borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
      {stats.map((s, i) => (
        <StatItem key={i} value={s.value} label={s.label} />
      ))}
    </div>
  )
}
```

- [ ] **Step 2：添加到 page.tsx（Hero 之后）**

- [ ] **Step 3：提交**

```bash
git add src/components/StatsRow.tsx src/app/page.tsx
git commit -m "feat: stats row with count-up animation on scroll"
```

---

## Task 13：Marquee 字幕条

**Files:**
- Create: `src/components/Marquee.tsx`

- [ ] **Step 1：创建组件**

```tsx
// src/components/Marquee.tsx
import { marqueeItems } from '@/data/content'

export default function Marquee() {
  // Duplicate items so seamless loop works at all viewport widths
  const doubled = [...marqueeItems, ...marqueeItems]

  return (
    <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', padding: '18px 0', borderBottom: '1px solid var(--rule)', background: 'var(--ink)' }}>
      <div style={{ display: 'inline-block', animation: 'marquee 20s linear infinite' }}>
        {doubled.map((item, i) => (
          <span key={i}>
            <span style={{ display: 'inline-block', fontFamily: 'var(--font-display)', fontWeight: 900, fontStyle: 'italic', fontSize: 'clamp(1.5rem,3.5vw,2.75rem)', letterSpacing: '0.01em', textTransform: 'uppercase', color: 'oklch(0.972 0.009 55)', padding: '0 36px' }}>
              {item}
            </span>
            <span style={{ color: 'oklch(0.972 0.009 55 / 0.2)', padding: '0 4px' }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2：添加到 page.tsx（StatsRow 之后）**

- [ ] **Step 3：提交**

```bash
git add src/components/Marquee.tsx src/app/page.tsx
git commit -m "feat: marquee scrolling text strip"
```

---

## Task 14：SectionWrapper 双列布局容器

**Files:**
- Create: `src/components/SectionWrapper.tsx`

- [ ] **Step 1：创建组件**

```tsx
// src/components/SectionWrapper.tsx
'use client'
import { motion } from 'framer-motion'
import { clipReveal } from '@/lib/motion'

interface Props {
  id: string
  label: string
  sublabel?: string
  children: React.ReactNode
}

export default function SectionWrapper({ id, label, sublabel, children }: Props) {
  return (
    <motion.div
      id={id}
      variants={clipReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.06 }}
      style={{ maxWidth: 1080, margin: '0 auto', padding: '64px 52px', borderTop: '1px solid var(--rule)' }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '170px 1fr', gap: 48, alignItems: 'start' }}>
        <div>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.8125rem', letterSpacing: '0.08em', textTransform: 'uppercase', lineHeight: 1.4 }}>
            {label}
          </p>
          {sublabel && (
            <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.6875rem', color: 'var(--muted)', marginTop: 4 }}>
              {sublabel}
            </p>
          )}
        </div>
        <div>{children}</div>
      </div>
    </motion.div>
  )
}
```

- [ ] **Step 2：提交**

```bash
git add src/components/SectionWrapper.tsx
git commit -m "feat: SectionWrapper with clip-path scroll reveal and two-column layout"
```

---

## Task 15：ResearchSection 研究兴趣

**Files:**
- Create: `src/components/ResearchSection.tsx`

- [ ] **Step 1：创建组件**

```tsx
// src/components/ResearchSection.tsx
'use client'
import SectionWrapper from './SectionWrapper'
import { useTilt3D } from '@/hooks/useTilt3D'
import { interests } from '@/data/content'

function InterestCell({ name, desc }: { name: string; desc: string }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt3D(10, 8)

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        background: 'var(--bg)', padding: '22px 24px',
        cursor: 'default', position: 'relative', overflow: 'hidden',
        transformStyle: 'preserve-3d', transition: 'background 0.2s',
      }}
    >
      {/* Shine follows --sx/--sy set by useTilt3D */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(circle at var(--sx, 50%) var(--sy, 50%), oklch(1 0 0 / 0.12) 0%, transparent 60%)',
      }} />
      <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9375rem', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 6, position: 'relative', transition: 'color 0.2s' }}>
        {name}
      </p>
      <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.8125rem', color: 'var(--muted)', lineHeight: 1.65, position: 'relative' }}>
        {desc}
      </p>
    </div>
  )
}

export default function ResearchSection() {
  return (
    <SectionWrapper id="research" label="Research Interests" sublabel="4 areas">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--rule)', border: '1px solid var(--rule)' }}>
        {interests.map((item) => (
          <InterestCell key={item.name} name={item.name} desc={item.desc} />
        ))}
      </div>
    </SectionWrapper>
  )
}
```

- [ ] **Step 2：添加到 page.tsx**

- [ ] **Step 3：本地验证**

悬停研究兴趣格子，应有 3D 倾斜 + 追光效果。

- [ ] **Step 4：提交**

```bash
git add src/components/ResearchSection.tsx src/app/page.tsx
git commit -m "feat: research interests section with 3D tilt and shine"
```

---

## Task 16：PublicationsSection

**Files:**
- Create: `src/components/PublicationsSection.tsx`

- [ ] **Step 1：创建组件**

```tsx
// src/components/PublicationsSection.tsx
'use client'
import { useState } from 'react'
import SectionWrapper from './SectionWrapper'
import { publications } from '@/data/content'

export default function PublicationsSection() {
  return (
    <SectionWrapper id="pubs" label="Publications" sublabel={`${publications.length} paper`}>
      <div>
        {publications.map((pub, i) => (
          <div
            key={i}
            style={{ padding: '28px 0', borderBottom: '1px solid var(--rule)', position: 'relative', transition: 'padding-left 0.25s cubic-bezier(.4,0,.2,1)' }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.paddingLeft = '16px'
              const bar = e.currentTarget.querySelector<HTMLSpanElement>('.pub-bar')
              if (bar) bar.style.transform = 'scaleY(1)'
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.paddingLeft = '0'
              const bar = e.currentTarget.querySelector<HTMLSpanElement>('.pub-bar')
              if (bar) bar.style.transform = 'scaleY(0)'
            }}
          >
            {/* Left red bar */}
            <span className="pub-bar" style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 2, background: 'var(--red)', transform: 'scaleY(0)', transformOrigin: 'top', transition: 'transform 0.3s cubic-bezier(.4,0,.2,1)', display: 'block' }} />

            {/* Venue */}
            <p style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'var(--font-display)', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: 10 }}>
              <span style={{ display: 'inline-block', width: 10, height: 1.5, background: 'currentColor' }} />
              {pub.venue}
            </p>

            {/* Title */}
            <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '1.125rem', letterSpacing: '-0.015em', lineHeight: 1.42, marginBottom: 8, transition: 'color 0.2s' }}>
              {pub.title}
            </h3>

            {/* Authors */}
            <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.8125rem', color: 'var(--muted)', marginBottom: 14, lineHeight: 1.5 }}>
              {pub.authors.map((a, j) => (
                <span key={j}>
                  {j > 0 && ' · '}
                  {a === pub.selfAuthor ? <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>{a}</strong> : a}
                </span>
              ))}
            </p>

            {/* Links */}
            <div style={{ display: 'flex', gap: 16 }}>
              {Object.entries(pub.links).map(([key, href]) => (
                <a
                  key={key}
                  href={href}
                  style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 500, color: 'var(--muted)', textDecoration: 'none', textTransform: 'capitalize', transition: 'color 0.2s' }}
                >
                  {key === 'bibtex' ? 'BibTeX' : key.charAt(0).toUpperCase() + key.slice(1)}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
```

- [ ] **Step 2：添加到 page.tsx**

- [ ] **Step 3：提交**

```bash
git add src/components/PublicationsSection.tsx src/app/page.tsx
git commit -m "feat: publications section with hover left-bar reveal"
```

---

## Task 17：AwardsSection

**Files:**
- Create: `src/components/AwardsSection.tsx`

- [ ] **Step 1：创建组件**

```tsx
// src/components/AwardsSection.tsx
import SectionWrapper from './SectionWrapper'
import { awards } from '@/data/content'

export default function AwardsSection() {
  return (
    <SectionWrapper id="awards" label="Awards" sublabel="National level">
      <div>
        {awards.map((a, i) => (
          <div
            key={i}
            style={{ display: 'flex', alignItems: 'baseline', gap: 16, padding: '15px 0', borderBottom: '1px solid var(--rule)', cursor: 'default', transition: 'padding-left 0.2s' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.paddingLeft = '8px' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.paddingLeft = '0' }}
          >
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'var(--muted)', fontVariantNumeric: 'tabular-nums', width: 36, flexShrink: 0 }}>
              {a.year}
            </span>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '0.9375rem', fontWeight: 400, flex: 1, lineHeight: 1.4, transition: 'color 0.2s' }}>
              {a.name}
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff', background: 'var(--red)', padding: '3px 9px', borderRadius: 2, flexShrink: 0 }}>
              {a.level}
            </span>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
```

- [ ] **Step 2：添加到 page.tsx**

- [ ] **Step 3：提交**

```bash
git add src/components/AwardsSection.tsx src/app/page.tsx
git commit -m "feat: awards section"
```

---

## Task 18：ProjectsSection（3D 倾斜网格）

**Files:**
- Create: `src/components/ProjectsSection.tsx`

- [ ] **Step 1：创建组件**

```tsx
// src/components/ProjectsSection.tsx
'use client'
import SectionWrapper from './SectionWrapper'
import { useTilt3D } from '@/hooks/useTilt3D'
import { projects } from '@/data/content'

function ProjectCard({ name, desc, tags, url }: typeof projects[0]) {
  const { ref, onMouseMove, onMouseLeave } = useTilt3D(8, 6)

  return (
    <a
      ref={ref as React.Ref<HTMLAnchorElement>}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={onMouseMove as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      onMouseLeave={onMouseLeave as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      style={{
        background: 'var(--bg)', padding: 24, textDecoration: 'none', color: 'inherit',
        display: 'block', position: 'relative', overflow: 'hidden', transformStyle: 'preserve-3d',
        transition: 'background 0.18s',
      }}
    >
      {/* Shine */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(circle at var(--sx,50%) var(--sy,50%), oklch(1 0 0/0.14) 0%, transparent 55%)' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, position: 'relative' }}>
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', fontWeight: 600, letterSpacing: '-0.01em', transition: 'color 0.2s' }}>{name}</span>
        <span style={{ fontSize: '1rem', color: 'oklch(0.80 0 0)', transition: 'transform 0.2s, color 0.2s' }}>↗</span>
      </div>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', fontWeight: 300, color: 'var(--muted)', lineHeight: 1.65, marginBottom: 12, position: 'relative' }}>{desc}</p>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', position: 'relative' }}>
        {tags.map((t) => (
          <span key={t} style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', color: 'var(--muted)', border: '1px solid var(--rule)', padding: '2px 8px', borderRadius: 2 }}>{t}</span>
        ))}
      </div>
    </a>
  )
}

export default function ProjectsSection() {
  return (
    <SectionWrapper id="projects" label="Projects" sublabel="GitHub">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--rule)', border: '1px solid var(--rule)' }}>
        {projects.map((p) => (
          <ProjectCard key={p.name} {...p} />
        ))}
      </div>
    </SectionWrapper>
  )
}
```

- [ ] **Step 2：添加到 page.tsx**

- [ ] **Step 3：提交**

```bash
git add src/components/ProjectsSection.tsx src/app/page.tsx
git commit -m "feat: projects section with 3D tilt grid"
```

---

## Task 19：Footer

**Files:**
- Create: `src/components/Footer.tsx`

- [ ] **Step 1：创建组件**

```tsx
// src/components/Footer.tsx
import { person } from '@/data/content'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{ borderTop: '3px solid var(--ink)', maxWidth: 1080, margin: '0 auto', padding: '24px 52px 52px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        Yuan Junhao
      </span>
      <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.75rem', color: 'var(--muted)' }}>
        <a href={`mailto:${person.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>{person.email}</a>
        {' · '}Updated {year}
      </span>
    </footer>
  )
}
```

- [ ] **Step 2：添加到 page.tsx（最后）**

- [ ] **Step 3：page.tsx 最终完整版本验证**

确认 page.tsx 按以下顺序包含所有组件：

```
CursorEffect → LoaderWipe → Spotlight → Nav →
Hero → StatsRow → Marquee →
ResearchSection → PublicationsSection → AwardsSection → ProjectsSection →
Footer
```

- [ ] **Step 4：提交**

```bash
git add src/components/Footer.tsx src/app/page.tsx
git commit -m "feat: footer and complete page composition"
```

---

## Task 20：响应式样式

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/components/Nav.tsx`（汉堡菜单）

- [ ] **Step 1：在 globals.css 添加响应式规则**

```css
/* globals.css 末尾追加 */

/* Section two-column → single column at 620px */
@media (max-width: 620px) {
  /* SectionWrapper 的 grid 通过 inline style 设置，改用 CSS override */
  [data-section-grid] {
    grid-template-columns: 1fr !important;
    gap: 20px !important;
  }
  /* Interest and project grids */
  [data-two-col-grid] {
    grid-template-columns: 1fr !important;
  }
}

/* Hero padding on mobile */
@media (max-width: 480px) {
  section, .sec, footer {
    padding-left: 24px !important;
    padding-right: 24px !important;
  }
}
```

- [ ] **Step 2：在 SectionWrapper.tsx 和网格 div 上添加 data 属性**

在 SectionWrapper 的内层 grid div 上加 `data-section-grid`；在 ResearchSection 和 ProjectsSection 的网格 div 上加 `data-two-col-grid`。

- [ ] **Step 3：Nav 在 480px 以下隐藏链接（简化版，不做汉堡菜单）**

在 Nav.tsx 的 `<ul>` 上加：

```tsx
style={{ ..., display: 'flex', gap: 28, listStyle: 'none' }}
// 在 globals.css 追加：
// @media (max-width: 480px) { nav ul { display: none !important; } }
```

- [ ] **Step 4：本地验证**

拖小浏览器窗口，各板块应正确折叠为单列。

- [ ] **Step 5：提交**

```bash
git add src/app/globals.css src/components/SectionWrapper.tsx src/components/ResearchSection.tsx src/components/ProjectsSection.tsx src/components/Nav.tsx
git commit -m "feat: responsive layout — two-column collapses at 620px"
```

---

## Task 21：可访问性修复 & reduced-motion

**Files:**
- Modify: `src/components/Hero.tsx`
- Modify: `src/lib/motion.ts`

- [ ] **Step 1：名字 aria-label 确认**

Hero.tsx 中的乱码容器已有 `aria-label="Yuan"` 和 `aria-label="Junhao."`，屏幕阅读器读原始文字。无需改动。

- [ ] **Step 2：所有 motion.div 加 reduced-motion 兜底**

在 `src/lib/motion.ts` 中，所有 variants 的 `transition` 加：

```ts
transition: { ..., type: 'tween' }
```

Framer Motion 在 `prefers-reduced-motion: reduce` 时自动跳过动画，已覆盖。

- [ ] **Step 3：CursorEffect 在 reduced-motion 时隐藏**

```tsx
// CursorEffect.tsx useEffect 内添加检查
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
if (prefersReduced) return
```

- [ ] **Step 4：提交**

```bash
git add src/components/CursorEffect.tsx src/lib/motion.ts
git commit -m "fix: accessibility — aria-labels, reduced-motion cursor skip"
```

---

## Task 22：构建验证 & 部署

- [ ] **Step 1：本地完整构建**

```bash
npm run build
```

预期：无 TypeScript 报错，`out/` 目录生成。

- [ ] **Step 2：本地预览静态产物**

```bash
npx serve out
```

访问 http://localhost:3000，验证所有动效正常，刷新不报 404。

- [ ] **Step 3：在 GitHub 创建仓库并推送**

```bash
git remote add origin https://github.com/<username>/<repo>.git
git branch -M main
git push -u origin main
```

- [ ] **Step 4：确认 GitHub Actions 触发**

打开仓库 → Actions 标签页，等待 `Deploy to GitHub Pages` workflow 完成（约 2 分钟）。

- [ ] **Step 5：访问 GitHub Pages 验证**

`https://<username>.github.io/<repo>/` 应正常显示，所有动效可用。

- [ ] **Step 6：最终提交**

```bash
git add .
git commit -m "chore: production build verified and deployed to GitHub Pages"
git push
```

---

## 自检结果

| 规范要求 | 对应任务 | 状态 |
|----------|----------|------|
| Big Shoulders Display / Spectral / Geist 字体 | Task 3 | ✓ |
| 调色板 CSS 变量（OKLCH） | Task 2 | ✓ |
| 加载遮罩擦除 | Task 8 | ✓ |
| 文字乱码重组（YUAN / JUNHAO.） | Task 6 + Task 11 | ✓ |
| 全局鼠标聚光灯 | Task 9 | ✓ |
| 自定义鼠标 | Task 7 | ✓ |
| 磁性 CV 按钮 | Task 6 + Task 11 | ✓ |
| Hero 入场动画（错落时序） | Task 11 | ✓ |
| 统计数字计数动画 | Task 6 + Task 12 | ✓ |
| Marquee 字幕条 | Task 13 | ✓ |
| SectionWrapper clip-path 擦入 | Task 14 | ✓ |
| 研究兴趣 3D 倾斜 + 追光 | Task 6 + Task 15 | ✓ |
| 论文左侧红色竖线悬停展开 | Task 16 | ✓ |
| 项目网格 3D 倾斜 | Task 6 + Task 18 | ✓ |
| Scrollspy 导航高亮 | Task 6 + Task 10 | ✓ |
| 响应式折叠（620px） | Task 20 | ✓ |
| reduced-motion 兜底 | Task 2 + Task 21 | ✓ |
| GitHub Pages 部署 | Task 1 + Task 22 | ✓ |
