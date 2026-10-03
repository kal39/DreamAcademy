# 🏫 Dream Academy — Integrated School Management Ecosystem

<div align="center">

[![React Native](https://img.shields.io/badge/Frontend-React%20Native%20%2F%20Expo-blue?style=for-the-badge&logo=react)](https://reactnative.dev/)
[![FastAPI](https://img.shields.io/badge/Backend-Python%20%2F%20FastAPI-green?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/Admin-React%20%2F%20Vite%20%2F%20Tailwind-cyan?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

</div>

**Dream Academy** is a modern, full-stack educational ecosystem designed to bridge the communication and management gap between school administration, teachers, parents, and students. Built with scalability and localization in mind, the platform features a high-performance **React Native mobile client**, a **React & Tailwind administration dashboard**, and a robust **Python FastAPI backend**.

---

## 🌟 Key Features

### 📱 1. Mobile Portal (React Native / Expo)
* **Secure Portal Authentication:** Custom token-based secure session management tailored for parent/student access (supporting unique portal IDs and PINs).
* **Live Academic Dashboards:** Real-time visibility into student grade tracking, semester averages, and attendance rates.
* **Financial Transparency:** Integrated fee status updates and transaction tracking references (e.g., CBE integration and localized currency formatting).
* **Smooth UX & Animations:** Crafted with React Native Animated API for smooth transitions, custom tab navigation, and responsive mobile layouts.

### 💻 2. Admin Web Dashboard (`dream-admin`)
* **Comprehensive Overview:** Web-based control panel built with React, Vite, and Tailwind CSS for administrators to manage student records, announcements, and school workflows.
* **Modern UI:** Clean, data-dense interface designed for fast management and reporting.

### ⚡ 3. Backend API Server (Python / FastAPI)
* **RESTful Architecture:** High-speed asynchronous endpoints handling authentication, data validation, and database operations.
* **Database Integration:** SQLite / SQLAlchemy setup designed for secure record keeping and easy deployment.

---

## 📁 Repository Structure

```text
DreamAcademy/
├── backend/              # Python FastAPI server & database models
├── mobile/               # React Native / Expo mobile application
├── dream-admin/          # React + Vite + Tailwind admin web dashboard
└── README.md             # Project documentation