# 📚 Course Management Platform API

A robust, secure, and production-ready RESTful API built with **Node.js**, **Express.js**, and **MongoDB**. This backend system implements complete **CRUD operations**, advanced **User Authentication/Authorization (RBAC)**, seamless **File Uploads**, and built-in **Data Pagination**.

---

## 🚀 Core Features

- **Architectural Pattern:** Structured purely on the **MVC (Model-View-Controller)** pattern for decoupling code logic.
- **Robust Authentication & Security:** Secure user authentication using **JSON Web Tokens (JWT)** and secure password hashing via **Bcrypt.js**.
- **Role-Based Access Control (RBAC):** Dedicated permissions handling (`MANAGER`, `ADMIN`, `USER`) via a custom authorization middleware (`allowedTo`).
- **File Uploading System:** Profile picture/avatar uploading functionality managed by **Multer** with dynamic file extensions and strict image-only filtering.
- **Advanced Pagination Strategy:** Built-in dynamic data query limiting (`limit`) and skipping (`page`) for fetching courses and users records efficiently.
- **Centralized Error Handling:** Global middleware infrastructure (`asyncWrapper` & Centralized Error Handler) to elegantly process runtime errors and prevent server crashes.
- **API Request Validation:** Strict input sanitization and verification using **Express-Validator**.

---

## 🛠️ Tech Stack & Tools

- **Runtime Environment:** Node.js
- **Backend Framework:** Express.js (v5.x)
- **Database (NoSQL):** MongoDB & Mongoose (ODM)
- **Security & Tokens:** Bcrypt.js, Jsonwebtoken (JWT)
- **Media Management:** Multer
- **API Testing:** Postman
- **Environment Management:** Dotenv

---

## 📁 Project Structure

```text
├── controllers/          # Request handlers & core business logic
│   ├── courses.controller.js
│   └── users.controller.js
├── middlewares/          # Custom application middlewares
│   ├── allowedTo.js      # RBAC authorization gate
│   ├── asyncWrapper.js   # Centralized try-catch wrapper
│   ├── validationSchema.js
│   └── verifyToken.js    # JWT verification
├── models/               # Mongoose database schemas
│   ├── coursesModel.js
│   └── userModel.js
├── routes/               # Express routers mapping HTTP methods
│   ├── courses.routes.js
│   └── users.routes.js
├── uploads/              # Storage directory for uploaded user avatars
├── utilities/            # Helper classes, enums, and constants
│   ├── HttpStatusText.js
│   ├── appError.js
│   └── userRoles.js
├── .env                  # Environment configurations
├── index.js              # Application entry point & configuration
└── package.json          # Package manifest & scripts