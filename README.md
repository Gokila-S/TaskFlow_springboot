# TaskFlow Application

A full-stack TaskFlow application built with a **Spring Boot** REST API backend and a lightweight **vanilla HTML/CSS/JavaScript** frontend. Supports full CRUD operations with a clean, responsive UI.

## Features

- Create valid Tasks
- Read/View list of Tasks
- Update existing Tasks
- Delete Tasks
- Simple and responsive UI

## Tech Stack

### Backend
- **Java 17**
- **Spring Boot 3.1.5**
- **MySQL Database**
- **Maven** (Build Tool)
- **Spring Data JPA** (Hibernate)

### Frontend
- **HTML5**
- **CSS3**
- **JavaScript** (Vanilla)

## Prerequisites

Before running this project, make sure you have the following installed:

- [Java Development Kit (JDK) 17](https://www.oracle.com/java/technologies/downloads/#java17)
- [Maven](https://maven.apache.org/download.cgi)
- [MySQL Server](https://dev.mysql.com/downloads/installer/)

## Getting Started

### 1. Database Setup

1. Open your MySQL client (Workbench, Command Line, etc.).
2. Create a new database named `taskflow_db`:
   ```sql
   CREATE DATABASE taskflow_db;
   ```
3. Update the database configuration in `Backend/src/main/resources/application.properties` if your MySQL credentials differ from the defaults:
   ```properties
   spring.datasource.username=root
   spring.datasource.password=
   ```

### 2. Backend Setup

1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```
2. Build the application dependencies:
   ```bash
   mvn clean install
   ```
3. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```
   Alternatively, you can run the generated JAR file from the `target` directory.

The backend server will start on `http://localhost:8083`.

### 3. Frontend Setup

1. Navigate to the `Frontend` directory.
2. Open the `index.html` file in your preferred web browser. 
3. You can also run it using a simple local server (like Live Server in VS Code) to avoid CORS issues if they arise, although the backend is configured to allow `*`.

## API Endpoints

The backend exposes the following REST endpoints at `http://localhost:8083/api/tasks`:

| Method | Endpoint          | Description               |
| :----- | :---------------- | :------------------------ |
| `GET`  | `/api/tasks`      | Retrieve all existing tasks |
| `POST` | `/api/tasks`      | Create a new task item      |
| `PUT`  | `/api/tasks/{id}` | Update a task by ID         |
| `DELETE`| `/api/tasks/{id}`| Delete a task by ID         |

### Sample JSON Payload (for POST/PUT)

```json
{
  "title": "Buy groceries",
  "completed": false
}
```

## Project Structure

```
TaskFlow_SpringBoot/
├── Backend/                 # Spring Boot Application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/        # Source code (Controller, Service, Model, Repository)
│   │   │   └── resources/   # Config (application.properties)
│   ├── pom.xml              # Maven dependencies
├── Frontend/                # Client-side Application
│   ├── index.html           # Main UI
│   ├── script.js            # Frontend Logic (API calls)
│   ├── style.css            # Styles
└── README.md
```

## Configuration

You can customize the application configuration in `Backend/src/main/resources/application.properties`.

- **Server Port:** Default is `8083`.
- **Database Connection:** URL, Username, and Password settings.
