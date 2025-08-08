
import { AppCard } from '@/components/showcase/app-card';
import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';

interface App {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  data_ai_hint: string;
}

export default async function ShowcasePage() {
  const appsFile = path.join(process.cwd(), 'public', 'data', 'apps.json');
  const upcomingFile = path.join(process.cwd(), 'public', 'data', 'upcoming.json');

  const appsData = await fs.readFile(appsFile, 'utf8');
  const upcomingData = await fs.readFile(upcomingFile, 'utf8');

  const apps: App[] = JSON.parse(appsData);
  const upcoming: App[] = JSON.parse(upcomingData);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">App Showcase</h1>

      <section>
        <h2 className="text-2xl font-bold mb-4">Available Now</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {apps.map((app) => (
            <Link href={`/showcase/${app.slug}`} key={app.id}>
              <AppCard app={app} />
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcoming.map((app) => (
             <Link href={`/showcase/${app.slug}`} key={app.id}>
              <AppCard app={app} isUpcoming />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
