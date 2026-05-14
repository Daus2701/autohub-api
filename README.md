# AutoHub API 🚗🔧

AutoHub API is a backend service for managing automotive workshop bookings, vehicle services, payments, and appointment scheduling.

This project was built using NestJS, Prisma ORM, and PostgreSQL as part of a final software engineering project.

---

# ✨ Features

## Authentication
- User registration
- User login
- JWT authentication
- Protected routes

## Users
- Create user
- Get all users
- Get user by ID
- Update user
- Delete user

## Vehicles
- Register vehicle
- Get all vehicles
- Get vehicle by ID
- Update vehicle
- Delete vehicle

## Services
- Create workshop service
- Get all services
- Get service by ID
- Update service
- Delete service

## Service Categories
- Create service category
- Get all service categories
- Update service category
- Delete service category

## Bookings
- Create booking
- Prevent duplicate time slot booking
- Get all bookings
- Get booking by ID
- Update booking
- Delete booking

## Booking Items
- Add service items into booking
- Calculate subtotal
- Connect booking with workshop services

## Payment System
- Store payment method
- Store payment status
- Update payment status
- Auto-confirm booking after payment

## Booking Status System
- Pending
- Confirmed
- Completed

## Available Slots API
- Show booked slots
- Show available slots
- Prevent double booking

## Dashboard Summary
- Total bookings
- Completed bookings
- Pending bookings
- Confirmed bookings
- Total revenue

## API Documentation
- Swagger UI integrated

---

# 🛠️ Tech Stack

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- Swagger
- JWT Authentication
- Class Validator

---

# 🗂️ Database Design

The database schema was designed using DrawSQL.

![DrawSQL Diagram](./assets/drawsql-diagram.jpg)

---

# 🔄 System Workflow

The following workflow explains the booking and payment process inside AutoHub.

![Workflow Diagram](./assets/workflow-diagram.png)

---

# 📦 Installation

## Clone Repository

```bash
git clone <your-github-repository>
```

## Enter Project Folder

```bash
cd autohub-api
```

## Install Dependencies

```bash
npm install
```

---

# ⚙️ Environment Variables

Create a `.env` file in the root directory.

Example:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/autohub"
JWT_SECRET="your-secret-key"
PORT=3001
```

---

# 🗄️ Database Migration

Run Prisma migration:

```bash
npx prisma migrate dev
```

Generate Prisma client:

```bash
npx prisma generate
```

---

# ▶️ Running the Application

## Development Mode

```bash
npm run start:dev
```

## Production Mode

```bash
npm run start:prod
```

---

# 📘 Swagger Documentation

Swagger API documentation is available at:

```bash
http://localhost:3001/api
```

---

# 📂 API Modules

| Module | Description |
|---|---|
| Auth | Authentication & JWT |
| Users | User management |
| Vehicles | Vehicle management |
| Services | Workshop services |
| Service Categories | Service classifications |
| Bookings | Appointment booking |
| Booking Items | Booking service details |
| Payments | Payment handling |

---

# 🔒 Authentication

This project uses JWT authentication.

After login, use the generated token:

```bash
Bearer <your_token>
```

inside Swagger Authorize button or Postman Authorization header.

---

# 🚀 Future Improvements

- Frontend integration
- Online payment gateway integration
- Email notification system
- Admin dashboard UI
- Booking cancellation feature
- Workshop staff management
- Service history tracking

---

# 👨‍💻 Author

Developed by:

**Subarqah Firdhaus Hardiansyah**

RevoU FSSE - CRACK Project

---

# 📄 License

This project is for educational and portfolio purposes.