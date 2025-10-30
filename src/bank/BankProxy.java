package bank;

public class BankProxy implements BankOperations {
    private RealBankServer realBank;

    public BankProxy() {
        realBank = new RealBankServer();
    }

    // New method to check if card exists in DB
    public boolean verifyCardExists(String cardNumber) {
        return realBank.cardExists(cardNumber);
    }

    @Override
    public boolean verifyPin(String cardNumber, int pin) {
        // Only verify PIN if card exists
        if (!verifyCardExists(cardNumber)) return false;
        return realBank.verifyPin(cardNumber, pin);
    }

    @Override
    public boolean verifyBiometric(String cardNumber, String biometric) {
        // Only verify biometric if card exists
        if (!verifyCardExists(cardNumber)) return false;
        return realBank.verifyBiometric(cardNumber, biometric);
    }

    @Override
    public double getBalance(String cardNumber) {
        if (!verifyCardExists(cardNumber)) return -1;
        return realBank.getBalance(cardNumber);
    }

    @Override
    public boolean withdraw(String cardNumber, double amount) {
        if (!verifyCardExists(cardNumber)) return false;
        return realBank.withdraw(cardNumber, amount);
    }

    @Override
    public void deposit(String cardNumber, double amount) {
        if (!verifyCardExists(cardNumber)) return;
        realBank.deposit(cardNumber, amount);
    }

    @Override
    public void logTransaction(String cardNumber, String type, double amount) {
        if (!verifyCardExists(cardNumber)) return;
        realBank.logTransaction(cardNumber, type, amount);
    }
}
