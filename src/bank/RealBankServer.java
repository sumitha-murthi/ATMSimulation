package bank;

import java.security.MessageDigest;
import java.sql.*;
import java.time.Instant;

public class RealBankServer implements BankOperations {
    private Connection conn;

    public RealBankServer() {
        try {
            // Load Oracle driver
            Class.forName("oracle.jdbc.driver.OracleDriver");
            // Change username/password as per your DB
            conn = DriverManager.getConnection(
                "jdbc:oracle:thin:@localhost:1521:XE", "system", "23MIC0141");

            System.out.println("Connected to Oracle Database successfully!");
        } catch (Exception e) {
            System.err.println("Database connection failed!");
            e.printStackTrace();
        }
    }

    // Check if the card exists in the accounts table
    public boolean cardExists(String cardNumber) {
        if (conn == null) return false;
        try {
            String sql = "SELECT 1 FROM accounts WHERE card_number = ?";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, cardNumber);
            ResultSet rs = ps.executeQuery();
            return rs.next(); // true if a row exists
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public boolean verifyPin(String cardNumber, int pin) {
        if (conn == null) return false;
        try {
            String sql = "SELECT pin FROM accounts WHERE card_number=?";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, cardNumber);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) return rs.getInt("pin") == pin;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public boolean verifyBiometric(String cardNumber, String biometric) {
        if (conn == null) return false;
        try {
            String sql = "SELECT biometric_code FROM accounts WHERE card_number=?";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, cardNumber);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) return rs.getString("biometric_code").equals(biometric);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public double getBalance(String cardNumber) {
        if (conn == null) return -1;
        try {
            String sql = "SELECT balance FROM accounts WHERE card_number=?";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, cardNumber);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) return rs.getDouble("balance");
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return -1;
    }

    @Override
    public boolean withdraw(String cardNumber, double amount) {
        if (conn == null) return false;
        try {
            double balance = getBalance(cardNumber);
            if (balance >= amount) {
                String sql = "UPDATE accounts SET balance=balance-? WHERE card_number=?";
                PreparedStatement ps = conn.prepareStatement(sql);
                ps.setDouble(1, amount);
                ps.setString(2, cardNumber);
                ps.executeUpdate();
                logTransaction(cardNumber, "withdraw", amount);
                return true;
            } else {
                System.out.println("Insufficient balance!");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public void deposit(String cardNumber, double amount) {
        if (conn == null) return;
        try {
            String sql = "UPDATE accounts SET balance=balance+? WHERE card_number=?";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setDouble(1, amount);
            ps.setString(2, cardNumber);
            ps.executeUpdate();
            logTransaction(cardNumber, "deposit", amount);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void logTransaction(String cardNumber, String type, double amount) {
        if (conn == null) return;
        try {
            String txInput = cardNumber + type + amount + Instant.now().toString();
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            StringBuilder sb = new StringBuilder();
            for (byte b : md.digest(txInput.getBytes())) sb.append(String.format("%02x", b));
            String txHash = sb.toString();

            String sql = "INSERT INTO transactions(tx_id, card_number, tx_type, amount, timestamp) VALUES(?,?,?,?,?)";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, txHash);
            ps.setString(2, cardNumber);
            ps.setString(3, type);
            ps.setDouble(4, amount);
            ps.setTimestamp(5, Timestamp.from(Instant.now()));
            ps.executeUpdate();

            System.out.println("Transaction logged with hash: " + txHash);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Close connection if needed
    public void closeConnection() {
        try {
            if (conn != null && !conn.isClosed()) {
                conn.close();
                System.out.println("Connection closed successfully.");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
