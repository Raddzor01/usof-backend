## API Documentation: Categories

This API provides functionality related to category management, including updating categories, deleting categories, retrieving posts by category, creating categories, retrieving category information, and retrieving all categories.

### Categories Endpoints

#### 1. Update Category

- **Endpoint**: `PUT /api/categories/update/:categoryId`
- **Description**: Updates the information of an existing category.
- **Request Parameters**:
    - `params`:
        - `categoryId` (string): ID of the category to update.
    - `body` (JSON):
        - `names` (string): Comma-separated list of field names to update.
        - `values` (string): Comma-separated list of corresponding values.
- **Response**:
    - `200 OK`: Successful category update.
    - `403 Forbidden`: Permission denied.
    - `400 Bad Request`: Mismatched names and values or missing parameters.
    - `500 Internal Server Error`: Server error.

#### 2. Delete Category

- **Endpoint**: `DELETE /api/categories/delete/:categoryId`
- **Description**: Deletes an existing category.
- **Request Parameters**:
    - `params`:
        - `categoryId` (string): ID of the category to delete.
- **Response**:
    - `200 OK`: Successful category delete.
    - `403 Forbidden`: Permission denied.
    - `500 Internal Server Error`: Server error.

#### 3. Get Category Posts

- **Endpoint**: `GET /api/categories/posts/:categoryId`
- **Description**: Retrieves posts associated with a specific category.
- **Request Parameters**:
    - `params`:
        - `categoryId` (string): ID of the category.
- **Response**:
    - `200 OK`: Array of posts associated with the category.
    - `500 Internal Server Error`: Server error.

#### 4. Create Category

- **Endpoint**: `POST /api/categories/create`
- **Description**: Creates a new category.
- **Request Parameters**:
    - `body` (JSON):
        - `title` (string): Title of the new category.
        - `description` (string): Description of the new category.
- **Response**:
    - `200 OK`: Information about the newly created category.
        - Body:
          ```json
          {
            "id": "category_id",
            "msg": "Successful category creation"
          }
          ```
    - `401 Unauthorized`: Missing required parameters.
    - `500 Internal Server Error`: Server error.

#### 5. Get Category

- **Endpoint**: `GET /api/categories/:categoryId`
- **Description**: Retrieves information about a specific category.
- **Request Parameters**:
    - `params`:
        - `categoryId` (string): ID of the category.
- **Response**:
    - `200 OK`: Information about the category.
    - `500 Internal Server Error`: Server error.

#### 6. Get All Categories

- **Endpoint**: `GET /api/categories/all`
- **Description**: Retrieves information about all categories.
- **Response**:
    - `200 OK`: Array of category information.
    - `500 Internal Server Error`: Server error.

### Error Responses

- `400 Bad Request`: Missing or invalid request parameters.
- `401 Unauthorized`: Missing required parameters.
- `403 Forbidden`: Permission denied.
- `500 Internal Server Error`: Server error.

### Security

- Authentication is based on JSON Web Tokens (JWT).
- Tokens are stored as cookies for secure client-side storage.

### Notes

- All endpoints are subject to change, and clients should handle error responses gracefully.
- Ensure secure practices when integrating these endpoints into your application.