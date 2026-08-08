# <p align="center">GitMe: AI-Powered GitHub Profile Analyzer & Developer Impact Dashboard</p>

<p align="center">
  <img src="public/gitme_banner.png" alt="GitMe Banner - GitHub Profile Analytics & Resume Builder" width="800">
</p>

<p align="center">
  <strong>Synthesize Raw Code into Professional Narratives. Visualize Real Growth.</strong>
</p>

<p align="center">
  <a href="https://github.com/atique-ahmad-01/portfolio.dev/stargazers"><img src="https://img.shields.io/github/stars/atique-ahmad-01/portfolio.dev?style=for-the-badge&color=yellow" alt="stars"></a>
  <a href="https://github.com/atique-ahmad-01/portfolio.dev/network/members"><img src="https://img.shields.io/github/forks/atique-ahmad-01/portfolio.dev?style=for-the-badge&color=blue" alt="forks"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge" alt="license"></a>
</p>

<p align="center">
  This is <a href="https://github.com/atique-ahmad-01">Atique Ahmad</a>'s personal portfolio, built on GitMe.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind">
  <img src="https://img.shields.io/badge/GitHub_GraphQL-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub API">
  <img src="https://img.shields.io/badge/AI_Powered-OpenRouter-orange?style=flat-square" alt="AI Powered">
</p>

---

## Why GitMe?

In the modern hiring landscape, a **GitHub Profile** is more than a portfolio; it's a living resume. However, standard profiles often obscure the **depth and quality** of work under simple contribution squares.

**GitMe** bridges the gap between raw data and developer identity. It doesn't just list commits; it analyzes **impact**, identifies **core competencies**, and provides an **AI-driven synthesis** of your professional journey.

---

## Performance-Driven Features

### Deep Contribution Analytics
Go beyond the 12-month window. Visualize **multi-year activity** across Pull Requests, Issues, and Discussions with granular filtering. See where your influence actually lies.

### AI Technical Synthesis
Leverages **OpenRouter (OpenAI/Anthropic)** to analyze your contribution metadata and generate a professional summary. It explains *what* you did and *why* it matters to potential collaborators.

### Integrated Resume Engine
A premium **CV/Resume viewer** built into the dashboard. Switch seamlessly from repo metrics to professional credentials with an integrated PDF viewer and downloader.

### Discovery & Filtering
Advanced discovery features for your own history. Filter contributions by organization, repository, or type to find that specific architectural refactor from three years ago.

### Technical Stack Visualization
Automatic extraction of your primary technologies and languages, presented through dynamic charts and visual sections that highlight your actual toolset.

---

## Tech Stack

- **Framework**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Lucide Icons](https://lucide.dev/)
- **Data Engine**: [GitHub GraphQL API (v4)](https://docs.github.com/en/graphql)
- **Intelligence**: [OpenRouter API](https://openrouter.ai/)
- **Markdown Handling**: `react-markdown` with GFM

---

## Quick Start

### 1. Prerequisites
- **GitHub Personal Access Token** (classic): Requires `repo`, `read:user`, and `user:email`.
- **OpenRouter API Key**: To enable the AI Technical Assistant.

For automated login, please ensure following secrets are created in your GitHub repository:
- `VITE_GITHUB_TOKEN`: Your GitHub Personal Access Token.
- `VITE_OPENROUTER_API_KEY`: Your OpenRouter API Key.

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/atique-ahmad-01/portfolio.dev

# Navigate to directory
cd portfolio.dev

# Install dependencies
npm install

# Run development server
npm run dev
```

### 3. Configuration
Personalize your dashboard in `userConfig.js`:
```javascript
const userConfig = {
  name: "Your Name",
  email: "your.email@example.com",
  github: "https://github.com/yourusername",
  cvUsername: "technical_resume" // public/cv/technical_resume.pdf
};
```

---

## Privacy & Security

**Client-Side Only**: GitMe operates entirely in your browser. Your API tokens are never sent to our servers; they are used only for direct calls to GitHub and OpenRouter. Your data stays yours.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<p align="center">
  Built with ❤️ for the Open Source Community. <br/>
  <b>Give a ⭐ if you find this project useful!</b>
</p>

