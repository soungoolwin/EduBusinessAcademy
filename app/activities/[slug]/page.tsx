import Image from 'next/image';
import { notFound } from 'next/navigation';
import activities from '../../../data/activities.json';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Activity {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  imageUrl: string;
}

async function getActivity(slug: string) {
  const activity = (activities as Activity[]).find((a) => a.slug === slug);
  return activity;
}

export default async function ActivityDetailPage({ params }: { params: { slug: string } }) {
  const activity = await getActivity(params.slug);

  if (!activity) {
    notFound();
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <Card>
        <CardHeader>
          <div className="relative w-full h-96">
            <Image
              src={activity.imageUrl}
              alt={activity.title}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <CardTitle className="text-4xl font-bold mb-4">{activity.title}</CardTitle>
          <p className="text-lg text-muted-foreground whitespace-pre-wrap">{activity.longDescription}</p>
        </CardContent>
      </Card>
    </div>
  );
}

export async function generateStaticParams() {
  return (activities as Activity[]).map((activity) => ({
    slug: activity.slug,
  }));
}
