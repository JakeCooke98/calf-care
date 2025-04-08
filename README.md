# Calf Care Management System

## Overview

Calf Care is a comprehensive management system designed to help dairy farmers and ranchers efficiently monitor and manage their calf herds. This full-stack application provides real-time insights into calf health, growth, and overall herd performance.

## Features

- **Dashboard**: Get a quick overview of key metrics including total calves, health status, new births, and average weight.
- **Detailed Analytics**: Visualize data with interactive charts for breed distribution, gender distribution, age distribution, and mortality rates.
- **Calf Details**: Access and manage individual calf information through a detailed table view.
- **Watchlist**: Keep track of calves that require special attention or monitoring.
- **User Authentication**: Secure sign-up and sign-in functionality for farm managers and staff.

## Example Dashboard
- Login/Signup page
![Alt text](/screenshots/SignIn_Example.png?raw=true "Login/Signup Page")
- Dashboard
![Alt text](/screenshots/Dashboard_Example.png?raw=true "Dashboard Page")
- Details
![Alt text](/screenshots/Details_Example.png?raw=true "Details Page")
- Watchlist
![Alt text](/screenshots/Watchlist_Example.png?raw=true "Watchlist Page")

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

6. Seed the database with test data (optional):
   ```
   cd backend
   
   # Seed 1000 calves (default)
   npm run seed
   
   # Seed a specific number of calves
   npm run seed -- --count=500
   
   # Clear existing data before seeding
   npm run seed:clear
   ```

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
