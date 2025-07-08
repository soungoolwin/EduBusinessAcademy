import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

const dataFilePath = path.join(process.cwd(), 'data/activities.json');
const uploadsDir = path.join(process.cwd(), 'public/uploads');

// This API route is designed for a local development environment.
// It writes to the local filesystem, which won't work on read-only hosting.
// To manage content on a live site, run the app locally, make your changes
// via the admin dashboard, and then commit the updated `data/activities.json`
// and `public/uploads` directory to your Git repository.

async function readActivities() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

async function writeActivities(data: any) {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

async function ensureUploadsDirExists() {
  try {
    await fs.mkdir(uploadsDir, { recursive: true });
  } catch (error) {
    console.error('Could not create uploads directory:', error);
    throw error;
  }
}

export async function GET() {
  const activities = await readActivities();
  return NextResponse.json(activities);
}

export async function POST(request: NextRequest) {
  await ensureUploadsDirExists();
  const activities = await readActivities();
  const formData = await request.formData();

  const title = formData.get('title') as string;
  const shortDescription = formData.get('shortDescription') as string;
  const longDescription = formData.get('longDescription') as string;
  const imageFile = formData.get('image') as File | null;

  if (!title || !shortDescription || !longDescription) {
    return new NextResponse('Missing required text fields', { status: 400 });
  }

  let imageUrl = '/placeholder.svg';
  if (imageFile) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const fileExtension = path.extname(imageFile.name);
    const filename = `${uniqueSuffix}${fileExtension}`;
    const imagePath = path.join(uploadsDir, filename);
    
    // Convert ArrayBuffer to Buffer and write file
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    await fs.writeFile(imagePath, buffer);
    
    imageUrl = `/uploads/${filename}`;
  }

  const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

  const newActivity = {
    id: Date.now().toString(),
    slug,
    title,
    shortDescription,
    longDescription,
    imageUrl,
  };

  activities.push(newActivity);
  await writeActivities(activities);

  return NextResponse.json(newActivity, { status: 201 });
}

