# Verto - Employee Management System

A full-stack web application for managing employee data with role-based access control (Admin/Employee).


## Test Data
-- for admin login access => `admin@gmail.com`
-- for employee login access => `ashu@gmail.com`
-- also use the any employee email from the employee list on the UI to login as employee


Backend Hosted on Render
Frontend Hosted on Vercel
Database MySQL Hosted on Railway

## 🚀 Tech Stack

### Backend
- **Node.js** with Express.js
- **Prisma ORM** with MySQL database
- **Zod** for data validation
- **Swagger** for API documentation
- **CORS** enabled for cross-origin requests

### Frontend
- **React** with Vite
- **React Router DOM** for navigation
- **React Toastify** for notifications
- **XLSX** for Excel export functionality
- **Zod** for client-side validation

## 📋 Features

- **Role-based Authentication** (Admin/Employee)
- **Employee CRUD Operations** (Admin only)
- **Employee Profile Management**
- **Excel Export Functionality**
- **Error Logging System**
- **API Documentation with Swagger**
- **Responsive Design**

## 🏗️ Application Workflow

### Admin Workflow
1. **Login** → Admin authentication via email
2. **Dashboard** → View all employees
3. **Add Employee** → Create new employee records
4. **Update Employee** → Modify existing employee data
5. **Delete Employee** → Remove employee records

### Employee Workflow
1. **Login** → Employee authentication via email
2. **Profile View** → Access personal profile information

## 📁 Project Structure

```
Verto/
├── backend/
│   ├── controllers/
│   │   └── employeeController.js    # Business logic
│   ├── routes/
│   │   ├── common.js               # Main router
│   │   └── employee.js             # Employee routes
│   ├── prisma/
│   │   ├── migrations/             # Database migrations
│   │   └── schema.prisma           # Database schema
│   ├── logs/
│   │   └── errorlogs.log          # Error logging
│   ├── .env                       # Environment variables
│   ├── server.js                  # Express server
│   ├── swagger.js                 # Swagger configuration
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/            # Reusable components
    │   ├── context/              # React context
    │   ├── pages/                # Page components
    │   ├── styles/               # CSS styles
    │   ├── App.jsx               # Main app component
    │   └── main.jsx              # Entry point
    ├── public/
    ├── .env                      # Environment variables
    └── package.json
```

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js** 
- **MySQL** database
- **Git**

### 1. Clone Repository
```bash
git clone https://github.com/Ashu6622/verto_hackathon.git
cd verto_hackathon
```

### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env file with your database credentials:
# PORT=5555
# DATABASE_URL="mysql://username:password@localhost:3306/verto"
# JWT_SECRET_KEY="your-secret-key"

# Setup database
npx prisma migrate dev
npx prisma generate

# Start development server
npm start
```

### 3. Frontend Setup
```bash
cd ../frontend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env file:
# VITE_API_URL="http://localhost:5555/api/employees"

# Start development server
npm run dev
```

## 🗄️ Database Schema

```sql
User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  position  String
  role      Role     @default(employee)  // admin | employee
  createdAt DateTime @default(now())
}
```

## 🔌 API Endpoints

### Authentication
- `POST /api/employees/admin-login` - Admin login
- `POST /api/employees/employee-login` - Employee login

### Employee Management (Admin Only)
- `GET /api/employees/employee-list` - Get all employees
- `POST /api/employees/add-employee` - Create new employee
- `PUT /api/employees/update-employee/:id` - Update employee
- `DELETE /api/employees/delete-employee/:id` - Delete employee

### System
- `GET /api/logs/errors` - View error logs
- `GET /api-docs` - Swagger API documentation

## 🚀 Running the Application

1. **Start Backend Server**
   ```bash
   cd backend
   npm start or nodemon
   ```
   Server runs on: `http://localhost:5555`

2. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   Application runs on: `http://localhost:5173`

3. **Access Application**
   - Frontend: `http://localhost:5173`
   - API Documentation: `http://localhost:5555/api-docs`




## 🐛 Error Handling

- Backend errors are logged to `backend/logs/errorlogs.log`
- View error logs via API: `GET /api/logs/errors`
- Frontend displays user-friendly error messages via toast notifications


## 👨‍💻 Author

**Ashutosh** - MERN Developer


## Deployed_URL = `https://verto-hackathon.vercel.app/`

