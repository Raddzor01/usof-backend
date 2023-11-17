## API Documentation: Posts

### Introduction

This API provides functionality related to posts, including creating, updating, deleting posts, managing likes, comments, and retrieving post information.

### Posts Endpoints

#### 1. Create Post

- **Endpoint**: `POST /api/posts/create`
- **Description**: Creates a new post.
- **Request Parameters**:
    - `body` (JSON):
        - `title` (string): Post title.
        - `content` (string): Post content.
        - `categories` (string, optional): Comma-separated list of category IDs.
- **Response**:
    - `200 OK`: Successful post creation.
        - Body:
          ```json
          {
            "msg": "Success post creation",
            "post_id": "post_id"
          }
          ```
    - `400 Bad Request`: Missing required parameters.
    - `500 Internal Server Error`: Server error.

#### 2. Update Post

- **Endpoint**: `PUT /api/posts/update/:postId`
- **Description**: Updates an existing post.
- **Request Parameters**:
    - `params`:
        - `postId` (string): ID of the post to update.
    - `body` (JSON):
        - `names` (string): Comma-separated list of field names to update.
        - `values` (string): Comma-separated list of corresponding values.
- **Response**:
    - `200 OK`: Success post update.
    - `400 Bad Request`: Mismatched names and values or missing parameters.
    - `401 Unauthorized`: Access denied.
    - `500 Internal Server Error`: Server error.

#### 3. Delete Post

- **Endpoint**: `DELETE /api/posts/delete/:postId`
- **Description**: Deletes an existing post.
- **Request Parameters**:
    - `params`:
        - `postId` (string): ID of the post to delete.
- **Response**:
    - `200 OK`: Post successfully deleted.
    - `401 Unauthorized`: Access denied.
    - `500 Internal Server Error`: Server error.

#### 4. Post Like

- **Endpoint**: `POST /api/posts/like/:postId`
- **Description**: Creates a like for a post.
- **Request Parameters**:
    - `params`:
        - `postId` (string): ID of the post to like.
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

#### 5. Get Post Likes

- **Endpoint**: `GET /api/posts/likes/:postId`
- **Description**: Retrieves likes for a specific post.
- **Request Parameters**:
    - `params`:
        - `postId` (string): ID of the post.
- **Response**:
    - `200 OK`: Array of likes for the post.
    - `500 Internal Server Error`: Server error.

#### 6. Get Post Categories

- **Endpoint**: `GET /api/posts/categories/:postId`
- **Description**: Retrieves categories for a specific post.
- **Request Parameters**:
    - `params`:
        - `postId` (string): ID of the post.
- **Response**:
    - `200 OK`: Array of categories for the post.
    - `500 Internal Server Error`: Server error.

#### 7. Post Comment

- **Endpoint**: `POST /api/posts/comment/:postId`
- **Description**: Adds a comment to a specific post.
- **Request Parameters**:
    - `params`:
        - `postId` (string): ID of the post to comment on.
    - `body` (JSON):
        - `content` (string): Comment content.
- **Response**:
    - `200 OK`: Successful comment post.
        - Body:
          ```json
          {
            "msg": "Successful comment post",
            "comment_id": "comment_id"
          }
          ```
    - `402 Payment Required`: Missing required parameters.
    - `401 Unauthorized`: Access denied.
    - `500 Internal Server Error`: Server error.

#### 8. Get Post Comments

- **Endpoint**: `GET /api/posts/comments/:postId`
- **Description**: Retrieves comments for a specific post.
- **Request Parameters**:
    - `params`:
        - `postId` (string): ID of the post.
- **Response**:
    - `200 OK`: Array of comments for the post.
    - `500 Internal Server Error`: Server error.

#### 9. Get Post Data

- **Endpoint**: `GET /api/posts/:postId`
- **Description**: Retrieves information about a specific post.
- **Request Parameters**:
    - `params`:
        - `postId` (string): ID of the post.
- **Response**:
    - `200 OK`: Information about the post.
    - `500 Internal Server Error`: Server error.

#### 10. Get All Posts

- **Endpoint**: `GET /api/posts/all`
- **Description**: Retrieves all posts based on specified filters.
- **Request Parameters**:
    - `body` (JSON):
        - `category` (string, optional): Category filter.
        - `dateFrom` (string, optional): Start date filter.
        - `dateTo` (string, optional): End date filter.
        - `status` (string, optional): Post status filter.
        - `sortBy` (string, optional): Sorting parameter.
- **Response**:
    - `200 OK`: Array of posts based on filters.
    - `500 Internal Server Error`: Server error.

### Error Responses

- `400 Bad Request`: Missing or invalid request parameters.
- `401 Unauthorized`: Access denied or invalid authentication token.
- `402 Payment Required`: Missing required parameters for commenting.
- `500 Internal Server Error`: Server error.

### Security

- Authentication is based on JSON Web Tokens (JWT).
- Tokens are stored as cookies for secure client-side storage.

### Notes

- All endpoints are subject to change, and clients should handle error responses gracefully.
- Ensure secure practices when integrating these endpoints into your application.