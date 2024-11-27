# Authentication System

## Overview

This project is a robust authentication system built with **Node.js**, **Sequelize**, **PostgreSQL**, and **JWT Tokens**. It offers a secure and scalable way to manage user authentication and authorization. Key features include user registration, login, secure signout, and **role-based access control**. The system is designed to integrate seamlessly into web applications requiring robust authentication and fine-grained authorization mechanisms.

### Key Highlights

1. **Authentication**: Securely handle user login and registration using hashed passwords.
2. **Authorization**: Implement role-based access control to restrict access to specific resources.
3. **Extendability**: Modular design for easy extension and integration with other systems.
4. **Scalability**: Built to handle complex user management scenarios such as assigning and managing roles.

---

## Features

- **Sign-up**: Create new user accounts and store user credentials securely using bcrypt hashing.
- **Sign-in**: Authenticate users and issue JWT tokens for session management.
- **Sign-out**: Securely log out users and invalidate tokens.
- **Role-Based Access**: Protect endpoints using middleware to enforce role-based restrictions.
- **Assign Roles**: Admin-level functionality to assign roles to users, enabling fine-grained access control.
- **Authorization Endpoints**: Dedicated endpoints to test role-based access for resources.

---

## Tech Stack

- **Node.js**: Backend JavaScript runtime.
- **Sequelize**: ORM for database interactions.
- **PostgreSQL**: Relational database system.
- **JWT Tokens**: For secure authentication and session management.

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
2. Add the following variables:
    ```plaintext
    PORT=<your_port>
    SALT_ROUNDS=8
    SECRET_KEY='your-secret-key'
    ```

### 3. Database Configuration

1. Initialize the Sequelize configuration file:
    ```bash
    npx sequelize init:config
    ```
2. Update `config/config.json` with your PostgreSQL credentials:
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

### 4. Create and Migrate the Database

1. Create the database:
    ```bash
    npx sequelize-cli db:create
    ```
2. Apply migrations:
    ```bash
    npx sequelize-cli db:migrate
    ```

### 5. Start the Server

Run the application:
```bash
npm start
```

Access the server at `http://localhost:<PORT>`.

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
3. **User_Role**: Intermediate table for a many-to-many relationship between `User` and `Role`.

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