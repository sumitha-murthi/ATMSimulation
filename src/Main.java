import atm.ATM;
import bank.BankProxy;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        ATM atm = new ATM(new BankProxy());

        while (true) {
            System.out.println("\n=== Welcome to Smart ATM ===");
            System.out.println("1. Insert Card");
            System.out.println("2. Exit");
            System.out.print("Choose: ");
            int choice = sc.nextInt();
            sc.nextLine(); // consume newline

            if (choice == 2) break;
            if (choice != 1) {
                System.out.println("Invalid choice!");
                continue;
            }

            System.out.print("Enter card number: ");
            String card = sc.nextLine();

            if (!atm.insertCard(card)) continue; // invalid card, back to menu

            System.out.print("Enter biometric code: ");
            String bio = sc.nextLine();

            if (!atm.enterBiometric(bio)) continue; // invalid biometric, back to menu

            System.out.print("Enter PIN: ");
            int pin = sc.nextInt();
            sc.nextLine();

            if (!atm.enterPin(pin)) continue; // invalid PIN, back to menu

            // If all valid, show transaction menu
            while (true) {
                System.out.println("\n--- Transactions ---");
                System.out.println("1. Withdraw");
                System.out.println("2. Deposit");
                System.out.println("3. Balance");
                System.out.println("4. Eject Card");
                System.out.print("Choose: ");
                int txChoice = sc.nextInt();
                sc.nextLine();

                if (txChoice == 4) {
                    atm.ejectCard();
                    break;
                } else if (txChoice == 1) {
                    System.out.print("Enter amount to withdraw: ");
                    double amount = sc.nextDouble();
                    sc.nextLine();
                    atm.requestTransaction("withdraw", amount);
                } else if (txChoice == 2) {
                    System.out.print("Enter amount to deposit: ");
                    double amount = sc.nextDouble();
                    sc.nextLine();
                    atm.requestTransaction("deposit", amount);
                } else if (txChoice == 3) {
                    atm.requestTransaction("balance", 0);
                } else {
                    System.out.println("Invalid choice!");
                }
            }
        }
        System.out.println("Thank you for using Smart ATM!");
        sc.close();
    }
}
