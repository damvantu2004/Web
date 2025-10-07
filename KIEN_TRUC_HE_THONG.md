# 2.3. THIẾT KẾ HỆ THỐNG

## 2.3.1. Kiến trúc hệ thống

### 2.3.1.1. Tổng quan kiến trúc

Hệ thống quản lý phòng khám được xây dựng theo mô hình **Client-Server Architecture** kết hợp với **N-Tier Architecture** (kiến trúc phân tầng). Hệ thống được chia thành các tầng độc lập, mỗi tầng đảm nhiệm một chức năng riêng biệt, giúp tăng tính mô-đun hóa, dễ bảo trì và mở rộng.

**Sơ đồ tổng quan kiến trúc hệ thống:**

```
┌──────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                               │
├───────────────────────────────┬──────────────────────────────────┤
│   Client Application          │    Admin Application             │
│   (React.js)                  │    (React.js)                    │
│   - Port: 3000                │    - Port: 3001                  │
│   - Giao diện bệnh nhân       │    - Giao diện quản trị          │
│   - Đặt lịch khám             │    - Quản lý lịch hẹn            │
│   - Xem hồ sơ bệnh án         │    - Quản lý bác sĩ, bệnh nhân   │
│   - Tư vấn AI chatbot         │    - Thống kê báo cáo            │
└───────────────────────────────┴──────────────────────────────────┘
                                │
                    HTTPS/REST API (JSON)
                                │
┌──────────────────────────────────────────────────────────────────┐
│                    API GATEWAY / SECURITY LAYER                   │
│                      (Spring Security + JWT)                      │
│   - Authentication & Authorization                                │
│   - CORS Configuration                                            │
│   - Request Validation                                            │
└──────────────────────────────────────────────────────────────────┘
                                │
┌──────────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER (Backend)                    │
│                         Spring Boot 3.5.5                         │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │         PRESENTATION LAYER (Controller Layer)              │ │
│  │  - 12 REST Controllers                                     │ │
│  │  - Request/Response Handling                               │ │
│  │  - DTO Validation                                          │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                │                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │           SERVICE LAYER (Business Logic Layer)             │ │
│  │  - 13 Service Interfaces                                   │ │
│  │  - 13 Service Implementations                              │ │
│  │  - Business Rules & Validations                            │ │
│  │  - Transaction Management                                  │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                │                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │         DATA ACCESS LAYER (Repository Layer)               │ │
│  │  - 23+ JPA Repositories                                    │ │
│  │  - Spring Data JPA                                         │ │
│  │  - Query Methods                                           │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │         CROSS-CUTTING CONCERNS                             │ │
│  │  - Exception Handling (GlobalExceptionHandler)             │ │
│  │  - Security Configuration                                  │ │
│  │  - Mapper Layer (MapStruct)                                │ │
│  │  - Async Processing                                        │ │
│  └────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
                                │
              ┌─────────────────┴─────────────────┐
              │                                   │
┌─────────────▼────────────┐      ┌──────────────▼──────────┐
│   PERSISTENCE LAYER      │      │    CACHE LAYER          │
│                          │      │                         │
│   MySQL Database         │      │   Redis Cache           │
│   - Port: 3306           │      │   - Port: 6379          │
│   - datn Database        │      │   - Session Storage     │
│   - 25+ Tables           │      │   - OTP Storage         │
│   - Relationships        │      │   - Performance Cache   │
└──────────────────────────┘      └─────────────────────────┘
```

### 2.3.1.2. Các thành phần chính của hệ thống

#### A. Tầng Client (Client Layer)

Tầng client bao gồm hai ứng dụng frontend độc lập được xây dựng bằng React.js:

**1. Client Application (Ứng dụng dành cho bệnh nhân)**
- **Công nghệ:** React.js 18, React Router DOM
- **Chức năng chính:**
  - Đăng ký/đăng nhập tài khoản bệnh nhân
  - Đặt lịch khám bệnh trực tuyến
  - Xem lịch sử khám bệnh và hồ sơ bệnh án
  - Quản lý thông tin cá nhân
  - Tư vấn sức khỏe thông qua AI Chatbot
  - Thanh toán trực tuyến (VNPay, QR Code)
  - Đánh giá dịch vụ và bác sĩ

**2. Admin Application (Ứng dụng quản trị)**
- **Công nghệ:** React.js 18, React Router DOM, SB Admin 2 Template
- **Chức năng chính:**
  - Quản lý lịch hẹn khám bệnh
  - Quản lý bác sĩ, bệnh nhân, phòng khám
  - Quản lý hồ sơ khám bệnh
  - Quản lý kho thuốc và vật tư y tế
  - Thống kê, báo cáo doanh thu
  - Quản lý lịch nghỉ phép của bác sĩ
  - Hỗ trợ chat trực tuyến với bệnh nhân

**Đặc điểm kiến trúc Frontend:**
- Single Page Application (SPA)
- Component-based architecture
- State management với Context API
- Responsive design (hỗ trợ đa thiết bị)
- RESTful API consumption
- JWT-based authentication

#### B. Tầng Backend (Application Layer)

Backend được xây dựng theo mô hình **Layered Architecture** (Kiến trúc phân lớp) với Spring Boot framework, chia thành 4 tầng chính:

**1. Presentation Layer (Tầng trình diễn - Controller Layer)**

Tầng này đảm nhận việc tiếp nhận và xử lý các HTTP requests từ client.

**Cấu trúc:**
```
controller/
├── AppointmentController.java    // Quản lý lịch hẹn
├── AuthController.java            // Xác thực, đăng nhập
├── DepartmentController.java      // Quản lý khoa
├── DoctorController.java          // Quản lý bác sĩ
├── HealthPlanController.java      // Quản lý gói khám
├── LabOrderController.java        // Quản lý xét nghiệm
├── LabResultController.java       // Kết quả xét nghiệm
├── MedicalController.java         // Hồ sơ bệnh án
├── PatientController.java         // Quản lý bệnh nhân
├── ReceptionistController.java    // Lễ tân tiếp nhận
├── ScheduleController.java        // Quản lý lịch làm việc
└── UserController.java            // Quản lý người dùng
```

**Chức năng:**
- Định nghĩa các REST API endpoints
- Validate request data thông qua Bean Validation
- Chuyển đổi HTTP requests thành các method calls
- Trả về HTTP responses với định dạng JSON
- Xử lý các annotation: @RestController, @RequestMapping, @PostMapping, @GetMapping, @PutMapping, @DeleteMapping

**Ví dụ minh họa:**
```java
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(
            new ApiResponse<>(authService.login(loginRequest), "Login successful")
        );
    }
}
```

**2. Service Layer (Tầng logic nghiệp vụ)**

Tầng này chứa toàn bộ business logic của hệ thống, xử lý các quy tắc nghiệp vụ và điều phối luồng dữ liệu.

**Cấu trúc:**
```
service/
├── interfaces/              // Các interface định nghĩa contract
│   ├── AppointmentService.java
│   ├── AuthService.java
│   ├── DoctorService.java
│   ├── PatientService.java
│   ├── ScheduleService.java
│   ├── JwtService.java
│   └── ... (13 interfaces)
│
└── impl/                    // Các class implementation cụ thể
    ├── AppointmentServiceImpl.java
    ├── AuthServiceImpl.java
    ├── DoctorServiceImpl.java
    ├── PatientServiceImpl.java
    ├── ScheduleServiceImpl.java
    ├── JwtServiceImpl.java
    └── ... (13 implementations)
```

**Chức năng:**
- Thực thi business rules và validations
- Xử lý transaction management (@Transactional)
- Tích hợp với các service bên ngoài (Email, SMS OTP)
- Xử lý async operations
- Quản lý cache với Redis
- Mapping giữa Entity và DTO

**Ví dụ minh họa:**
```java
@Service
public class AuthServiceImpl implements AuthService {
    private final UserService userService;
    private final JwtService jwtService;
    private final RedisTemplate<String, Object> redisTemplate;
    
    @Override
    public LoginResponse login(LoginRequest request) {
        // Business logic: Validate OTP from Redis
        User user = userService.getUserByEmailOrPhone(request.getUsername());
        Object otp = redisTemplate.opsForValue().get("otp:" + request.getUsername());
        
        if(user == null || otp == null || !otp.toString().equals(request.getPassword())) {
            throw new AppException(ErrorCode.AUTH_FAILED);
        }
        
        // Clear OTP after successful login
        redisTemplate.delete("otp:" + request.getUsername());
        
        // Generate JWT token
        return new LoginResponse(
            jwtService.generate(user.getId(), user.getRole().name(), 60),
            userMapper.toResponse(user)
        );
    }
}
```

**3. Data Access Layer (Tầng truy xuất dữ liệu - Repository Layer)**

Tầng này đảm nhiệm việc tương tác với cơ sở dữ liệu thông qua Spring Data JPA.

**Cấu trúc:**
```
repository/
├── AppointmentRepository.java
├── DoctorRepository.java
├── PatientRepository.java
├── ScheduleRepository.java
├── UserRepository.java
├── MedicalRecordRepository.java
├── PrescriptionRepository.java
├── LabOrderRepository.java
├── DepartmentRepository.java
└── ... (23+ repositories)
```

**Chức năng:**
- Abstraction layer cho database operations
- Tự động generate query methods dựa trên method names
- Hỗ trợ custom queries với @Query annotation
- Quản lý entity relationships
- Pagination và sorting

**Ví dụ minh họa:**
```java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByPhone(String phone);
    List<User> findByRole(Role role);
    boolean existsByEmail(String email);
}
```

**4. Model/Entity Layer (Tầng đối tượng thực thể)**

Tầng này định nghĩa các entity classes ánh xạ trực tiếp với database tables.

**Cấu trúc:**
```
model/
├── User.java              // Người dùng (bác sĩ, bệnh nhân, admin)
├── Patient.java           // Thông tin bệnh nhân
├── Doctor.java            // Thông tin bác sĩ
├── Appointment.java       // Lịch hẹn khám
├── Schedule.java          // Lịch làm việc bác sĩ
├── MedicalRecord.java     // Hồ sơ bệnh án
├── Prescription.java      // Đơn thuốc
├── Medicine.java          // Thuốc
├── Department.java        // Khoa
├── LabOrder.java          // Phiếu xét nghiệm
├── Invoice.java           // Hóa đơn
└── ... (25+ entities)
```

**Đặc điểm:**
- Sử dụng JPA annotations (@Entity, @Table, @Column, @Id, @GeneratedValue)
- Định nghĩa relationships (@OneToMany, @ManyToOne, @ManyToMany)
- Lombok annotations để giảm boilerplate code (@Data, @NoArgsConstructor, @AllArgsConstructor)
- Audit fields (createdAt, updatedAt)

#### C. Tầng hỗ trợ (Cross-Cutting Concerns)

**1. DTO Layer (Data Transfer Objects)**

Tách biệt giữa internal entities và external API contracts.

```
dto/
├── request/               // DTOs cho request từ client
│   ├── LoginRequest.java
│   ├── AppointmentRequest.java
│   ├── PatientRequest.java
│   └── ...
│
└── response/             // DTOs cho response trả về client
    ├── LoginResponse.java
    ├── AppointmentResponse.java
    ├── PatientResponse.java
    ├── ApiResponse.java  // Generic response wrapper
    └── ...
```

**2. Mapper Layer**

Sử dụng MapStruct framework để convert giữa Entity và DTO một cách tự động và type-safe.

```
mapper/
├── UserMapper.java
├── DoctorMapper.java
├── PatientMapper.java
├── AppointmentMapper.java
└── ... (7 mappers)
```

**3. Exception Handling**

Centralized exception handling với Global Exception Handler.

```
exception/
├── GlobalExceptionHandler.java  // @RestControllerAdvice
├── AppException.java            // Custom exception class
└── ErrorCode.java               // Enum định nghĩa error codes
```

**Ví dụ:**
```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(AppException.class)
    public ResponseEntity<ApiResponse<?>> handleAppException(AppException e) {
        ErrorCode error = e.getErrorCode();
        return ResponseEntity
            .status(error.getHttpStatus())
            .body(new ApiResponse<>(null, error.getMessage(), error.getCode()));
    }
}
```

**4. Security Configuration**

Cấu hình bảo mật cho toàn bộ hệ thống.

```
config/
├── SecurityConfig.java    // Spring Security + JWT
├── RedisConfig.java       // Redis caching
└── AsyncConfig.java       // Async processing
```

#### D. Tầng Persistence (Database Layer)

**MySQL Database**
- **Phiên bản:** MySQL 8.0
- **Database name:** datn
- **Số lượng tables:** 25+ tables
- **Charset:** UTF-8 (hỗ trợ tiếng Việt)

**Cấu trúc database chính:**
- `users` - Quản lý người dùng hệ thống
- `patients` - Thông tin bệnh nhân
- `doctors` - Thông tin bác sĩ
- `appointments` - Lịch hẹn khám
- `schedules` - Lịch làm việc bác sĩ
- `schedule_exceptions` - Lịch nghỉ/ngoại lệ
- `medical_records` - Hồ sơ bệnh án
- `prescriptions` - Đơn thuốc
- `prescription_details` - Chi tiết đơn thuốc
- `medicines` - Danh mục thuốc
- `departments` - Khoa phòng
- `degrees` - Bằng cấp bác sĩ
- `lab_orders` - Phiếu xét nghiệm
- `lab_results` - Kết quả xét nghiệm
- `invoices` - Hóa đơn thanh toán
- `health_plans` - Gói khám sức khỏe
- `ratings` - Đánh giá dịch vụ
- `chat_sessions` - Phiên chat tư vấn
- `chat_messages` - Tin nhắn chat

**Đặc điểm:**
- Foreign key constraints để đảm bảo referential integrity
- Indexes trên các cột thường xuyên query (email, phone, status)
- Stored procedures cho các business logic phức tạp
- Views cho reporting và analytics

#### E. Tầng Cache (Redis Layer)

**Redis Cache**
- **Phiên bản:** Redis 6.x
- **Port:** 6379
- **Mục đích sử dụng:**
  - Session management
  - OTP storage (time-to-live: 5 phút)
  - API response caching
  - Rate limiting
  - Real-time data caching

### 2.3.1.3. Luồng xử lý dữ liệu trong hệ thống

Dưới đây là mô tả chi tiết luồng xử lý một request điển hình trong hệ thống (ví dụ: Đặt lịch khám):

**Sequence Diagram:**
```
Client -> Controller -> Service -> Repository -> Database
  │           │           │            │            │
  │  POST     │           │            │            │
  ├──────────>│           │            │            │
  │           │  validate │            │            │
  │           │───────────>│           │            │
  │           │           │  business  │            │
  │           │           │   logic    │            │
  │           │           │──────────> │            │
  │           │           │            │   query    │
  │           │           │            ├───────────>│
  │           │           │            │<───────────┤
  │           │           │            │   result   │
  │           │           │<───────────┤            │
  │           │  Response │            │            │
  │           │<──────────┤            │            │
  │  JSON     │           │            │            │
  │<──────────┤           │            │            │
```

**Chi tiết các bước:**

1. **Bước 1: Client gửi request**
   - User điền form đặt lịch khám trên giao diện React
   - Frontend gửi HTTP POST request đến `/api/appointments`
   - Request body chứa AppointmentRequest DTO (JSON format)
   - JWT token được đính kèm trong Authorization header

2. **Bước 2: Security Filter Chain**
   - Spring Security filter chain intercept request
   - JwtAuthenticationFilter validate JWT token
   - Extract user information từ token (userId, role)
   - Check authorization (RBAC - Role-based Access Control)
   - Nếu không hợp lệ → trả về 401 Unauthorized

3. **Bước 3: Controller Layer xử lý**
   - `AppointmentController` nhận request
   - Bean Validation validate request data (@Valid annotation)
   - Nếu validation fail → trả về 400 Bad Request với error details
   - Gọi `AppointmentService.createAppointment(request)`

4. **Bước 4: Service Layer xử lý business logic**
   ```
   AppointmentServiceImpl:
   a) Validate business rules:
      - Kiểm tra bác sĩ có tồn tại và active không
      - Kiểm tra slot thời gian còn available không
      - Kiểm tra bệnh nhân có conflict lịch hẹn không
      - Validate thời gian đặt lịch (không được quá khứ)
   
   b) Process business logic:
      - Tính toán slot time dựa trên schedule bác sĩ
      - Check schedule exceptions (nghỉ phép)
      - Tạo appointment entity từ request DTO (dùng Mapper)
      - Set initial status = "PENDING"
      - Generate unique appointment code
   
   c) Persist data:
      - Gọi repository.save(appointment)
   
   d) Post-processing:
      - Gửi email xác nhận (async)
      - Gửi SMS notification (async)
      - Update cache nếu cần
   
   e) Return response:
      - Convert entity to response DTO
      - Wrap trong ApiResponse object
   ```

5. **Bước 5: Repository Layer truy xuất database**
   - `AppointmentRepository` extends JpaRepository
   - Spring Data JPA tự động generate SQL query
   - Hibernate ORM execute query
   - Transaction management (@Transactional)
   - Return result entities

6. **Bước 6: Database execution**
   - MySQL thực thi INSERT query
   - Check constraints và foreign keys
   - Trigger audit logs (created_at, updated_at)
   - Return generated ID
   - Commit transaction

7. **Bước 7: Response trả về**
   - Service convert entity sang AppointmentResponse DTO
   - Controller wrap response trong ApiResponse
   - Spring Jackson converter serialize sang JSON
   - HTTP Response với status 200 OK
   - Response body chứa appointment details

8. **Bước 8: Client nhận response**
   - Frontend parse JSON response
   - Update UI state (React setState/Context)
   - Hiển thị thông báo thành công
   - Navigate user đến trang confirmation

**Exception Handling Flow:**

Nếu có lỗi xảy ra ở bất kỳ bước nào:
```
Exception -> Service throws AppException
                    │
                    ▼
          GlobalExceptionHandler intercepts
                    │
                    ▼
          Map ErrorCode to HTTP Status
                    │
                    ▼
          Return standardized error response
                    │
                    ▼
          Client displays error message
```

### 2.3.1.4. Công nghệ và Framework sử dụng

#### Backend Stack

| Công nghệ | Phiên bản | Mục đích sử dụng |
|-----------|-----------|------------------|
| **Spring Boot** | 3.5.5 | Framework chính để xây dựng backend |
| **Spring Data JPA** | 3.x | Object-Relational Mapping và database access |
| **Spring Security** | 6.x | Authentication, Authorization, Security |
| **Spring OAuth2 Resource Server** | - | JWT token validation |
| **Spring Mail** | - | Gửi email notifications |
| **Hibernate** | 6.x | JPA implementation, ORM engine |
| **MySQL Connector** | 8.0 | JDBC driver cho MySQL |
| **Redis** | 6.x | Caching, session management |
| **MapStruct** | 1.5.5 | DTO-Entity mapping (compile-time) |
| **Lombok** | Latest | Reduce boilerplate code |
| **Bean Validation** | 3.x | Request validation |
| **JJWT (Java JWT)** | 0.11.5 | JWT token generation/validation |
| **Maven** | 3.x | Build tool và dependency management |
| **Java** | 17 | Programming language (LTS version) |

#### Frontend Stack

| Công nghệ | Mục đích sử dụng |
|-----------|------------------|
| **React.js** | Framework UI component-based |
| **React Router DOM** | Client-side routing |
| **Axios** | HTTP client cho API calls |
| **Context API** | State management |
| **Bootstrap** | CSS framework, responsive design |
| **SB Admin 2** | Admin template (admin app) |
| **NPM/Yarn** | Package manager |

#### Database & Cache

| Công nghệ | Mục đích |
|-----------|----------|
| **MySQL 8.0** | Relational database chính |
| **Redis** | In-memory cache, session store |

#### DevOps & Tools

| Công nghệ | Mục đích |
|-----------|----------|
| **Git** | Version control |
| **Maven** | Build automation |
| **Postman** | API testing |
| **MySQL Workbench** | Database design & management |

### 2.3.1.5. Các Pattern và Nguyên tắc thiết kế

Hệ thống áp dụng các Design Pattern và Best Practices sau:

#### 1. **Layered Architecture Pattern**
- Tách biệt concerns thành các layers độc lập
- Mỗi layer chỉ phụ thuộc vào layer ngay bên dưới
- Dễ dàng test và maintain từng layer riêng biệt

#### 2. **Repository Pattern**
- Abstraction layer cho data access
- Tách biệt business logic khỏi data access logic
- Dễ dàng thay đổi database implementation

#### 3. **Service Layer Pattern**
- Centralize business logic
- Reusable business operations
- Transaction boundaries

#### 4. **DTO Pattern (Data Transfer Object)**
- Tách biệt internal model và external API
- Control data exposure
- Version API independently

#### 5. **Dependency Injection (DI)**
- Spring IoC container manage dependencies
- Loose coupling giữa các components
- Dễ dàng testing với mock objects
- Constructor injection (best practice)

#### 6. **Interface Segregation**
- Service layer sử dụng interfaces
- Implementation có thể thay đổi mà không ảnh hưởng clients
- Support multiple implementations

#### 7. **Exception Handling Pattern**
- Global exception handler
- Centralized error handling
- Consistent error responses
- Custom exception hierarchy

#### 8. **Builder Pattern**
- Lombok @Builder cho entity construction
- Immutable objects với @Value
- Fluent API

#### 9. **Factory Pattern**
- MapStruct mappers act as factories
- JWT token generation factory

#### 10. **Strategy Pattern**
- Different authentication strategies
- Multiple payment methods
- Pluggable algorithms

### 2.3.1.6. Bảo mật hệ thống

#### A. Authentication (Xác thực)

**1. JWT-based Authentication**
- Stateless authentication mechanism
- Access token (TTL: 60 phút)
- Refresh token (TTL: 30 ngày)
- Token structure: Header.Payload.Signature
- Algorithm: HmacSHA256

**2. OTP Authentication**
- SMS OTP cho đăng nhập bệnh nhân
- OTP length: 6 digits
- TTL: 5 phút (stored in Redis)
- One-time use (deleted after successful login)

#### B. Authorization (Phân quyền)

**Role-Based Access Control (RBAC)**
```
Roles:
├── ADMIN          // Toàn quyền quản trị hệ thống
├── DOCTOR         // Bác sĩ - quản lý lịch khám, hồ sơ bệnh án
├── RECEPTIONIST   // Lễ tân - tiếp nhận, xác nhận lịch hẹn
└── PATIENT        // Bệnh nhân - xem thông tin cá nhân, đặt lịch
```

**Method-level Security**
```java
@PreAuthorize("hasRole('ADMIN')")
public void deleteUser(Long id) { ... }

@PreAuthorize("hasAnyRole('DOCTOR', 'ADMIN')")
public void updateMedicalRecord(Long id) { ... }
```

#### C. Security Headers & CORS

```java
CORS Configuration:
- Allowed Origins: http://localhost:3000 (client), http://localhost:3001 (admin)
- Allowed Methods: GET, POST, PUT, DELETE
- Credentials: true
- Headers: Authorization, Content-Type
```

**Security Headers:**
- X-Frame-Options: DENY (prevent clickjacking)
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block

#### D. Input Validation

**Bean Validation**
```java
@NotBlank(message = "Email is required")
@Email(message = "Invalid email format")
private String email;

@NotNull(message = "Appointment date is required")
@Future(message = "Appointment date must be in the future")
private LocalDateTime appointmentDate;
```

**SQL Injection Prevention**
- Sử dụng JPA parameterized queries
- Spring Data JPA tự động escape inputs
- No raw SQL execution

#### E. Password Security

- BCrypt password encoding (strength: 10)
- Password không được lưu plaintext
- Secure password reset flow with OTP

#### F. Session Management

- JWT stateless sessions
- Redis session storage cho admin
- Automatic session timeout
- Concurrent session control

### 2.3.1.7. Scalability & Performance

#### A. Caching Strategy

**Redis Cache Implementation:**
```
1. OTP Cache
   - Key: "otp:{phone/email}"
   - TTL: 300 seconds
   - Purpose: Fast OTP validation

2. Session Cache
   - Key: "session:{userId}"
   - Purpose: User session data

3. API Response Cache (future)
   - Frequently accessed data
   - Reduce database load
```

#### B. Database Optimization

**Indexing Strategy:**
```sql
-- Indexes trên các cột thường query
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_user_phone ON users(phone);
CREATE INDEX idx_appointment_date ON appointments(appointment_date);
CREATE INDEX idx_appointment_status ON appointments(status);
```

**Connection Pooling:**
- HikariCP (default in Spring Boot)
- Maximum pool size: 10
- Connection timeout: 30s

#### C. Async Processing

```java
@EnableAsync
@Async
public void sendEmailNotification(String to, String subject) {
    // Email sending không block main thread
}
```

#### D. Lazy Loading

- JPA lazy loading cho relationships
- Giảm unnecessary data fetching
- Tối ưu query performance

### 2.3.1.8. Ưu điểm của kiến trúc

1. **Separation of Concerns**: Mỗi layer có trách nhiệm rõ ràng
2. **Maintainability**: Dễ bảo trì và debug
3. **Testability**: Có thể test độc lập từng layer
4. **Scalability**: Dễ dàng scale horizontal hoặc vertical
5. **Reusability**: Business logic có thể tái sử dụng
6. **Security**: Centralized security configuration
7. **Flexibility**: Dễ dàng thay đổi implementation mà không ảnh hưởng layers khác
8. **Technology Independence**: Có thể thay đổi technology stack của từng layer

### 2.3.1.9. Kết luận

Kiến trúc hệ thống quản lý phòng khám được thiết kế theo mô hình **Layered Architecture** với sự phân tách rõ ràng giữa các tầng, áp dụng các Design Pattern và Best Practices trong ngành công nghiệp phần mềm. Hệ thống đảm bảo tính bảo mật cao với JWT authentication, RBAC authorization, và các cơ chế bảo vệ khác. Việc sử dụng Spring Boot framework giúp tăng tốc độ phát triển, giảm boilerplate code, và đảm bảo chất lượng code thông qua các convention và auto-configuration.

Kiến trúc này đảm bảo hệ thống có thể mở rộng trong tương lai để đáp ứng nhu cầu tăng trưởng về số lượng người dùng và tính năng, đồng thời dễ dàng bảo trì và nâng cấp.

