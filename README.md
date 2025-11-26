# PNJ App Portal

A web application portal for managing and accessing various applications with SSO authentication.

## Features

- **SSO Authentication**: OpenID Connect (OIDC) integration
- **App Directory**: Browse and search available applications
- **Admin Panel**: Manage applications (add, edit, delete)
- **User Profiles**: View user information from SSO provider

## Prerequisites

- Node.js (v18 or higher)
- Redis server (for session storage)
- OIDC provider (e.g., Keycloak, Auth0, Okta)

## Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd PNJAppPortal
```

### 2. Install dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Configure environment variables

#### Server (.env in /server)

```bash
# OIDC Configuration
OIDC_ISSUER=https://your-oidc-provider.com/realms/your-realm
OIDC_CLIENT_ID=your-client-id
OIDC_CLIENT_SECRET=your-client-secret
OIDC_CALLBACK_URL=http://localhost:3000/auth/callback

# Session Secret
SESSION_SECRET=your-random-secret-key

# Redis
REDIS_URL=redis://localhost:6379

# Server Port
PORT=3000
```

#### Client (.env in /client)

```bash
# Backend API URL
VITE_API_URL=http://localhost:3000

# Admin Access Configuration
# Comma-separated list of email addresses that should have admin access
VITE_ADMIN_EMAILS=admin@example.com,your-email@domain.com
```

### 4. Start Redis

```bash
# Using Docker
docker run -d -p 6379:6379 redis:alpine

# Or using system package manager
sudo systemctl start redis
```

### 5. Run the application

```bash
# Terminal 1: Start the server
cd server
npm run dev

# Terminal 2: Start the client
cd client
npm run dev
```

The application will be available at:
- Client: http://localhost:5173
- Server: http://localhost:3000

## Admin Access

Admin access is controlled by the `VITE_ADMIN_EMAILS` environment variable in the client. Users whose email addresses (from the OIDC provider) match one of the configured admin emails will have access to the `/admin` page where they can:

- Add new applications
- Edit existing applications
- Delete applications

### Configuring Admin Access

1. Edit `client/.env` file
2. Update the `VITE_ADMIN_EMAILS` variable with comma-separated email addresses:
   ```
   VITE_ADMIN_EMAILS=admin@company.com,manager@company.com
   ```
3. Restart the client development server

**Note**: The admin check also looks for role-based access from the OIDC provider. If your OIDC provider returns roles/groups that include "admin", those users will also have admin access.

## Database

The application uses SQLite for data storage. The database file is automatically created at `server/database.sqlite` when you first run the server. Sequelize ORM handles all database migrations and table creation automatically.

### Database Schema

The application currently has one main table:

- **Apps**: Stores application information (title, description, URL, logo, category)

No manual database initialization is required - Sequelize will create the tables automatically on first run.

## Project Structure

```
PNJAppPortal/
├── client/                 # Vue.js frontend
│   ├── src/
│   │   ├── components/    # Reusable Vue components
│   │   ├── views/         # Page components
│   │   ├── router/        # Vue Router configuration
│   │   ├── stores/        # Pinia state management
│   │   └── main.js        # Application entry point
│   └── .env               # Client environment variables
│
└── server/                # Express.js backend
    ├── config/            # Configuration files (passport, etc.)
    ├── models/            # Sequelize models
    ├── routes/            # API routes
    ├── db.js              # Database configuration
    ├── index.js           # Server entry point
    ├── database.sqlite    # SQLite database (auto-generated)
    └── .env               # Server environment variables
```

## Troubleshooting

### Blank page when accessing /admin

This usually means your user doesn't have admin access. Check:

1. Your email address from the OIDC provider matches one in `VITE_ADMIN_EMAILS`
2. The client `.env` file is properly configured
3. You've restarted the client dev server after changing `.env`
4. Check browser console for "Admin check result" logs

### Database errors

The database is automatically created and managed by Sequelize. If you encounter database errors:

1. Delete `server/database.sqlite`
2. Restart the server - it will recreate the database

### Session/Authentication issues

1. Ensure Redis is running
2. Check OIDC configuration in server `.env`
3. Verify callback URL matches in both OIDC provider and server config

## Development

### Adding new applications (via UI)

1. Log in with an admin account
2. Navigate to `/admin`
3. Click "Add New App"
4. Fill in the form and submit

### Adding new applications (via API)

```bash
curl -X POST http://localhost:3000/api/apps \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My App",
    "description": "App description",
    "url": "https://myapp.com",
    "logo": "https://myapp.com/logo.png",
    "category": "Development"
  }'
```

## License

MIT
