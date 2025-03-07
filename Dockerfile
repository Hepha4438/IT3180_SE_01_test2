# Sử dụng image chính thức của OpenJDK 17
FROM eclipse-temurin:17-jdk

# Đặt thư mục làm việc trong container
WORKDIR /app

COPY target/IT3180_2024II_SE_01_test2-1.0-SNAPSHOT.jar /app.jar

CMD ["java", "-jar", "/app.jar"]

