import { put } from '@vercel/blob';
import * as fs from 'fs/promises';
import * as path from 'path';

export async function uploadImageToBlob(file: File): Promise<string> {
  // Check if we're in production (Vercel)
  if (process.env.BLOB_READ_WRITE_TOKEN && process.env.VERCEL) {
    try {
      const blob = await put(file.name, file, {
        access: 'public',
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      return blob.url;
    } catch (error) {
      console.error('Error uploading to blob:', error);
      throw new Error('Failed to upload image');
    }
  } else {
    // Local development - use file system
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true });
    
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(7)}-${file.name}`;
    const filePath = path.join(uploadsDir, uniqueName);
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);
    
    return `/uploads/${uniqueName}`;
  }
}

export async function uploadMultipleImagesToBlob(files: File[]): Promise<string[]> {
  const uploadPromises = files.map(file => uploadImageToBlob(file));
  return await Promise.all(uploadPromises);
}
