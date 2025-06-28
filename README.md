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
### 1. Register a user (POST `http://localhost:8080/api/auth/register`)
![image alt](https://github.com/AratiSomwanshi/mfams/blob/2b65e14e1ef24d88b25493837afe9a43323d9cc4/mfams/image/1_Registration_Admin.png)
![image alt](https://github.com/AratiSomwanshi/mfams/blob/3b2e232e125381f1119b8925444d68a06c8b1df6/mfams/image/1_Registration_User.png)


---
- `POST /api/auth/login` → Login and receive JWT token
### 2. Login a user (POST `http://localhost:8080/api/auth/login`)


  ![image alt](https://github.com/AratiSomwanshi/mfams/blob/9c24b3529492ae603df92c87469d0c0c8136eab9/mfams/image/2_Login_Admin.png)
  ![image alt](https://github.com/AratiSomwanshi/mfams/blob/01ec49e38c3325237b15f892d2ef437e50770290/mfams/image/2_Login_User.png)

  ---
- `GET /api/auth/me` → Get current user info
  ### 3. User info (GET `http://localhost:8080/api/auth/me`)
  ![image alt](https://github.com/AratiSomwanshi/mfams/blob/7d81ca52b857328c1a06ae9d774e5c18c7eb7873/mfams/image/3_Auth_me.png)
  
  ---
### 💼 Mutual Fund Management
- `POST /api/funds` → Add new fund (ADMIN only)
  ### 1. Admin add mutual fund(POST `http://localhost:8080/api/funds`)
  ![image alt](https://github.com/AratiSomwanshi/mfams/blob/94e93644b17092e416f7dc83e0c447d0b89d5847/mfams/image/4_funds_add_Admin.png)


   ---
- `GET /api/funds` → List all funds
   ### 2. View mutual fund(GET `http://localhost:8080/api/funds`)
  
![image alt](https://github.com/AratiSomwanshi/mfams/blob/94e93644b17092e416f7dc83e0c447d0b89d5847/mfams/image/3_funds_Admin.png
)
![image alt](https://github.com/AratiSomwanshi/mfams/blob/94e93644b17092e416f7dc83e0c447d0b89d5847/mfams/image/3_funds.png)

  ---
  
- `GET /api/funds/{id}` → Get fund details
  ### 3. View mutual fund by id (GET `http://localhost:8080/api/funds/{id}`)
![image alt](https://github.com/AratiSomwanshi/mfams/blob/94e93644b17092e416f7dc83e0c447d0b89d5847/mfams/image/4_funds_id_Admin.png
)
![image alt](https://github.com/AratiSomwanshi/mfams/blob/94e93644b17092e416f7dc83e0c447d0b89d5847/mfams/image/4_funds_id.png)

  ---
### 💸 Investment Transactions (USER)
- `POST /api/transactions/buy` → Buy mutual fund
   ### 1. Buy mutual fund (POST `http://localhost:8080/api/transactions/buy`)
![image alt](https://github.com/AratiSomwanshi/mfams/blob/94e93644b17092e416f7dc83e0c447d0b89d5847/mfams/image/5_transactions_buy_User.png)

  ---
- `POST /api/transactions/sell` → Sell mutual fund
   ### 2.Sell mutual fund (POST `http://localhost:8080/api/transactions/sell`)
![image alt](https://github.com/AratiSomwanshi/mfams/blob/94e93644b17092e416f7dc83e0c447d0b89d5847/mfams/image/6_transactions_sell_User.png)


  ---
- `GET /api/transactions` → Get logged-in user’s transactions
   ### 3. View all your transactions (GET `http://localhost:8080/api/transactions`)
![image alt](https://github.com/AratiSomwanshi/mfams/blob/94e93644b17092e416f7dc83e0c447d0b89d5847/mfams/image/7_transactions_User.png)


  ---
- `GET /api/transactions/{id}` → Get one transaction
   ### 4.View a specific transaction by ID (GET `http://localhost:8080/api/transactions/{id}`)
![image alt](https://github.com/AratiSomwanshi/mfams/blob/94e93644b17092e416f7dc83e0c447d0b89d5847/mfams/image/7_transaction_id.png)

  ---



### ⏱ Scheduled Task
- Automatic NAV update daily at 12 AM using random % fluctuation

---
### ▶️ How to Run Locally
1. Clone this repo or extract the zip
2. Configure your DB in `application.properties`

src/main/resources/application.properties:
-spring.datasource.url=jdbc:mysql://localhost:3306/mfams

-spring.datasource.username=root

-spring.datasource.password=yourpassword

-spring.jpa.hibernate.ddl-auto=update


3. Run the app:./mvnw spring-boot:run
4. Use Thunder Client or Postman to test APIs
