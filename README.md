
---

# Authentication System

## Overview

This project is a robust authentication system built with **Node.js**, **Sequelize**, **PostgreSQL**, and **JWT Tokens**. It provides secure and scalable management of user authentication and authorization. Key features include user registration, login, secure sign-out, and **role-based access control**. The system is designed for easy integration into web applications that require strong authentication and fine-grained authorization mechanisms.

### Key Highlights

1. **Authentication**: Handles secure user login and registration with hashed passwords.
2. **Authorization**: Implements role-based access control to restrict access to specific resources.
3. **Extendability**: Modular architecture for easy extension and integration with other systems.
4. **Scalability**: Supports complex user management, including assigning and managing roles.

---

## Features

- **Sign-up**: Registers new user accounts and stores credentials securely using bcrypt hashing.
- **Sign-in**: Authenticates users and generates JWT tokens for session management.
- **Sign-out**: Logs out users and invalidates JWT tokens.
- **Role-Based Access**: Protects endpoints using middleware to enforce role-based restrictions.
- **Assign Roles**: Admin functionality to assign roles to users, enabling fine-grained access control.
- **Authorization Endpoints**: Dedicated endpoints to test role-based access for resources.

---

## Tech Stack

- **Node.js**: Backend JavaScript runtime.
- **Sequelize**: ORM for database interactions.
- **PostgreSQL**: Relational database system.
- **JWT Tokens**: Secure authentication and session management.

---

## Setup Guide

Follow these steps to set up and run the project locally:

### 1. Download and Install Dependencies

1. Clone the project and open it in your text editor.
2. Navigate to the project directory:
    ```bash
    cd <project-folder>
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

### 2. Configure Environment Variables

1. Create a `.env` file in the root directory:
    ```bash
    touch .env
    ```
2. Add the following variables to the `.env` file:
    ```plaintext
    PORT=<your_port>
    SALT_ROUNDS=8
    SECRET_KEY='your-secret-key'
    ```

### 3. Database Configuration (Inside `src` Directory)

1. Navigate to the `src` directory:
    ```bash
    cd src
    ```

2. Initialize the Sequelize configuration file:
    ```bash
    npx sequelize init:config
    ```

3. Update `src/config/config.json` with your PostgreSQL credentials:
    ```json
    {
      "development": {
        "username": "your_username",
        "password": "your_password",
        "database": "your_database",
        "host": "127.0.0.1",
        "dialect": "postgres"
      }
    }
    ```

### 4. Create and Migrate the Database (Inside `src` Directory)

1. While in the `src` directory, create the database:
    ```bash
    npx sequelize-cli db:create
    ```
    **Error Handling**: If you encounter an error like `database "your_database" already exists`, you can delete the existing database and try again, or simply proceed to the next step.

2. Apply migrations:
    ```bash
    npx sequelize-cli db:migrate
    ```
    **Error Handling**: If the migration fails due to existing tables, try running:
    ```bash
    npx sequelize-cli db:migrate:undo
    ```
    to roll back the previous migration and then re-run `db:migrate`.

### 5. Start the Server

Run the application:
```bash
npm start
```

Access the server at `http://localhost:<PORT>`.

---



---

## Docker Setup

This project uses Docker for containerization to ensure a consistent development and production environment. To get started with Docker, follow these steps:

1. Visit the [Containerised Authentication System repository](https://github.com/Mroy13/Containerised-Authentication-system).
2. Follow the detailed instructions in the repository's README to build and start the Docker containers.

This will guide you through setting up the application using Docker for a smooth experience.

---



## Endpoints

### General Endpoints

- **GET** `/api/v1/info`: Test the server.

### User Authentication

- **POST** `/api/v1/user/signup`: Register a new user.
- **POST** `/api/v1/user/signin`: Log in with credentials.
- **GET** `/api/v1/user/signout`: Log out and invalidate the session.

### Role-Based Access Control

- **GET** `/api/v1/admin`: Access restricted to `admin` role.
- **GET** `/api/v1/company`: Access restricted to `company` role.
- **PATCH** `/api/v1/user/role`: Assign roles to users (admin feature).

---

## Role-Based Access Control Implementation

### Models

1. **User**: Stores user information such as username and password.
2. **Role**: Defines roles (`admin`, `user`, etc.).
3. **User_Role**: Intermediate table to establish a many-to-many relationship between `User` and `Role`.

### Middleware Functions

1. **checkAuth**:
   - Verifies the JWT token.
   - Decodes the token and attaches user details to the request.

2. **hasRoleAccess**:
   - Checks if the authenticated user has the required role for the endpoint.

#### Middleware Flow

1. **Authentication**: 
   - `checkAuth` ensures that only valid users can proceed to the next middleware.

2. **Authorization**:
   - `hasRoleAccess` validates if the user’s role permits them to access the endpoint.

---

## Postman Documentation

Test all endpoints via Postman using this [Postman Collection Documentation](https://documenter.getpostman.com/view/28392756/2sAXxJjbG8).

---