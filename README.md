# Task Management System

This Task Management System is a full-stack web application designed for efficient task tracking and management. The frontend is built using React, a popular JavaScript library for building user interfaces, while the backend is developed using Django, a high-level web framework written in Python.

## Features

- User-friendly interface for creating, updating, and deleting tasks
- Secure user authentication and authorization
- Toaster for notification
- Responsive design for seamless user experience on all devices
- Task filtering options for better organization
- Calendar view for all tasks

## Technologies Used

- **Frontend**: React, JavaScript, Material UI
- **Backend**: Django, Python
- **Database**: PostgreSQL, SQL
- **Authentication**: JWT (JSON Web Tokens)
- **API Communication**: RESTful API
- **Test**: Vitest, react-testing-library

## Screenshots

![Register Page](/screenshots/taskRegister.png)

![Login Page](/screenshots/taskLogin.png)

![Dashboard Page](/screenshots/taskdashboard.png)

![Create Task Form](/screenshots/taskcreate.png)

![Calendar View](/screenshots/taskcalendar.png)

## Getting Started

To get started with the Task Management System, follow these steps:

1.  **Installation**: Clone the repository and install the necessary dependencies for both the frontend and backend.
2.  **Configuration**: Configure the backend settings, database connections, and any environment variables required.
3.  **Run the Servers**: Start the frontend server to serve the React application and the backend server to handle API requests.

## Setup Instructions Frontend

To start the frontend of the project, follow these steps:

1.  **Installation**: Run the following command to install the necessary dependencies:

    ```bash
    npm install
    ```

2.  **Development Mode**: Start the frontend server in development mode by running:

    ```bash
    npm run dev
    ```

3.  **Testing**: To run tests, you can use either of the following commands:

    - For running general tests:

    ```bash
    npm run test
    ```

    - For running UI tests:

    ```bash
    npm run test:ui
    ```

## Setup Instructions Backend

To start the backend of the project, follow these steps:

1.  **Installation**: Run the following command to install the necessary dependencies:

    ```bash
    pip install -r requirements.txt
    ```

2.  **Database Setup**: Set up the database by running migrations:

    ```bash
    python manage.py migrate
    ```

3.  **Run Server**: Start the Django server by running:

    ```bash
    python manage.py runserver
    ```

## License

This project is licensed under the [MIT License](https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt).
