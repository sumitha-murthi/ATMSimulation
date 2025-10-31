import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ATMProvider } from './context/ATMContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { ATMSimulation } from './pages/ATMSimulation';
import { Transactions } from './pages/Transactions';
import { About } from './pages/About';
import { Admin } from './pages/Admin';

function App() {
  return (
    <ThemeProvider>
      <ATMProvider>
        <Router>
          <div className="min-h-screen bg-background dark:bg-darkBg transition-colors duration-200">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/atm" element={<ATMSimulation />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/about" element={<About />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </div>
        </Router>
      </ATMProvider>
    </ThemeProvider>
  );
}

export default App;
