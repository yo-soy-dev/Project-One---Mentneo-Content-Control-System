# Mentneo Content Control System (CMS)

## Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [System Architecture](#system-architecture)
4. [Features](#features)
5. [User Roles & Permissions](#user-roles--permissions)
6. [Content Workflow](#content-workflow)
7. [Setup Instructions](#setup-instructions)
8. [API Routes](#api-routes)
9. [Future Enhancements](#future-enhancements)

---

## Project Overview
The Mentneo Content Control System (CMS) is an internal platform designed to centralize content creation, approval, and publication for Mentneo's multiple platforms including website sections, blogs, social media, and announcements. This system enables a **role-based workflow** to ensure quality and structured content management.

---

## Tech Stack
- **Frontend:** React.js + Tailwind CSS + Axios  
- **Backend:** Node.js + Express.js  
- **Database:** MongoDB + Mongoose  
- **Authentication:** JWT (JSON Web Tokens)  
- **Hosting (optional):** Render / Netlify / Vercel

---

## System Architecture
Frontend (React)
| Axios (JWT)
Backend (Express API)
| Mongoose
MongoDB Database

- React handles UI and communicates via **REST APIs** with backend.
- Express server handles authentication, role-based access, and content CRUD operations.
- MongoDB stores users and content with timestamps and workflow states.

---

## Features
- User authentication (register & login)
- Role-based access: Creator & Admin
- Create, edit, delete content drafts
- Content types: Website, Blog, Social, Announcement
- Workflow: Draft → Approved → Published
- Content dashboard with filters by type, status, and tags
- Dynamic website section content loading
- Admin-only content approval and publication

---

## User Roles & Permissions
| Role      | Permissions                                      |
|-----------|--------------------------------------------------|
| CREATOR   | Create/Edit/Delete Drafts                        |
| ADMIN     | Approve & Publish Content                        |
| Both      | View dashboard                                   |

---

## Content Workflow
1. **Draft:** Created by creator, editable only by creator  
2. **Approved:** Admin approves content for publication  
3. **Published:** Admin publishes content, visible on website dynamically

---

## Setup Instructions

### 1. Backend
```bash
cd backend
npm install
# Create .env file
# Example:
# PORT=5000
# MONGO_URI=mongodb://127.0.0.1:27017/mentneo_cms
# JWT_SECRET=mentneo_secret_key
node server.js
2. Frontend
cd frontend
npm install
npm run dev
3. Access

Backend: http://localhost:5000/api/

Frontend: http://localhost:5173/ (or default Vite port)

API Routes
| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | /api/auth/register | Register user |
| POST   | /api/auth/login    | Login user    |

Content
| Method | Endpoint                 | Description           | Access        |
| ------ | ------------------------ | --------------------- | ------------- |
| POST   | /api/content             | Create content draft  | Creator/Admin |
| GET    | /api/content             | Get all content       | Creator/Admin |
| GET    | /api/content/:id         | Get single content    | Creator/Admin |
| PUT    | /api/content/:id         | Edit draft            | Creator/Admin |
| PUT    | /api/content/:id/approve | Approve content       | Admin only    |
| PUT    | /api/content/:id/publish | Publish content       | Admin only    |
| GET    | /api/public/content      | Get published content | Public        |
Future Enhancements

Add rich text editor for content body

Add image/video upload support

Implement search functionality in dashboard

Notifications for creators when content is approved or published

Deployment with CI/CD pipelines

Author

Devansh Tiwari
Full Stack Developer | MERN Stack | Mentneo CMS Project
