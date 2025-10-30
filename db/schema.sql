-- Create accounts table
CREATE TABLE accounts (
    card_number VARCHAR2(16) PRIMARY KEY,
    holder_name VARCHAR2(50) NOT NULL,
    pin NUMBER(4) NOT NULL,
    biometric_code VARCHAR2(20) NOT NULL,
    balance NUMBER(12,2) DEFAULT 0
);

-- Insert sample accounts
INSERT INTO accounts(card_number, holder_name, pin, biometric_code, balance)
VALUES ('1111222233334444', 'Sumitha', 1234, '123456789', 5000);

INSERT INTO accounts(card_number, holder_name, pin, biometric_code, balance)
VALUES ('2222333344445555', 'Divya', 2345, '987654321', 6000);

INSERT INTO accounts(card_number, holder_name, pin, biometric_code, balance)
VALUES ('3333444455556666', 'Manish', 3456, '112233445', 7000);

INSERT INTO accounts(card_number, holder_name, pin, biometric_code, balance)
VALUES ('4444555566667777', 'Nandhini', 4567, '556677889', 8000);

COMMIT;

-- Create transactions table
CREATE TABLE transactions (
    tx_id VARCHAR2(64) PRIMARY KEY,
    card_number VARCHAR2(16) REFERENCES accounts(card_number),
    tx_type VARCHAR2(20),
    amount NUMBER(12,2),
    timestamp TIMESTAMP
);