
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
  
  const appsData = await fs.readFile(appsFile, 'utf8');

  const apps: App[] = JSON.parse(appsData);
  
  const availableApps = apps.filter(app => app.id <= 3);
  const futureApps = apps.filter(app => app.id > 3);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-center mb-4">App Showcase</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">Our flagship AI-powered applications and services, built for creators, gamers, and innovators.</p>
      </div>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {availableApps.map((app) => (
            <Link href={`/showcase/${app.slug}`} key={app.id}>
              <AppCard app={app} />
            </Link>
          ))}
           {futureApps.length > 0 && (
            <AppCard app={futureApps[0]} isUpcoming={true} />
          )}
        </div>
      </section>
    </div>
  );
}
