import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src", "data", "cars.json");
const API_KEY = process.env.API_KEY;

function validateApiKey(request: Request) {
  const apiKey = request.headers.get("x-api-key");
  return apiKey === API_KEY;
}

// Helper to add CORS headers
function corsResponse(body: any, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Access-Control-Allow-Origin": "*", // Or restrict to your domain
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, x-api-key",
    },
  });
}

// Handle preflight OPTIONS request
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
  try {
    const newCar = await request.json();
    const data = await fs.readFile(filePath, "utf-8");
    const cars = JSON.parse(data);

    const newId = cars.length ? Math.max(...cars.map((car: any) => car.id)) + 1 : 1;
    newCar.id = newId;

    cars.push(newCar);

    await fs.writeFile(filePath, JSON.stringify(cars, null, 2), "utf-8");
    return corsResponse(newCar, 201);
  } catch (error) {
    return corsResponse({ message: "Failed to add car" }, 500);
  }
}

export async function PUT(request: Request) {
  if (!validateApiKey(request)) {
    return corsResponse({ message: "Unauthorized" }, 401);
  }
  try {
    const updatedCar = await request.json();
    const data = await fs.readFile(filePath, "utf-8");
    const cars = JSON.parse(data);

    const index = cars.findIndex((car: any) => car.id === updatedCar.id);
    if (index === -1) {
      return corsResponse({ message: "Car not found" }, 404);
    }

    cars[index] = updatedCar;

    await fs.writeFile(filePath, JSON.stringify(cars, null, 2), "utf-8");
    return corsResponse(updatedCar);
  } catch (error) {
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
