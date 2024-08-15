<div align="center">
  <a href="https://github.com/naufandarmawan/taskmaster">
    <img src="./public/logo.svg" alt="Logo" width="200" height="auto">
  </a>

  <h3 align="center">TaskMaster</h3>
  <p align="center">
    Task Management Web Application
  </p>
</div>

## Overview

This is a task management application built with Next.js, Prisma, and PostgreSQL. It allows users to create, update, delete, and manage tasks, with features to distinguish between ongoing and completed tasks. The application is styled using TailwindCSS and is containerized using Docker.

## Features

- Create new tasks
- Update existing tasks
- Delete tasks
- Mark tasks as completed
- View ongoing and completed tasks in separate lists
- Tasks are sorted by creation date (ongoing: oldest first, completed: newest first)
- Edit form supports updating tasks with pre-filled data and canceling updates

## Tech Stack

- **Frontend**: Next.js, TailwindCSS, React
- **Backend**: Node.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Styling**: TailwindCSS
- **Containerization**: Docker

## Setup

### Prerequisites

- Docker
- Docker Compose
- Node.js (for local development and testing)

### Getting Started

1. **Clone the repository:**

   ```
   git clone https://github.com/naufandarmawan/taskmaster.git
   cd taskmaster
   ```

2. **Create a `.env` file:**

   Create a `.env` file in the root of your project directory with the following content:

   ```
   DATABASE_URL=your_prisma_database_configuration
   ```

3. **Build and run the Docker containers:**

   ```
   docker-compose up --build
   ```

   This command will build the Docker images and start the containers.

4. **Access the Application:**

   Open your browser and navigate to `http://localhost:3000` to view the application.

### Development

To make changes to the application:

1. **Update the code:**

   Make changes to the source code in the `app`, `components`, and `services` directories.

2. **Rebuild the Docker containers:**

   `docker-compose up --build`

3. **Run Prisma Migrations:**

   If you make changes to the Prisma schema, you can run migrations with:

   `docker-compose exec web npx prisma migrate dev`

4. **Generate Prisma Client:**

   To regenerate the Prisma client after schema changes:

   `docker-compose exec web npx prisma generate`
