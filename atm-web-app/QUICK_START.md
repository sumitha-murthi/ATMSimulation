# ⚡ Quick Start - Smart ATM Simulation

## 🚀 Fastest Way to Run

### Windows
1. Double-click `START.bat`
2. Wait for installation (first time only)
3. Browser opens automatically at `http://localhost:3000`

### Mac/Linux
```bash
./start.sh
```

---

## 📋 Manual Start (3 Commands)

```bash
# 1. Install (first time only)
npm install

# 2. Terminal 1 - Start backend
npm run server

# 3. Terminal 2 - Start frontend
npm run dev
```

Then open: **http://localhost:3000**

---

## 🧪 First Test (1 minute)

1. Go to ATM page
2. Enter card: `1111222233334444`
3. Enter biometric: `123456789`
4. Enter PIN: `1234`
5. Click "Check Balance" → Should show $5,000
6. Try withdrawing $500

**Done!** ✅

---

## 📚 Full Documentation

- **[README.md](./README.md)** - Complete project docs
- **[SETUP.md](./SETUP.md)** - Detailed setup guide
- **[TESTING_GUIDE.md](./TESTING_GUIDE.md)** - Test scenarios
- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Project overview

---

## 🎯 Test Accounts Cheat Sheet

```
Card: 1111222233334444 | Bio: 123456789 | PIN: 1234 | $5,000
Card: 2222333344445555 | Bio: 987654321 | PIN: 2345 | $6,000
Card: 3333444455556666 | Bio: 112233445 | PIN: 3456 | $7,000
Card: 4444555566667777 | Bio: 556677889 | PIN: 4567 | $8,000
```

---

## 🔍 Troubleshooting

**Port in use?**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

**Dependencies failing?**
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

## 📱 Pages Overview

| Page | URL | Description |
|------|-----|-------------|
| **Home** | `/` | Landing page with features |
| **ATM** | `/atm` | Main ATM interface |
| **Transactions** | `/transactions` | Transaction history |
| **About** | `/about` | Architecture & patterns |
| **Admin** | `/admin` | System monitoring |

---

## 💡 Pro Tips

- **Dark Mode**: Click moon/sun icon in navbar
- **Mobile View**: Press F12 → Device toolbar (Ctrl+Shift+M)
- **Quick Test**: Use keypad or type directly
- **CSV Export**: Download transactions from `/transactions`
- **Fraud Test**: Try withdrawing >$10,000

---

## ✅ What's Included

✅ 5 fully functional pages
✅ Mock backend with 4 test accounts
✅ Real-time transactions
✅ SHA-256 hashing
✅ Dark mode
✅ Responsive design
✅ Toast notifications
✅ Smooth animations
✅ Transaction history
✅ Admin console

---

## 🎓 For Presentations

**5-Minute Demo Flow:**
1. Show landing page (30s)
2. Demonstrate ATM flow (2min)
3. Show transaction history (1min)
4. Explain design patterns on About page (1min)
5. Show admin console (30s)

---

## 🔗 Useful Commands

```bash
# Development
npm run dev          # Start frontend (port 3000)
npm run server       # Start backend (port 5000)

# Build
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Check for errors
```

---

## 📞 Need Help?

1. Check [SETUP.md](./SETUP.md) for detailed instructions
2. Review [TESTING_GUIDE.md](./TESTING_GUIDE.md) for test scenarios
3. Read [README.md](./README.md) for complete documentation

---

**Ready to go! 🚀**

*Built with React, TypeScript, Tailwind CSS, and Node.js*
