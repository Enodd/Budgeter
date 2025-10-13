FROM eclipse-temurin:25-jdk
WORKDIR /app

# Copy Gradle files
COPY gradle gradle
COPY gradlew .
COPY build.gradle settings.gradle ./

# Upgrade Gradle to 9.1.0 which fully supports Java 25
RUN ./gradlew wrapper --gradle-version=9.1.0 --no-daemon

# Download dependencies (cached layer)
RUN ./gradlew dependencies --no-daemon

# Copy source code
COPY src ./src

EXPOSE 8080

# Run with Gradle for hot reload
CMD ["./gradlew", "bootRun", "--no-daemon"]
