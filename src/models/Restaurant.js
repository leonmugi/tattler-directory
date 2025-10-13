// models/Restaurant.js
import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cuisine: { type: String, index: true },
  avg_rating: { type: Number, default: 0 },
  price_level: { type: Number, default: 1 }, // 1=barato ... 4=caro (ajusta a tu escala)
  tags: { type: [String], default: [] },
  address: {
    city: { type: String, index: true }
  }
}, { timestamps: true }); // createdAt/updatedAt

// Índices para filtros y ordenamiento:
RestaurantSchema.index({ "address.city": 1 });
RestaurantSchema.index({ cuisine: 1 });
RestaurantSchema.index({ avg_rating: -1 });
RestaurantSchema.index({ price_level: 1 });
RestaurantSchema.index({ tags: 1 });
RestaurantSchema.index({ createdAt: -1 });
// Opcional para ordenar/buscar por nombre:
RestaurantSchema.index({ name: 1 });

export default mongoose.model("Restaurant", RestaurantSchema);

