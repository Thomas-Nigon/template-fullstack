# Project Template: React, Vite, PostgreSQL, GraphQL, Apollo Server, and Docker

This is a full-stack template project using React with Vite, Apollo Server with GraphQL, PostgreSQL, and Docker. The project is organized as a monorepo with separate frontend and backend directories. Docker is used to containerize the application and manage services such as PostgreSQL.

## Prerequisites

Make sure you have the following installed:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) (optional, if you want to run locally without Docker)

## Project Structure

```
.
├── backend/               # Backend (Apollo Server, GraphQL API)
│   ├── src/               # Backend source code
│   ├── .env               # Environment variables for the backend
│   ├── Dockerfile         # Dockerfile for backend service
│   └── tsconfig.json      # TypeScript configuration for backend
├── frontend/              # Frontend (React app with Vite)
│   ├── src/               # Frontend source code
│   ├── .env               # Environment variables for the frontend
│   ├── Dockerfile         # Dockerfile for frontend service
│   └── tsconfig.json      # TypeScript configuration for frontend
├── docker-compose.yml     # Docker Compose configuration
└── nginx.dev.conf         # NGINX configuration
```

## Setting Up the Project

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Set Up Environment Variables

Create `.env` files for both the frontend and backend if not already present.

- **Backend .env file (`backend/.env`)**:
  This file contains environment variables for the backend service. Here's an example:

  ```env
  DB_HOST=database
  DB_USER=postgres
  DB_PASSWORD=your-password
  DB_SCHEMA=templateDB
  DB_PORT=5432
  ```

- **Frontend .env file (`frontend/.env`)**:
  This file contains environment variables for the frontend service, including the gateway URL.

  ```env
  VITE_GATEWAY_URL=http://localhost:4000
  VITE_GATEWAY_PORT=4000
  ```

### 3. Install Dependencies

- For the **backend**, navigate to the `backend/` directory and install dependencies:

  ```bash
  cd backend
  npm install
  ```

- For the **frontend**, navigate to the `frontend/` directory and install dependencies:

  ```bash
  cd frontend
  npm install
  ```

### 4. Docker Setup

The project includes a `docker-compose.yml` file that defines the services for the frontend, backend, PostgreSQL database, and NGINX reverse proxy. To run the application using Docker, follow these steps.

### 5. Build and Run the Project

You can build and start all services using Docker Compose.

In the root directory of the project (where the `docker-compose.yml` file is located), run the following command:

```bash
docker-compose up --build
```

This will:

1. Build the Docker images for the frontend and backend services.
2. Start the PostgreSQL database container.
3. Start the NGINX reverse proxy.
4. Run the frontend and backend services.

### 6. Access the Application

Once everything is up and running, you can access your application as follows:

- **Frontend (React + Vite)**: `http://localhost:5173`
- **Backend (GraphQL API)**: `http://localhost:4000/graphql`
- **Adminer (for managing PostgreSQL)**: `http://localhost:8080`
  - Use `postgres` as the database username, the value of `DB_PASSWORD` for the password, and `templateDB` as the database name.

### 7. NGINX Configuration

The NGINX reverse proxy is set up to forward requests to the appropriate services:

- Requests to `/api` will be forwarded to the backend service (GraphQL API).
- Requests to `/vizualizer` will be forwarded to the Adminer service (for PostgreSQL management).
- All other requests will be forwarded to the frontend service (React app).

### 8. Stopping the Application

To stop the application and remove containers, use the following command:

```bash
docker-compose down
```

This will stop and remove all containers, networks, and volumes defined in your `docker-compose.yml` file.

---

## Folder Structure and Code

### Backend

The backend folder contains the Apollo Server with GraphQL API. It uses TypeORM to interact with the PostgreSQL database. The database connection is configured to connect to the `templateDB` schema.

Key files:

- `src/index.ts`: The entry point for the backend server where Apollo Server is initialized.
- `src/resolvers.ts`: Contains GraphQL resolvers for handling queries and mutations.
- `src/schema.ts`: Defines the GraphQL schema.

### Frontend

The frontend folder contains the React application built with Vite. It uses Apollo Client to interact with the GraphQL API on the backend.

Key files:

- `src/App.tsx`: The main component for the frontend application.
- `src/graphql/queries.ts`: Contains GraphQL queries for fetching data from the backend.

---

## Troubleshooting

If you encounter issues during the setup or when running the application, try the following:

1. **Check Docker Logs**: Run `docker-compose logs` to check the logs of all services.
2. **Check Service Health**: Ensure all services are up and running with `docker-compose ps`.
3. **Check Database Connection**: Make sure the backend is connecting to the PostgreSQL database by checking the connection details and logs.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
