

---

# Task Management Application

## Short Description:
This is a task management web application that allows users to add, edit, delete, and reorder tasks in a drag-and-drop interface. Tasks are categorized into three sections: To-Do, In Progress, and Done. It features Firebase Authentication, MongoDB for persistence, and real-time task synchronization.

## Live Links:
- [Live Link](https://task-management-2k25.web.app/)
- [GitHub Client Link](https://github.com/Piash2K/task-management-client.git)
- [GitHub Server Link](https://github.com/Piash2K/task-management-server.git)

## Dependencies:
- **Firebase Authentication**: For user authentication
- **MongoDB**: Database for task storage
- **Express.js**: Server-side framework for handling API requests
- **Vite.js**: Frontend build tool
- **React.js**: JavaScript library for building user interfaces
- **react-beautiful-dnd**: Drag-and-drop library for task reordering
- **Axios**: HTTP client for making requests
- **react-router-dom**: For routing within the app
- **tailwindcss**: Utility-first CSS framework
- **react-toastify**: For displaying toast notifications
- **socket.io-client**: For real-time updates via websockets
- **sweetalert2**: For alert dialogs

## Installation Steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/Piash2K/task-management-client.git
   git clone https://github.com/Piash2K/task-management-server.git
   ```

2. Navigate to the client directory and install the dependencies:
   ```bash
   cd task-management-client
   npm install
   ```

3. Navigate to the server directory and install the dependencies:
   ```bash
   cd task-management-server
   npm install
   ```

4. Create a `.env` file in both the client and server directories and add your Firebase configuration and MongoDB URI.

5. Start the server and client:
   - Start the server:
     ```bash
     npm run server
     ```
   - Start the client:
     ```bash
     npm run dev
     ```

6. Visit `http://localhost:3000` in your browser to view the app.

## Technologies Used:
- **Frontend:** React.js, Vite.js, Tailwind CSS, react-beautiful-dnd
- **Backend:** Express.js, MongoDB, Firebase Authentication
- **Additional:** Axios, react-router-dom, dotenv, socket.io-client, sweetalert2, react-toastify

---
