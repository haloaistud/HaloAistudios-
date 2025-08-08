import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface App {
  id: number;
  name: string;
  description: string;
  image: string;
  data_ai_hint: string;
}

interface AppCardProps {
  app: App;
  isUpcoming?: boolean;
}

export function AppCard({ app, isUpcoming = false }: AppCardProps) {
  return (
    <Card className={`flex flex-col ${isUpcoming ? 'opacity-60' : ''}`}>
      <CardHeader>
        <CardTitle>{app.name}</CardTitle>
        <CardDescription>{app.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <div className="relative w-full h-48 mb-4">
          <Image
            src={app.image}
            alt={`${app.name} screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover rounded-md"
            data-ai-hint={app.data_ai_hint}
          />
        </div>
        {isUpcoming && (
          <div className="text-center font-bold text-lg text-accent">
            Coming Soon
          </div>
        )}
      </CardContent>
    </Card>
  );
}
