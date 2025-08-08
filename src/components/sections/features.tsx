import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bot, Swords, Mic } from "lucide-react";
import { MotivaBot } from "../ai/motivabot";
import { BattleSimulator } from "../ai/battle-simulator";

const features = [
  {
    icon: <Swords className="h-8 w-8 text-primary" />,
    title: "EAIB Battle Simulator",
    description: "Generate engaging and dynamic stories from AI-driven battle simulations. Craft the narrative of your conflicts with the power of generative AI.",
    component: <BattleSimulator />,
  },
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: "MotivaBot AI Companion",
    description: "Your personal conversational AI. Summarize messages, get context-aware replies, and streamline your communication with an intelligent assistant.",
    component: <MotivaBot />,
  },
  {
    icon: <Mic className="h-8 w-8 text-primary" />,
    title: "Superstar Broadcast Hub",
    description: "The ultimate tool for streamers and content creators. Manage your broadcasts, engage with your audience, and grow your channel like never before.",
    component: null,
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
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
          {features.slice(0,2).map((feature, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-lg border-border/50">
              <CardHeader>
                <div className="flex items-center gap-4">
                  {feature.icon}
                  <CardTitle className="text-2xl">{feature.title}</CardTitle>
                </div>
                <CardDescription className="pt-2">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {feature.component}
              </CardContent>
            </Card>
          ))}
           <Card className="lg:col-span-2 bg-card/50 backdrop-blur-lg border-border/50">
              <CardHeader>
                <div className="flex items-center gap-4">
                  {features[2].icon}
                  <CardTitle className="text-2xl">{features[2].title}</CardTitle>
                </div>
                <CardDescription className="pt-2">{features[2].description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-40 flex items-center justify-center text-muted-foreground italic">
                    Coming Soon
                </div>
              </CardContent>
            </Card>
        </div>
      </div>
    </section>
  );
}
