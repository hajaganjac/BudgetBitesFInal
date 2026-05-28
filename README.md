# BudgetBites 🍎

BudgetBites is a calm, research-driven budgeting and recipe application specifically designed for the student lifestyle. Built with a focus on professional aesthetics and cognitive ease, the app bridges the gap between financial management and nutritional health.

## 🚀 Getting Started

To run this project locally, follow these steps:

### Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** or **pnpm**

### Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/hajaganjac/Budgetbites.git
   cd Budgetbites
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Launch the development server**
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

---

## 🛠 Project Architecture

### Tech Stack
- **Language:** TypeScript (Strict Mode)
- **Framework:** React 18
- **Styling:** Tailwind CSS v4.0 (Utilizing a custom warm-neutral design system)
- **Routing:** React Router 7 (Data Mode)
- **State Management:** Centralized `AppContext` with custom hooks
- **Animations:** `motion/react` (Motion)
- **Icons:** Lucide React

### Core Pages
The application features six primary routed views, guarded by a bespoke authentication layer:
1. **Dashboard:** A bird's-eye view of budget health and weekly progress.
2. **Recipes:** A curated library of cost-effective, student-friendly meals.
3. **Recipe Generator:** A smart tool to find meals based on current inventory.
4. **Plan My Week:** A structured workflow for scheduling meals and grocery trips.
5. **Grocery Notes:** Integrated list management for efficient shopping.
6. **Achievements:** Gamified progress tracking (toggleable via Quiet Mode).

---

## 🎨 Design System & Philosophy

BudgetBites follows a "Quiet Design" philosophy, moving away from high-stimulus gamification toward a research-backed, focused experience.

### UI Principles
- **Warm-Neutral Palette:** Designed to reduce financial anxiety and cooking stress.
- **Single Gradient Rule:** To maintain visual hierarchy, only **one** pink-to-teal gradient button is permitted per screen.
- **Emoji Removal:** All emojis have been removed from headers and motivational quotes to provide a more professional, mature aesthetic for university students.
- **Quiet Mode:** A global state toggle in the sidebar that allows users to disable gamification elements for a purely utility-driven experience.
- **Branding:** Features the new Iteration 2 "B-with-bite" logo mark and a fading feature carousel on the login screen.

---

## 📦 Key Libraries & Plugins
- **Recharts:** Used for financial data visualization and budget tracking.
- **Sonner:** Handles non-intrusive toast notifications for user feedback.
- **Radix UI:** Primitive components (Dialogs, Tabs, Tooltips) for accessibility compliance.
- **Embla Carousel:** Powers the immersive onboarding experience on the login screen.
- **Lucide React:** A consistent, clean icon set that complements the "Quiet" design.

---

## 👨‍🏫 Assessor Information
This project represents a full-stack frontend implementation (Iteration 2). It demonstrates proficiency in:
- **Responsive Layouts:** Full mobile and desktop compatibility.
- **Complex State:** Managing nested UI states, user sessions, and "Quiet Mode" toggles.
- **Component Engineering:** A robust library of custom primitives (`BBButton`, `BBCard`, `BBInput`).
- **Clean Code:** Highly modularized architecture with strict separation of concerns between data, context, and presentation.
