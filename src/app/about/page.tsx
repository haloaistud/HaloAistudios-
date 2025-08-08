
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Code, Users } from "lucide-react";

const teamMembers = [
  { name: "CEO", role: "Visionary Leader", avatar: "https://placehold.co/100x100.png", hint: "person portrait" },
  { name: "CTO", role: "Lead Architect", avatar: "https://placehold.co/100x100.png", hint: "person portrait"  },
  { name: "Lead Designer", role: "Creative Mastermind", avatar: "https://placehold.co/100x100.png", hint: "person portrait"  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">About HaloAiStudios</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          We are a passionate team dedicated to pushing the boundaries of what's possible with artificial intelligence.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-3 mb-4"><Eye className="h-8 w-8 text-primary"/> Our Vision</h2>
          <p className="text-muted-foreground text-lg">
            To make AI accessible, fun, and powerful for everyone. We believe in a future where intelligent tools amplify human creativity and productivity, and we're building the software to make that a reality.
          </p>
        </div>
        <div className="relative h-64">
           <div
              aria-hidden="true"
              className="absolute inset-0 blur-2xl opacity-30"
            >
              <div className="h-full bg-gradient-to-r from-primary to-accent"></div>
            </div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
         <div className="relative h-64 order-last md:order-first">
           <div
              aria-hidden="true"
              className="absolute inset-0 blur-2xl opacity-30"
            >
              <div className="h-full bg-gradient-to-r from-accent to-purple-500"></div>
            </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-3 mb-4"><Code className="h-8 w-8 text-primary"/> Our Work</h2>
          <p className="text-muted-foreground text-lg">
            We specialize in creating AI-driven applications that span various domains, from dynamic storytelling and gaming with our EAIB system, to productivity and communication with MotivaBot. Our focus is on user-centric design and powerful, reliable AI integration.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold text-center flex items-center justify-center gap-3 mb-8"><Users className="h-8 w-8 text-primary"/> Meet the Team</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="bg-card/50 text-center">
              <CardHeader>
                <Avatar className="mx-auto h-24 w-24 mb-4">
                  <AvatarImage src={member.avatar} alt={member.name} data-ai-hint={member.hint} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle>{member.name}</CardTitle>
                <p className="text-primary">{member.role}</p>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
