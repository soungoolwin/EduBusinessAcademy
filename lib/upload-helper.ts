import { put } from "@vercel/blob";
import * as fs from "fs/promises";
import * as path from "path";

export async function uploadImageToBlob(file: File): Promise<string> {
  // Check if we're in production (Vercel)
  if (process.env.BLOB_READ_WRITE_TOKEN && process.env.VERCEL) {
    try {
      console.log(
        `Uploading to Vercel Blob: ${file.name}, size: ${file.size} bytes`
      );
      const blob = await put(file.name, file, {
        access: "public",
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      console.log(`✅ Uploaded to Blob: ${blob.url}`);
      return blob.url;
    } catch (error) {
      console.error("Error uploading to blob:", error);
      throw new Error(`Failed to upload image ${file.name}: ${error}`);
    }
  } else {
    // Local development - use file system
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

    const uniqueName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(7)}-${file.name}`;
    const filePath = path.join(uploadsDir, uniqueName);
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);

    return `/uploads/${uniqueName}`;
  }
}

export async function uploadMultipleImagesToBlob(
  files: File[]
): Promise<string[]> {
  const uploadedUrls: string[] = [];

  // Upload sequentially to avoid Vercel rate limits and timeouts
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    try {
      const url = await uploadImageToBlob(file);
      uploadedUrls.push(url);

      // Add small delay between uploads to avoid rate limiting (except for last file)
      if (i < files.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    } catch (error) {
      console.error(`Failed to upload ${file.name}:`, error);
      throw error; // Re-throw to stop the process
    }
  }

  return uploadedUrls;
}
