# Product Manager - Full-Stack CRUD Application

A containerized full-stack application for managing products, built with Angular, Node.js/Express, and MongoDB.

## 📋 Project Members

- **Member 1:** Youssef ABBAR
- **Member 2:** Salah Eddine OUTLIOUA

## 🏗️ Architecture

This application consists of 3 Docker services:

- **Frontend:** Angular 17 (Port 4200)
- **Backend:** Node.js + Express API (Port 3000)
- **Database:** MongoDB (Port 27018 → mapped from internal 27017)

**Database Management:** Use MongoDB Compass (desktop app) to connect to `mongodb://localhost:27018`

## 📁 Project Structure

```
project_docker/
├── frontend/             # Angular application source code
├── backend/              # Express API source code
├── docker/               # Docker configuration files
│   ├── frontend/         # Frontend Dockerfile
│   └── backend/          # Backend Dockerfile
├── docker-compose.yml    # Orchestration configuration
└── README.md             # This file
```

## 🚀 Getting Started

### Prerequisites

- Docker (version 24+)
- Docker Compose (version 2+)

### Installation & Running

1. **Clone the repo:**

   ```bash
   git clone https://github.com/YoussefAbbar/Projet-Docker.git
   ```

2. **Start all services:**

   ```bash
   docker-compose up --build
   ```

3. **Access the application:**
   - Frontend: http://localhost:4200
   - Backend API: http://localhost:3000/api/products
   - MongoDB: mongodb://localhost:27018 (use MongoDB Compass to connect)

### Stopping the Application

**Stop containers (data persists):**

```bash
docker-compose down
```

**Stop and remove all data:**

```bash
docker-compose down -v
```

## ✨ Features

- ✅ **Create** new products
- ✅ **Read** all products in a table
- ✅ **Update** existing products
- ✅ **Delete** products
- ✅ **Hot Reload** for both frontend and backend
- ✅ **Data Persistence** using Docker volumes

## 🔧 Development

### Hot Reload

Both frontend and backend support hot reload:

- Modify files in `frontend/src/` - changes reflect automatically
- Modify files in `backend/src/` - server restarts automatically

### Database Management

Use **MongoDB Compass** (desktop application) to manage the database:

1. Download from: https://www.mongodb.com/products/compass
2. Connect to: `mongodb://localhost:27018`
3. Database name: `productdb`
4. Collection: `products`

## 📊 API Endpoints

| Method | Endpoint            | Description        |
| ------ | ------------------- | ------------------ |
| GET    | `/api/products`     | Get all products   |
| GET    | `/api/products/:id` | Get single product |
| POST   | `/api/products`     | Create new product |
| PUT    | `/api/products/:id` | Update product     |
| DELETE | `/api/products/:id` | Delete product     |

## 🧪 Testing Data Persistence

1. Start the application: `docker-compose up`
2. Add some products via the frontend
3. Stop containers: `docker-compose down`
4. Restart: `docker-compose up`
5. Verify data is still present ✅

## 🐳 Docker Configuration

### Volumes

- `mongodb_data` - Named volume for database persistence
- Bind mounts for source code (hot reload)

### Network

- `app-network` - Bridge network connecting all services

### Environment Variables

Backend uses:

- `PORT=3000`
- `MONGO_URI=mongodb://mongodb:27017/productdb`

## 📝 Notes

- First startup may take a few minutes to build images
- MongoDB data persists between restarts
- Use `docker compose down -v` only when you want to reset all data
- Ensure ports 3000, 4200, and 27018 are available
- Use MongoDB Compass to visualize and manage database
- MongoDB runs on port 27018 (to avoid conflict with local MongoDB on 27017)

## 🛠️ Troubleshooting

**Port already in use:**

```bash
# Find and stop the process using the port
lsof -ti:4200 | xargs kill -9
```

**Rebuild after dependency changes:**

```bash
docker-compose up --build
```

**View logs:**

```bash
docker-compose logs -f [service-name]
```

---

**Built with Docker 🐳 | Angular 🅰️ | Node.js 🟢 | MongoDB 🍃**
