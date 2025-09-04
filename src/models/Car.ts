import mongoose, { Schema, Document, model, models } from "mongoose";

export interface ICar extends Document {
  title: string;
  catch: string;
  description: string;
  cover_image: string;
  additional_images: string[];
  make: string;
  year: number;
  fuel: string;
  mileage: number;
  transmission: string;
  price: number;
}

const CarSchema = new Schema<ICar>(
  {
    title: { type: String, required: true },
    catch: { type: String, required: true },
    description: { type: String, default: "" },
    cover_image: { type: String, default: "" },
    additional_images: { type: [String], default: [] },
    make: { type: String, required: true },
    year: { type: Number, required: true },
    fuel: { type: String, required: true },
    mileage: { type: Number, required: true },
    transmission: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

// Avoid recompilation errors in Next.js hot reload
export const Car = models.Car || model<ICar>("Car", CarSchema);
