# 球球 AI 篮球教练

球球是一款面向篮球爱好者的 AI 投篮训练原型：用户上传训练视频后，可查看动作问题、获得针对性建议，并把练习加入个人训练计划。

## 在线体验

- [打开最新完整原型 · iPhone 17 Pro 样机](https://22yuran.github.io/qiuchiu-ai-basketball-coach/?v=20260922-release2)
- [浏览 main 分支源代码](https://github.com/22yuran/qiuchiu-ai-basketball-coach/tree/main)
- [预期技术实现：视频、模型分析、结果输出与 API](docs/technical-implementation.md)

| 最新首页 | 
| --- | --- |
| ![最新首页与 iPhone 17 Pro 样机](media/preview-home-20260922.png) |

在线地址是同一个持续更新的站点；`v` 是刷新标识，并非历史版本选择器。macOS / iOS 通过系统字体调用 SF，未安装 SF 的其他平台使用系统无衬线字体回退。

## 核心体验

- 采集惯用手、训练场地和投篮点位
- 模拟视频解析与分析进度
- 查看投篮问题、时间点与动作辅助骨骼线
- 针对单次投篮继续询问 AI
- 查看历史对话并切换不同问题上下文
- 将建议加入训练计划，并在首页同步展示

## 推荐演示路径

1. 在首页点击“去填写”。
2. 依次完成惯用手、训练场地和投篮点位选择。
3. 确认信息并上传视频，体验分析 Loading。
4. 在分析页点击视频区域查看进度轴与问题气泡。
5. 展开任意问题卡片，体验建议、AI 提问和对话过程。
6. 点击“加入训练计划”，返回首页查看计划联动。

## 本地运行

本项目是无构建依赖的静态站点。建议通过本地静态服务器运行：

```bash
python3 -m http.server 8080
```

随后访问：

```text
http://localhost:8080
```

## 项目结构

```text
.
├── index.html                 # 唯一入口与 iPhone 17 Pro 演示外壳
├── pages/
│   ├── home.html              # 首页与训练计划
│   ├── collect-*.html         # 信息采集流程
│   ├── loading.html           # 视频解析状态
│   ├── analysis.html          # 分析、AI 对话与训练建议
│   └── shell-status-hidden.css
├── media/                     # 仓库预览素材
├── docs/technical-implementation.md # 产品落地技术方案（待实现）
└── NOTICE.md                  # 素材与字体说明
```

## 技术说明

- 使用原生 HTML、CSS 和 JavaScript，无需安装依赖。
- `index.html` 通过单一入口组织完整体验，各页面不会跳转为多个外部网址。
- 页面之间使用 `postMessage` 传递流程状态和训练计划。
- 微动效主要使用 CSS Transitions 与 Web Animations API。
- 支持 `prefers-reduced-motion`，降低系统设置下的动态效果。

## AI 能力与边界

当前作品用于验证产品体验，视频上传、视觉动作识别和 AI 回复均为前端原型模拟，没有连接真实模型或后端服务。原型重点展示：输入信息如何进入分析流程、AI 结果如何呈现，以及用户如何基于结果继续追问和形成训练计划。

## 预期技术实现（产品真正落地）

建议采用“专用视觉模型提取动作证据 + 多模态大模型解释 + 审核训练库生成计划”的组合。后端拟使用 Python / FastAPI、对象存储、任务队列、FFmpeg 和姿态识别服务；大模型经服务端调用 Responses API，接收关键帧与可验证指标，输出结构化结果。完整视频处理与模型服务需另行部署，不能由 GitHub Pages 承担。

预期链路：上传视频 → 质量检查与转码 → 投篮分段与姿态分析 → 证据校验 → 问题卡片与训练建议 → 有上下文的 AI 追问 → 保存训练计划。

[查看完整技术方案](docs/technical-implementation.md)：包含模型职责、API 契约、输出数据示例、稳定性定义、低置信度处理、评测方法与分阶段落地路径。方案是后续工程规划，不代表本仓库已接入真实 AI。

## 体验环境

- 推荐桌面版 Chrome 或 Safari 最新版本。
- 页面在银色 iPhone 17 Pro 风格的交互样机内展示，并随窗口大小缩放。
- 刷新页面会重新开始本次演示流程。

## 说明

产品问题、目标用户、方案推导和关键取舍将在配套产品说明 PPT 中展开；本仓库聚焦可运行作品及其技术说明。
