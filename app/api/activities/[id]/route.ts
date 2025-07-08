import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

const dataFilePath = path.join(process.cwd(), 'data/activities.json');
const uploadsDir = path.join(process.cwd(), 'public/uploads');

// This API route is designed for a local development environment.

async function readActivities() {
  const data = await fs.readFile(dataFilePath, 'utf-8');
  return JSON.parse(data);
}

async function writeActivities(data: any) {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const activities = await readActivities();
  const activity = activities.find((a: any) => a.id === params.id);
  if (activity) {
    return NextResponse.json(activity);
  }
  return new NextResponse('Activity not found', { status: 404 });
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  let activities = await readActivities();
  const index = activities.findIndex((a: any) => a.id === params.id);

  if (index === -1) {
    return new NextResponse('Activity not found', { status: 404 });
  }

  const formData = await request.formData();
  const title = formData.get('title') as string;
  const shortDescription = formData.get('shortDescription') as string;
  const longDescription = formData.get('longDescription') as string;
  const imageFile = formData.get('image') as File | null;

  const existingActivity = activities[index];
  let imageUrl = existingActivity.imageUrl;

  if (imageFile) {
    // Delete old image if it's not the placeholder
    if (existingActivity.imageUrl && existingActivity.imageUrl !== '/placeholder.svg') {
      const oldImagePath = path.join(process.cwd(), 'public', existingActivity.imageUrl);
      try {
        await fs.unlink(oldImagePath);
      } catch (err) {
        console.error(`Failed to delete old image: ${oldImagePath}`, err);
      }
    }
    
    // Save new image
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const fileExtension = path.extname(imageFile.name);
    const filename = `${uniqueSuffix}${fileExtension}`;
    const imagePath = path.join(uploadsDir, filename);
    
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    await fs.writeFile(imagePath, buffer);
    
    imageUrl = `/uploads/${filename}`;
  }

  const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

  activities[index] = {
    ...existingActivity,
    title,
    shortDescription,
    longDescription,
    slug,
    imageUrl,
  };

  await writeActivities(activities);
  return NextResponse.json(activities[index]);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  let activities = await readActivities();
  const activityToDelete = activities.find((a: any) => a.id === params.id);

  if (!activityToDelete) {
    return new NextResponse('Activity not found', { status: 404 });
  }

  // Delete image file if it exists and is not the placeholder
  if (activityToDelete.imageUrl && activityToDelete.imageUrl !== '/placeholder.svg') {
    const imagePath = path.join(process.cwd(), 'public', activityToDelete.imageUrl);
    try {
      await fs.unlink(imagePath);
    } catch (err) {
      console.error(`Failed to delete image: ${imagePath}`, err);
    }
  }

  const filteredActivities = activities.filter((a: any) => a.id !== params.id);
  await writeActivities(filteredActivities);

  return new NextResponse(null, { status: 204 }); // No Content
}
