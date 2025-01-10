# Express.js CRUD with Authentication and Caching

This project is a RESTful API built using **Express.js** that includes user management (CRUD operations), authentication using **JWT (RS256)**, and caching with **Redis**. PostgreSQL is used as the database.

## Features

- User Registration and Login
- Token-based Authentication (JWT)
- CRUD Operations for Users
- Redis for Caching
- PostgreSQL Database
- Modular Codebase with Best Practices

## Project Structure

```
project-root/
├── src/
│   ├── routes/
│   │   ├── user.routes.js       # User-related API routes
│   │   ├── auth.routes.js       # Authentication-related API routes
│   ├── controllers/
│   │   ├── user.controller.js   # User-related controller logic
│   │   ├── auth.controller.js   # Authentication-related controller logic
│   ├── models/
│   │   ├── user.model.js        # User database model
│   ├── middleware/
│   │   ├── auth.middleware.js   # Middleware for token verification
│   ├── utils/
│   │   ├── jwt.utils.js         # Utility functions for JWT
│   │   ├── cache.utils.js       # Utility functions for Redis cache
│   ├── config/
│   │   ├── db.config.js         # PostgreSQL configuration
│   │   ├── redis.config.js      # Redis configuration
│   ├── app.js                   # Express app initialization
├── .env                         # Environment variables
├── package.json                 # Project metadata and dependencies
├── README.md                    # Project documentation
```

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- Redis

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure it as follows:
   ```env
   PORT=3000
   PG_USER=your_postgres_user
   PG_PASSWORD=your_postgres_password
   PG_HOST=localhost
   PG_PORT=5432
   PG_DATABASE=your_database_name

   REDIS_URL=redis://localhost:6379

   JWT_PRIVATE_KEY="your_rsa_private_key"
   JWT_PUBLIC_KEY="your_rsa_public_key"
   ```

4. Start PostgreSQL and Redis services.

5. Run database migrations (if necessary) to create the `users` table:
   ```sql
   CREATE TABLE users (
       id SERIAL PRIMARY KEY,
       username VARCHAR(255) NOT NULL UNIQUE,
       password VARCHAR(255) NOT NULL
   );
   ```

## Running the Application

1. Start the server:
   ```bash
   npm start
   ```

2. The API will be available at `http://localhost:3000`.

## API Endpoints

### Authentication
- **POST** `/api/auth/register`
  - Request Body:
    ```json
    {
        "username": "example",
        "password": "password123"
    }
    ```
  - Response:
    ```json
    {
        "message": "User registered successfully"
    }
    ```

- **POST** `/api/auth/login`
  - Request Body:
    ```json
    {
        "username": "example",
        "password": "password123"
    }
    ```
  - Response:
    ```json
    {
        "token": "your_jwt_token"
    }
    ```

### Users
- **GET** `/api/users`
  - Headers: `Authorization: Bearer <token>`
  - Response:
    ```json
    [
        {
            "id": 1,
            "username": "example"
        }
    ]
    ```

- **POST** `/api/users`
  - Request Body:
    ```json
    {
        "username": "newuser",
        "password": "password123"
    }
    ```
  - Response:
    ```json
    {
        "id": 2,
        "username": "newuser"
    }
    ```

- **DELETE** `/api/users/:id`
  - Headers: `Authorization: Bearer <token>`
  - Response:
    ```json
    {
        "message": "User deleted successfully"
    }
    ```

## Scripts

- **Start Server:**
  ```bash
  npm start
  ```
- **Run in Development Mode:**
  ```bash
  npm run dev
  ```

## Tools and Libraries

- **Express.js**: Web framework
- **PostgreSQL**: Database
- **Redis**: Caching
- **jsonwebtoken**: JWT authentication
- **bcrypt**: Password hashing
- **dotenv**: Environment variable management
- **morgan**: HTTP request logging
- **cors**: Cross-Origin Resource Sharing

## License

This project is licensed under the MIT License.

---

For questions or contributions, feel free to contact the maintainer or submit an issue on the repository!
