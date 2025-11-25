# SSO Enabled App Menu

This project is a web application that provides a configurable SSO login using OAuth 2.0 and displays a managed, categorized, filterable, and searchable directory of applications.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [Redis](https://redis.io/) (Required for session management)

## Project Structure

- `client/`: Vue.js frontend application.
- `server/`: Express.js backend application.

## Setup Instructions

### 1. Server Setup

1.  Navigate to the server directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure environment variables:
    - Copy `.env.example` to `.env`:
      ```bash
      cp .env.example .env
      ```
    - Open `.env` and fill in the required values (e.g., OAuth credentials, Redis configuration).

### 2. Client Setup

1.  Navigate to the client directory:
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

## Running the Application

### Start the Server

1.  Ensure Redis is running.
2.  From the `server` directory, run:
    ```bash
    npm start
    ```
    The server will start on the configured port (default is usually 3000).

### Start the Client

1.  From the `client` directory, run:
    ```bash
    npm run dev
    ```
    The client will start on the configured port (default is usually 5173).

## Usage

Open your browser and navigate to the client URL (e.g., `http://localhost:5173`). You should see the login page or the app directory if already authenticated.
