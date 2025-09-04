import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";
import { Car } from "@/models/Car";
import mongoose from "mongoose";

const API_KEY = process.env.API_KEY;

function validateApiKey(request: Request) {
  const apiKey = request.headers.get("x-api-key");
  return apiKey === API_KEY;
}

function corsResponse(body: any, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, x-api-key",
    },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}

// ---- GET ----
export async function GET(request: Request) {
  if (!validateApiKey(request)) return corsResponse({ message: "Unauthorized" }, 401);
  try {
    await connectToDatabase();
    const cars = await Car.find().lean();
    const sanitized = cars.map((c) => ({
      ...c,
      cover_image: c.cover_image || "",
      additional_images: Array.isArray(c.additional_images) ? c.additional_images : [],
    }));
    return corsResponse(sanitized);
  } catch (error) {
    console.error(error);
    return corsResponse({ message: "Failed to load cars" }, 500);
  }
}

// ---- POST ----
export async function POST(request: Request) {
  if (!validateApiKey(request)) return corsResponse({ message: "Unauthorized" }, 401);

  try {
    await connectToDatabase();
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data"))
      return corsResponse({ message: "Invalid content type" }, 400);

    const formData = await request.formData();
    const coverFile = formData.get("cover_image") as File;
    const additionalFiles = formData.getAll("additional_images") as File[];

    const title = formData.get("title") as string;
    const catchPhrase = formData.get("catch") as string;
    const description = (formData.get("description") as string) || "";
    const make = formData.get("make") as string;
    const year = Number(formData.get("year"));
    const fuel = formData.get("fuel") as string;
    const mileage = Number(formData.get("mileage"));
    const transmission = formData.get("transmission") as string;
    const price = Number(formData.get("price"));

    // Create car first to get MongoDB _id for Cloudinary folder
    const newCar = new Car({ title, catch: catchPhrase, description, make, year, fuel, mileage, transmission, price });
    await newCar.save();
    const folder = `cars/${newCar._id}`;

    // Upload cover
    if (coverFile && coverFile.name) {
      const buffer = Buffer.from(await coverFile.arrayBuffer());
      newCar.cover_image = await new Promise<string>((resolve, reject) => {
        const upload = cloudinary.uploader.upload_stream(
          { folder, public_id: "cover" },
          (err, result) => (err ? reject(err) : resolve(result?.secure_url || ""))
        );
        upload.end(buffer);
      });
    }

    // Upload additional images
    const uploaded: string[] = [];
    for (let i = 0; i < additionalFiles.length; i++) {
      const file = additionalFiles[i];
      if (!file || !file.name) continue;
      const buffer = Buffer.from(await file.arrayBuffer());
      const url = await new Promise<string>((resolve, reject) => {
        const upload = cloudinary.uploader.upload_stream(
          { folder, public_id: `additional_${i + 1}` },
          (err, result) => (err ? reject(err) : resolve(result?.secure_url || ""))
        );
        upload.end(buffer);
      });
      uploaded.push(url);
    }
    newCar.additional_images = uploaded;
    await newCar.save();

    return corsResponse(newCar, 201);
  } catch (error) {
    console.error(error);
    return corsResponse({ message: "Failed to add car" }, 500);
  }
}

// ---- PUT ----
export async function PUT(request: Request) {
  if (!validateApiKey(request)) return corsResponse({ message: "Unauthorized" }, 401);

  try {
    await connectToDatabase();
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data"))
      return corsResponse({ message: "Invalid content type" }, 400);

    const formData = await request.formData();
    const id = formData.get("id") as string;
    if (!id) return corsResponse({ message: "Missing car id" }, 400);

    const car = await Car.findById(id);
    if (!car) return corsResponse({ message: "Car not found" }, 404);

    const folder = `cars/${id}`;

    // Text fields
    car.title = formData.get("title") as string || car.title;
    car.catch = formData.get("catch") as string || car.catch;
    car.description = (formData.get("description") as string) || car.description;
    car.make = formData.get("make") as string || car.make;
    car.year = Number(formData.get("year")) || car.year;
    car.fuel = formData.get("fuel") as string || car.fuel;
    car.mileage = Number(formData.get("mileage")) || car.mileage;
    car.transmission = formData.get("transmission") as string || car.transmission;
    car.price = Number(formData.get("price")) || car.price;

    // Cover image replacement
    const coverFile = formData.get("cover_image") as File;
    if (coverFile && coverFile.name) {
      const buffer = Buffer.from(await coverFile.arrayBuffer());
      car.cover_image = await new Promise<string>((resolve, reject) => {
        const upload = cloudinary.uploader.upload_stream(
          { folder, public_id: "cover" },
          (err, result) => (err ? reject(err) : resolve(result?.secure_url || ""))
        );
        upload.end(buffer);
      });
    }

    // Additional images replacement
    const additionalFiles = formData.getAll("additional_images") as File[];
    if (additionalFiles.length > 0) {
      // Delete old additional images
      await cloudinary.api.delete_resources_by_prefix(`${folder}/additional_`);
      const uploaded: string[] = [];
      for (let i = 0; i < additionalFiles.length; i++) {
        const file = additionalFiles[i];
        if (!file || !file.name) continue;
        const buffer = Buffer.from(await file.arrayBuffer());
        const url = await new Promise<string>((resolve, reject) => {
          const upload = cloudinary.uploader.upload_stream(
            { folder, public_id: `additional_${i + 1}` },
            (err, result) => (err ? reject(err) : resolve(result?.secure_url || ""))
          );
          upload.end(buffer);
        });
        uploaded.push(url);
      }
      car.additional_images = uploaded;
    }

    await car.save();
    return corsResponse(car);
  } catch (error) {
    console.error(error);
    return corsResponse({ message: "Failed to update car" }, 500);
  }
}

// Delete
export async function DELETE(request: Request) {
  if (!validateApiKey(request))
    return corsResponse({ message: "Unauthorized" }, 401);

  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) return corsResponse({ message: "Missing id" }, 400);
    if (!mongoose.Types.ObjectId.isValid(id))
      return corsResponse({ message: "Invalid car id" }, 400);

    const car = await Car.findById(id);
    if (!car) return corsResponse({ message: "Car not found" }, 404);

    await Car.deleteOne({ _id: id });

    const folder = `cars/${id}`;
    await cloudinary.api.delete_resources_by_prefix(folder);
    await cloudinary.api.delete_folder(folder);

    return corsResponse({ message: "Car and images deleted" });
  } catch (error) {
    console.error(error);
    return corsResponse({ message: "Failed to delete car" }, 500);
  }
}

