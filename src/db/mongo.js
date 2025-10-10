import mongoose from "mongoose";

export async function connectMongo(uri) {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
  console.log("Mongo conectado:", mongoose.connection.name);
}
export default mongoose;
