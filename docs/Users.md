## API Documentation: Users

This API provides functionality related to user management, including updating avatars, deleting users, updating user data, creating users, and retrieving user information.

### Users Endpoints

#### 1. Update Avatar

- **Endpoint**: `POST /api/users/update-avatar`
- **Description**: Updates the avatar of a user.
- **Request Parameters**:
    - `body` (form-data):
        - `userId` (string): ID of the user to update.
        - `photo` (file): Image file for the new avatar.
- **Response**:
    - `200 OK`: Successful photo update.
    - `403 Forbidden`: Permission denied.
    - `500 Internal Server Error`: Server error.

#### 2. Delete User

- **Endpoint**: `DELETE /api/users/delete/:userId`
- **Description**: Deletes an existing user.
- **Request Parameters**:
    - `params`:
        - `userId` (string): ID of the user to delete.
- **Response**:
    - `200 OK`: User successfully deleted.
    - `403 Forbidden`: Permission denied.
    - `500 Internal Server Error`: Server error.

#### 3. Update User Data

- **Endpoint**: `PUT /api/users/update/:userId`
- **Description**: Updates the data of an existing user.
- **Request Parameters**:
    - `params`:
        - `userId` (string): ID of the user to update.
    - `body` (JSON):
        - `names` (string): Comma-separated list of field names to update.
        - `values` (string): Comma-separated list of corresponding values.
- **Response**:
    - `200 OK`: Successful user data update.
    - `403 Forbidden`: Permission denied.
    - `400 Bad Request`: Mismatched names and values or missing parameters.
    - `500 Internal Server Error`: Server error.

#### 4. Create User

- **Endpoint**: `POST /api/users/create`
- **Description**: Creates a new user.
- **Request Parameters**:
    - `body` (JSON):
        - `login` (string): User login.
        - `password` (string): User password.
        - `email` (string): User email.
        - `full_name` (string): User full name.
        - `role` (string): User role.
- **Response**:
    - `200 OK`: Successful user creation.
    - `403 Forbidden`: Permission denied.
    - `409 Conflict`: User or email already exists.
    - `500 Internal Server Error`: Server error.

#### 5. Get User Data

- **Endpoint**: `GET /api/users/:userId`
- **Description**: Retrieves information about a specific user.
- **Request Parameters**:
    - `params`:
        - `userId` (string): ID of the user.
- **Response**:
    - `200 OK`: Information about the user.
    - `500 Internal Server Error`: Server error.

#### 6. Get All Users

- **Endpoint**: `GET /api/users/all`
- **Description**: Retrieves information about all users.
- **Response**:
    - `200 OK`: Array of user information.
    - `500 Internal Server Error`: Server error.

### Error Responses

- `400 Bad Request`: Missing or invalid request parameters.
- `403 Forbidden`: Permission denied.
- `409 Conflict`: User or email already exists.
- `500 Internal Server Error`: Server error.

### Security

- Authentication is based on JSON Web Tokens (JWT).
- Tokens are stored as cookies for secure client-side storage.

### Notes

- All endpoints are subject to change, and clients should handle error responses gracefully.
- Ensure secure practices when integrating these endpoints into your application.