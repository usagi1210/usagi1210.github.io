# 个人主页设计规范 — 袁俊豪

**日期：** 2026-06-02  
**状态：** ✅ 用户最终确认（v9）  
**技术栈：** React / Next.js（静态导出）+ Framer Motion → GitHub Pages  
**参考原型：** `.superpowers/brainstorm/.../homepage-v9.html`

---

## 1. 目标与受众

袁俊豪的个人学术主页，智能科学与技术专业大三在读，研究方向为计算机视觉与计算成像。

**主要受众：** 博士申请委员会与导师——需要快速扫描研究方向、学术成果和个人特质。  
**次要受众：** 长期学术 networking——CV / 计算成像领域的研究者。

---

## 2. 品牌气质

**精准 · 现代 · 有野心**

主页以学术性格和研究品味为主导，而非成果数量。大三学生成果有限的现实被重新定位为专注而有方向感的起点。设计本身完成定位工作。

---

## 3. 调色板

| 变量 | 值 | 用途 |
|------|-----|------|
| `--bg` | `oklch(0.972 0.009 55)` | 页面背景——微暖米白，非奶油色 |
| `--ink` | `oklch(0.11 0 0)` | 正文与标题 |
| `--red` | `oklch(0.50 0.195 7)` | 品牌强调色——Hero 中的"JUNHAO."、场馆标签、悬停态、徽章 |
| `--red-hi` | `oklch(0.42 0.180 7)` | 红色悬停 / 激活态 |
| `--red-lo` | `oklch(0.50 0.195 7 / 0.08)` | 单元格悬停背景淡红色 |
| `--muted` | `oklch(0.50 0 0)` | 次要文字、元信息标签 |
| `--rule` | `oklch(0.86 0.004 55)` | 分割线、卡片边框 |

**配色策略：** 克制型。红色占视觉面积 ≤10%。背景承载温暖感，红色承载品牌感。

---

## 4. 字体系统

三套字体，各司其职：

| 字体 | 字重 | 职责 |
|------|------|------|
| **Big Shoulders Display** | 400, 900 | 仅用于 Hero 展示大字——"Hi, I'm / YUAN / JUNHAO." |
| **Spectral** | 300, 400, 600（含斜体） | 板块标题、论文标题、副标题 |
| **Geist** | 300, 400, 500, 600 | 导航、正文、标签、徽章 |

**全页字重对比层级（从上至下）：**

1. `Big Shoulders 900` — Hero 姓名行（最大字重）
2. `Big Shoulders 400` — Hero 引言"Hi, I'm"（Hero 内对比降落）
3. `Spectral 600` — 论文 / 项目标题
4. `Spectral 300 斜体` — Hero 副标题、装饰性次要行
5. `Geist 300` — 正文段落、描述文字（最小字重）
6. `Geist 500–600` — 导航链接、标签、徽章

**字号：** 全站使用 `clamp()` 流体字号。Hero 姓名：`clamp(6rem, 17vw, 13.5rem)`。Hero 展示区外任何标题均不超过 6rem。

---

## 5. 页面结构

### 5.1 导航栏（固定）
- 背景：`--bg / 0.92` + `backdrop-filter: blur(14px)`
- 左侧：「YUAN JUNHAO」Big Shoulders Display 700
- 右侧：Research · Publications · Projects · Awards · CV ↓
- 悬停：红色下划线从左侧滑入（`scaleX` 过渡）
- 进入动画：Hero 动画完成后 0.9s 延迟淡入

### 5.2 Hero 区（100vh）
布局：单列，左对齐，`max-width: 1080px`，`padding: 100px 48px 64px`。

```
[眉题行] ← Geist 500，0.6875rem，全大写，muted，左侧 20px 红色短线
Hi, I'm   ← Big Shoulders 400，~3–4rem，muted 色
YUAN      ← Big Shoulders 900，6–13.5rem，--ink
JUNHAO.   ← Big Shoulders 900，6–13.5rem，--red
[副标题]  ← Spectral 300 斜体，~1.125rem，muted
[40px 分割线]
[简介段落] ← Geist 300，0.9375rem，最大 50ch
[CTA 行]  ← 下载简历（红色填充）· GitHub · Scholar · Email（描边）
```

**入场动画**（错落分布，Framer Motion）：
- 眉题：fadeUp，延迟 0.1s
- "Hi, I'm"：fadeUp，延迟 0.22s
- "YUAN"：逐字符弹入，延迟 0.36s 起，每字 0.06s 错落
- "JUNHAO."：逐字符弹入，延迟 0.58s 起，每字 0.06s 错落（红色）
- 副标题：fadeUp，延迟 0.82s
- 简介：fadeUp，延迟 0.94s
- CTA：fadeUp，延迟 1.06s
- 导航：fadeIn，延迟 0.9s
- 缓动：`cubic-bezier(0.15, 0, 0, 1)`，时长 0.65–0.72s

**鼠标视差：** Hero 区随鼠标移动，背景层轻微位移（`±12px`），创造纵深感（Framer Motion `useMousePosition`）。

### 5.3 研究兴趣板块
双列布局：`170px 标签 | 1fr 内容`。

- 标签：Big Shoulders Display 700 全大写 + Geist 300 小字说明
- 内容：2×2 格子，1px `--rule` 线分隔
- 格子：展示字体 700 全大写标题 + Geist 300 描述
- 悬停：背景 → `--red-lo`，标题 → `--red`，鼠标跟随光晕效果

### 5.4 论文发表板块
同双列布局。每篇论文条目：

- 场馆徽章：Display 字体 700，红色，左侧 10px 红线前缀
- 标题：Spectral 600，1.125rem
- 作者：Geist 300，本人名字加粗 Geist 600
- 链接行：Paper · Code · Project Page · BibTeX（悬停下划线滑入）
- 悬停：条目右移 16px，左侧 2px 红色竖线从上向下展开（`scaleY`）

### 5.5 荣誉奖项板块
同双列布局。每行：

- 年份：Geist 400 等宽数字，muted
- 名称：Spectral 400，占满剩余宽度
- 徽章：Big Shoulders 700，白字红底，全大写
- 悬停：行右移 8px，名称 → 红色

### 5.6 项目板块
同双列布局。每项为 `<a>` 链接：

- 名称：Spectral 600
- 描述：Geist 300
- 标签：小号描边胶囊
- 右上角箭头 ↗：悬停时斜向位移 + 变红
- 悬停：行右移 10px，名称 → 红色

### 5.7 页脚
- 顶部：3px solid `--ink` 粗线
- 左侧：Big Shoulders 900「YUAN JUNHAO」
- 右侧：Geist 300 邮箱 + 更新日期

---

## 6. 交互与动效

| 元素 | 触发条件 | 效果 |
|------|----------|------|
| Hero 姓名 | 页面加载 | 逐字符弹入，错落时序 |
| Hero 背景 | 鼠标移动 | 视差位移 `±12px`，Framer Motion useMousePosition |
| 导航链接 | 悬停 | 红色下划线 `scaleX(0→1)`，左起 |
| 滚动位置 | 滚动 | 导航当前板块高亮（scrollspy） |
| 板块条目 | 悬停 | `padding-left` 微移 + 左侧红色竖线 `scaleY(0→1)` |
| 兴趣格子 | 悬停 | 背景淡红 + 标题变红 + 鼠标跟随光晕 |
| 论文链接 | 悬停 | `scaleX` 下划线 |
| 奖项行 | 悬停 | 右移 + 名称变红 |
| 项目行 | 悬停 | 右移 + 名称变红 + 箭头斜移 |
| 各板块 | 滚动进入视口 | `opacity 0→1` + `translateY 24→0`，阈值 8% |
| 所有过渡 | — | `cubic-bezier(0.4, 0, 0.2, 1)`，200–300ms |
| 减弱动效 | `prefers-reduced-motion` | 所有动画禁用 |

### 最终确认的动效全集（v9）

| 效果 | 实现方式 |
|------|----------|
| 页面加载遮罩擦除 | 深色全屏 `div`，`scaleY(0)` CSS 过渡，200ms 延迟触发 |
| 文字乱码重组 | 纯 JS：每帧随机字符 → 按字母逐步"解码"为真实名字 |
| 全局鼠标聚光灯 | `position:fixed` 的 `radial-gradient`，CSS 自定义属性跟随鼠标坐标 |
| 自定义鼠标（点 + 环） | `position:fixed` 双层，环以 0.1 系数滞后跟随（rAF 循环） |
| 磁性按钮 | `mousemove` 计算偏移，按钮 `translate` 0.35 系数吸向鼠标 |
| 3D 透视倾斜卡片 | `perspective(700px) rotateY/X` + hover 追光 `radial-gradient` |
| 大号字幕滚动条 | CSS `@keyframes`，深色背景，Big Shoulders Display 900 斜体 |
| 统计数字计数 | `IntersectionObserver` + rAF 递增，`Math.ceil((target-v)/5)` 缓出 |
| Clip-path 板块擦入 | `clip-path: inset(0 0 100% 0)` → `inset(0 0 0% 0)`，0.8s |
| Scrollspy 导航高亮 | `IntersectionObserver` threshold 0.25，激活时红色下划线 |

---

## 7. 响应式布局

- `max-width: 1080px` 居中，`48px` 水平内边距
- 双列板块布局在 `620px` 以下折叠为单列
- Hero 展示字体通过 `clamp()` 自适应缩放，任何视口宽度均无溢出
- 导航在 `480px` 以下折叠为汉堡菜单（实现阶段细节）

---

## 8. 无障碍访问

- 全站符合 WCAG AA 标准
- `--ink` 对 `--bg`：对比度 ≥ 7:1 ✓
- `--muted` 对 `--bg`：对比度 ≥ 3.5:1 ✓
- 白色对 `--red`（`oklch 0.50`）：对比度 ≥ 4.5:1 ✓
- 所有 `<a>` 标签含有意义的文字内容
- 语义化 HTML：`<nav>`、`<section>`、`<h1>`–`<h3>`、`<footer>`
- 内容不依赖动画类可见性（动画仅为增强，不控制显隐）

---

## 9. 技术说明

- **框架：** Next.js 14+ App Router，`output: 'export'` 静态导出至 GitHub Pages
- **动画：** Framer Motion — `motion.div` 配合 `initial / animate / whileInView / useMousePosition`
- **字体：** Google Fonts 通过 `next/font/google` 引入（自托管，性能优先）
- **部署：** GitHub Actions → `gh-pages` 分支
- **内容管理：** 无 CMS，内容硬编码在组件 props 中，手动更新简单直接
