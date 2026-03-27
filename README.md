# MTU One ID Portal (v3 — Interactive & Verified)

A state-of-the-art, self-service Student Identity Card management system for Mountain Top University. This project allows students to capture photos, manage their digital IDs in a 3D interactive environment, and provides a live, scannable verification portal for security and administration.

---

## ✨ v3 Core Features

### 🎓 Student Portal
- **3D Interactive ID Card**: Immersive, flippable ID card (CR80 standard) using CSS 3D transforms. Click to flip and view the back face.
- **QR-Based Verification**: The back face features a functional QR code that leads directly to a live student verification record.
- **Course Enrollment Tracking**: Automatically fetches and displays registered courses and unit loads on both the ID card and verification page.
- **Standardized PDF Printing**: Optimized `react-to-pdf` configuration that generates 2-page PDFs perfectly sized (85.6mm x 54mm) for PVC card printers.
- **Self-Service Photo Capture**: Guided webcam capture with real-time preview and Supabase storage upload.

### 🛡️ Admin Command Center
- **Menu-Driven Dashboard**: Modular interface with isolated views for institutional management.
- **Student Monitoring**: Searchable list of all students with live print statistics and enrollment data.
- **Global Limit Control**: Authority to set institutional print caps with a single action.
- **Exhausted Students Queue**: Smart monitoring of students who have reached their issuance limits, with manual "+1" or "Full Reset" overrides.

---

## 🛠️ Tech Stack
- **Frontend**: React.js, React Router v6.
- **Backend/Database**: Supabase (PostgreSQL) for student and course data.
- **Storage**: Supabase Storage for student profile photos.
- **Visuals**: `qrcode.react` (2D scanning), CSS 3D (flip mechanics), Vanilla CSS (fluid responsiveness).
- **PDF Engine**: `react-to-pdf` (Hardware-accurate CR80 scaling).

---

## ⚙️ Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Chysom13/student-id-portal.git
   cd student-id-portal
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_SUPABASE_URL=your_project_url
   REACT_APP_SUPABASE_ANON_KEY=your_anon_key
   REACT_APP_ADMIN_PASS=your_admin_password
   ```

4. **Database Schema:**
   The portal requires three core tables in Supabase:
   - `students`: Core profile data and print metrics.
   - `courses`: Master list of university courses.
   - `enrolled_courses`: Joint table mapping students to their current registrations.

5. **Start Development:**
   ```bash
   npm start
   ```

---

## 📘 Project Architecture
- `src/pages`: Home, DisplayCard (Digital ID), VerifyStudent (Public Portal), AdminDashboard.
- `src/components`: IdCard (3D Logic), StudentMonitor, ExhaustedStudents, CapturePhoto.
- `src/services`: Supabase initialization and data hooks.
- `brain`: Architectural logs and implementation plans.

---

## 👨‍💻 Author
Custom-built for Mountain Top University (MTU) Student Identity Management.
