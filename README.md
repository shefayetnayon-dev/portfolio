# 🚀 Pro Developer Portfolio

A high-performance, developer-centric portfolio website built with the latest web technologies. Designed to feel like a modern development environment with a "Terminal/IDE" aesthetic, featuring a command palette, file-based routing blog, and immersive animations.

## 🌐 Live Demo

- **Vercel:** [https://shefayetnayon.vercel.app/](https://shefayetnayon.vercel.app/)
- **Netlify:** [https://shefayetnayon.netlify.app/](https://shefayetnayon.netlify.app/)

---

## 🛠️ Technology Stack

This project leverages a cutting-edge stack focused on performance, type safety, and developer experience.

### **Core Framework**
- **[Next.js 15 (App Router)](https://nextjs.org)**: The backbone of the application. utilized for its Server Components (RSC), optimized routing, and SEO capabilities.
- **[React 19](https://react.dev)**: The latest version of React, powering the UI with concurrent features and server-side rendering support.
- **[TypeScript](https://www.typescriptlang.org/)**: Ensures type safety across the entire codebase, reducing bugs and improving maintainability.

### **Styling & Animations**
- **[Tailwind CSS v4](https://tailwindcss.com)**: Utility-first CSS framework for rapid, responsive design. Used with the new `@theme` configuration.
- **[Framer Motion](https://www.framer.com/motion/)**: Handles complex animations like page transitions, staggered list reveals, and hover 3D effects.
- **`clsx` & `tailwind-merge`**: Utilities for conditionally joining class names and resolving Tailwind conflicts.

### **Features & UI Components**
- **[CMDK](https://cmdk.paco.me/)**: A fast, composable, unstyled command menu for React. Used to build the custom "Command Palette" (`Cmd+K`).
- **[React Icons](https://react-icons.github.io/react-icons/)**: Comprehensive icon library used throughout the UI.
- **[Resend](https://resend.com)**: Developer-first email API. integrated into the Contact Form to send real emails directly from the app.

### **Blog System (MDX)**
- **[Next-MDX-Remote](https://github.com/hashicorp/next-mdx-remote)**: Allows loading MDX content from local files or a database on the server.
- **[Gray-Matter](https://github.com/jonschlinkert/gray-matter)**: Parses frontmatter (metadata like title, date) from Markdown files.
- **[Rehype-Pretty-Code](https://rehype-pretty.pages.dev/)**: Provides VS Code-like syntax highlighting for code blocks at build time.
- **[Shiki](https://shiki.style/)**: A lightweight syntax highlighter used by rehype-pretty-code.

---

## ✨ Key Features

1.  **Terminal Aesthetics**: The UI mimics a developer environment with "file paths" for breadcrumbs, mono-spaced fonts, and terminal-like command logs.
2.  **Command Palette**: Press `Cmd+K` (or `Ctrl+K`) to open a global search/action menu to navigate projects, send emails, or copy links.
3.  **File-Based Blog**:
    -   Posts are written in MDX (Markdown + React) inside the `posts/` directory.
    -   No database required; it reads directly from the filesystem.
    -   Supports code syntax highlighting, dynamic metadata, and read time estimation.
4.  **Immersive Animations**:
    -   **Cursor Spotlight**: A subtle glow follows the mouse.
    -   **Page Transitions**: Smooth fade-in/out between routes.
    -   **Staggered Reveals**: Elements load sequentially for a polished feel.
5.  **SEO Optimized**:
    -   Dynamic `sitemap.xml` and `robots.txt`.
    -   Automatic metadata generation for every blog post.
    -   Semantic HTML structure.
6.  **Fiverr-Style Pricing**: A responsive comparison table for service packages.

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the root directory and add your Resend API key for the contact form:
```env
RESEND_API_KEY=re_123456789
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser.

---

## 📂 Project Structure

```
├── app/
│   ├── api/             # API routes (Email, Posts)
│   ├── blog/            # Blog pages (List, Single Post)
│   ├── components/      # React components (Navbar, Hero, etc.)
│   ├── layout.tsx       # Root layout & SEO
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles & Tailwind
├── lib/
│   └── blog.ts          # MDX filesystem logic
├── posts/               # MDX Blog posts
├── public/              # Static assets
└── package.json         # Dependencies
```

---

## 🚢 Deployment

### Vercel (Recommended)
1.  Push your code to GitHub.
2.  Import the repository in Vercel.
3.  Add the `RESEND_API_KEY` in the Environment Variables settings.
4.  Deploy! Vercel will automatically detect Next.js.

### Netlify
1.  Push to GitHub.
2.  Import in Netlify.
3.  Set build command to `npm run build` and directory to `.next`.
4.  Add environment variables in Site Settings.

---

*Built with ❤️ by [Shefayet Nayon](https://shefayetnayon.netlify.app/)*
