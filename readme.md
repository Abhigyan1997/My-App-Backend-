# My Express Application

This is a simple Node.js and Express application with MongoDB integration. The application provides an API for user management, including profile picture and video uploads, and serves static files from the `uploads` directory.

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)

## Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/Abhigyan1997/My-App-Backend-.git
    cd your-repository
    ```

2. **Install dependencies:**

    ```sh
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory of your project and add the following environment variables:

    ```env
    PORT=1000
    MONGO_URI=your-mongodb-connection-string
    JWT_SECRET=your_jwt_secret
    ```

    Replace `your-mongodb-connection-string` and `your_jwt_secret` with your actual MongoDB connection string and a secret key for JWT.

## Running the Application

1. **Start the server:**

    ```sh
    npm start
    ```

    The server will start running on the port specified in the `.env` file (default is 1000).

    ```sh
    Server running on port 1000
    ```

## API Endpoints

### Authentication Routes

- `POST /api/register`: Register a new user
- `POST /api/login`: Login a user

### User Routes

- `GET /api/user`: Get the authenticated user's details (requires authentication)
- `POST /api/user/bio`: Update the authenticated user's bio (requires authentication)
- `POST /api/user/avatar`: Upload a profile picture for the authenticated user (requires authentication)
- `POST /api/user/video`: Upload a video for the authenticated user (requires authentication)
- `GET /api/user/videos`: Get all videos of the authenticated user (requires authentication)

### General Routes

- `GET /api/users`: Get all users
- `GET /api/user/:userId/videos`: Get videos of a specific user by user ID

### Example Requests

- **Register a new user:**

    ```sh
    curl -X POST http://localhost:1000/api/register -H "Content-Type: application/json" -d '{"firstName": "John", "lastName": "Doe", "email": "john.doe@example.com", "phoneNumber": "+1234567890"}'
    ```

- **Login a user:**

    ```sh
    curl -X POST http://localhost:1000/api/login -H "Content-Type: application/json" -d '{"email": "john.doe@example.com", "password": "yourpassword"}'
    ```

- **Upload a profile picture:**

    ```sh
    curl -X POST http://localhost:1000/api/user/avatar -H "Authorization: Bearer your_jwt_token" -F "avatar=@/path/to/your/avatar.jpg"
    ```

- **Upload a video:**

    ```sh
    curl -X POST http://localhost:1000/api/user/video -H "Authorization: Bearer your_jwt_token" -F "video=@/path/to/your/video.mp4"
    ```

## Directory Structure

