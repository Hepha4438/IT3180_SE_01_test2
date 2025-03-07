package service;

import model.User;
import repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.core.userdetails.User.UserBuilder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(int id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword())); // Hash password bằng BCrypt
        return userRepository.save(user);
    }

    public User updateUser(int id, User userDetails) {
        return userRepository.findById(id).map(user -> {
            user.setUsername(userDetails.getUsername());
            user.setPassword(passwordEncoder.encode(userDetails.getPassword())); // Hash password
            user.setFullName(userDetails.getFullName());
            user.setEmail(userDetails.getEmail());
            user.setPhoneNumber(userDetails.getPhoneNumber());
            user.setRole(userDetails.getRole());
            return userRepository.save(user);
        }).orElse(null);
    }

    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }

    public boolean checkPassword(String rawPassword, String hashedPassword) {
        System.out.println("🔹 Raw password: " + rawPassword);
        System.out.println("🔹 Hashed password from DB: " + hashedPassword);

        boolean matches = passwordEncoder.matches(rawPassword, hashedPassword);
        System.out.println("🔹 Password matches: " + matches);

        return matches;
    }


    // Xác thực người dùng cho Spring Security
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        UserBuilder builder = org.springframework.security.core.userdetails.User.withUsername(user.getUsername());
        builder.password(user.getPassword()); // Spring Security sẽ kiểm tra với password đã hash
        builder.roles(user.getRole());
        return builder.build();
    }
}
