# 🏧 Smart ATM Simulation Web Application

A modern, professional ATM simulation system built with React, TypeScript, and Node.js, demonstrating enterprise-level software design patterns and secure banking operations.

![ATM Simulation](https://img.shields.io/badge/React-18.2-61dafb?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178c6?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwindcss)
![Node.js](https://img.shields.io/badge/Node.js-Express-68a063?style=for-the-badge&logo=node.js)

## 🌟 Features

- **🔐 Multi-Factor Authentication**: Card + Biometric + PIN verification
- **💳 Complete ATM Operations**: Withdraw, Deposit, Balance Inquiry
- **🛡️ Fraud Detection**: Real-time transaction validation and limits
- **📊 Transaction History**: Complete audit trail with SHA-256 hashing
- **🎨 Modern UI/UX**: Smooth animations with Framer Motion
- **🌓 Dark Mode**: Full theme support with persistent preferences
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile
- **⚡ Fast Performance**: Built with Vite for lightning-fast development

## 🏗️ Architecture

This project demonstrates three core software design patterns:

### 1. **State Pattern** (ATM Flow)
Manages ATM operational states: Idle → Card Inserted → Biometric → PIN Verified → Transaction

### 2. **Proxy Pattern** (Security)
BankProxy acts as a protective layer before accessing the real bank server

### 3. **Chain of Responsibility** (Transactions)
Transaction pipeline: Fraud Detection → Withdraw → Deposit → Balance

## 🛠️ Tech Stack

### Frontend
- **React 18.2** - UI library
- **TypeScript 5.2** - Type safety
- **Vite 5.0** - Build tool
- **TailwindCSS 3.4** - Styling
- **Framer Motion 10** - Animations
- **React Router 6** - Navigation
- **Axios** - HTTP client
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime
- **Express 4** - Web framework
- **CORS** - Cross-origin support
- **Crypto** - SHA-256 hashing

### Database
- **Mock Data** - In-memory storage (easily replaceable with Oracle DB)

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm/yarn
- Git

### Steps

1. **Clone the repository**
   ```bash
   cd d:\other\work\school\SAS\ATMSimulation\atm-web-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the backend server**
   ```bash
   npm run server
   ```
   Backend will run on `http://localhost:5000`

4. **Start the frontend (in a new terminal)**
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:3000`

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🚀 Usage

### Test Accounts

The system comes pre-loaded with 4 test accounts:

| Card Number | Biometric Code | PIN | Initial Balance |
|------------|----------------|-----|-----------------|
| 1111222233334444 | 123456789 | 1234 | $5,000 |
| 2222333344445555 | 987654321 | 2345 | $6,000 |
| 3333444455556666 | 112233445 | 3456 | $7,000 |
| 4444555566667777 | 556677889 | 4567 | $8,000 |

### ATM Operation Flow

1. **Insert Card**: Enter a card number from the test accounts
2. **Biometric Verification**: Enter the biometric code
3. **PIN Entry**: Enter the 4-digit PIN
4. **Perform Transactions**: Choose from Withdraw, Deposit, or Balance Check
5. **Eject Card**: End the session

### Features by Page

#### 🏠 **Home Page** (`/`)
- Hero section with project overview
- Feature highlights
- Technology stack display
- Call-to-action buttons

#### 🏧 **ATM Simulation** (`/atm`)
- Interactive ATM screen
- Virtual keypad for input
- Real-time state transitions
- Transaction logging panel
- Test account reference

#### 📊 **Transaction History** (`/transactions`)
- Complete transaction list
- Filter by type (Withdraw/Deposit/Balance)
- Search by card number
- Pagination support
- CSV export functionality
- Transaction hash display

#### ℹ️ **About** (`/about`)
- Design pattern explanations
- Architecture visualization
- Security features overview
- Team information

#### 🔧 **Admin Console** (`/admin`)
- System status monitoring
- Database connection status
- Account overview table
- Total balance statistics
- API endpoint listing

## 📁 Project Structure

```
atm-web-app/
├── src/
│   ├── api/              # API service layer
│   │   └── atmApi.ts
│   ├── components/       # Reusable components
│   │   ├── Navbar.tsx
│   │   ├── Toast.tsx
│   │   └── LoadingSpinner.tsx
│   ├── context/          # React contexts
│   │   ├── ATMContext.tsx
│   │   └── ThemeContext.tsx
│   ├── hooks/            # Custom hooks
│   │   └── useToast.tsx
│   ├── pages/            # Route pages
│   │   ├── Home.tsx
│   │   ├── ATMSimulation.tsx
│   │   ├── Transactions.tsx
│   │   ├── About.tsx
│   │   └── Admin.tsx
│   ├── types/            # TypeScript types
│   │   └── index.ts
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── server/               # Backend server
│   └── index.js          # Express API server
├── public/               # Static assets
├── index.html            # HTML entry
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
├── tailwind.config.js    # Tailwind config
├── vite.config.ts        # Vite config
└── README.md             # This file
```

## 🔌 API Endpoints

### Authentication
- `POST /api/insertCard` - Verify card exists
- `POST /api/verifyBiometric` - Verify biometric code
- `POST /api/verifyPin` - Verify PIN

### Transactions
- `POST /api/transaction` - Perform transaction (withdraw/deposit/balance)
- `GET /api/balance/:cardNumber` - Get account balance
- `GET /api/transactions` - Get transaction history

### Admin
- `GET /api/status` - Get system status
- `GET /api/accounts` - Get all accounts (admin)
- `POST /api/ejectCard` - End session

## 🎨 Design System

### Color Palette
- **Primary**: `#0047AB` (Royal Blue)
- **Accent**: `#FFD700` (Gold)
- **Background**: `#F5F7FA` (Light Gray)
- **Success**: `#16A34A` (Green)
- **Error**: `#DC2626` (Red)
- **Dark Mode BG**: `#111827` (Charcoal)

### Typography
- **Font Family**: Inter (sans-serif)
- **Weights**: 300, 400, 500, 600, 700, 800

## 🔒 Security Features

- ✅ Multi-factor authentication (3 layers)
- ✅ Transaction fraud detection (amount limits)
- ✅ SHA-256 transaction hashing
- ✅ Input validation (client & server)
- ✅ Session management
- ✅ Prepared statements (SQL injection prevention)

## 🧪 Testing

### Manual Testing
1. Test all authentication flows
2. Verify transaction operations
3. Check fraud detection (try withdrawing >$10,000)
4. Test responsive design on different devices
5. Verify dark mode toggle
6. Test CSV export functionality

### Future Enhancements
- Unit tests with Jest/Vitest
- E2E tests with Playwright/Cypress
- API integration tests

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy the 'dist' folder
```

### Backend (Railway/Render/Heroku)
```bash
# Deploy the 'server' folder with Node.js
```

### Environment Variables
Create `.env` files for production:
- `VITE_API_URL` - Backend API URL
- `PORT` - Server port

## 🤝 Contributing

This is an educational project. Contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is for educational purposes. Feel free to use it for learning and demonstration.

## 👥 Team

- **Developer Name** - Full Stack Development
- **Team Member** - Backend & Database
- **Team Member** - Frontend & Design

## 🙏 Acknowledgments

- Built as part of Software Architecture & Systems course
- Demonstrates enterprise design patterns
- Inspired by real-world banking systems

## 📧 Contact

For questions or feedback:
- GitHub: [Your GitHub Profile]
- Email: your.email@example.com

---

**⭐ If you find this project useful, please give it a star!**

Built with ❤️ using React, TypeScript, and Node.js
