# 🎓 Assignment Submission Platform

An instructor-student platform for managing and evaluating assignments. Built with Next.js 15 (App Router), MongoDB, Tailwind CSS, and modern best practices.

Live: https://study-arena-inky.vercel.app/

## 🚀 Features

### 🔒 Authentication
- Register / Sign-In with NextAuth.js
- Role-based access: `instructor`, `student`

### 📝 Assignments
- Instructors can create assignments with title, description, category, total marks, and deadline
- Assignments saved with timestamps (`createdAt`)
- Students can view and submit assignments
- Submissions include notes and external links

### 📥 Submissions
- Instructors can:
  - View all submitted assignments
  - Evaluate each with:
    - Feedback
    - Status: `accepted` / `rejected`
- Evaluation done via modal form with real-time updates

### 💾 Backend (API Routes)
- `/api/assignments` – Create & fetch assignments
- `/api/assignment-submissions` – Create, fetch, and update submissions
- Role-based filtering (e.g. only show instructor’s assignments)

### 🛠️ Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Auth:** NextAuth.js (Google OAuth)
- **Database:** MongoDB (native driver)
- **Styling:** Tailwind CSS
- **Forms:** React Hook Form + Controlled inputs
- **Validation:** Zod (optional)
- **Deployment:** Vercel (Frontend + Serverless APIs)

### Env Variables
- MONGODB_URI=your_mongodb_connection_string
- NEXTAUTH_SECRET=your_nextauth_secret
- NEXTAUTH_URL=http://localhost:3000


### ✨ TODO / Future Enhancements
- Search & filter assignments
- Submission edit deadline enforcement
- Grade scoring system
- Admin dashboard for managing users
- Email notifications on evaluation


