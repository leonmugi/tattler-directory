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



# 🍽️ Tattler Directory — **Sprint 3: API Develop**

## 1) Project Description

**Tattler Directory** is a REST API for a nationwide restaurant catalog. It lets clients:

- Create / Read / Update / Delete restaurants
- **Search** with free text (`q`) across main fields
- **Filter** by city, cuisine, minimum rating, maximum price, and tags
- **Sort** results (`sortBy`, `order`)
- **Paginate** results with `page` / `limit`
- **Monitor** service health via `GET /health`

This API addresses the challenge of keeping the directory current and relevant so end-users can discover places that match their preferences. It’s built with **MongoDB** (documents + indexes for fast queries) and **Express.js** (clean routing, MVC-style separation).

## 2) Installation & Usage Instructions

### 2.1 Requirements
- Node.js ≥ 18  
- MongoDB (Atlas or local)  
- Git

---

### 2.2 Quick Start

```bash
# 1) Clone
git clone <your-repo-url>
cd tattler-directory

# 2) Install deps
npm install

# 3) Environment
cp .env.example .env
# then edit .env with your Mongo URI and PORT

# 4) (Optional) Seed minimal sample data
npm run seed

# 5) Run (dev)
npm run dev
# API running on http://localhost:3000
```
# .env example

```bash
PORT=3000
MONGO_URI=mongodb://localhost:27017/tattler
NODE_ENV=development
CORS_ORIGIN=*
````
### 2.3 Base URL

```bash
http://localhost:3000
`````

In production, replace with your deployed host (e.g., https://api.tattler.mx).

### 2.4 Authentication

Not required for the challenge scope.



#### Health
**GET** `/health`

**200 OK**
```json
{ "status": "ok", "uptime": 123.45, "version": "1.0.0" }
````

#### List restaurants (search, filter, sort, paginate)
**GET** `/api/restaurants`

**Query parameters**

| Param       | Type   | Description                                                                                   |
|-------------|--------|-----------------------------------------------------------------------------------------------|
| `q`         | string | Free-text search in `name`, `cuisine`, `tags`, and `address.city` (case-insensitive).        |
| `city`      | string | Exact city match (case-insensitive).                                                          |
| `cuisine`   | string | Exact cuisine match (case-insensitive).                                                       |
| `minRating` | number | Minimum average rating (`avg_rating >= minRating`).                                           |
| `maxPrice`  | number | Maximum price level (`price_level <= maxPrice`).                                              |
| `tags`      | CSV    | One or multiple tags. Example: `tags=ramen,noodles`.                                          |
| `sortBy`    | enum   | `name` \| `avg_rating` \| `price_level` \| `createdAt` (default: `createdAt`).                |
| `order`     | enum   | `asc` \| `desc` (default: `desc`).                                                             |
| `page`      | number | Page number, 1-based (default: `1`).                                                          |
| `limit`     | number | Page size (default: `10`, max `100`).                                                         |

**Example requests**

```bash
# Free text
curl "http://localhost:3000/api/restaurants?q=ramen"

# City + minimum rating
curl "http://localhost:3000/api/restaurants?city=Toluca&minRating=4"

# Sort by rating (desc)
curl "http://localhost:3000/api/restaurants?sortBy=avg_rating&order=desc"

# Price ceiling + sort by price (asc)
curl "http://localhost:3000/api/restaurants?maxPrice=2&sortBy=price_level&order=asc"

# Pagination
curl "http://localhost:3000/api/restaurants?page=2&limit=10"

# Multi-tag filtering
curl "http://localhost:3000/api/restaurants?tags=ramen,noodles"
````
**Example response**
```json
{
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 37,
    "pages": 4,
    "sortBy": "avg_rating",
    "order": "desc"
  },
  "data": [
    {
      "_id": "68e0...",
      "name": "Ramen Kazu",
      "cuisine": "Japanese",
      "avg_rating": 4.7,
      "price_level": 2,
      "tags": ["ramen", "noodles"],
      "address": { "city": "CDMX", "state": "CDMX", "zip": "06000" },
      "createdAt": "2025-10-01T12:34:56.000Z"
    }
  ]
}
````
Notes

Search uses case-insensitive regex for partial matches.

Filtering and sorting are combined via an aggregation pipeline: $match → $sort → $facet (with $skip/$limit for pagination).

### CRUD

**Endpoints**

POST /api/restaurants
GET /api/restaurants/:id
PATCH /api/restaurants/:id
DELETE /api/restaurants/:id


**Restaurant schema (simplified)**
```ts
{
  name: string,
  cuisine: string,
  avg_rating: number,     // 0..5
  price_level: number,    // 1..4
  tags: string[],
  address: {
    city: string,
    state?: string,
    zip?: string,
    coords?: { lat: number, lng: number }
  },
  createdAt: ISODate,
  updatedAt: ISODate
}
```
Status codes

200 / 201 — success
400 — validation error
404 — not found
500 — server error

### 2.6 Postman / Insomnia Evidence

- **Collection (export v2.1):** `tests/postman/collection_s3.json`
- **Screenshots:**
  - `tests/postman/screens/01_q.png`
  - `tests/postman/screens/02_city_minRating.png`
  - `tests/postman/screens/03_sort_rating_desc.png`
  - `tests/postman/screens/04_sort_price_asc.png`
  - `tests/postman/screens/05_page2_limit10.png`
  - `tests/postman/screens/06_tags_multi.png`

Each screenshot includes the **URL + query params**, **200 OK** status, the **`meta`** object, and the **relevant fields in `data`** for that scenario.

### 2.7 Indexes (Performance)

Created on the collection to support search, filters, and sorting:

- `address.city` (1)
- `cuisine` (1)
- `avg_rating` (-1)
- `price_level` (1)
- `tags` (1)
- `createdAt` (-1)
- `name` (1)

These indexes align with the fields used by `city`, `cuisine`, `minRating`, `maxPrice`, `tags`, and the `sortBy` options to ensure fast lookups and stable sorting.

### 2.8 Troubleshooting

- **500 “$elemMatch needs an Object”**  
  Don’t use `$elemMatch` with a raw `RegExp` on arrays. Use `tags: /…/i` (regex directly on the array of strings).

- **Empty results**  
  Check your data and query params (note: `city` is exact match, case-insensitive; `q` is partial/regex).

- **Mongo connection issues**  
  Verify `MONGO_URI` in `.env` and confirm MongoDB is reachable.

- **Port conflicts**  
  Change `PORT` in `.env` if `3000` is already in use.

### 2.9 Scripts

**package.json**
```json
{
  "scripts": {
    "dev": "nodemon src/app.js",
    "start": "node src/app.js",
    "seed": "node scripts/seed.js"
  }
}
```

## 3) Repository Structure

```
tattler-directory/
├─ src/
│  ├─ app.js                 # Express app bootstrap (routes, middlewares, CORS)
│  ├─ routes/
│  │  └─ restaurants.js      # GET with search/filter/sort/pagination + CRUD
│  ├─ models/
│  │  └─ Restaurant.js       # Mongoose schema + indexes
│  ├─ db/
│  │  └─ mongo.js            # Mongoose connect (loaded at startup)
│  ├─ middlewares/
│  │  └─ error.js            # Centralized error handling (optional)
│  └─ utils/
│     └─ validate.js         # Param parsing/validation (optional)
├─ scripts/
│  └─ seed.js                # Sample data loader (optional)
├─ tests/
│  └─ postman/
│     ├─ collection_s3.json
│     └─ screens/            # 01_q.png ... 06_tags_multi.png
├─ .env.example
├─ README.md
├─ package.json
└─ LICENSE
```

### Database Desktop Tool (evidence)

I used **MongoDB Compass** to connect to the project database, browse collections, and validate queries during development. In Compass I verified the connection (using my `.env` connection string), inspected documents to confirm schema consistency (`name`, `cuisine`, `avg_rating`, `price_level`, `tags`, `address.city`), and executed ad-hoc queries (by `city`, `cuisine`, and rating ranges) to cross-check the same filters exposed by the API. I also reviewed the **Indexes** tab to confirm that the indexes defined in the model (`address.city`, `cuisine`, `avg_rating`, `price_level`, `tags`, `createdAt`, `name`) were created and aligned with the search/sort patterns. For the purposes of this challenge, Compass serves as a **drop-in alternative to Studio 3T**: it provides equivalent capabilities for connection, data exploration, query testing, and index inspection—therefore it fully satisfies the desktop-tool requirement.

**Evidence (screenshots in `tests/compass/`):**
- `01_connect.png` — successful connection to the database  
- `02_browse_collection.png` — collection view showing example documents and fields  
- `03_query_city_rating.png` — query by `address.city` and `avg_rating` demonstrating expected matches  
- `04_indexes.png` — index list confirming the fields used for filtering and sorting

## ⏱️ Time Budget (Updated with Sprint 3)

### Sprint 3 only
| Activity                                                     | Hours | Rate (MXN/h) |   Cost (MXN) |
|--------------------------------------------------------------|:-----:|:------------:|-------------:|
| Branch setup + checklist (`s3-search-sort`)                  |  0.3  |     250      |         75   |
| Model refresh & new indexes (`name`, `createdAt`, etc.)      |  0.7  |     250      |        175   |
| Search/Filter/Sort endpoint (Aggregation Pipeline)           |  2.0  |     250      |        500   |
| Query param parsing & error handling (validation basics)     |  0.5  |     250      |        125   |
| Postman tests (6–8 reqs) + collection export                 |  1.0  |     250      |        250   |
| Evidence screenshots (responses & meta)                      |  0.5  |     250      |        125   |
| README “Search & Sort v2” (usage examples & params)          |  0.8  |     250      |        200   |
| MongoDB Compass evidence + README note (alt. to Studio 3T)   |  0.4  |     250      |        100   |
| Pull Request + add collaborators                              |  0.3  |     250      |         75   |
| **Total Sprint 3**                                           | **6.5** |      —       |   **1,625**  |

### Cumulative (Sprint 2 + Sprint 3)
| Period    | Hours | Cost (MXN) |
|-----------|:-----:|-----------:|
| Sprint 2  |  8.5  |     2,125  |
| Sprint 3  |  6.5  |     1,625  |
| **Total** | **15.0** | **3,750** |

## 📈 Scalability (Grow Without Pain) — Updated

- **Queries & Data:** Use compound indexes for frequent filters/sorts (`address.city`, `cuisine`, `avg_rating`, `price_level`, `tags`, `createdAt`, `name`). Keep pagination **capped (≤ 100)** to protect memory/CPU.
- **Search:** For richer text search at scale, consider a **text index** or **Atlas Search** (analyzers, scoring) instead of regex.
- **Sorting at scale:** Ensure sort fields are indexed; when sorting by low-selectivity fields, add a tiebreaker (e.g., `_id`) for stable cursors.
- **Pagination:** Consider **cursor-based** pagination for deep scrolling; current `$skip/$limit` is fine for moderate pages.
- **Traffic:** Add **rate limiting** + **request timeouts**; cache hot queries (in-memory/Redis) with short TTLs.
- **API Contract:** Publish **OpenAPI/Swagger**; version endpoints (`/v1`) to evolve safely.
- **Infra:** Prefer **MongoDB Atlas** (replicas, backups); scale the API horizontally behind a load balancer.

---

## ♻️ Sustainability (Maintenance, Cost, Good Practices) — Updated

- **Maintainability:** MVC routing, thin controllers, shared utils for param parsing; centralized error handler; keep `.env.example` in repo.
- **Quality & Security:** Add schema validation (**Zod/Joi**) and tests (**Jest/Supertest**); restrict **CORS** in prod; logging with **Winston**; basic write audit logs.
- **Cost control:** Start on free/local tiers and scale based on metrics. Archive stale records; return only needed fields via `$project`.
- **DX & Ops:** **Prettier/ESLint**, Husky pre-commit hooks, and a lightweight CI (lint + test) to prevent regressions.



## 🏁 Versioning

**Version 3.0.0 — Sprint 2 deliverable** *(builds on Sprint 1 database work)*

