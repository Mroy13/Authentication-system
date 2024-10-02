

---

# Authentication System

## Overview

This project is an authentication system built using **Node.js**, **Sequelize**, **PostgreSQL**, and **JWT Tokens**. It provides essential authentication features such as **sign-in**, **sign-up**, and **authorization checks** with role-based access control.

## Features

- **Sign-up**: Create new user accounts.
- **Sign-in**: Authenticate existing users.
- **Authorization Check**: Middleware to protect routes, verify JWT tokens, and enforce role-based access control.

## Tech Stack

- **Node.js**: Backend JavaScript runtime.
- **Sequelize**: ORM for database interactions.
- **PostgreSQL**: Relational database system.
- **JWT Tokens**: For secure authentication and session management.

## Setup Guide

Follow the steps below to set up and run the project on your local machine:

### 1. Download and Install Dependencies

1. Clone the project from GitHub and open it in your favorite text editor.
2. Navigate to the project folder:
    ```bash
    cd <project-folder>
    ```
3. Install the project dependencies:
    ```bash
    npm install
    ```

### 2. Configure Environment Variables

1. In the root directory, create a `.env` file:
    ```bash
    touch .env
    ```
2. Add the following environment variables to the `.env` file:

    ```plaintext
    PORT=<port number of your choice>
    SALT_ROUNDS=8
    SECRET_KEY='your-secret-key'
    ```

    Example:

    ```plaintext
    PORT=3000
    SALT_ROUNDS=8
    SECRET_KEY='mysecretkey123'
    ```

### 3. Set Up Database Configuration

1. Run the following command to generate the `config.json` file:
    ```bash
    npx sequelize init:config
    ```

2. Open the `config/config.json` file and provide your PostgreSQL user credentials and database information. Example:

    ```json
    {
      "development": {
        "username": "your_db_username",
        "password": "your_db_password",
        "database": "your_db_name",
        "host": "127.0.0.1",
        "dialect": "postgres"
      }
    }
    ```

### 4. Create and Migrate the Database

1. Create the database using Sequelize CLI:
    ```bash
    npx sequelize-cli db:create
    ```

2. Migrate the existing database schema by executing the following command:
    ```bash
    npx sequelize-cli db:migrate
    ```

### 5. Start the Server

To start the Node.js server, run the following command:
```bash
npm start
```

Your server should now be running, and you can access it at `http://localhost:<PORT>` (based on the port number defined in your `.env` file).

---

## Endpoints

- **POST /signup**: Register a new user.
- **POST /signin**: Log in with an existing account.
- **Protected Routes**: Middleware ensures that routes are only accessible by authenticated users with valid JWT tokens. Role-based access control allows for user roles like `ADMIN`, `USER`, etc.

## Authorization Check: JWT and Role-Based Access Control

The system includes middleware to secure API routes by verifying JWT tokens. Additionally, it implements **role-based access control**, which restricts access to certain endpoints based on the user’s role (e.g., `admin`, `user`). This allows for a more granular control over who can access specific resources.

## Postman Documentation

You can easily check the API endpoints using Postman. [Click here to access the Postman collection documentation](https://documenter.getpostman.com/view/28392756/2sAXxJjbG8)

---

