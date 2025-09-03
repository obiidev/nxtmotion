import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import cloudinary from "@/lib/cloudinary";


const filePath = path.join(process.cwd(), "src", "data", "cars.json");
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
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, x-api-key",
    },
  });
}

export async function GET(request: Request) {
  if (!validateApiKey(request)) {
    return corsResponse({ message: "Unauthorized" }, 401);
  }

  try {
    const data = await fs.readFile(filePath, "utf-8");
    const cars = JSON.parse(data);

    // Ensure each car has arrays and strings for images (robust)
    const sanitizedCars = cars.map((car: any) => ({
      ...car,
      cover_image: car.cover_image || "",
      additional_images: Array.isArray(car.additional_images)
        ? car.additional_images
        : [],
    }));

    return corsResponse(sanitizedCars, 200);
  } catch (error) {
    console.error("GET /api/cars error:", error);
    return corsResponse({ message: "Failed to load cars" }, 500);
  }
}


export async function POST(request: Request) {
  if (!validateApiKey(request)) {
    return corsResponse({ message: "Unauthorized" }, 401);
  }

  const contentType = request.headers.get("content-type") || "";

  try {
    let newCar;

    // Read existing cars to get new ID
    const data = await fs.readFile(filePath, "utf-8");
    const cars = JSON.parse(data);
    const newId = cars.length
      ? Math.max(...cars.map((car: any) => car.id)) + 1
      : 1;

    if (contentType.includes("multipart/form-data")) {
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

      // Use per-car folder in Cloudinary
      const carFolder = `cars/${newId}`;

      // ---- Upload cover image ----
      let cover_image = "";
      if (coverFile && coverFile.name) {
        const buffer = Buffer.from(await coverFile.arrayBuffer());
        cover_image = await new Promise<string>((resolve, reject) => {
          const upload = cloudinary.uploader.upload_stream(
            { folder: carFolder, public_id: "cover" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result?.secure_url || "");
            }
          );
          upload.end(buffer);
        });
      }

      // ---- Upload additional images ----
      let additional_images: string[] = [];
      for (let i = 0; i < additionalFiles.length; i++) {
        const file = additionalFiles[i];
        if (file && file.name) {
          const buffer = Buffer.from(await file.arrayBuffer());
          const url = await new Promise<string>((resolve, reject) => {
            const upload = cloudinary.uploader.upload_stream(
              { folder: carFolder, public_id: `additional_${i + 1}` },
              (error, result) => {
                if (error) reject(error);
                else resolve(result?.secure_url || "");
              }
            );
            upload.end(buffer);
          });
          additional_images.push(url);
        }
      }

      newCar = {
        id: newId,
        title,
        catch: catchPhrase,
        description,
        cover_image,
        additional_images,
        make,
        year,
        fuel,
        mileage,
        transmission,
        price,
      };
    } else {
      const body = await request.json();
      newCar = {
        id: newId,
        ...body,
        cover_image: body.cover_image || "",
        additional_images: body.additional_images || [],
      };
    }

    // ---- Save new car to cars.json ----
    cars.push(newCar);
    await fs.writeFile(filePath, JSON.stringify(cars, null, 2), "utf-8");

    return corsResponse(newCar, 201);
  } catch (error) {
    console.error(error);
    return corsResponse({ message: "Failed to add car" }, 500);
  }
}

export async function PUT(request: Request) {
  if (!validateApiKey(request)) {
    return corsResponse({ message: "Unauthorized" }, 401);
  }

  const contentType = request.headers.get("content-type") || "";

  try {
    let updatedCar;

    // Read current cars
    const data = await fs.readFile(filePath, "utf-8");
    const cars = JSON.parse(data);

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const coverFile = formData.get("cover_image") as File;
      const additionalFiles = formData.getAll("additional_images") as File[];

      const id = Number(formData.get("id"));
      const index = cars.findIndex((car: any) => car.id === id);
      if (index === -1) return corsResponse({ message: "Car not found" }, 404);

      const title = formData.get("title") as string;
      const catchPhrase = formData.get("catch") as string;
      const description = (formData.get("description") as string) || "";
      const make = formData.get("make") as string;
      const year = Number(formData.get("year"));
      const fuel = formData.get("fuel") as string;
      const mileage = Number(formData.get("mileage"));
      const transmission = formData.get("transmission") as string;
      const price = Number(formData.get("price"));

      const carFolder = `cars/${id}`;

      // ---- Cover image ----
      let cover_image = cars[index].cover_image;
      if (coverFile && coverFile.name) {
        const buffer = Buffer.from(await coverFile.arrayBuffer());
        cover_image = await new Promise<string>((resolve, reject) => {
          const upload = cloudinary.uploader.upload_stream(
            { folder: carFolder, public_id: "cover" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result?.secure_url || "");
            }
          );
          upload.end(buffer);
        });
      }

      // ---- Additional images ----
      let additional_images = cars[index].additional_images;
      if (additionalFiles.length > 0) {
        // Delete old additional images
        await cloudinary.api.delete_resources_by_prefix(`${carFolder}/additional_`);

        additional_images = [];
        for (let i = 0; i < additionalFiles.length; i++) {
          const file = additionalFiles[i];
          if (file && file.name) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const url = await new Promise<string>((resolve, reject) => {
              const upload = cloudinary.uploader.upload_stream(
                { folder: carFolder, public_id: `additional_${i + 1}` },
                (error, result) => {
                  if (error) reject(error);
                  else resolve(result?.secure_url || "");
                }
              );
              upload.end(buffer);
            });
            additional_images.push(url);
          }
        }
      }

      updatedCar = {
        id,
        title,
        catch: catchPhrase,
        description,
        cover_image,
        additional_images,
        make,
        year,
        fuel,
        mileage,
        transmission,
        price,
      };

      cars[index] = updatedCar;
      await fs.writeFile(filePath, JSON.stringify(cars, null, 2), "utf-8");

      return corsResponse(updatedCar);
    } else {
      const body = await request.json();
      const index = cars.findIndex((car: any) => car.id === body.id);
      if (index === -1) return corsResponse({ message: "Car not found" }, 404);

      const updated = {
        ...cars[index],
        ...body,
        cover_image: body.cover_image || cars[index].cover_image,
        additional_images:
          body.additional_images || cars[index].additional_images,
      };

      cars[index] = updated;
      await fs.writeFile(filePath, JSON.stringify(cars, null, 2), "utf-8");

      return corsResponse(updated);
    }
  } catch (error) {
    console.error(error);
    return corsResponse({ message: "Failed to update car" }, 500);
  }
}


export async function DELETE(request: Request) {
  if (!validateApiKey(request)) {
    return corsResponse({ message: "Unauthorized" }, 401);
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id"));
    if (!id) {
      return corsResponse({ message: "Missing id" }, 400);
    }

    // Remove car from cars.json
    const data = await fs.readFile(filePath, "utf-8");
    let cars = JSON.parse(data);
    cars = cars.filter((car: any) => car.id !== id);
    await fs.writeFile(filePath, JSON.stringify(cars, null, 2), "utf-8");

    // ---- Delete entire Cloudinary folder for this car ----
    const folder = `cars/${id}`;
    await cloudinary.api.delete_resources_by_prefix(folder);
    // Optionally remove the folder itself
    await cloudinary.api.delete_folder(folder);

    return corsResponse({ message: "Car and its images deleted" });
  } catch (error) {
    console.error(error);
    return corsResponse({ message: "Failed to delete car" }, 500);
  }
}
