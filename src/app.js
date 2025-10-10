import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectMongo } from "./db/mongo.js";
import restaurantRoutes from "./routes/restaurants.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok:true, env: process.env.NODE_ENV || "dev" }));
app.use("/api/restaurants", restaurantRoutes);

app.use((err, _req, res, _next) => res.status(err.status || 500).json({ error: err.message || "Unexpected error" }));

const port = process.env.PORT || 3000;
connectMongo(process.env.MONGODB_URI)
  .then(() => app.listen(port, () => console.log(`API running on http://localhost:${port}`)))
  .catch(e => { console.error("Mongo error:", e.message); process.exit(1); });

export default app;
