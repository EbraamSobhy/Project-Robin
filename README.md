# Clash of Patrols: Gamified Tracking System Web App

Welcome to the official documentation for the frontend of **Clash of Patrols**, a gamified tracking system designed to make goal tracking engaging and rewarding. This document serves as a comprehensive guide for developers and contributors to understand, use, and extend the frontend of this repository.

---

## Table of Contents

- [Overview](#overview)
- [Main Features](#main-features)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Setup & Installation](#setup--installation)
- [Usage Guide](#usage-guide)
- [Design Principles](#design-principles)
- [Folder Structure](#folder-structure)
- [Contribution Guidelines](#contribution-guidelines)
- [Planned Enhancements](#planned-enhancements)
- [License & Acknowledgments](#license--acknowledgments)

---

## Overview

Clash of Patrols is a gamified tracking system that combines goal tracking with engaging game mechanics. It empowers users to monitor their progress, challenges and play with other patrols,  while enjoying a rewarding experience.

---

## Main Features

### Core Capabilities

- **Goal Tracking:** Monitor daily, weekly, and monthly objectives.
- **Progress Analytics:** Visualize improvement over time View Scores page.

### Gamification Elements

- **Experience Points (XP):** Earn XP for completing tasks and challenges.
- **Streak Tracking:** Maintain streaks for bonus rewards.
- **Quest System:** Complete special challenges for additional XP.
- **Leaderboards:** Compete with friends or track personal bests.

---

## Architecture

- **Component-Based Design:** Modular React components for reusability and scalability.
- **Routing:** Managed via React Router DOM for seamless navigation between screens.
- **State Management:** Utilizes React hooks (`useState`, `useEffect`) for local state and side effects.
- **Styling:** Tailwind CSS provides utility-first, responsive design.
- **Animations & UI:** Smooth transitions, gradients, and accessible color schemes.

---

## Technology Stack

- **Frontend Framework:** React (v19.1.0)
- **Build Tool:** Vite (v6.3.5)
- **Styling:** Tailwind CSS (v4.1.10)
- **Routing:** React Router DOM (v7.6.2)
- **Code Quality:** ESLint (React-specific rules)
- **Icons/UX:** React Icons, Toastify for notifications
- **Axios:** API communication.
- **FontAwesome:** For icons.
## Setup & Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/EbraamSobhy/Project-Robin.git
   cd Project-Robin
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```
4. **Access the app:**
   - Visit [Clash of Patrols](https://clash-of-patrols.vercel.app/) in your browser.

### Scripts

- `npm run dev` – Development server with hot reload.
- `npm run build` – Production build.
- `npm run preview` – Preview production build locally.
- `npm run lint` – Run ESLint for code quality.

---

## Usage Guide

- **Landing Page:** A visually appealing welcome screen with smooth animations.
- **Authentication:** Register or log in to access features.
- **View Scores:** View your score and lands.
- **Earning Points:** Complete tasks, maintain streaks, and achieve milestones for XP and rewards.

---

## Design Principles

- **Modern Aesthetics:** Gradient backgrounds, smooth animations, clean interfaces.
- **Responsive Design:** Optimized for mobile, tablet, and desktop.
- **Intuitive Navigation:** Clear user flows and navigation paths.
- **Accessible Color Scheme:** Blue gradients, white/blue accents, high-contrast text.

---

## Folder Structure

The project follows a well-organized folder structure for scalability and maintainability:

```
public/       # Static assets (images, icons, etc.)
src/          # Source code
  assets/     # Shared assets (e.g., images, icons)
  CP/         # Components for Clash of Patrols features
  Kadr/       # Components for Kadr-specific features
  Process/    # Components for process-related features
  Scout/      # Components for scouting features
  utils/      # Utility functions and shared logic
  Welcome-Login/ # Components for login and welcome 
```

---

## Contribution Guidelines

We welcome contributions to improve Clash of Patrols! To contribute:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to your branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

**Development Guidelines:**

- Follow the existing code style.
- Add comments for complex logic.
- Test your changes thoroughly.
- Update documentation as needed.

---

## License & Acknowledgments

**License:**  
MIT License (see [LICENSE](LICENSE) file)

**Acknowledgments:**

- React Team
- Vite Team
- Tailwind CSS

---

**Transform your goals into achievements with Clash of Patrols where every step forward is a victory!**
