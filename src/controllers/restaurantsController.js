import Restaurant from "../models/Restaurant.js";

export async function list(req, res, next) {
  try {
    const { city, cuisine, tags, name, minRating, maxPrice, page=1, limit=10 } = req.query;
    const q = {};
    if (city) q["address.city"] = city;
    if (cuisine) q.cuisine = cuisine;
    if (tags) q.tags = { $all: String(tags).split(",").map(s => s.trim()) };
    if (name) q.$text = { $search: name };
    if (minRating) q.avg_rating = { ...(q.avg_rating||{}), $gte: Number(minRating) };
    if (maxPrice) q.price_level = { ...(q.price_level||{}), $lte: Number(maxPrice) };

    const skip = (Math.max(1, +page) - 1) * Math.min(50, +limit || 10);
    const items = await Restaurant.find(q).sort({ avg_rating: -1, name: 1 }).skip(skip).limit(Math.min(50, +limit || 10));
    res.json({ page: +page, limit: +limit, count: items.length, items });
  } catch (e) { next(e); }
}

export async function getById(req, res, next) {
  try { const r = await Restaurant.findById(req.params.id); if (!r) return res.status(404).json({ error:"Not found" }); res.json(r); }
  catch (e) { next(e); }
}

export async function create(req, res, next) {
  try { const r = await Restaurant.create(req.body); res.status(201).json(r); }
  catch (e) { next(e); }
}

export async function update(req, res, next) {
  try { const r = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new:true }); if (!r) return res.status(404).json({ error:"Not found" }); res.json(r); }
  catch (e) { next(e); }
}

export async function remove(req, res, next) {
  try { const r = await Restaurant.findByIdAndDelete(req.params.id); if (!r) return res.status(404).json({ error:"Not found" }); res.json({ ok:true }); }
  catch (e) { next(e); }
}