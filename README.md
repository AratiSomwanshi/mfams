# Mutual Fund Account Management System (MFAMS)

## ✅ Project Overview

This project is a backend system for managing mutual fund accounts. It supports user authentication, fund management, and transaction processing (buy/sell). Designed using **Spring Boot**, **JWT Authentication**, and **Role-Based Access Control (ADMIN, USER)**.

---

## 🚀 Technologies Used

- Java 17+
- Spring Boot (MVC, Security)
- JWT Token Authentication
- MySQL / PostgreSQL (can be switched)
- JPA / Hibernate
- Maven
- REST API
- Scheduler (`@Scheduled` for NAV updates)

---

## 👥 User Roles

| Role | Capabilities |
|------|--------------|
| `ADMIN` | Add & view mutual funds |
| `USER`  | View funds, buy/sell funds, view own transactions |

---

## 📁 Features & Endpoints

### 🔐 Authentication (Public)
- `POST /api/auth/register` → Register a new user (ADMIN or USER)
### 1. Register a user (POST `/api/auth/register`)
![image alt](https://github.com/AratiSomwanshi/mfams/blob/2b65e14e1ef24d88b25493837afe9a43323d9cc4/mfams/image/1_Registration_Admin.png)
![image alt](https://github.com/AratiSomwanshi/mfams/blob/3b2e232e125381f1119b8925444d68a06c8b1df6/mfams/image/1_Registration_User.png)


---
### 2. Login a user (POST /api/auth/login)

- `POST /api/auth/login` → Login and receive JWT token
  ![image alt]()
  ![image alt]()
- `GET /api/auth/me` → Get current user info

### 💼 Mutual Fund Management
- `POST /api/funds` → Add new fund (ADMIN only)
- `GET /api/funds` → List all funds
- `GET /api/funds/{id}` → Get fund details

### 💸 Investment Transactions (USER)
- `POST /api/transactions/buy` → Buy mutual fund
- `POST /api/transactions/sell` → Sell mutual fund
- `GET /api/transactions` → Get logged-in user’s transactions
- `GET /api/transactions/{id}` → Get one transaction




### ⏱ Scheduled Task
- Automatic NAV update daily at 12 AM using random % fluctuation

---
