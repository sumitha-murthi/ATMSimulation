package atm;

import bank.BankProxy;

public class CardInsertedState implements ATMState {
    private ATM atm;

    public CardInsertedState(ATM atm) {
        this.atm = atm;
    }

    @Override
    public void insertCard(String cardNumber) {
        System.out.println("Card already inserted.");
    }

    @Override
    public void enterBiometric(String code) {
        BankProxy bank = atm.getBankProxy();
        String cardNumber = atm.getCardNumber();

        // Check if card exists
        if (!bank.verifyCardExists(cardNumber)) {
            System.out.println("No such account exists.");
            atm.setState(atm.getIdleState()); // back to main menu
            return;
        }

        atm.setState(atm.getBiometricState());
        atm.enterBiometric(code);
    }

    @Override
    public void enterPin(int pin) {
        System.out.println("Enter biometric first!");
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
