## API Documentation: Comments

This API provides functionality related to comments, including creating, updating, deleting comments, managing comment likes, and retrieving comment information.

### Comments Endpoints

#### 1. Update Comment

- **Endpoint**: `PUT /api/comments/update/:commentId`
- **Description**: Updates an existing comment.
- **Request Parameters**:
    - `params`:
        - `commentId` (string): ID of the comment to update.
    - `body` (JSON):
        - `content` (string): New content for the comment.
- **Response**:
    - `200 OK`: Success comment update.
    - `401 Unauthorized`: Access denied.
    - `500 Internal Server Error`: Server error.

#### 2. Delete Comment Like

- **Endpoint**: `DELETE /api/comments/delete-like/:commentId`
- **Description**: Deletes a like on a specific comment.
- **Request Parameters**:
    - `params`:
        - `commentId` (string): ID of the comment.
- **Response**:
    - `200 OK`: Successful comment like delete.
    - `401 Unauthorized`: Access denied.
    - `500 Internal Server Error`: Server error.

#### 3. Delete Comment

- **Endpoint**: `DELETE /api/comments/delete/:commentId`
- **Description**: Deletes an existing comment.
- **Request Parameters**:
    - `params`:
        - `commentId` (string): ID of the comment to delete.
- **Response**:
    - `200 OK`: Successful comment delete.
    - `401 Unauthorized`: Access denied.
    - `500 Internal Server Error`: Server error.

#### 4. Post Like on Comment

- **Endpoint**: `POST /api/comments/like/:commentId`
- **Description**: Creates a like on a specific comment.
- **Request Parameters**:
    - `params`:
        - `commentId` (string): ID of the comment.
    - `body` (JSON):
        - `type` (string): Type of like (e.g., "thumbs_up").
- **Response**:
    - `200 OK`: Success like creation.
        - Body:
          ```json
          {
            "msg": "Success like creation",
            "like_id": "like_id"
          }
          ```
    - `400 Bad Request`: Missing required parameters.
    - `500 Internal Server Error`: Server error.

#### 5. Get Comment Likes

- **Endpoint**: `GET /api/comments/likes/:commentId`
- **Description**: Retrieves likes for a specific comment.
- **Request Parameters**:
    - `params`:
        - `commentId` (string): ID of the comment.
- **Response**:
    - `200 OK`: Array of likes for the comment.
    - `500 Internal Server Error`: Server error.

#### 6. Get Comment

- **Endpoint**: `GET /api/comments/:commentId`
- **Description**: Retrieves information about a specific comment.
- **Request Parameters**:
    - `params`:
        - `commentId` (string): ID of the comment.
- **Response**:
    - `200 OK`: Information about the comment.
    - `500 Internal Server Error`: Server error.

### Error Responses

- `400 Bad Request`: Missing or invalid request parameters.
- `401 Unauthorized`: Access denied or invalid authentication token.
- `500 Internal Server Error`: Server error.

### Security

- Authentication is based on JSON Web Tokens (JWT).
- Tokens are stored as cookies for secure client-side storage.

### Notes

- All endpoints are subject to change, and clients should handle error responses gracefully.
- Ensure secure practices when integrating these endpoints into your application.