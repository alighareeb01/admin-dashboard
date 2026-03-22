# Admin Dashboard - E-commerce Management System

![Admin Dashboard Banner](file:///C:/Users/Youssef/.gemini/antigravity/brain/cc879ae2-d1ff-43f3-a852-5455026c2842/admin_dashboard_banner_1773712872232.png)

A high-performance, responsive Admin Dashboard for managing an e-commerce platform. Built with a modern tech stack centered around React, Vite, and Tailwind CSS, this dashboard provides a seamless experience for managing categories, brands, products, and more.

## 🌿 Branch Overview

This project uses a branch-based development approach where each feature is developed in its own branch:

### 📋 Available Branches

| Branch                    | Status               | Purpose                                           | Key Features                                                  |
| ------------------------- | -------------------- | ------------------------------------------------- | ------------------------------------------------------------- |
| **main**                  | ✅ Production Ready  | Stable production branch with all merged features | Complete CRUD operations, Authentication, Pagination          |
| **all-component**         | ✅ Feature Complete  | Comprehensive component integration               | Enhanced category management, Error handling, UI improvements |
| **all-component-youssef** | ⚠️ Ahead by 1 commit | Personal development branch                       | Active page handling, SweetAlert2 integration                 |
| **blanklayout**           | ✅ Layout Complete   | Authentication and layout foundation              | GuestRoute implementation, UserContext updates                |
| **brands**                | ✅ CRUD Complete     | Brand management functionality                    | Full Brands CRUD, UI/UX enhancements                          |
| **coupons**               | ✅ CRUD Complete     | Coupon and promotion management                   | Date formatting, Validation schemas                           |
| **products**              | ✅ CRUD Complete     | Product inventory management                      | CategoryContext, API integration                              |

---

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
- **Enhanced Error Handling**: SweetAlert2 integration for better user feedback.

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

## 🔄 Branch Workflow

### Development Process

1. **Feature Development**: Each feature is developed in its own branch
2. **Testing**: Features are tested individually in their branches
3. **Integration**: Completed features are merged to `main` branch
4. **Deployment**: `main` branch is pushed to production

### Branch Switching

To work on a specific feature:

```bash
# Switch to a feature branch
git checkout <branch-name>

# Example: Work on brands
git checkout brands

# Example: Work on products
git checkout products
```

### Merging Workflow

1. Ensure your feature branch is up to date:

   ```bash
   git pull origin <branch-name>
   ```

2. Switch to main and merge:

   ```bash
   git checkout main
   git pull origin main
   git merge <branch-name>
   ```

3. Push the updated main:
   ```bash
   git push origin main
   ```

## 📝 Recent Updates

### Latest Merge (Main Branch)

- **Enhanced Category Management**: Comprehensive error handling and UI improvements
- **Pagination System**: Implemented efficient data pagination
- **SweetAlert2 Integration**: Better user feedback and notifications
- **API Optimization**: Improved API fetch logic and error handling
- **UI/UX Enhancements**: Better mapping and state management

### Branch-Specific Updates

- **all-component**: Latest category management enhancements
- **products**: CategoryContext integration and API improvements
- **coupons**: Consolidated CRUD logic with date formatting
- **brands**: Enhanced UI/UX mapping and CRUD operations
- **blanklayout**: Authentication foundation with GuestRoute

## 🚨 Important Notes

- **Branch Synchronization**: Always pull latest changes before starting work
- **Merge Conflicts**: Resolve conflicts carefully to maintain data integrity
- **API Endpoints**: Ensure API endpoints are properly configured in `.env`
- **State Management**: Use appropriate contexts for global state
- **Error Handling**: Implement proper error boundaries and user feedback

## 🤝 Contributing Guidelines

1. **Create Feature Branch**: Use descriptive branch names
2. **Commit Messages**: Follow conventional commit format
3. **Testing**: Test thoroughly before merging
4. **Documentation**: Update README files for new features
5. **Code Review**: Ensure code quality and consistency

## 📄 License

Distributed under the ISC License. See `LICENSE` for more information.

---

**Last Updated**: March 22, 2026  
**Version**: 1.0.0  
**Maintainer**: YB122

## 📊 Branch Status Summary

### ✅ Production Ready

- **main**: Stable production branch with all merged features

### ✅ Feature Complete

- **all-component**: Complete component integration
- **blanklayout**: Authentication foundation
- **brands**: Brand management system
- **coupons**: Coupon management system
- **products**: Product inventory management

### ⚠️ Development Branch

- **all-component-youssef**: Personal development branch (1 commit ahead)

### 🔄 Development Workflow

All branches follow a consistent development pattern:

1. Feature development in dedicated branch
2. Testing and documentation
3. Merge to main when complete
4. Production deployment from main

This structured approach ensures clean, maintainable code and clear separation of concerns across different features.
