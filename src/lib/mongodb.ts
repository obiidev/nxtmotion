import mongoose from "mongoose";

const CONNECTION_STRING = process.env.CONNECTION_STRING;

if (!CONNECTION_STRING) {
  throw new Error("Please define the CONNECTION_STRING environment variable");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    // TypeScript weet nu dat CONNECTION_STRING niet undefined is
    cached.promise = mongoose.connect(CONNECTION_STRING!).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}