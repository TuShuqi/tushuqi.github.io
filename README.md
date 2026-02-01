# 炫酷互动体验个人主页

一个使用 Three.js 和原生 JavaScript 创建的炫酷互动体验个人主页。

## ✨ 特性

- 🌌 **3D 粒子星空背景** - 使用 Three.js 创建的动态粒子系统
- 🖱️ **鼠标跟随特效** - 鼠标移动时产生光晕轨迹
- 💫 **点击波纹动画** - 点击页面产生扩散波纹效果
- 📜 **滚动视差效果** - 不同层级以不同速度滚动
- ⌨️ **打字机效果** - 动态文字显示
- 🎨 **玻璃态卡片** - 现代化的毛玻璃设计
- 📱 **响应式设计** - 完美适配桌面、平板和手机

## 🚀 快速开始

### 本地预览

1. 克隆或下载此项目
2. 直接在浏览器中打开 `index.html` 文件

### 部署到 GitHub Pages

1. 创建一个名为 `username.github.io` 的仓库（将 `username` 替换为你的 GitHub 用户名）

2. 将代码推送到仓库：
```bash
git init
git add .
git commit -m "Initial commit: 炫酷互动体验主页"
git branch -M main
git remote add origin https://github.com/username/username.github.io.git
git push -u origin main
```

3. 几分钟后，访问 `https://username.github.io` 即可看到你的网站

## 📝 自定义

### 修改个人信息

编辑 `index.html` 文件：

```html
<!-- 修改标题 -->
<h1 class="title">你的名字</h1>

<!-- 修改打字机文字 -->
<!-- 在 js/main.js 中修改 -->
const text = '欢迎来到我的个人空间 ✨';

<!-- 修改社交链接 -->
<a href="https://github.com/yourusername" target="_blank">
```

### 调整粒子效果

编辑 `js/particles.js`：

```javascript
// 修改粒子数量
const particleCount = 5000;

// 修改粒子颜色
color: 0x64ffda,

// 修改粒子大小
size: 0.8,
```

### 更改配色方案

编辑 `css/style.css`：

```css
/* 主背景渐变 */
background: linear-gradient(135deg, #0a0e27 0%, #1a1a2e 100%);

/* 强调色 */
color: #64ffda; /* 青色 */
color: #bb86fc; /* 紫色 */
```

## 📁 项目结构

```
.
├── index.html          # 主页面
├── css/
│   └── style.css       # 样式文件
├── js/
│   ├── particles.js    # Three.js 粒子系统
│   ├── mouse.js        # 鼠标交互效果
│   └── main.js         # 主逻辑（打字机、视差等）
└── README.md           # 项目说明
```

## 🎨 技术栈

- **Three.js** - 3D 图形库
- **原生 JavaScript** - 无框架依赖
- **CSS3** - 现代 CSS 特性
- **HTML5** - 语义化标签

## 🌟 特效说明

### 3D 粒子系统
- 5000+ 个粒子在 3D 空间中漂浮
- 粒子之间根据距离自动连线
- 鼠标移动时产生力场效果，粒子会被推开

### 鼠标跟随
- Canvas 绘制的光点轨迹
- 渐变色彩（青色到紫色）
- 自动淡出效果

### 点击波纹
- CSS 动画实现
- 径向渐变扩散
- 自动清理 DOM 元素

### 滚动视差
- 不同层级使用不同的滚动速度
- 使用 `data-speed` 属性控制
- 节流优化性能

## 📱 响应式支持

- **桌面端**（>768px）：全部特效
- **平板**（768px）：简化粒子数量
- **手机**（<480px）：优化布局，保留核心视觉

## ⚡ 性能优化

- 使用 `requestAnimationFrame` 优化动画
- 事件节流（throttle）减少计算
- 移动端自动降低粒子数量
- 使用 CSS `transform` 而非 `position`

## 📄 许可证

MIT License - 随意使用和修改

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

Made with ❤️ and Three.js
