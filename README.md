# Admin Dashboard - E-commerce Management System

![Admin Dashboard Banner](file:///C:/Users/Youssef/.gemini/antigravity/brain/cc879ae2-d1ff-43f3-a852-5455026c2842/admin_dashboard_banner_1773712872232.png)

A high-performance, responsive Admin Dashboard for managing an e-commerce platform. Built with a modern tech stack centered around React, Vite, and Tailwind CSS, this dashboard provides a seamless experience for managing categories, brands, products, and more.

## 🚀 Features

### 🔐 Authentication & Security
- **Secure Login & Registration**: Integrated authentication flows with Zod validation.
- **Protected Routes**: Middleware-style routing guards (`ProtectedRoute`, `GuestRoute`) to ensure data privacy.
- **Context-driven User State**: Centralized user management using React Context API.

### 📦 Component Management (CRUD)
- **Categories & SubCategories**: Full management of product hierarchies with image upload support.
- **Brand Management**: Quick and easy management of partner brands.
- **Product Inventory**: Comprehensive product management, including stock levels, pricing, descriptions, and category associations.
- **Coupons & Promotions**: Create and manage promotional codes for the storefront.
- **Orders Overview**: Track and manage customer orders (In Development).

### 💅 UI/UX Excellence
- **Premium Aesthetics**: Clean, modern design with a focused attention to detail.
- **Responsive Design**: Fully optimized for various screen sizes using Tailwind CSS.
- **Dark/Light Mode**: User-controlled theme toggling for a comfortable experience.
- **Interactive Elements**: Smooth transitions and modal-based interactions.

## 🛠️ Tech Stack

- **Frontend Core**: [React 19](https://reactjs.org/) & [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)
- **Data Validation**: [Zod](https://zod.dev/)
- **API Interaction**: [Axios](https://axios-http.com/)
- **Routing**: [React Router Dom 7](https://reactrouter.com/)
- **UI Components**: [Flowbite](https://flowbite.com/)

## 🏗️ Project Structure

```text
src/
├── components/         # Reusable UI components (CRUDs, Auth, UI)
├── contexts/           # Global State management (User context)
├── App.jsx             # Main application entry and routing
├── index.css           # Global styles and Tailwind configuration
└── main.jsx            # Entry point for Vite
```

## ⚙️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16.x or higher)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YB122/admin-dashboard.git
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env` file and add the required API base URL and token (if applicable).

4. **Run the development server**:
   ```bash
   npm run dev
   ```

## 📄 License
Distributed under the ISC License. See `LICENSE` for more information.
