import Link from 'next/link';
import Image from 'next/image';
import activities from '../../data/activities.json';
import { Button } from '@/components/ui/button';

interface Activity {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  imageUrl: string;
}

export default function ActivitiesPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <h1 className="text-4xl font-bold tracking-tight text-center mb-16">Our Activities</h1>
      <div className="space-y-16">
        {(activities as Activity[]).map((activity, index) => (
          <div
            key={activity.id}
            className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
              index % 2 !== 0 ? 'md:flex-row-reverse' : ''
            }`}
          >
            <div className="w-full md:w-1/2">
              <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={activity.imageUrl}
                  alt={activity.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">{activity.title}</h2>
              <p className="text-muted-foreground mb-6">{activity.shortDescription}</p>
              <Link href={`/activities/${activity.slug}`}>
                <Button>Read More</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

