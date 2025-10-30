package atm;

import bank.BankProxy;

public class PinVerifiedState implements ATMState {
    private ATM atm;

    public PinVerifiedState(ATM atm) {
        this.atm = atm;
    }

    @Override
    public void insertCard(String cardNumber) {
        System.out.println("Card already inserted.");
    }

    @Override
    public void enterBiometric(String code) {
        System.out.println("PIN verification in progress. Biometric already verified.");
    }

    @Override
    public void enterPin(int pin) {
        BankProxy bank = atm.getBankProxy();
        String cardNumber = atm.getCardNumber();

        if (!bank.verifyPin(cardNumber, pin)) {
            System.out.println("Wrong PIN Code.");
            atm.setState(atm.getIdleState()); // redirect to main menu
            return;
        }

        System.out.println("PIN verified.");
        atm.setState(atm.getTransactionState());
    }

    @Override
    public void requestTransaction(String type, double amount) {
        System.out.println("Verify PIN first!");
    }

    @Override
    public void ejectCard() {
        System.out.println("Card ejected.");
        atm.setState(atm.getIdleState());
    }
}
