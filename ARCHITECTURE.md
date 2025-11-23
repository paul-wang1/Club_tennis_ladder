# Tennis Ladder App - Architecture Overview

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                      YOUR DEVELOPMENT WORKFLOW                   │
└─────────────────────────────────────────────────────────────────┘

    ┌──────────────┐
    │  Your Computer│
    │   (VS Code)   │
    │               │
    │  Edit Code    │
    │  Test Locally │
    └───────┬───────┘
            │
            │ git push
            ▼
    ┌──────────────┐
    │   GitHub      │
    │  (Storage)    │
    │               │
    │  Version      │
    │  Control      │
    └───────┬───────┘
            │
            │ Automatic Trigger
            ▼
    ┌──────────────┐
    │   Vercel      │
    │  (Builder &   │
    │   Hosting)    │
    │               │
    │  Builds &     │
    │  Deploys      │
    └───────┬───────┘
            │
            │ Serves 24/7
            ▼
    ┌──────────────┐
    │  Live URL     │
    │               │
    │ https://your- │
    │ app.vercel.app│
    └───────┬───────┘
            │
            │ Access from anywhere
            ▼
    ┌──────────────┐
    │  Tennis Club  │
    │   Members     │
    │               │
    │  Phones &     │
    │  Computers    │
    └───────────────┘
```

## Current State (Phase 1)

```
┌─────────────────────────────────────────────────────────────────┐
│                         CURRENT SETUP                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Frontend (React)                                                │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  • Login/Registration UI                               │    │
│  │  • Ladder View (Rankings)                              │    │
│  │  • Challenge System                                    │    │
│  │  • Match Reporting                                     │    │
│  │  • Player Profiles                                     │    │
│  └────────────────────────────────────────────────────────┘    │
│                            │                                     │
│                            ▼                                     │
│  Mock Data (In Memory)                                           │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  • Resets on page refresh                              │    │
│  │  • Not shared between users                            │    │
│  │  • Good for testing UI only                            │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                  │
│  Status: ✅ Works locally                                        │
│          ✅ Can deploy to Vercel                                 │
│          ❌ No persistent data                                   │
│          ❌ Can't share between users                            │
└─────────────────────────────────────────────────────────────────┘
```

## Future State (Phase 2 - With Firebase)

```
┌─────────────────────────────────────────────────────────────────┐
│                      FUTURE SETUP (PHASE 2)                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Frontend (React)                                                │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  • All current features                                │    │
│  │  • + Admin Dashboard                                   │    │
│  │  • + Real Authentication                               │    │
│  │  • + Notifications                                     │    │
│  └───────────────────────┬────────────────────────────────┘    │
│                          │                                       │
│                          │ Firebase SDK                          │
│                          ▼                                       │
│  Firebase (Backend)                                              │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  Authentication                                         │    │
│  │  ├─ User login/logout                                  │    │
│  │  ├─ Password reset                                     │    │
│  │  └─ Session management                                 │    │
│  │                                                         │    │
│  │  Firestore Database                                    │    │
│  │  ├─ Players collection                                 │    │
│  │  ├─ Matches collection                                 │    │
│  │  ├─ Challenges collection                              │    │
│  │  └─ Rankings history                                   │    │
│  │                                                         │    │
│  │  Cloud Functions                                       │    │
│  │  ├─ Check inactivity (runs daily)                     │    │
│  │  ├─ Send deadline reminders                           │    │
│  │  └─ Auto-swap on deadline miss                        │    │
│  │                                                         │    │
│  │  Cloud Messaging                                       │    │
│  │  └─ Email notifications                                │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                  │
│  Status: 🔄 Next phase                                           │
│          ✅ Data persists                                        │
│          ✅ Multiple users simultaneously                        │
│          ✅ Real authentication                                  │
│          ✅ Automated tasks                                      │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow - Current

```
User Action → React State Update → UI Updates
     ↑                                    │
     └────────────────────────────────────┘
              (All in browser memory)
```

## Data Flow - Future (With Firebase)

```
User Action 
    ↓
React Component
    ↓
Firebase SDK
    ↓
Firebase Server (Cloud)
    ↓
Database Updated
    ↓
Real-time Sync
    ↓
All Connected Users See Update
```

## Tech Stack Breakdown

```
┌─────────────────────────────────────────────────────────────────┐
│                         TECH STACK                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Frontend Layer                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  React           → UI components                       │    │
│  │  TypeScript      → Type safety                         │    │
│  │  Tailwind CSS    → Styling                             │    │
│  │  Lucide React    → Icons                               │    │
│  │  Vite            → Build tool                          │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                  │
│  Backend Layer (Phase 2)                                         │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  Firebase Auth   → User management                     │    │
│  │  Firestore       → Database                            │    │
│  │  Cloud Functions → Server-side logic                   │    │
│  │  Cloud Messaging → Notifications                       │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                  │
│  Infrastructure                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  GitHub          → Code storage                        │    │
│  │  Vercel          → Hosting (24/7)                      │    │
│  │  Git             → Version control                     │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                  │
│  Development                                                     │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  Node.js         → Runtime                             │    │
│  │  npm             → Package manager                     │    │
│  │  VS Code         → Code editor                         │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Cost Breakdown

```
┌─────────────────────────────────────────────────────────────────┐
│                          COSTS                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Phase 1 (Current)                          FREE                 │
│  ├─ Node.js                                 $0                   │
│  ├─ Git                                     $0                   │
│  ├─ GitHub (private repo)                   $0                   │
│  ├─ Vercel Hosting                          $0/month             │
│  └─ VS Code                                 $0                   │
│                                                                  │
│  Phase 2 (With Firebase)                    FREE                 │
│  ├─ Firebase Authentication                 $0                   │
│  ├─ Firestore Database                      $0                   │
│  │   (50,000 reads/day free)                                     │
│  ├─ Cloud Functions                         $0                   │
│  │   (2M invocations/month free)                                 │
│  └─ SendGrid Email                          $0                   │
│      (100 emails/day free)                                       │
│                                                                  │
│  Optional                                                        │
│  └─ Custom Domain                           $10-15/year          │
│                                                                  │
│  TOTAL: $0/month (or $10-15/year with domain)                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Project File Structure Explained

```
tennis-ladder-app/
│
├── 📄 Configuration Files
│   ├── package.json          → Dependencies & scripts
│   ├── vite.config.ts        → Build settings
│   ├── tsconfig.json         → TypeScript settings
│   ├── tailwind.config.js    → Styling settings
│   ├── postcss.config.js     → CSS processing
│   └── .gitignore            → What Git should ignore
│
├── 📄 Documentation (READ THESE!)
│   ├── QUICK_START.md        → Start here!
│   ├── SETUP_GUIDE.md        → Complete setup instructions
│   ├── HOSTING_247.md        → 24/7 hosting guide
│   └── README.md             → Project overview
│
├── 📄 Entry Point
│   └── index.html            → Main HTML file
│
└── 📁 src/ (Your Code)
    ├── main.tsx              → App entry point
    ├── App.tsx               → Tennis ladder app (main component)
    └── index.css             → Global styles
```

## How Updates Work

```
Step 1: Local Development
┌─────────────────────┐
│ npm run dev         │  ← Start local server
│ Edit code in VSCode │  ← Make changes
│ Test at localhost   │  ← See changes instantly
└─────────────────────┘

Step 2: Save to Git
┌─────────────────────┐
│ git add .           │  ← Stage changes
│ git commit -m "..." │  ← Save snapshot
│ git push            │  ← Upload to GitHub
└─────────────────────┘

Step 3: Automatic Deploy
┌─────────────────────┐
│ Vercel detects push │  ← Automatic
│ Builds your app     │  ← ~30 seconds
│ Deploys to live URL │  ← Everyone sees update
└─────────────────────┘

Total time: ~60 seconds from push to live!
```

## Security Layers

```
Current (Phase 1):
└─ HTTPS (Vercel automatic) ✅

Future (Phase 2):
├─ HTTPS (Vercel automatic) ✅
├─ Firebase Authentication ✅
│  ├─ Passwords hashed
│  └─ Session tokens
├─ Firestore Security Rules ✅
│  ├─ Who can read what
│  └─ Who can write what
└─ Environment Variables ✅
   └─ API keys hidden
```

## Scalability

```
Current Capacity (Free Tier):

Vercel:
├─ Bandwidth: 100 GB/month
│  └─ = ~10,000 visits/month
├─ Deployments: Unlimited
└─ Build time: Unlimited

Firebase (Phase 2):
├─ Users: 10,000+
├─ Database reads: 50,000/day
├─ Database writes: 20,000/day
└─ Function calls: 2M/month

Your Tennis Club:
├─ Expected users: 25-50
├─ Expected visits: ~500/month
└─ Well within free limits! ✅
```

## Development Timeline

```
Week 1: Setup & Deploy
├─ Day 1-2: Install tools, setup project
├─ Day 3-4: Push to GitHub
└─ Day 5-7: Deploy to Vercel, test with club

Week 2: Firebase Integration
├─ Day 1-2: Setup Firebase project
├─ Day 3-4: Add authentication
└─ Day 5-7: Replace mock data

Week 3-4: Admin Features
├─ Week 3: Build admin dashboard
└─ Week 4: Registration approval, manual adjustments

Week 5-6: Automation & Polish
├─ Week 5: Notifications, inactivity tracking
└─ Week 6: Testing, bug fixes, refinements
```

## Getting Help

```
Issue:                          Solution:
├─ Can't install Node.js   →   Check system requirements
├─ npm command not found   →   Restart terminal after install
├─ Git push fails          →   Check GitHub authentication
├─ Build fails on Vercel   →   Read build log for errors
├─ App not loading         →   Check browser console
└─ Firebase errors         →   Check API keys & rules
```

## Key Concepts

**Git**: Version control system (like "save" for code)
**GitHub**: Cloud storage for your Git repositories
**Vercel**: Platform that hosts your website 24/7
**React**: JavaScript library for building user interfaces
**Firebase**: Backend services (database, auth, etc.)
**npm**: Package manager (installs code libraries)
**Build**: Process of converting your code to production-ready files
**Deploy**: Putting your built app on a live server

---

Ready to get started? Open QUICK_START.md!
