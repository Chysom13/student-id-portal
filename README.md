# MTU One ID Portal (v2 Redesign)

A robust, full-stack Student Identity Card management system for Mountain Top University. This project allows students to capture photos and generate/print their digital IDs while providing administrators with high-level control over issuance limits, student monitoring, and overrides.

## 🚀 Version 2 Overview
This version (`v2-admin-redesign`) features a complete overhaul of the administrative dashboard, enhanced mobile responsiveness, and a more sophisticated print management logic.

---

## ✨ Features

### 🎓 Student Portal
- **Matriculation Search**: Fast student record retrieval via matriculation number.
- **Photo Capture**: Integrated webcam support for real-time student photo capture.
- **Digital ID Generation**: Automatic generation of professional horizontal IDs (CR80 standard).
- **Print Logic (Phase 5+)**: 
  - 3 print limit per academic level.
  - Automatic level-change detection (resets limits upon promotion).
  - Integrated "Reprint Fine" workflow for subsequent issuances.
- **Mobile Responsive**: Scalable, fluid-stacking layout for perfect viewing on smartphones.

### 🛡️ Admin Dashboard (Command Center)
- **Menu-Driven Interface**: Modular, state-based navigation with isolated views for cleaner management.
- **Global Limit Control**: Set a uniform print limit for all students across the entire institution at once.
- **Exhausted Students Queue**: A specialized real-time queue that lists students who have hit their print limits. 
  - Includes a **Live Activity Badge** on the main menu.
  - Provides manual overrides: "+1 Print" or "Full Reset".
- **Global Student Monitor**: A searchable, exhaustive list of all students showing matriculation numbers, levels, departments, and live print statistics.
- **Premium Dark UI**: A sleek, modern dark-themed interface with CSS Grid layout.

---

## 🛠️ Tech Stack
- **Frontend**: React.js with React Router.
- **Backend/Database**: Supabase (PostgreSQL).
- **PDF Generation**: `react-to-pdf`.
- **Barcode**: `react-barcode` & Orca Scan fallback.
- **Camera**: `react-webcam`.
- **Styling**: Vanilla CSS with fluid layouts and CSS Grid.

---

## ⚙️ Setup & Installation

1. **Clone the project:**
   ```bash
   git clone https://github.com/Chysom13/student-id-portal.git
   cd student-id-portal
   git checkout v2-admin-redesign
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add your Supabase credentials and admin password:
   ```env
   REACT_APP_SUPABASE_URL=your_supabase_url
   REACT_APP_SUPABASE_ANON_KEY=your_anon_key
   REACT_APP_ADMIN_PASS=your_admin_password
   ```

4. **Database Schema:**
   Ensure your Supabase `students` table has the following columns:
   - `id` (UUID/Primary Key)
   - `name`, `matric_number`, `level`, `department`, `photo_url`
   - `print_count` (int), `print_limit` (int), `has_printed` (boolean)
   - `last_printed_level` (string)

5. **Start the development server:**
   ```bash
   npm start
   ```

---

## 📘 Project Structure
- `/src/pages`: Main application routes (Home, DisplayCard, AdminDashboard).
- `/src/components`: Modular UI parts (IdCard, GlobalLimitControl, StudentMonitor, etc.).
- `/src/services`: API configuration (Supabase Client).
- `/brain`: Detailed implementation plans, tasks, and walkthroughs for developers.

---

## 👨‍💻 Author
Created for Mountain Top University ID Management.
