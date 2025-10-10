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


# 🍽️ Tattler Directory — **Sprint 2: API Develop**

## 🚀 Project Goal 
Build a small online service (**API**) that stores restaurant records and lets any website or app **create**, **view**, **update**, **delete**, and **search** them.  
*Analogy:* the API is the **kitchen** that prepares data; apps are the **waiters** that serve it.

---

## 🧭 High-Level Structure
- **Front door (Routes):** Where requests arrive (e.g., “show restaurants in Toluca”).
- **Clerks (Controllers):** Interpret each request and decide the action.
- **Back room (Database):** Where the records live.
- **Utilities (Config):** Simple settings like DB address and port.
- **Proof (Tests & Screenshots):** Evidence the service works.

> No code reading is needed—folders are named by responsibility.

---

## ▶️ How to Run 
1. Install the usual tools: **Node** and **MongoDB**.
2. Add two settings to a `.env` file:
   - `MONGODB_URI` → where the database is (local machine).
   - `PORT` → which door the service uses (default **3000**).
3. Start the service. A tiny status page confirms it’s alive:

```txt
GET /health  →  { "ok": true, "env": "dev" }
```

## 🔌 Database Connection — *What & Why*

We use **MongoDB**, a flexible, document-style database (each restaurant is one document).  
The app opens **one clean connection** on start. If the DB isn’t reachable, it **fails fast** with a clear message to avoid silent errors or bad data.

---

## ❤️ Health Check 

**Visit:**
```http
GET /health
{ "ok": true, "env": "dev" }
```
## 🗂️ Restaurant Data We Store

- **Name** (e.g., “Tattler Burgers”)
- **Cuisine** (Burgers, Ramen, …)
- **Address**
  - **Street**
  - **City**
  - **State**
  - **Country**
- **Average rating** (0–5)
- **Price level** (1–4)
- **Tags** (e.g., `takeout`, `casual`)

> **Performance note:** We added **indexes** (like a book index) so searches by **city**, **cuisine**, **tags**, **rating**, and **price** remain fast as the dataset grows.

## 🔧 What the Service Can Do

- **Create** a restaurant (new listing)
- **Read** a restaurant (details)
- **Update** a restaurant (e.g., rating or tags)
- **Delete** a restaurant (remove from directory)
- **Search & filter** (e.g., city + minimum rating)
- **Pagination** (return results in pages for speed)

> **Business value:** The minimal set of capabilities to keep the directory accurate and searchable across channels.

---

## 🧪 How We Tested It (Postman)

**Postman** is a point-and-click tool to exercise the API like an app would.  
Our test **collection** (playlist) verifies:

1. **Health** → `/health` is alive  
2. **Create** → add a restaurant and receive its **ID**  
3. **Read** → fetch that restaurant by **ID**  
4. **Update** → change the rating and see the update  
5. **List** → filter by city + min rating  
6. **Delete** → remove it and get a clear confirmation

**Exported collection path:**
```text
tests/TattlerAPI.postman_collection.json
```
Screenshots (green checks) are stored at:
```
tests/screenshots/
```
## 📲 How Someone Would Use It (Real Life)

- **Discover screen:** “Show restaurants in **Toluca** with **4+ stars**.”
- **Detail page:** “Give me the info for **restaurant #123**.”
- **Backoffice edit:** “**Update** rating for **#123** to **4.9**.”
- **Closure:** “**Delete #123**,” and it disappears from search.

---

## 🤝 Access & Collaboration

- Repository is **shared/public**; reviewers added via **GitHub → Settings → Collaborators**.
- The **Postman collection** and **evidence (screenshots)** live under:
  - `tests/TattlerAPI.postman_collection.json`
  - `tests/screenshots/`

## ⏱️ Time Budget (Actual Effort & Cost)

> **Rate:** MXN **$250/hour**

| Activity                                              | Hours | Rate (MXN/h) | Cost (MXN) |
|-------------------------------------------------------|:-----:|:------------:|-----------:|
| Project setup (npm, scripts, .env)                    | 1.0   | 250          | **250**    |
| Mongo connection (`db/mongo.js`)                      | 0.8   | 250          | **200**    |
| Model & indexes (Restaurant)                          | 1.0   | 250          | **250**    |
| Controller & routes (CRUD + filters/pagination)       | 2.5   | 250          | **625**    |
| Postman tests & collection export                     | 1.5   | 250          | **375**    |
| Evidence (screenshots) + export                       | 0.5   | 250          | **125**    |
| README / Sprint 2 documentation                       | 1.2   | 250          | **300**    |
| **Total**                                             | **8.5** | —          | **2,125**  |

## 📈 Scalability (Grow Without Pain)

- **Data & queries:** Indexes + capped pagination (≤ **50**) keep responses quick.
- **Very large datasets:** Consider **MongoDB sharding** (e.g., by `address.city` or `cuisine`).
- **Infrastructure:** Move to **MongoDB Atlas** (replicas, automated backups).
- **Traffic:** Scale the API **horizontally** behind a load balancer (NGINX / cloud).
- **Codebase:** MVC-style structure, middlewares, schema validation (**Zod/Joi**), automated tests (**Jest/Supertest**), and per-environment config.

---

## ♻️ Sustainability (Maintenance, Cost, Good Practices)

- **Maintainability:** Modular code, thin controllers, centralized error handling; `.env.example` documented; **ESLint + Prettier** for consistency.
- **Cost control:** Local dev or free/shared tiers; scale only when metrics demand it; **TTL/archival** for stale data.
- **Quality & security:** Validate payloads; restrict **CORS** in production; backups if self-hosted; logs/metrics (**Winston / Datadog**) for performance & issues.
- **Delivery impact:** Reusable endpoints across web/mobile; clear docs reduce rework and speed onboarding.

---

## 🌿 Environmental Sustainability (Greener by Design)

- **Efficient queries = less compute:** Indexes + pagination cut CPU time and energy.
- **Right-sized hosting:** Prefer shared/low-power tiers; scale only with real usage.
- **Auto-sleep for dev/test:** Stop idle services outside work hours.
- **Compact responses:** Return only needed fields and enable **compression** to reduce bandwidth (and carbon).
- **Data lifecycle:** Archive/delete stale records to avoid energy/storage overhead from backups/replication.
- **Tune, don’t over-provision:** Use observability to optimize instead of adding unnecessary hardware.

---

## 🧠 Lessons Learned & Pitfalls

- **Postman environments:** Define and select `baseUrl`, or you’ll get **ENOTFOUND**.
- **Desktop Agent for localhost:** Required to reach `http://localhost`.
- **Windows extensions:** Ensure files are real `.js` (not hidden `.js.txt`).
- **Startup clarity:** Fail fast on DB connection issues to avoid “half-running” services.

---

## 🏁 Versioning

**Version 2.0.0 — Sprint 2 deliverable** *(builds on Sprint 1 database work)*


