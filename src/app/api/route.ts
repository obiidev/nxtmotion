import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Ensure directory exists
async function ensureDirectoryExists(dir: string) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (err) {
    console.error("Error creating directory:", err);
  }
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json({ message: "Invalid content type" }, { status: 400 });
    }

    const formData = await request.formData();
    const file = formData.get("image") as File;

    if (!file || !file.name) {
      return NextResponse.json({ message: "Image file is required" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileNameParts = file.name.split(".");
    const extension = fileNameParts.pop();
    const baseName = fileNameParts.join(".");
    const fileName = `${baseName}_${Date.now()}.${extension}`;
    const saveDir = path.join(process.cwd(), "public", "images", "cars");
    const savePath = path.join(saveDir, fileName);

    await ensureDirectoryExists(saveDir);
    await fs.writeFile(savePath, buffer);

    const imageUrl = `/images/cars/${fileName}`;
    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ message: "Failed to upload image" }, { status: 500 });
  }
}
