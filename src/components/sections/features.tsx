import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bot, Swords, Mic } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const features = [
  {
    slug: "eaib",
    icon: <Swords className="h-8 w-8 text-primary" />,
    title: "EAIB Battle Simulator",
    description: "Epic AI Battle system with real-time simulation and dynamic storytelling.",
  },
  {
    slug: "motivabot",
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: "MotivaBot AI Companion",
    description: "Personalized motivation, NLP analysis, and speech synthesis.",
  },
  {
    slug: "superstar-broadcast-hub",
    icon: <Mic className="h-8 w-8 text-primary" />,
    title: "Superstar Broadcast Hub",
    description: "Multi-channel live streaming with audience interaction.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 md:py-28">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
            Our Flagship Applications
          </h2>
          <p className="mt-2 text-lg text-muted-foreground">
            Discover the tools that are shaping the future of digital interaction.
          </p>
        </div>
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-lg border-border/50 flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-4">
                  {feature.icon}
                  <CardTitle className="text-2xl">{feature.title}</CardTitle>
                </div>
                <CardDescription className="pt-2">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                 <Button asChild className="w-full">
                    <Link href={`/showcase/${feature.slug}`}>View App</Link>
                  </Button>
              </CardContent>
            </Card>
          ))}
           <Card className="lg:col-span-3 bg-card/50 backdrop-blur-lg border-border/50">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">And many more to come...</CardTitle>
                <CardDescription className="pt-2">Stay tuned for upcoming releases.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-20 flex items-center justify-center text-muted-foreground italic">
                    The future is building.
                </div>
              </CardContent>
            </Card>
        </div>
      </div>
    </section>
  );
}
