# Task Management Application

## Description
This Task Management Application is a full-stack web application designed to help users manage their tasks efficiently. It includes features for user authentication, task creation, editing, deletion, exporting tasks to Excel, and uploading bulk tasks using CSV/Excel files.

## Features

### User Authentication
- Registration and login forms.
- Redirect to the Task Creation page after login.

### Task Management
- **Task Creation Form**:
  - Fields: Task Title, Description, Effort to Complete (in days), Due Date.
  - Input validation (e.g., non-empty title, valid date).
- **Task List View**:
  - Displays all tasks created by the logged-in user.
- **Task Update View**:
  - Allows users to update task details.
- **Task Delete Button**:
  - Enables users to delete tasks.

### Export Tasks to Excel
- A button labeled "Export to Excel" triggers a backend call to download an Excel file containing the user’s tasks.

### Upload Bulk Tasks
- Option to upload a CSV or Excel file.
- Backend reads the file and saves all tasks listed in the file to the database.
- Columns in the file match the fields in the Task Creation Form.

## Technologies Used

### Backend
- **Node.js** with Express.js
- **PostgreSQL** for the database 
- Libraries: `xlsx`, `sequelize`, `passport.js`, `jsonwebtoken`

### Frontend
- **React.js**
- Libraries: `axios`, `react-router-dom`, `react-hook-form`

## Installation

### Prerequisites
- Node.js and npm installed
- MySQL or PostgreSQL installed and running
- Update .env file 
- `create` `database` with name `task_management` or you can use other then update `.env` file

### Steps

#### Clone the Repository
```bash
git clone https://github.com/SagarGhadage/task-management-app.git
```

#### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the database in `config/database.js`.

5. Start the backend server:
   ```bash
   npm start
   ```

#### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. update [api.js backend url](./frontend/src/api/api.js) with backend url

3. Start the frontend development server:
   ```bash
   npm start
   ```

## Usage
1. Register a new user or log in with existing credentials.
2. Create, view, update, and delete tasks.
3. Export tasks to an Excel file using the "Export to Excel" button.
4. Upload bulk tasks using the "Upload File" option.

## Folder Structure
- `backend/`: Contains the backend code, including routes, controllers, models, and services.
- `frontend/`: Contains the frontend code, including React components, pages, and styles.

## SQL 
```sql

```
