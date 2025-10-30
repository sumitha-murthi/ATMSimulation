package atm;

import bank.BankProxy;
import transactions.*;

public class ATM {
    private ATMState idleState;
    private ATMState cardInsertedState;
    private ATMState biometricState;
    private ATMState pinVerifiedState;
    private ATMState transactionState;

    private ATMState currentState;
    private BankProxy bankProxy;
    private TransactionHandler txChain;

    private String cardNumber;

    public ATM(BankProxy bankProxy) {
        this.bankProxy = bankProxy;

        idleState = new IdleState(this);
        cardInsertedState = new CardInsertedState(this);
        biometricState = new BiometricState(this);
        pinVerifiedState = new PinVerifiedState(this);
        transactionState = new TransactionState(this);

        currentState = idleState;

        setupTransactionChain();
    }

    private void setupTransactionChain() {
        FraudHandler fraud = new FraudHandler(bankProxy);
        WithdrawHandler withdraw = new WithdrawHandler(bankProxy);
        DepositHandler deposit = new DepositHandler(bankProxy);
        BalanceHandler balance = new BalanceHandler(bankProxy);

        fraud.setNextHandler(withdraw);
        withdraw.setNextHandler(deposit);
        deposit.setNextHandler(balance);

        txChain = fraud;
    }

    public void setState(ATMState state) { this.currentState = state; }

    public ATMState getIdleState() { return idleState; }
    public ATMState getCardInsertedState() { return cardInsertedState; }
    public ATMState getBiometricState() { return biometricState; }
    public ATMState getPinVerifiedState() { return pinVerifiedState; }
    public ATMState getTransactionState() { return transactionState; }

    // --- UPDATED METHODS ---
    public boolean insertCard(String cardNumber) {
        if (!bankProxy.verifyCardExists(cardNumber)) {
            System.out.println("No such account exists.");
            currentState = idleState;
            return false;
        }
        this.cardNumber = cardNumber;
        currentState = cardInsertedState;
        System.out.println("Card inserted: " + cardNumber);
        return true;
    }

    public boolean enterBiometric(String code) {
        if (!bankProxy.verifyBiometric(cardNumber, code)) {
            System.out.println("Incorrect biometric code.");
            System.out.println("Transaction invalid.");
            currentState = idleState;
            return false;
        }
        System.out.println("Biometric verified.");
        currentState = pinVerifiedState;
        return true;
    }

    public boolean enterPin(int pin) {
        if (!bankProxy.verifyPin(cardNumber, pin)) {
            System.out.println("Incorrect PIN code.");
            System.out.println("Transaction invalid.");
            currentState = idleState;
            return false;
        }
        System.out.println("PIN verified.");
        currentState = transactionState;
        return true;
    }

    public void requestTransaction(String type, double amount) {
        txChain.handleTransaction(cardNumber, type, amount);
    }

    public void ejectCard() {
        System.out.println("Card ejected.");
        currentState = idleState;
    }

    public BankProxy getBankProxy() { return bankProxy; }
    public String getCardNumber() { return cardNumber; }
}
