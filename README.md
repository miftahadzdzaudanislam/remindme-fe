# RemindMe v2

<div align="center">
  <img src="./public/images/logo-remindme.png" alt="RemindMe Logo" width="120"/>
  
  <h3>📚 Reminder Tugas & Jadwal Kuliah Mahasiswa</h3>
  <p>Kelola waktu kuliahmu dengan lebih mudah! Aplikasi manajemen tugas dan jadwal kuliah dengan notifikasi otomatis ke Email.</p>

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.18-38B2AC?logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

</div>

---

## 🎯 Tentang RemindMe

**RemindMe v2** adalah aplikasi web yang dirancang khusus untuk membantu mahasiswa mengelola tugas dan jadwal kuliah. Dengan fitur notifikasi otomatis ke Email, kamu tidak akan pernah lupa deadline lagi!

### ✨ Kenapa RemindMe?

- **🎓 Fokus pada Produktivitas Mahasiswa** - Dirancang khusus untuk kebutuhan akademik mahasiswa
- **📧 Notifikasi Real-Time via Email** - Pengingat otomatis H-3 dan hari H deadline
- **🎨 Desain Simpel, Fitur Lengkap** - Antarmuka yang mudah digunakan namun powerful
- **👨‍🎓 Dibuat oleh Mahasiswa, untuk Mahasiswa** - Solusi dari pengalaman nyata

---

## 🚀 Fitur Unggulan

### 📝 Manajemen Tugas Otomatis

- Tambahkan tugas dengan mudah
- Tentukan deadline dan prioritas
- Track status penyelesaian tugas
- Filter dan search tugas

### 📅 Integrasi Jadwal Kuliah

- Sinkronisasi dengan Google Calendar
- Input manual jadwal kuliah
- Visualisasi kalender tugas
- Reminder untuk mata kuliah

### 🔔 Pengingat Via Email

- Notifikasi H-3 sebelum deadline
- Notifikasi hari H deadline
- Kustomisasi waktu pengingat
- Riwayat notifikasi

### 📊 Dashboard Interaktif

- **Dashboard Mahasiswa**: Lihat tugas, jadwal, dan statistik personal
- **Dashboard Admin**: Kelola user, mata kuliah, dan tugas secara terpusat
- Mini calendar dengan highlight deadline
- Statistik tugas terselesaikan

---

## 🛠️ Tech Stack

### Frontend Framework

- **React 19.2.0** - Library UI modern
- **Vite 7.2.4** - Build tool super cepat
- **React Router DOM 7.12.0** - Routing

### Styling & UI

- **TailwindCSS 4.1.18** - Utility-first CSS framework
- **Framer Motion 12.27.0** - Animasi smooth
- **Lucide React 0.562.0** - Icon library

### State Management & Data Fetching

- **TanStack React Query 5.90.20** - Server state management
- **React Hook Form 7.71.1** - Form management
- **Axios 1.13.2** - HTTP client

### Utilities

- **date-fns 4.1.0** - Date formatting & manipulation
- **react-jwt 2.0.0** - JWT handling
- **react-data-table-component 7.7.0** - Data tables

---

## 📦 Installation

### Prerequisites

- Node.js (v18 atau lebih tinggi)
- npm atau yarn
- Git

### Setup Local

1. **Clone repository**

```bash
git clone https://github.com/miftahadzdzaudanislam/remindme-fe.git
cd remindme-fe
```

2. **Install dependencies**

```bash
npm install
# atau
yarn install
```

3. **Setup environment variables**

```bash
# Buat file .env di root project
cp .env.example .env
```

Isi file `.env`:

```env
VITE_API_BASE_URL=your_backend_api_url
VITE_APP_NAME=RemindMe
```

4. **Run development server**

```bash
npm run dev
# atau
yarn dev
```

5. **Build untuk production**

```bash
npm run build
# atau
yarn build
```

6. **Preview production build**

```bash
npm run preview
# atau
yarn preview
```

---

## 📂 Struktur Project

```
remindme-fe/
├── public/              # Static assets
│   ├── images/          # Images & logo
│   └── carousel/        # Hero carousel images
├── src/
│   ├── _api/            # Axios Instance and interceptor
│   ├── _hooks/          # Custom React hooks
│   ├── _services/       # Custom services for API calls
│   ├── components/
│   │   ├── public/      # Public-facing components
│   │   └── ui/          # Reusable UI components
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── auth/        # Authentication pages
│   │   ├── mahasiswa/   # Student pages
│   │   └── admin/       # Admin pages
│   ├── utils/           # Utility functions
│   ├── App.jsx          # Main App component
│   └── main.jsx         # Entry point
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

---

## 🔐 User Roles

### Mahasiswa

- ✅ Membuat dan mengelola tugas pribadi
- ✅ Melihat jadwal kuliah
- ✅ Mengatur notifikasi Email
- ✅ Melacak progress tugas

### Admin

- ✅ Mengelola data mahasiswa
- ✅ Mengelola mata kuliah
- ✅ Membuat tugas untuk mahasiswa
- ✅ Melihat statistik global

---

### Konfigurasi Vercel

File `vercel.json` sudah disediakan untuk routing SPA:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

---

## 🐛 Known Issues & Roadmap

### Known Issues

- [ ] Integrasi Email masih dalam pengembangan
- [ ] Mobile responsiveness perlu improvement

### Roadmap

- [ ] Push notification via PWA
- [ ] Dark mode
- [ ] Export data ke PDF/Excel
- [ ] Multi-language support
- [ ] Integrate with google calendar
- [ ] Integrate with whatsApp API

---

## 📄 License

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

---

## 🙏 Acknowledgments

- [React Documentation](https://react.dev)
- [TailwindCSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev)
- [TanStack Query](https://tanstack.com/query)

---

<div align="center">
  <p>Dibuat dengan ❤️ oleh Mahasiswa, untuk Mahasiswa</p>
  <p><strong>RemindMe v2.0</strong> - Kuliah Tenang, Tugas Aman!</p>
</div>