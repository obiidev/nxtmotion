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
      const file = formData.get("image") as File;

      const title = formData.get("title") as string;
      const catchPhrase = formData.get("catch") as string;
      const make = formData.get("make") as string;
      const year = Number(formData.get("year"));
      const fuel = formData.get("fuel") as string;
      const mileage = Number(formData.get("mileage"));
      const transmission = formData.get("transmission") as string;
      const price = Number(formData.get("price"));

      let imagePath = "";

      if (file && file.name) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const fileNameParts = file.name.split(".");
        const extension = fileNameParts.pop();
        const baseName = fileNameParts.join(".");
        const fileName = `${baseName}_${Date.now()}.${extension}`;

        const savePath = path.join(process.cwd(), "public", "images", "cars", fileName);
        await fs.writeFile(savePath, buffer);

        imagePath = `/images/cars/${fileName}`;
      }

const description = formData.get("description") as string || "";

  newCar = {
    title,
    catch: catchPhrase,
    description,    // <-- Use provided description
    image: imagePath,
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
    // description: body.description || "", // optional fallback
  };
    }

    const data = await fs.readFile(filePath, "utf-8");
    const cars = JSON.parse(data);
    const newId = cars.length ? Math.max(...cars.map((car: any) => car.id)) + 1 : 1;

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
      const file = formData.get("image") as File;

      const id = Number(formData.get("id"));
      const title = formData.get("title") as string;
      const catchPhrase = formData.get("catch") as string;
      const description = formData.get("description") as string;
      const make = formData.get("make") as string;
      const year = Number(formData.get("year"));
      const fuel = formData.get("fuel") as string;
      const mileage = Number(formData.get("mileage"));
      const transmission = formData.get("transmission") as string;
      const price = Number(formData.get("price"));

      let imagePath = "";

      if (file && file.name) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const fileNameParts = file.name.split(".");
        const extension = fileNameParts.pop();
        const baseName = fileNameParts.join(".");
        const fileName = `${baseName}_${Date.now()}.${extension}`;

        const savePath = path.join(process.cwd(), "public", "images", "cars", fileName);
        await fs.writeFile(savePath, buffer);

        imagePath = `/images/cars/${fileName}`;
      }

      updatedCar = {
        id,
        title,
        catch: catchPhrase,
        description: description, // Set to empty
        image: imagePath || "", // fallback handled below
        make,
        year,
        fuel,
        mileage,
        transmission,
        price,
      };
    } else {
      const body = await request.json();
      updatedCar = {
        ...body,
        description: "", // Force empty description
      };
    }

    const data = await fs.readFile(filePath, "utf-8");
    const cars = JSON.parse(data);

    const index = cars.findIndex((car: any) => car.id === updatedCar.id);
    if (index === -1) {
      return corsResponse({ message: "Car not found" }, 404);
    }

    // Keep old image if not updated
    if (!updatedCar.image) {
      updatedCar.image = cars[index].image;
    }

    cars[index] = updatedCar;

    await fs.writeFile(filePath, JSON.stringify(cars, null, 2), "utf-8");
    return corsResponse(updatedCar);
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
