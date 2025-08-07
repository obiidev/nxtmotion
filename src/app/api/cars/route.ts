import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

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
    return corsResponse(cars);
  } catch (error) {
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

      let cover_image = "";
      if (coverFile && coverFile.name) {
        const buffer = Buffer.from(await coverFile.arrayBuffer());
        const fileName = `${Date.now()}_${coverFile.name}`;
        const savePath = path.join(
          process.cwd(),
          "public",
          "images",
          "cars",
          fileName
        );
        await fs.writeFile(savePath, buffer);
        cover_image = `/images/cars/${fileName}`;
      }

      let additional_images: string[] = [];
      for (const file of additionalFiles) {
        if (file && file.name) {
          const buffer = Buffer.from(await file.arrayBuffer());
          const fileName = `${Date.now()}_${Math.random()
            .toString(36)
            .slice(2)}_${file.name}`;
          const savePath = path.join(
            process.cwd(),
            "public",
            "images",
            "cars",
            fileName
          );
          await fs.writeFile(savePath, buffer);
          additional_images.push(`/images/cars/${fileName}`);
        }
      }

      newCar = {
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
        ...body,
        cover_image: body.cover_image || "",
        additional_images: body.additional_images || [],
      };
    }

    const data = await fs.readFile(filePath, "utf-8");
    const cars = JSON.parse(data);
    const newId = cars.length
      ? Math.max(...cars.map((car: any) => car.id)) + 1
      : 1;
    newCar.id = newId;

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

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const coverFile = formData.get("cover_image") as File;
      const additionalFiles = formData.getAll("additional_images") as File[];

      const id = Number(formData.get("id"));
      const title = formData.get("title") as string;
      const catchPhrase = formData.get("catch") as string;
      const description = (formData.get("description") as string) || "";
      const make = formData.get("make") as string;
      const year = Number(formData.get("year"));
      const fuel = formData.get("fuel") as string;
      const mileage = Number(formData.get("mileage"));
      const transmission = formData.get("transmission") as string;
      const price = Number(formData.get("price"));

      const data = await fs.readFile(filePath, "utf-8");
      const cars = JSON.parse(data);
      const index = cars.findIndex((car: any) => car.id === id);
      if (index === -1) return corsResponse({ message: "Car not found" }, 404);

      let cover_image = cars[index].cover_image;
      if (coverFile && coverFile.name) {
        const buffer = Buffer.from(await coverFile.arrayBuffer());
        const fileName = `${Date.now()}_${coverFile.name}`;
        const savePath = path.join(
          process.cwd(),
          "public",
          "images",
          "cars",
          fileName
        );
        await fs.writeFile(savePath, buffer);
        cover_image = `/images/cars/${fileName}`;
      }

      let additional_images = cars[index].additional_images;
      if (additionalFiles.length > 0) {
        additional_images = [];
        for (const file of additionalFiles) {
          if (file && file.name) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const fileName = `${Date.now()}_${Math.random()
              .toString(36)
              .slice(2)}_${file.name}`;
            const savePath = path.join(
              process.cwd(),
              "public",
              "images",
              "cars",
              fileName
            );
            await fs.writeFile(savePath, buffer);
            additional_images.push(`/images/cars/${fileName}`);
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
      const data = await fs.readFile(filePath, "utf-8");
      const cars = JSON.parse(data);
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

    const data = await fs.readFile(filePath, "utf-8");
    let cars = JSON.parse(data);

    cars = cars.filter((car: any) => car.id !== id);

    await fs.writeFile(filePath, JSON.stringify(cars, null, 2), "utf-8");
    return corsResponse({ message: "Car deleted" });
  } catch (error) {
    return corsResponse({ message: "Failed to delete car" }, 500);
  }
}
