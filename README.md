# 🏧 ATM Simulation Project

A comprehensive ATM simulation system with both **Java console application** and **modern web interface**.

---

## 📚 Table of Contents

- [Project Structure](#project-structure)
- [Java Console Application](#java-console-application)
- [Web Application](#web-application)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Applications](#running-the-applications)
- [Test Accounts](#test-accounts)
- [Troubleshooting](#troubleshooting)

---

## 📂 Project Structure

```
ATMSimulation/
├── src/                    # Java source code
│   ├── Main.java           # Java console application
│   ├── DBConnection.java   # Oracle DB connection
│   ├── TestDB.java         # Database test utility
│   ├── atm/                # ATM state management
│   ├── bank/               # Bank operations (Proxy pattern)
│   └── transactions/       # Transaction handlers (Chain of Responsibility)
│
├── db/                     # Database schemas
│   └── schema.sql          # Oracle DB schema
│
└── atm-web-app/           # Modern Web Application ⭐
    ├── src/                # React TypeScript source
    ├── server/             # Node.js Express backend
    ├── public/             # Static assets
    └── README.md           # Detailed web app docs
```

---

## 🖥️ Java Console Application

### Description
Traditional console-based ATM simulation using Java with Oracle database backend.

### Features
- Multi-factor authentication (Card + Biometric + PIN)
- State Pattern for ATM flow management
- Proxy Pattern for secure bank operations
- Chain of Responsibility for transaction processing
- Oracle database integration via JDBC

### Requirements
- **Java**: JDK 8 or higher
- **Oracle Database**: Oracle Express Edition (XE) 11g or higher
- **JDBC Driver**: ojdbc11.jar (included in classpath)

### Running Java Application

1. **Setup Oracle Database**
   ```bash
   # Run the schema.sql file in Oracle SQL*Plus
   sqlplus system/your_password@localhost:1521/XE
   @db/schema.sql
   ```

2. **Update Database Credentials**
   Edit `src/DBConnection.java`:
   ```java
   private static final String URL = "jdbc:oracle:thin:@localhost:1521:XE";
   private static final String USER = "system";
   private static final String PASSWORD = "your_password";
   ```

3. **Compile and Run**
   ```bash
   javac -d bin src/**/*.java
   java -cp bin Main
   ```

---

## 🌐 Web Application

### Description
Modern, professional web-based ATM simulation with React frontend and Node.js backend.

### Features
- 🎨 Beautiful UI with Tailwind CSS
- ✨ Smooth animations with Framer Motion
- 🌓 Dark/Light mode support
- 📱 Fully responsive design
- 📊 Transaction history with CSV export
- 👨‍💼 Admin dashboard
- 🔐 Same security patterns as Java app

---

## ✅ Prerequisites

### For Web Application (Required)

| Software | Version Required | Check Version | Download Link |
|----------|-----------------|---------------|---------------|
| **Node.js** | 18.0.0 or higher | `node --version` | [nodejs.org](https://nodejs.org/) |
| **npm** | 9.0.0 or higher | `npm --version` | Comes with Node.js |
| **Git** | Latest | `git --version` | [git-scm.com](https://git-scm.com/) |

### For Java Application (Optional)

| Software | Version Required | Check Version |
|----------|-----------------|---------------|
| **Java JDK** | 8 or higher | `java -version` |
| **Oracle Database** | XE 11g or higher | Check SQL*Plus |

### Recommended Tools

- **VS Code** - Code editor ([download](https://code.visualstudio.com/))
- **Chrome/Edge** - Modern browser with DevTools

---

## 🚀 Installation & Setup

### Step 1: Verify Prerequisites

Open a terminal/PowerShell and check versions:

```bash
# Check Node.js (should be 18+)
node --version
# Example output: v20.11.0

# Check npm (should be 9+)
npm --version
# Example output: 10.2.4

# Check Git
git --version
# Example output: git version 2.43.0
```

**❌ If any command fails**, install the missing software from the links above.

---

### Step 2: Navigate to Web App Directory

**⚠️ IMPORTANT**: You must be in the `atm-web-app` folder for npm commands!

```bash
# Option 1: From project root
cd atm-web-app

# Option 2: Full path (Windows)
cd D:\other\work\school\SAS\ATMSimulation\atm-web-app

# Option 3: Full path (Mac/Linux)
cd /path/to/ATMSimulation/atm-web-app
```

**Verify you're in the correct directory:**

```bash
# Windows PowerShell
pwd
# Should show: ...\ATMSimulation\atm-web-app

# Mac/Linux/Git Bash
pwd
# Should show: .../ATMSimulation/atm-web-app

# List files (should see package.json)
dir      # Windows
ls       # Mac/Linux
```

---

### Step 3: Install Dependencies

**Make sure you're in the `atm-web-app` folder!**

```bash
npm install
```

**Expected output:**
```
added 424 packages, and audited 425 packages in 15-30s

83 packages are looking for funding
  run `npm fund` for details
```

**⏱️ Time**: First installation takes 1-3 minutes depending on internet speed.

**📦 What gets installed:**
- React 18.2.0
- TypeScript 5.2.2
- Vite 5.0.8
- TailwindCSS 3.4.0
- Framer Motion 10.18.0
- Express 4.18.2
- And ~420 other dependencies

**⚠️ Warnings are normal** - You may see deprecated package warnings. These don't affect functionality.

---

## 🎮 Running the Applications

### Option 1: Quick Start (Easiest - Windows Only)

**From the `atm-web-app` folder:**

```bash
# Just double-click this file:
START.bat
```

This automatically:
✅ Starts backend server on port 5000
✅ Starts frontend server on port 3000
✅ Opens browser to http://localhost:3000

---

### Option 2: Manual Start (All Platforms)

**You need TWO terminal windows running simultaneously.**

#### Terminal 1: Start Backend Server

```bash
# Navigate to web app folder
cd D:\other\work\school\SAS\ATMSimulation\atm-web-app

# Start backend
npm run server
```

**Expected output:**
```
> atm-simulation-web@1.0.0 server
> node server/index.js

🚀 ATM Backend Server running on http://localhost:5000
✅ Mock database loaded with 4 accounts
📊 API endpoints available at http://localhost:5000/api
```

**✅ Success indicators:**
- No errors shown
- Server running on port 5000
- 4 accounts loaded

**⚠️ Leave this terminal running!** Don't close it.

---

#### Terminal 2: Start Frontend Server

**Open a NEW terminal window** (keep Terminal 1 running!)

```bash
# Navigate to web app folder
cd D:\other\work\school\SAS\ATMSimulation\atm-web-app

# Start frontend
npm run dev
```

**Expected output:**
```
> atm-simulation-web@1.0.0 dev
> vite

  VITE v5.0.8  ready in 2500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

**✅ Success indicators:**
- "VITE ready" message
- Local URL shown: http://localhost:3000
- No errors

**⚠️ Keep both terminals running!**

---

### Step 4: Open in Browser

1. Open your web browser (Chrome, Edge, Firefox, Safari)
2. Navigate to: **http://localhost:3000**
3. You should see the Smart ATM landing page

**🎉 Success!** Your application is running!

---

## 🧪 Test Accounts

Use these accounts to test the ATM simulation:

| Account Holder | Card Number | Biometric Code | PIN | Initial Balance |
|----------------|-------------|----------------|-----|-----------------|
| **Sumitha** | `1111222233334444` | `123456789` | `1234` | $5,000.00 |
| **Divya** | `2222333344445555` | `987654321` | `2345` | $6,000.00 |
| **Manish** | `3333444455556666` | `112233445` | `3456` | $7,000.00 |
| **Nandhini** | `4444555566667777` | `556677889` | `4567` | $8,000.00 |

### Quick Test (30 seconds)

1. Go to http://localhost:3000
2. Click **"Launch ATM"** button
3. Enter card number: `1111222233334444`
4. Click Enter or press Enter key
5. Enter biometric: `123456789`
6. Click Enter or press Enter key
7. Enter PIN: `1234`
8. Click Enter or press Enter key
9. Click **"Check Balance"** → Should show $5,000
10. Try withdrawing $500 → Balance updates to $4,500

---

## 🗺️ Application Pages

| Page | URL | Description |
|------|-----|-------------|
| **Home** | http://localhost:3000/ | Landing page with features |
| **ATM** | http://localhost:3000/atm | Main ATM interface |
| **Transactions** | http://localhost:3000/transactions | Transaction history |
| **About** | http://localhost:3000/about | Architecture & patterns |
| **Admin** | http://localhost:3000/admin | System dashboard |

---

## 🛑 Stopping the Application

### Stop Servers

In each terminal window (Terminal 1 and Terminal 2):

```bash
# Press:
Ctrl + C
```

Both servers will stop gracefully.

---

## 🔄 Restarting the Application

Just repeat the "Running the Applications" steps:

```bash
# Terminal 1
npm run server

# Terminal 2 (new terminal)
npm run dev
```

---

## 🐛 Troubleshooting

### ❌ Problem: `npm: command not found`

**Solution:** Node.js is not installed or not in PATH.

1. Download Node.js from [nodejs.org](https://nodejs.org/)
2. Install with default options
3. **Restart your terminal**
4. Verify: `node --version`

---

### ❌ Problem: `Error: ENOENT: no such file or directory, open '...\package.json'`

**Cause:** You're in the wrong directory!

**Solution:**
```bash
# Navigate to correct folder
cd atm-web-app

# Verify you're in the right place
dir package.json    # Windows
ls package.json     # Mac/Linux

# If you see package.json, you're good!
```

---

### ❌ Problem: `Port 3000 is already in use`

**Cause:** Another application is using port 3000.

**Solution (Windows):**
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace <PID> with actual number)
taskkill /PID <PID> /F
```

**Solution (Mac/Linux):**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

**Or** change the port in `vite.config.ts` (line 12):
```typescript
server: {
  port: 3001,  // Change to different port
}
```

---

### ❌ Problem: `Port 5000 is already in use`

**Solution:** Same as above, but for port 5000:

```powershell
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

---

### ❌ Problem: Frontend loads but API calls fail

**Check:**
1. Is backend running? Look for Terminal 1 with "Backend Server running"
2. Backend should be on port 5000
3. Check browser console (F12) for errors

**Solution:**
- Restart backend: `npm run server`
- Check `vite.config.ts` proxy settings point to port 5000

---

### ❌ Problem: `npm install` fails with permission errors

**Solution (Windows - Run as Administrator):**
```powershell
# Right-click PowerShell → "Run as Administrator"
cd D:\other\work\school\SAS\ATMSimulation\atm-web-app
npm install
```

**Solution (Mac/Linux):**
```bash
# DON'T use sudo with npm!
# Instead, fix npm permissions:
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

---

### ❌ Problem: Browser shows blank page

**Check:**
1. Open browser console (F12)
2. Look for JavaScript errors
3. Check Network tab for failed requests

**Solution:**
- Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
- Clear browser cache
- Try different browser (Chrome recommended)

---

### ❌ Problem: TypeScript errors during development

**Solution:**
```bash
# Reinstall dependencies
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

### ❌ Problem: Modules not found / Import errors

**Solution:**
```bash
# Make sure TypeScript is installed
npm install -D typescript

# Restart dev server
# Press Ctrl+C to stop, then:
npm run dev
```

---

## 📖 Additional Documentation

All in the `atm-web-app` folder:

| Document | Description |
|----------|-------------|
| **README.md** | Detailed web app documentation |
| **QUICK_START.md** | Fast reference guide |
| **SETUP.md** | Step-by-step setup |
| **TESTING_GUIDE.md** | Test scenarios |
| **STATUS.md** | Current status |
| **NAVIGATION_HELP.md** | Directory help |

---

## 🎓 Technology Stack

### Web Application

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18+ | JavaScript runtime |
| **React** | 18.2.0 | UI library |
| **TypeScript** | 5.2.2 | Type safety |
| **Vite** | 5.0.8 | Build tool |
| **TailwindCSS** | 3.4.0 | Styling |
| **Framer Motion** | 10.18.0 | Animations |
| **Express** | 4.18.2 | Backend API |
| **Axios** | 1.6.5 | HTTP client |

### Java Application

| Technology | Version | Purpose |
|------------|---------|---------|
| **Java** | JDK 8+ | Programming language |
| **Oracle DB** | XE 11g+ | Database |
| **JDBC** | ojdbc11 | Database driver |

---

## 🏗️ Architecture & Design Patterns

### State Pattern
Manages ATM states: Idle → Card Inserted → Biometric → PIN Verified → Transaction

### Proxy Pattern
BankProxy acts as security layer before RealBankServer

### Chain of Responsibility
Transaction pipeline: Fraud Check → Withdraw → Deposit → Balance

---

## 🔒 Security Features

- ✅ Multi-factor authentication (Card + Biometric + PIN)
- ✅ Fraud detection (withdrawal limits)
- ✅ SHA-256 transaction hashing
- ✅ Input validation (client & server)
- ✅ Session management
- ✅ Prepared statements (SQL injection prevention)

---

## 📊 Project Statistics

- **Frontend Files**: 17 TypeScript/React files
- **Backend Files**: 1 Express server
- **Total Lines of Code**: ~5,600+
- **Pages**: 5 (Home, ATM, Transactions, About, Admin)
- **API Endpoints**: 8
- **Test Accounts**: 4
- **Design Patterns**: 3

---

## 🚀 Quick Commands Reference

### Essential Commands (from `atm-web-app` folder)

```bash
# Install dependencies (first time only)
npm install

# Start backend server (Terminal 1)
npm run server

# Start frontend server (Terminal 2)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

---

## 💡 Pro Tips

1. **Use VS Code**: Best experience with React/TypeScript
2. **Install Extensions**: ESLint, Prettier, Tailwind CSS IntelliSense
3. **Chrome DevTools**: Press F12 to debug
4. **Hot Reload**: Changes auto-refresh (no need to restart)
5. **Dark Mode**: Toggle with navbar button
6. **Mobile View**: F12 → Toggle device toolbar (Ctrl+Shift+M)

---

## 🤝 Contributing

This is an educational project. To contribute:

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Open Pull Request

---

## 📧 Support

For issues or questions:

1. Check **TROUBLESHOOTING** section above
2. Review `atm-web-app/TESTING_GUIDE.md`
3. Check browser console (F12) for errors
4. Review terminal output for error messages

---

## 📝 License

This project is for educational purposes as part of the Software Architecture & Systems course.

---

## 👥 Authors

**Development Team**
- Full Stack Development
- Database Design
- UI/UX Design

---

## 🎉 Getting Started Checklist

- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Navigated to `atm-web-app` folder
- [ ] Ran `npm install` successfully
- [ ] Started backend: `npm run server` (Terminal 1)
- [ ] Started frontend: `npm run dev` (Terminal 2)
- [ ] Opened http://localhost:3000 in browser
- [ ] Tested login with card `1111222233334444`
- [ ] Explored all 5 pages
- [ ] Tried dark mode toggle

---

**🎊 You're all set! Enjoy the Smart ATM Simulation!**

**Main URL**: http://localhost:3000

*Built with ❤️ using React, TypeScript, TailwindCSS, and Node.js*
