package main;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordHasher {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPassword = "1234";
        String hashedPassword = encoder.encode(rawPassword);
        System.out.println("Mật khẩu đã mã hóa: " + hashedPassword);
    }
}
