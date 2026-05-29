# EduVance Academy 🎓

> A full-stack, cloud-native EdTech platform built as a white-label product for academies and educational institutions.

[![Deploy Status](https://img.shields.io/badge/deployed-AWS%20Amplify-orange)](https://main.dc7hjd4bn6ptw.amplifyapp.com)
[![Made with Firebase](https://img.shields.io/badge/database-Firebase-yellow)](https://firebase.google.com)
[![IaC](https://img.shields.io/badge/IaC-Terraform-purple)](https://terraform.io)
[![Containerized](https://img.shields.io/badge/container-Docker-blue)](https://docker.com)

**🌐 Live Site:** [https://main.dc7hjd4bn6ptw.amplifyapp.com](https://main.dc7hjd4bn6ptw.amplifyapp.com)  
**📁 Repository:** [github.com/couch-paladin/Academy-Management-](https://github.com/couch-paladin/Academy-Management-)

---

## Overview

EduVance Academy is a complete, production-ready academy management platform. Students can discover courses, register, make payments, and track their learning progress — while administrators get full visibility into enrollments, revenue, and student feedback.

The platform is designed as a **white-label product** — any academy can deploy their own branded instance with minimal configuration changes.

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | HTML5, CSS3, Vanilla JS | All 13 pages |
| Authentication | Firebase Auth | Google OAuth + Email/Password |
| Database | Google Firestore | Users, enrollments, feedback |
| Hosting | AWS Amplify | CDN deployment + HTTPS |
| CI/CD | GitHub Actions | Auto-deploy on push |
| Serverless | AWS Lambda + API Gateway | Enrollment email function |
| Email | Amazon SES | Transactional emails |
| Payments | Razorpay | Course payment processing |
| Monitoring | AWS CloudWatch + SNS | Error alerts + latency tracking |
| IaC | Terraform | Infrastructure as code |
| Container | Docker + nginx | Local and portable deployment |
| Version Control | Git + GitHub | Source code management |

---

## System Architecture

```
Student Browser
      │
      ▼
AWS Amplify (CDN + HTTPS + Auto-deploy)
      │
      ├── Firebase Auth ──────── Google OAuth / Email-Password
      │         └── Firestore ── Users, Enrollments, Feedback
      │
      ├── AWS Lambda ───────────── Serverless email function
      │         └── Amazon SES ── Confirmation + admin emails
      │
      ├── Razorpay ──────────────── Payment gateway (UPI/Card)
      │
      └── CloudWatch ────────────── 24/7 site monitoring
                └── SNS ─────────── Email alerts on alarms
```

---

## Pages (13 Total)

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Landing page — hero, features, events, 12 easter eggs |
| Courses | `courses.html` | Browse courses with domain/price/mode filters |
| Workshops | `workshops.html` | Workshops, webinars, live events |
| Careers | `careers.html` | Internships, placement support, coaching |
| About | `about.html` | Academy info, mission, team |
| Contact | `contact.html` | Contact form via Formspree |
| Feedback | `feedback.html` | Student feedback with star ratings |
| Register | `register.html` | Course registration with Razorpay payment |
| Login | `login.html` | Firebase Auth with welcome animation |
| Dashboard | `dashboard.html` | Student personal learning space |
| Admin Panel | `admin.html` | Role-based admin dashboard |
| Terms | `terms.html` | Terms of Service, Privacy Policy, Refund Policy |
| 404 | `404.html` | Custom error page |

---

## Key Features

### Authentication & Security
- Google Sign-In via Firebase OAuth 2.0
- Email and Password authentication
- Persistent sessions across browser visits
- Protected routes — unauthorized users redirected to login
- Role-based access control for admin panel
- AWS credentials stored in GitHub Secrets — never in code

### Student Experience
- Course browsing with live filters (domain, price, mode)
- URL-based course pre-selection (`register.html?course=...`)
- Auto-filled registration form from Firebase profile
- Razorpay payment popup for paid courses
- Free courses bypass payment entirely
- Automated enrollment confirmation email via Lambda + SES
- Personal dashboard with progress tracking

### Student Dashboard
- Enrolled courses with visual progress bars
- Goals tracker with quick-select badges and custom input
- Learning journal with daily entries and mood picker (😊🤔😤🤩😴)
- 7-day learning streak tracker with fire indicators
- Daily motivation quote (changes every day)
- Random brain facts widget
- Quick navigation links

### Admin Panel
- Accessible only to users with `role: "admin"` in Firestore
- Students tab — all registered students with live search
- Enrollments tab — all enrollments with paid/free status
- Feedback tab — all feedback with star ratings display
- Revenue tab — revenue breakdown by course and totals

### Interactive Elements (via `interactive.js`)
- Gold scroll progress bar across all pages
- Cursor trail effect (desktop)
- Click ripple animation
- Floating gold particles in hero sections
- Typewriter effect on hero text
- Parallax hero scrolling
- Animated number counters on scroll
- Daily study tip widget
- 3D card hover effects
- Copy-to-clipboard toast on email/phone links
- Back to top button

### 12 Easter Eggs 🥚
Click the 🥚 button (bottom right of homepage) to discover all:

| # | Egg | Trigger | Effect |
|---|-----|---------|--------|
| 1 | 🎮 Konami Code | ↑↑↓↓←→←→BA | Confetti explosion |
| 2 | 💊 Matrix Mode | Click panel | Gold matrix rain |
| 3 | 🌙 Moon Mode | Triple-click hero | Starfield animation |
| 4 | 🏴‍☠️ Pirate Mode | Type "ahoy" | Page tilts |
| 5 | 🏷️ Logo Spin | Click logo 5x | Logo spins 360° |
| 6 | 🌈 Wicked Colors | Type "eduvance" | Green + pink palette |
| 7 | 🍎 Gravity | Click panel | Fruits fall from sky |
| 8 | 🪩 Disco | Click panel | Rainbow flash + circles |
| 9 | 🌀 Spinner | Click ♥ 3x in footer | Everything spins |
| 10 | ❄️ Gold Snow | Click panel | Gold snowflakes fall |
| 11 | 🌍 Earthquake | Click panel | Screen shakes |
| 12 | 🧠 Brain Facts | Click panel | Random educational fact |

---

## Project Structure

```
eduvance-academy/
│
├── 📄 HTML Pages (13)
│   ├── index.html
│   ├── courses.html
│   ├── workshops.html
│   ├── careers.html
│   ├── about.html
│   ├── contact.html
│   ├── feedback.html
│   ├── register.html
│   ├── login.html
│   ├── dashboard.html
│   ├── admin.html
│   ├── terms.html
│   └── 404.html
│
├── 📦 Assets
│   ├── interactive.js       # Shared interactive elements
│   └── favicon.svg
│
├── 🐳 Docker
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── nginx.conf
│   └── .dockerignore
│
├── 🏗️ Terraform
│   ├── terraform/
│   │   ├── main.tf          # AWS resources definition
│   │   ├── variables.tf     # Input variables
│   │   ├── outputs.tf       # Output values
│   │   └── terraform.tfvars # Variable values
│
├── ⚙️ CI/CD
│   └── .github/
│       └── workflows/
│           └── deploy.yml   # GitHub Actions pipeline
│
└── 📋 Docs
    ├── README.md
    └── .gitignore
```

---

## CI/CD Pipeline

Every `git push` to `main` triggers the GitHub Actions workflow:

```
git push to main
       │
       ▼
Step 1: Validate all 13 HTML files exist
       │
       ▼
Step 2: Check required assets (favicon, JS)
       │
       ▼
Step 3: Deploy to AWS Amplify via CLI
       │
       ▼
Site live at amplifyapp.com in ~2 minutes
```

**Secrets configured in GitHub:**

| Secret | Purpose |
|--------|---------|
| `AWS_ACCESS_KEY_ID` | Amplify deployment auth |
| `AWS_SECRET_ACCESS_KEY` | Amplify deployment auth |
| `AWS_APP_ID` | Amplify app identifier |
| `AWS_REGION` | AWS region (ap-southeast-2) |

---

## Docker — Local Deployment

Run EduVance on any machine with Docker installed:

```bash
# Build the image
docker build -t eduvance .

# Run the container
docker-compose up

# Open in browser
http://localhost:8080

# Run in background
docker-compose up -d

# Stop
docker-compose down
```

**Base image:** `nginx:alpine` (~7MB)  
**Serves on:** port 8080

---

## Terraform — Infrastructure as Code

All AWS infrastructure is defined in code and reproducible:

```bash
cd terraform

# Initialize providers
terraform init

# Preview changes (nothing created)
terraform plan

# Create/update infrastructure
terraform apply

# Tear down everything
terraform destroy
```

**Resources managed by Terraform:**

| Resource | Name | Purpose |
|----------|------|---------|
| `aws_iam_user` | github-actions-eduvance | Deployment user |
| `aws_iam_user_policy_attachment` | — | Amplify permissions |
| `aws_sns_topic` | eduvance-alerts | Alert notifications |
| `aws_sns_topic_subscription` | — | Email subscription |
| `aws_cloudwatch_metric_alarm` | eduvance-5xx-errors | Server error alert |
| `aws_cloudwatch_metric_alarm` | eduvance-4xx-errors | Client error alert |
| `aws_cloudwatch_metric_alarm` | eduvance-high-latency | Speed alert |
| `aws_cloudwatch_dashboard` | eduvance-monitoring | Visual dashboard |

---

## Firebase Configuration

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

**Firestore Database Structure:**

```
users/
  [uid]/
    name: string
    email: string
    phone: string
    createdAt: ISO timestamp
    role: "admin"             ← only for admin users
    enrollments: [
      {
        program: string
        type: "Course" | "Workshop" | "Webinar" | "Coaching"
        mode: "Online" | "Offline" | "Hybrid"
        price: string
        date: string
        status: "Paid" | "Pending"
        paymentId: string     ← Razorpay payment ID
      }
    ]

feedback/
  [auto-id]/
    student_name: string
    email: string
    course: string
    instructor: string
    learning_mode: string
    ratings: { r_content, r_clarity, r_practice, r_doubts, r_career, r_overall }
    recommend: string
    comments: string
    submittedAt: ISO timestamp
```

**To grant admin access:**
> Firestore Console → users → [uid] → Add field: `role` = `"admin"`

---

## AWS Lambda — Enrollment Emails

**Function:** `eduvance-enrollment-email`  
**Trigger:** API Gateway HTTP POST  
**Runtime:** Node.js 24.x  
**Endpoint:** `https://4fmtp81hek.execute-api.ap-southeast-2.amazonaws.com/default/eduvance-enrollment-email`

On every successful enrollment:
1. Sends branded HTML confirmation email to student
2. Sends new enrollment alert to admin
3. Email contains course details, date, payment ID, dashboard link

---

## CloudWatch Monitoring

**Dashboard:** [View Live Dashboard](https://ap-southeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-southeast-2#dashboards:name=eduvance-monitoring)

| Alarm | Threshold | Action |
|-------|-----------|--------|
| 5xx Server Errors | ≥ 5 in 5 mins | Email alert via SNS |
| 4xx Client Errors | ≥ 10 in 5 mins | Email alert via SNS |
| High Latency | ≥ 5 seconds avg | Email alert via SNS |

---

## Razorpay Payments

- **Mode:** Test (KYC under review)
- **Theme:** Gold `#c8a96e`
- **Test Card:** `4111 1111 1111 1111` — any future date — any CVV — OTP: `1234`
- **Free courses:** bypass Razorpay entirely
- **On success:** enrollment saved to Firestore with `status: "Paid"` and `paymentId`

---

## Roadmap

- [ ] Custom domain — `eduvance-academy.com`
- [ ] Razorpay live mode after KYC approval
- [ ] SES production access after domain verification
- [ ] PDF certificate generation on course completion
- [ ] Video hosting with AWS S3 + CloudFront
- [ ] Multi-tenant architecture for multiple academies
- [ ] React Native mobile app

---

## Running the Project

### Prerequisites
- Node.js (for Firebase CLI)
- Docker Desktop
- Terraform CLI
- AWS CLI configured
- Git

### Quick Start
```bash
# Clone the repo
git clone https://github.com/couch-paladin/Academy-Management-.git
cd Academy-Management-

# Run with Docker
docker-compose up

# Open http://localhost:8080
```

---

*Built with ♥ by Jannani · EduVance Academy © 2026*
