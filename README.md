# Build Your First AI Project in 60 Minutes

> **Campaign Type:** Free Online Workshop Growth Challenge  
> **Target Audience:** Final-Year Engineering Students  
> **Core Growth Mechanism:** Student Registration + Unique Referral Codes + Peer Growth Loop Tracking + Campus Leaderboard + Growth Analytics

---

## 🎯 1. Project Overview & Primary Objective

This web application is a high-converting, growth-engineered web platform built for the campaign:

**"Build Your First AI Project in 60 Minutes"**

The primary objective is to demonstrate how a registered final-year engineering student becomes an organic engine of additional registrations through an incentivized, peer-driven referral loop.

### Normal Student Experience Flow
```
1. Visitor lands on Workshop Page (/)
   ↓
2. Visitor clicks "Register Free" and fills the form (/register)
   ↓
3. Student receives Unique Referral Code (e.g. AI60-VIVEK7) & Link on Confirmation Page (/success)
   ↓
4. Session is automatically activated for this registered student!
   ↓
5. Student opens their personalized Dashboard (/dashboard):
   - "Welcome, [Student Name]"
   - Registered ✓
   - Referral Code & Sharable Link with 1-click Copy & WhatsApp share
   - Referral Count (starts at 0) & Visual Progress Bar (0 / 5)
   - Campus Leaderboard position
   ↓
6. Classmates register with that Referral Code
   ↓
7. Referrer's Dashboard increments referral count, progress bar advances, and campus rank climbs!
```

---

## 🚀 2. Separation of Normal Student UX vs. Demo Controls

### A. Realistic Normal Student Experience
- **No prominent user switcher:** Visitors are treated as normal students. The navigation bar does NOT contain an intrusive "Viewing as: Priya Nair" dropdown.
- **Natural Session Handling:** A visitor starts in a clean visitor state. Registering immediately associates that student with the active session in `localStorage`.
- **Student Dashboard Portal:** If an unregistered visitor visits `/dashboard`, they see a realistic Student Access screen where they can look up their dashboard by email or referral code, or register.
- **Accurate Metric Terminology:** Seed and simulated figures are clearly identified as **"demo registrations"** and **"simulated referral rate"**. The application makes no false or unscientific claims such as "viral coefficient" or guaranteed placement/salary promises.

### B. Isolated Demo Controls (For Evaluator Video Presentation)
To support a rapid, seamless 3-minute video demonstration, demo tools are provided in two non-intrusive places:
1. **Dedicated Demo Controls in `/admin`:** A clearly labeled "Demo Controls (Presentation Only)" card with:
   - Switch Demo Student (dropdown)
   - Simulate Classmate Referral (`+1`)
   - Reset Demo Data
2. **Discreet Floating Pill in Bottom-Right:** A subtle `[ 🛠️ Evaluator: Demo Mode ]` button at the bottom-right of the screen that opens a compact modal for quick persona switching and referral simulation during video walkthroughs, without cluttering the primary user navigation.

---

## 🎨 3. Modern Light SaaS Design System

- **Visual Tone:** Clean, professional, trustworthy startup/education platform aesthetic inspired by Linear, Notion, and Stripe.
- **Colors:**
  - Background: `#F8FAFC` (Slate 50)
  - Cards: `#FFFFFF` (Pure White) with soft borders (`#E2E8F0`)
  - Primary Accent: `#4F46E5` (Indigo 600)
  - Secondary Accent: `#2563EB` (Blue 600)
  - Text: `#0F172A` (Slate 900 Deep Navy)
  - Muted Text: `#64748B` (Slate 500)
  - Success: `#16A34A` (Emerald 600)
  - Warning: `#F59E0B` (Amber 500)
- **Typography:** Plus Jakarta Sans & JetBrains Mono with generous whitespace and clean card hierarchy.
- **Zero Dark/Neon Gimmicks:** No black backgrounds, excessive glow effects, or gaming UI.

---

## 💻 3. Tech Stack & Architecture

- **Frontend & Routing:** React 19, TypeScript, React Router DOM v7
- **Styling:** Tailwind CSS v4, Lucide Icons, Canvas Confetti
- **Build Tool:** Vite (Production build compiles in **~555ms**)
- **State & Data Layer:** Reactive React Context (`GrowthContext`) with automatic `localStorage` persistence. The state includes anti-abuse guards (self-referral prevention, duplicate email detection, referral code verification).
- **Attribution Engine:** Tracks source channels (`?source=whatsapp`, `?source=club`, `?source=referral`, `?source=outreach`).

---

## 📦 4. How to Run Locally

### Prerequisites
- Node.js (v18 or higher; tested on v22.12.0)
- npm (v9 or higher)

### Installation & Run

1. Clone or open the repository folder:
```bash
cd "Build Your First AI Project in 60 Minutes"
```

2. Install dependencies:
```bash
npm install
```

3. Start the local development server:
```bash
npm run dev
```

4. Open your browser at:
```
http://localhost:5173
```

---

## 🎬 5. Step-by-Step 3-Minute Video Demo Guide

Follow these steps for a realistic 3-minute video presentation:

1. **Minute 0:00 – 0:45 | Landing Page & Realistic Normal User Flow**
   - Start on **`/`** (`http://localhost:5173`).
   - Notice the clean, realistic navigation (no awkward user switcher in the navbar).
   - Point out the headline: **"Build Your First AI Project in 60 Minutes"**.
   - Review the 60-minute practical breakdown and ethical messaging (strictly practical AI engineering; no false placement guarantees).
   - Point out the social proof badge: `14 demo registrations &bull; 57% simulated referral rate`.
   - Click the primary CTA **"Register Now — It's Free"**.

2. **Minute 0:45 – 1:30 | Registration & Automatic Session Activation**
   - On **`/register`**, register as a new student:
     - Name: `Vivek Anand`
     - Email: `vivek.anand@college.edu`
     - Phone: `9876543210`
     - College: `Amrita Vishwa Vidyapeetham – Bengaluru`
     - Branch: `Computer Science & Engineering`
     - Year of Study: `Final Year (4th Year)`
   - Click **"Complete Free Registration"**.
   - On **`/success`**, observe the confetti celebration, unique generated referral code (e.g. `AI60-VIVEK1`), 1-click copy link, and WhatsApp share button.

3. **Minute 1:30 – 2:15 | Student Dashboard & Live Referral Increment**
   - Click **"Go to Student Dashboard"** (**`/dashboard`**).
   - Note that the dashboard identifies the student who actually registered:
     - **"Welcome, Vivek Anand"**
     - **Registered ✓**
     - Unique referral code: `AI60-VIVEK1`
     - Referral Count starts at **`0 successful referrals`**
     - Visual Progress Bar: **`0 / 5`**
     - Campus Leaderboard position: e.g. **`#15`**
   - Click the **"Demo: +1 Classmate Referral"** button.
   - Watch the referral count immediately increment to **1**, progress bar advance to **1 / 5 (20%)**, and the classmate appear in the **Referred Classmates** table.

4. **Minute 2:15 – 2:45 | Campus Leaderboard**
   - Navigate to **`/leaderboard`**.
   - Show the Top 3 podium (Rahul with 24, Ananya with 19, Vivek Verma with 17).
   - Scroll down to find the registered student's row, highlighted with a distinct **`(You)`** badge.
   - Demonstrate the college filter dropdown (e.g., *Amrita Vishwa Vidyapeetham – Bengaluru*, *RV College of Engineering – Bengaluru*).

5. **Minute 2:45 – 3:00 | Growth Analytics & Isolated Demo Controls**
   - Navigate to **`/admin`**.
   - Review the 4 KPI cards: **Total Registrations (Demo)**, **Referral Registrations**, **Active Referrers**, and **Simulated Referral Rate %**.
   - Highlight the **Demo Controls (Presentation Only)** card, showing how an evaluator can switch between demo student personas (e.g., *Rahul Sharma* or *Vivek Verma*), simulate referrals, or reset seed data.
   - Review the **Acquisition Channel Performance** (WhatsApp, Student Referrals, College Clubs, Targeted Outreach) and **Campaign URL Builder**.

---

## 🏗️ 6. Project Structure

```
├── index.html                       # HTML entry point with fonts & metadata
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
├── vite.config.ts                   # Vite configuration with React and Tailwind
├── src/
│   ├── main.tsx                     # React DOM mount point
│   ├── App.tsx                      # Root component with routing and providers
│   ├── index.css                    # Tailwind CSS imports & custom styles
│   ├── types/
│   │   └── index.ts                 # TypeScript definitions (Student, Metrics, etc.)
│   ├── data/
│   │   └── seedData.ts              # Realistic initial campus seed data
│   ├── context/
│   │   └── GrowthContext.tsx        # Session state, referral logic, anti-abuse
│   ├── components/
│   │   ├── Navbar.tsx               # Realistic navigation bar with session state
│   │   ├── Footer.tsx               # Footer with compliance statement & links
│   │   └── DemoControlsModal.tsx    # Discreet floating evaluator modal
│   └── pages/
│       ├── LandingPage.tsx          # Workshop hero, timeline, benefits, FAQ
│       ├── RegisterPage.tsx         # Student form, validation, referral detection
│       ├── SuccessPage.tsx          # Confirmation, unique code, WhatsApp share
│       ├── DashboardPage.tsx        # Personalized student referral dashboard
│       ├── LeaderboardPage.tsx      # Campus leaderboard with top 3 podium & (You) badge
│       └── AdminPage.tsx            # Growth analytics, demo controls & URL generator
```

---

## 🚢 7. Production Build

To build the production assets:
```bash
npm run build
```
Build output in `dist/` is ready for deployment on Vercel, Netlify, or any static hosting service.
