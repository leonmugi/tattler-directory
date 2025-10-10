import mongoose from "../db/mongo.js";

const RestaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    cuisine: { type: String, index: true },
    address: { street: String, city: { type: String, index: true }, state: String, country: String },
    avg_rating: { type: Number, min: 0, max: 5, default: 0 },
    price_level: { type: Number, min: 1, max: 4 },
    tags: [String]
  },
  { timestamps: true }
);

RestaurantSchema.index({ name: "text" });
RestaurantSchema.index({ tags: 1 });
RestaurantSchema.index({ "address.city": 1, cuisine: 1 });
RestaurantSchema.index({ avg_rating: -1 });
RestaurantSchema.index({ price_level: 1 });

export default mongoose.model("Restaurant", RestaurantSchema);

