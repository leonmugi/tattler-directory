// src/routes/restaurants.js
import express from "express";
import Restaurant from "../models/Restaurant.js";

const router = express.Router();

// Utilidad para regex seguro (evita inyecciones en patrones)
const escapeRegex = (s = "") => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

router.get("/", async (req, res) => {
  try {
    const {
      q,                // texto libre: name, cuisine, tags
      city,
      cuisine,
      minRating,
      maxPrice,
      tags,             // CSV: "takeout,casual"
      sortBy,           // name | avg_rating | price_level | createdAt
      order,            // asc | desc
      page = 1,
      limit = 10
    } = req.query;

    const pageNum  = Math.max(parseInt(page, 10) || 1, 1);
    const limitNum = Math.min(Math.max(parseInt(limit, 10) || 10, 1), 100);

// --- MATCH dinámico ---
const match = {};

if (q && q.trim()) {
  const rx = new RegExp(escapeRegex(q.trim()), "i");
  match.$or = [
    { name: rx },
    { cuisine: rx },
    { tags: rx } // <-- antes estaba $elemMatch; cámbialo por regex directo
  ];
}
    if (city && city.trim()) {
      match["address.city"] = new RegExp(`^${escapeRegex(city.trim())}$`, "i");
    }
    if (cuisine && cuisine.trim()) {
      match.cuisine = new RegExp(`^${escapeRegex(cuisine.trim())}$`, "i");
    }
    if (minRating !== undefined) {
      match.avg_rating = { ...(match.avg_rating || {}), $gte: Number(minRating) };
    }
    if (maxPrice !== undefined) {
      match.price_level = { ...(match.price_level || {}), $lte: Number(maxPrice) };
    }
    if (tags && tags.trim()) {
      const arr = tags.split(",").map(s => s.trim()).filter(Boolean);
      if (arr.length) match.tags = { $in: arr };
    }

    // --- SORT ---
    const allowedSort = {
      name: "name",
      avg_rating: "avg_rating",
      price_level: "price_level",
      createdAt: "createdAt"
    };
    const sortField = allowedSort[sortBy] || "createdAt";
    const sortOrder = (order === "asc") ? 1 : -1;

    // --- PIPELINE con facet para total + data paginada ---
    const pipeline = [
      { $match: match },
      { $sort: { [sortField]: sortOrder, _id: 1 } }, // _id para desempate estable
      {
        $facet: {
          data: [
            { $skip: (pageNum - 1) * limitNum },
            { $limit: limitNum },
            {
              $project: {
                _id: 1, name: 1, cuisine: 1, avg_rating: 1, price_level: 1,
                tags: 1, address: 1, createdAt: 1
              }
            }
          ],
          total: [{ $count: "count" }]
        }
      }
    ];

    const result = await Restaurant.aggregate(pipeline);
    const data = result?.[0]?.data || [];
    const total = result?.[0]?.total?.[0]?.count || 0;
    const pages = Math.max(Math.ceil(total / limitNum), 1);

    res.json({
      meta: { page: pageNum, limit: limitNum, total, pages, sortBy: sortField, order: sortOrder === 1 ? "asc" : "desc" },
      data
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
