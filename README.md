# Calf Care Management System

## Overview

Calf Care is a comprehensive management system designed to help dairy farmers and ranchers efficiently monitor and manage their calf herds. This full-stack application provides real-time insights into calf health, growth, and overall herd performance.

## Features

- **Dashboard**: Get a quick overview of key metrics including total calves, health status, new births, and average weight.
- **Detailed Analytics**: Visualize data with interactive charts for breed distribution, gender distribution, age distribution, and mortality rates.
- **Calf Details**: Access and manage individual calf information through a detailed table view.
- **Watchlist**: Keep track of calves that require special attention or monitoring.
- **User Authentication**: Secure sign-up and sign-in functionality for farm managers and staff.

## Dashboard Example


## Tech Stack

### Frontend
- Next.js 14 (React framework)
- TypeScript
- Tailwind CSS for styling
- Shadcn UI components
- Recharts for data visualization

### Backend
- NestJS (Node.js framework)
- TypeScript
- PostgreSQL (database)
- TypeORM (ORM)

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm or yarn
- PostgreSQL

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/calf-care.git
   cd calf-care
   ```

2. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```

3. Install backend dependencies:
   ```
   cd ../backend
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the backend directory
   - Create a `.env` file in the frontend directory
   - Add necessary environment variables (database connection, JWT secret, etc.)
  
5. Start the Database:
   - Ensure Docker is running on your device
   - ```
     cd backend
     docker compose up -d
     ```
   - Check docker logs to ensure DB has booted up sucessfully 

7. Start the development servers:
   
   Backend:
   ```
   cd backend
   npm run start:dev
   ```
   Frontend:
   ```
   cd frontend
   npm run dev
   ```

8. Open your browser and navigate to `http://localhost:3000` to view the application.

## License

This project is licensed under the [MIT License](LICENSE).
