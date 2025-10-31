# 🧪 Testing Guide - Smart ATM Simulation

## Quick Test Scenarios

### 🎯 Scenario 1: Complete ATM Flow (Happy Path)
**Goal**: Test full authentication and transaction process

1. Navigate to `/atm` page
2. Click "Insert Card" or use keypad
3. Enter card: `1111222233334444`
4. Press Enter or click Enter button
5. Enter biometric: `123456789`
6. Press Enter
7. Enter PIN: `1234`
8. Press Enter
9. Click "Check Balance" - Should show $5,000
10. Click "Withdraw"
11. Enter amount: `500`
12. Press Enter - Balance should update to $4,500
13. Click "Deposit"
14. Enter amount: `1000`
15. Press Enter - Balance should update to $5,500
16. Click "Eject Card"

**Expected Result**: All operations succeed, transaction log shows all actions

---

### 🚨 Scenario 2: Fraud Detection Test
**Goal**: Verify transaction limits

1. Complete authentication (steps 1-8 from Scenario 1)
2. Click "Withdraw"
3. Enter amount: `15000` (exceeds $10,000 limit)
4. Press Enter

**Expected Result**: Error toast "Fraud Alert: Withdrawal exceeds limit!"

---

### ❌ Scenario 3: Invalid Credentials
**Goal**: Test authentication failure handling

**Test A: Invalid Card**
1. Navigate to `/atm`
2. Enter card: `9999999999999999`
3. Press Enter

**Expected Result**: Error "No such account exists"

**Test B: Wrong Biometric**
1. Insert valid card: `1111222233334444`
2. Enter biometric: `000000000`
3. Press Enter

**Expected Result**: Error "Incorrect biometric code", redirect to main menu

**Test C: Wrong PIN**
1. Insert card and enter correct biometric
2. Enter PIN: `0000`
3. Press Enter

**Expected Result**: Error "Incorrect PIN code", redirect to main menu

---

### 💰 Scenario 4: Insufficient Balance
**Goal**: Test withdrawal validation

1. Complete authentication with account having $5,000
2. Click "Withdraw"
3. Enter amount: `6000`
4. Press Enter

**Expected Result**: Error "Insufficient balance!"

---

### 📊 Scenario 5: Transaction History
**Goal**: Test transaction tracking and filtering

1. Perform 2-3 transactions (mix of withdraw/deposit)
2. Navigate to `/transactions` page
3. Verify all transactions are listed
4. Click "Withdraw" filter - only withdrawals shown
5. Click "Deposit" filter - only deposits shown
6. Enter card number in search - filter by card
7. Click "Export CSV" - download transactions

**Expected Result**: All filters work, CSV downloads successfully

---

### 🌓 Scenario 6: Dark Mode
**Goal**: Test theme persistence

1. Click moon/sun icon in navbar
2. Verify entire app switches theme
3. Refresh page
4. Theme should persist

**Expected Result**: Dark mode toggles correctly and persists

---

### 👤 Scenario 7: Multiple Accounts
**Goal**: Test different accounts

Test with each account:
- Card: `1111222233334444` | Bio: `123456789` | PIN: `1234` | Balance: $5,000
- Card: `2222333344445555` | Bio: `987654321` | PIN: `2345` | Balance: $6,000
- Card: `3333444455556666` | Bio: `112233445` | PIN: `3456` | Balance: $7,000
- Card: `4444555566667777` | Bio: `556677889` | PIN: `4567` | Balance: $8,000

**Expected Result**: Each account maintains separate balance and transactions

---

### 🔧 Scenario 8: Admin Console
**Goal**: Test admin features

1. Navigate to `/admin` page
2. Verify system status shows "Connected" and "Running"
3. Check all 4 accounts are listed
4. Verify total balance calculation is correct
5. Click "Refresh" button

**Expected Result**: All data loads correctly, refresh updates timestamp

---

### 📱 Scenario 9: Responsive Design
**Goal**: Test mobile layouts

1. Open browser DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test these devices:
   - iPhone 12 Pro (390x844)
   - iPad (768x1024)
   - Desktop (1920x1080)
4. Navigate through all pages
5. Test ATM keypad on mobile
6. Test navbar on mobile (hamburger menu)

**Expected Result**: UI adapts perfectly to all screen sizes

---

### ⚡ Scenario 10: Performance
**Goal**: Test loading and animations

1. Open Network tab in DevTools
2. Hard refresh (Ctrl+Shift+R)
3. Check load times:
   - Initial page load < 2s
   - Route transitions < 300ms
   - API calls < 500ms
4. Verify animations are smooth
5. Check no console errors

**Expected Result**: Fast load times, smooth animations, no errors

---

## 🐛 Common Issues & Solutions

### Issue: Backend not responding
**Solution**:
```bash
# Check if server is running
# Should see: "ATM Backend Server running on http://localhost:5000"
npm run server
```

### Issue: Frontend not loading
**Solution**:
```bash
# Check if Vite dev server is running
# Should see: "Local: http://localhost:3000"
npm run dev
```

### Issue: CORS errors
**Solution**: Ensure backend is running on port 5000 and frontend on 3000

### Issue: State not updating
**Solution**: Check React DevTools, verify ATM context is providing state

### Issue: Transactions not showing
**Solution**: Perform at least one transaction first, then check `/transactions` page

---

## ✅ Testing Checklist

### Functional Testing
- [ ] Card insertion with valid account
- [ ] Card insertion with invalid account
- [ ] Biometric verification (valid & invalid)
- [ ] PIN verification (valid & invalid)
- [ ] Balance inquiry
- [ ] Withdrawal (valid amount)
- [ ] Withdrawal (insufficient balance)
- [ ] Withdrawal (fraud detection)
- [ ] Deposit
- [ ] Transaction logging
- [ ] Card ejection
- [ ] Session reset

### UI/UX Testing
- [ ] All pages load correctly
- [ ] Navigation works (navbar links)
- [ ] Toast notifications appear and dismiss
- [ ] Loading spinners show during API calls
- [ ] Animations are smooth
- [ ] Forms validate input
- [ ] Buttons have hover/active states
- [ ] Dark mode toggle works
- [ ] Theme persists after refresh

### Responsive Testing
- [ ] Mobile (320px - 480px)
- [ ] Tablet (481px - 768px)
- [ ] Laptop (769px - 1024px)
- [ ] Desktop (1025px+)
- [ ] Landscape/Portrait orientations

### Browser Testing
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if on Mac)

### Admin Testing
- [ ] System status displays correctly
- [ ] All accounts shown in table
- [ ] Total balance calculated correctly
- [ ] Refresh button works
- [ ] API endpoints listed

### Transaction History Testing
- [ ] All transactions displayed
- [ ] Filters work (withdraw/deposit/balance/all)
- [ ] Search by card number works
- [ ] Pagination works (if >10 transactions)
- [ ] CSV export downloads
- [ ] Transaction hash displayed correctly

---

## 📈 Performance Benchmarks

**Target Metrics**:
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- API Response Time: < 500ms
- Animation Frame Rate: 60fps

**How to Measure**:
1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Run audit
4. Check Performance score (target: 90+)

---

## 🎓 Demo Script (5-10 minutes)

### Introduction (1 min)
"This is a modern ATM simulation demonstrating enterprise design patterns..."

### Landing Page (1 min)
- Show hero section
- Highlight features
- Toggle dark mode

### ATM Simulation (3 min)
- Insert card: `1111222233334444`
- Enter biometric: `123456789`
- Enter PIN: `1234`
- Check balance
- Withdraw $500
- Show transaction log
- Eject card

### Design Patterns (2 min)
- Navigate to `/about`
- Explain State Pattern
- Explain Proxy Pattern
- Explain Chain of Responsibility

### Admin Console (1 min)
- Navigate to `/admin`
- Show system status
- Show all accounts

### Transaction History (1 min)
- Navigate to `/transactions`
- Show filters
- Export CSV

### Conclusion (1 min)
- Highlight technologies used
- Mention responsive design
- Show mobile view

---

## 🔍 Edge Cases to Test

1. **Rapid clicking**: Click buttons multiple times quickly
2. **Back button**: Use browser back/forward
3. **Refresh during transaction**: Refresh page mid-transaction
4. **Long card numbers**: Test input validation
5. **Negative amounts**: Try withdrawing negative amounts
6. **Zero amounts**: Try $0 transactions
7. **Decimal amounts**: Test $10.99, $10.999
8. **Empty inputs**: Submit empty forms
9. **Multiple sessions**: Open multiple tabs
10. **Network offline**: Disable network, test error handling

---

**Happy Testing! 🚀**

Report any bugs or issues for improvement.
