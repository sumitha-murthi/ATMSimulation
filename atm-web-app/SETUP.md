# 🚀 Quick Setup Guide

## Prerequisites
- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))
- **Code Editor** (VS Code recommended)

## Step-by-Step Installation

### 1. Navigate to Project Directory
```bash
cd d:\other\work\school\SAS\ATMSimulation\atm-web-app
```

### 2. Install Dependencies
```bash
npm install
```

This will install all required packages for both frontend and backend.

### 3. Start Backend Server
Open a terminal and run:
```bash
npm run server
```

You should see:
```
🚀 ATM Backend Server running on http://localhost:5000
✅ Mock database loaded with 4 accounts
📊 API endpoints available at http://localhost:5000/api
```

### 4. Start Frontend Development Server
Open a **new terminal** (keep the backend running) and run:
```bash
npm run dev
```

You should see:
```
VITE v5.0.8  ready in XXX ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

### 5. Open in Browser
Navigate to: **http://localhost:3000**

## 🧪 Testing the Application

### Test Account Credentials
Try logging in with:
- **Card**: 1111222233334444
- **Biometric**: 123456789
- **PIN**: 1234

### Features to Test
1. ✅ Insert card and authenticate
2. ✅ Check balance
3. ✅ Withdraw money (try withdrawing >$10,000 to see fraud detection)
4. ✅ Deposit money
5. ✅ View transaction history
6. ✅ Toggle dark mode
7. ✅ Export transactions as CSV
8. ✅ Check admin console

## 🛑 Troubleshooting

### Port Already in Use
If port 3000 or 5000 is already in use:

**Windows:**
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
lsof -ti:3000 | xargs kill -9
```

### Dependencies Not Installing
Try:
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
Make sure TypeScript is installed:
```bash
npm install -D typescript
```

## 📦 Build for Production

### Build Frontend
```bash
npm run build
```

This creates a `dist` folder with optimized production files.

### Preview Production Build
```bash
npm run preview
```

## 🔧 Development Tips

### VS Code Extensions (Recommended)
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- ES7+ React/Redux/React-Native snippets

### Hot Reload
Both frontend and backend support hot reload. Changes will automatically reflect in the browser.

### Debugging
- Use Chrome DevTools (F12)
- React DevTools extension
- Network tab for API calls

## 🎯 Next Steps

1. Explore all pages (Home, ATM, Transactions, About, Admin)
2. Try different test accounts
3. Test responsive design on mobile devices (F12 → Device toolbar)
4. Customize the theme colors in `tailwind.config.js`
5. Add your own features!

## 📚 Documentation

- [React Docs](https://react.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Vite Docs](https://vitejs.dev/)

## 💡 Common Commands

```bash
# Install dependencies
npm install

# Start backend server
npm run server

# Start frontend dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## ✅ You're All Set!

The application should now be running. Enjoy exploring the Smart ATM Simulation!

**Need help?** Check the main README.md or create an issue on GitHub.
