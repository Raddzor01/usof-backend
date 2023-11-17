## API Documentation: Authentication

### Introduction

This API provides authentication functionality for user login, registration, logout, password reset, and setting a new password.

### Authentication Endpoints

#### 1. Login

- **Endpoint**: `POST /api/auth/login`
- **Description**: Logs in a user and returns an authentication token.
- **Request Parameters**:
    - `body` (JSON):
        - `login` (string): User's login.
        - `password` (string): User's password.
- **Response**:
    - `200 OK`: Successful login.
        - Body:
          ```json
          {
            "msg": "Success",
            "user": {
              "user_id": "user_id",
              "login": "user_login",
              "role": "user_role"
            }
          }
          ```
    - `401 Unauthorized`: Invalid login or password.
    - `500 Internal Server Error`: Server error.

#### 2. Registration

- **Endpoint**: `POST /api/auth/registration`
- **Description**: Registers a new user and sends a confirmation email.
- **Request Parameters**:
    - `body` (JSON):
        - `login` (string): User's login.
        - `password` (string): User's password.
        - `email` (string): User's email.
        - `full_name` (string): User's full name.
- **Response**:
    - `200 OK`: Successful registration.
    - `400 Bad Request`: Missing required parameters.
    - `409 Conflict`: User with the same login or email already exists.
    - `500 Internal Server Error`: Server error.

#### 3. Logout

- **Endpoint**: `GET /api/auth/logout`
- **Description**: Logs out the user by clearing the authentication token.
- **Response**:
    - `200 OK`: Successful logout.
    - `500 Internal Server Error`: Server error.

#### 4. Password Reset Request

- **Endpoint**: `POST /api/auth/password-reset`
- **Description**: Initiates the password reset process and sends a reset email.
- **Request Parameters**:
    - `body` (JSON):
        - `email` (string): User's email.
- **Response**:
    - `200 OK`: Success.
    - `500 Internal Server Error`: Server error.

#### 5. Set New Password

- **Endpoint**: `POST /api/auth/set-new-password/:confirmToken`
- **Description**: Sets a new password after receiving a confirmation token.
- **Request Parameters**:
    - `params`:
        - `confirmToken` (string): Confirmation token from the email.
    - `body` (JSON):
        - `password` (string): New password.
- **Response**:
    - `200 OK`: Success.
    - `500 Internal Server Error`: Server error.

### Error Responses

- `400 Bad Request`: Missing or invalid request parameters.
- `401 Unauthorized`: Invalid authentication token or credentials.
- `404 Not Found`: Endpoint not found.
- `409 Conflict`: Resource already exists.
- `500 Internal Server Error`: Server error.

### Security

- Authentication is based on JSON Web Tokens (JWT).
- Tokens are stored as cookies for secure client-side storage.

### Notes

- All endpoints are subject to change, and clients should handle error responses gracefully.

This documentation serves as a guide for implementing and consuming the authentication API. Ensure secure practices when integrating these endpoints into your application.