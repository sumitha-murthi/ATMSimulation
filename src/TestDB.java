import java.sql.*;

public class TestDB {
    public static void main(String[] args) {
        Connection conn = null;
        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            conn = DriverManager.getConnection(
                "jdbc:oracle:thin:@localhost:1521:XE", "system", "23MIC0141"
            );
            System.out.println("✅ Connected!");

            // Test query
            ResultSet rs = conn.createStatement().executeQuery("SELECT * FROM accounts");
            while (rs.next()) {
                System.out.println(rs.getString("holder_name") + " - " + rs.getDouble("balance"));
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try { if (conn != null) conn.close(); } catch (SQLException e) { e.printStackTrace(); }
        }
    }
}
