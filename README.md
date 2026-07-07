# Mini ERP - Inventory & Sales Management System (Frontend)

A modern and responsive frontend for the **Mini ERP - Inventory & Sales Management System** built with **React, TypeScript, Vite, Tailwind CSS, and Redux Toolkit**.

---

# 🚀 Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Redux Toolkit
- RTK Query
- Axios
- Tailwind CSS
- Shadcn UI
- React Hook Form
- Zod
- Sonner

---

# ✨ Features

## Authentication

- Login
- JWT Authentication
- Protected Routes
- Role-Based Navigation
- Persistent Login

---

## Dashboard

- Statistics Cards
- Quick Actions
- Low Stock Products
- Responsive Dashboard Layout

---

## Product Management

- Product List
- Add Product
- Update Product
- Delete Product
- Image Upload
- Search Products
- Pagination

---

## Sales Management

- Create Sale
- Select Multiple Products
- Quantity Selection
- Automatic Total Calculation
- Stock Validation

---

## Responsive UI

- Mobile Friendly
- Sidebar Navigation
- Responsive Dashboard
- Modern Design using Shadcn UI

---

# 📂 Project Structure

```text
src/
│
├── assets/
├── components/
│   ├── common/
│   ├── layout/
│   └── ui/
│
├── hooks/
├── interfaces/
├── layouts/
├── pages/
│   ├── auth/
│   ├── dashboard/
│   ├── products/
│   └── sales/
│
├── redux/
│   ├── features/
│   └── store.ts
│
├── routes/
├── schemas/
├── services/
├── types/
├── utils/
│
├── App.tsx
├── main.tsx
└── index.css
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/pmppiyas/Mini-ERP-Inventory-Sales-Management_Frontend
```

---

## Navigate to Project

```bash
cd frontend
```

---

## Install Dependencies

Using npm

```bash
npm install
```

Using pnpm

```bash
pnpm install
```

---

# Environment Variables

Create a `.env` file in the project root.

```env
VITE_API_URL=http://localhost:5000/api/v1
```

For production:

```env
VITE_API_URL=https://your-backend-url/api/v1
```

---

# Run the Project

Development

```bash
npm run dev
```

or

```bash
pnpm dev
```

---

Production Build

```bash
npm run build
```

Preview Build

```bash
npm run preview
```

---

# Authentication

The application uses JWT Authentication.

After successful login:

- Access Token is stored securely.
- Protected routes become accessible.
- Navigation changes based on user role.

---

# User Roles

### Admin

- Full Dashboard Access
- Manage Products
- Manage Sales

### Manager

- Manage Products
- Create Sales

### Employee

- View Products
- Create Sales

---

# Main Pages

- Login
- Dashboard
- Products
- Add Product
- Edit Product
- Sales
- Create Sale
- Profile

---

# API Configuration

Base URL

```text
http://localhost:5000/api/v1
```

All API requests are handled using:

- Axios
- RTK Query

---

# Available Scripts

Development

```bash
npm run dev
```

Build

```bash
npm run build
```

Preview

```bash
npm run preview
```

Lint

```bash
npm run lint
```

---

# Deployment

Frontend can be deployed on:

- Vercel (Recommended)
- Netlify

Backend should be deployed separately and the production API URL should be configured in the `.env` file.

---

# Best Practices

- TypeScript
- Component-Based Architecture
- Feature-Based Folder Structure
- Reusable Components
- Global State Management using Redux Toolkit
- API Handling with RTK Query
- Form Validation with Zod & React Hook Form
- Responsive Design
- Clean Code Structure

---

# Author

**Developer:** Prince Mahmud Piyas

---

# License

This project was developed for the **MERN Stack Technical Assessment**.
