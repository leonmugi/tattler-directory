# 🥗 Tattler Directory — Sprint 1: Database Configuration

## 📖 Project Overview
Tattler is a restaurant directory platform designed to offer users a personalized and dynamic experience.  
During **Sprint 1**, the focus was on creating and configuring the **MongoDB database** that will support future API functionality.

---

## ⚙️ Objectives
- Configure a **MongoDB** non-relational database to store restaurant and review data in JSON format.
- Import structured data from CSV files.
- Create **indexes** to optimize search and filtering.
- Generate a **backup** using `mongodump` for version control and reproducibility.

---

## 🧰 Tools Used
| Tool | Purpose |
|------|----------|
| **MongoDB Server** | Stores the project’s data. |
| **MongoDB Compass** | Graphical interface to create collections, import CSVs, and manage indexes. |
| **MongoDB Database Tools** | Provides the `mongodump` and `mongorestore` utilities for database backup and restore. |
| **Node.js / npm** | Used to initialize the Express backend structure for later sprints. |
| **Git & GitHub** | Version control and project delivery. |

---

## 🗂️ Project Structure

tattler-directory/
│
├─ src/ # Will contain Express app files (Sprint 2)
│ ├─ app.js
│ ├─ routes/
│ ├─ controllers/
│ ├─ models/
│ └─ db/
│
├─ data/ # CSV files used to import data into MongoDB
│
├─ backup/ # MongoDB backup generated with mongodump
│ └─ tattler/
│ ├─ restaurants.bson
│ ├─ restaurants.metadata.json
│ ├─ reviews.bson
│ └─ reviews.metadata.json
│
├─ docs/ # Screenshots and evidence of Sprint 1
│
├─ scripts/ # Optional import or seed scripts
│
├─ .env # Environment variables (PORT, MONGODB_URI)
│
├─ package.json
├─ package-lock.json
└─ README.md


---

## 🍽️ MongoDB Database Configuration

### Database: `tattler`
**Collections:**
- `restaurants`
- `reviews`

### Indexes in `restaurants`
| Field | Type | Purpose |
|-------|------|----------|
| `name` | Text | Text search by restaurant name |
| `tags` | Regular | Filter by category/tag |
| `address.city` | Regular | Filter by city |
| `cuisine` | Regular | Filter by cuisine type |
| `avg_rating` | Regular | Sort by rating |
| `price_level` | Regular | Filter by price |

---

## 📊 Data Import Process
1. Created CSV files (`restaurants.csv` and `reviews.csv`) inside `/data`.
2. Used **MongoDB Compass → Import Data → CSV** to populate both collections.
3. Validated that all documents and indexes appear as `READY`.

---

## 💾 Database Backup

To ensure data reproducibility, a complete backup was generated using the **mongodump** tool:

### Command used:
```bash
"C:\Program Files\MongoDB\Tools\100\bin\mongodump.exe" --db=tattler --out="C:\Users\leonm\Documents\TECHNOREADY\CHALLENGE 4\CHALLENGE 4 REP\tattler-directory\backup"

Resulting folder:
	
backup/
 └─ tattler/
     ├─ restaurants.bson
     ├─ restaurants.metadata.json
     ├─ reviews.bson
     └─ reviews.metadata.json
```
To restore the backup:

mongorestore --db=tattler "backup\tattler"

### 🧠 Lessons Learned

How to manage a non-relational database in JSON format using MongoDB.

The importance of indexes to optimize search and query performance.

How to use mongodump and mongorestore for versioned backups.

Setting up a clean and scalable folder structure to integrate Express.js in later sprints.




### 🧩 Versioning

Version 1.0.0 — Sprint 1 deliverable


