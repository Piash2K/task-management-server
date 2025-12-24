

# ✅ Task Management Application

A modern, responsive **Task Management Web Application** that helps users organize their work efficiently using a **drag-and-drop Kanban-style interface**. Tasks are categorized into **To-Do**, **In Progress**, and **Done**, with real-time updates and secure authentication.

---

## 🚀 Live Preview & Source Code

🔗 **Live Website:**
👉 [https://task-management-2k25.web.app/](https://task-management-2k25.web.app/)

💻 **Source Code:**

* Client: [https://github.com/Piash2K/task-management-client.git](https://github.com/Piash2K/task-management-client.git)
* Server: [https://github.com/Piash2K/task-management-server.git](https://github.com/Piash2K/task-management-server.git)

---

## 📌 Key Features

* 🔐 **User Authentication** using Firebase
* 📝 **Create, Edit & Delete Tasks**
* 🔄 **Drag & Drop Task Reordering**
* 📊 **Task Categories**: To-Do, In Progress, Done
* ⚡ **Real-Time Task Synchronization**
* 🔔 **Toast Notifications & Alerts**
* 📱 **Fully Responsive UI**
* ☁️ **Persistent Data Storage with MongoDB**

---

## 🧠 Project Overview

This application is designed to improve productivity by offering a clean and intuitive task workflow. Users can manage tasks visually, move them across stages easily, and see updates in real time. The system uses a **React + Express + MongoDB** architecture with **Firebase Authentication** for secure access.

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite.js
* Tailwind CSS
* react-beautiful-dnd
* react-router-dom
* Axios
* react-toastify
* sweetalert2
* socket.io-client

### Backend

* Node.js
* Express.js
* MongoDB
* Firebase Authentication
* dotenv

---

## 📦 Dependencies

* **Firebase Authentication** – User login & security
* **MongoDB** – Task data storage
* **Express.js** – REST API handling
* **react-beautiful-dnd** – Drag-and-drop task movement
* **Socket.IO Client** – Real-time updates
* **Axios** – API communication

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repositories

```bash
git clone https://github.com/Piash2K/task-management-client.git
git clone https://github.com/Piash2K/task-management-server.git
```

---

### 2️⃣ Install Client Dependencies

```bash
cd task-management-client
npm install
```

---

### 3️⃣ Install Server Dependencies

```bash
cd task-management-server
npm install
```

---

### 4️⃣ Environment Variables

Create a `.env` file in **both client and server folders**.

**Client (.env):**

```env
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
```

**Server (.env):**

```env
MONGODB_URI=your_mongodb_uri
PORT=5000
```

---

### 5️⃣ Run the Application

**Start the Server**

```bash
npm run server
```

**Start the Client**

```bash
npm run dev
```

---

### 6️⃣ Open in Browser

```text
http://localhost:3000
```

---

## 📈 Future Improvements

* 🌙 Dark/Light mode toggle
* ⏰ Task due dates & reminders
* 📊 Activity log & analytics
* 👥 Team collaboration features

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to fork the project and submit a pull request.




