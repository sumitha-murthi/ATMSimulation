import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {

    // ⚙️ Update these according to your SQL*Plus credentials
    private static final String URL = "jdbc:oracle:thin:@localhost:1521:XE";  // XE is default SID for Oracle Express
    private static final String USER = "system";  // your Oracle username
    private static final String PASSWORD = "23MIC0141";  // your Oracle password

    // 🔗 Method to establish connection
    public static Connection getConnection() {
        Connection conn = null;
        try {
            // Load the Oracle JDBC driver
            Class.forName("oracle.jdbc.driver.OracleDriver");

            // Create a connection
            conn = DriverManager.getConnection(URL, USER, PASSWORD);
            System.out.println("✅ Connected to Oracle Database successfully!");
        } 
        catch (ClassNotFoundException e) {
            System.err.println("❌ Oracle JDBC Driver not found! Please check your ojdbc11.jar path.");
            e.printStackTrace();
        } 
        catch (SQLException e) {
            System.err.println("❌ Database connection failed! Check URL/credentials.");
            e.printStackTrace();
        }
        return conn;
    }

    // 🧪 For quick testing only
    public static void main(String[] args) {
        Connection testConn = getConnection();
        if (testConn != null) {
            try {
                testConn.close();
                System.out.println("🔒 Connection closed successfully.");
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
