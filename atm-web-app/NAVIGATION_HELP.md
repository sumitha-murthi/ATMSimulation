# 🧭 Navigation Help

## ⚠️ Common Mistake: Wrong Directory!

### ❌ Wrong Location
```bash
D:\other\work\school\SAS\ATMSimulation\
```
This is the **Java project root**. It does NOT have package.json.

### ✅ Correct Location
```bash
D:\other\work\school\SAS\ATMSimulation\atm-web-app\
```
This is the **web app directory**. All npm commands must run here!

---

## 📂 How to Navigate

### PowerShell/CMD
```powershell
# From the Java project root
cd atm-web-app

# Or use full path
cd D:\other\work\school\SAS\ATMSimulation\atm-web-app
```

### File Explorer
1. Open `D:\other\work\school\SAS\ATMSimulation\`
2. Double-click the **`atm-web-app`** folder
3. Right-click → "Open in Terminal" or "Open in VS Code"

---

## 🚀 Correct Commands (from atm-web-app folder)

```bash
# 1. Check you're in the right place
pwd
# Should show: .../ATMSimulation/atm-web-app

# 2. Install dependencies (already done!)
npm install

# 3. Start backend server
npm run server

# 4. In a NEW terminal, start frontend
npm run dev
```

---

## 🎯 Quick Reference

| Current Directory | Command Works? | Action |
|-------------------|----------------|--------|
| `ATMSimulation/` | ❌ No | Run `cd atm-web-app` |
| `ATMSimulation/atm-web-app/` | ✅ Yes | You're good! |

---

## 🔍 How to Check Your Location

### PowerShell/CMD
```powershell
pwd              # Show current directory
dir              # List files (should see package.json)
```

### Linux/Mac/Git Bash
```bash
pwd              # Show current directory
ls               # List files (should see package.json)
```

You should see these files:
- ✅ package.json
- ✅ README.md
- ✅ vite.config.ts
- ✅ src/ folder
- ✅ server/ folder

---

## 💡 VS Code Users

### Open Correct Folder
1. File → Open Folder
2. Navigate to: `D:\other\work\school\SAS\ATMSimulation\atm-web-app`
3. Click "Select Folder"

### Open Terminal in VS Code
- Menu: Terminal → New Terminal
- Should automatically open in `atm-web-app` directory

---

## 🎬 Complete Workflow

```bash
# Terminal 1
cd D:\other\work\school\SAS\ATMSimulation\atm-web-app
npm run server

# Terminal 2 (NEW terminal window)
cd D:\other\work\school\SAS\ATMSimulation\atm-web-app
npm run dev

# Browser
# Open http://localhost:3000
```

---

## ⚡ Easiest Method

### Windows
1. Navigate to `atm-web-app` folder in File Explorer
2. Double-click **`START.bat`**
3. Done! Both servers start automatically

### Mac/Linux
```bash
cd D:\other\work\school\SAS\ATMSimulation\atm-web-app
./start.sh
```

---

## 🆘 Still Having Issues?

### Check if package.json exists:
```bash
# Windows
type package.json

# Mac/Linux
cat package.json
```

If you see JSON content, you're in the right place! ✅

If you see "file not found", run: `cd atm-web-app` ❌

---

**Remember**: Always work from the `atm-web-app` folder! 📁
