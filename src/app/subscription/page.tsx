
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { CheckCircle, Heart, Star } from "lucide-react";

const features = [
  "Unlimited access to all apps",
  "Instant updates",
  "Exclusive new features",
  "Early access to betas",
  "Priority support",
];

export default function SubscriptionPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">Join the HaloAiStudios Network</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Unlock the full potential of our AI-powered suite with a simple subscription.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
            <Card className="bg-card/50 border-primary border-2 shadow-2xl shadow-primary/20">
                <CardHeader className="text-center">
                    <Star className="h-10 w-10 mx-auto text-primary mb-2"/>
                    <CardTitle className="text-3xl">Pro Access</CardTitle>
                    <CardDescription>Get everything you need to supercharge your creativity and productivity.</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-5xl font-bold mb-2">$1<span className="text-lg font-normal text-muted-foreground">/month</span></p>
                    <ul className="space-y-3 text-left my-8">
                        {features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-accent" />
                            <span className="text-muted-foreground">{feature}</span>
                        </li>
                        ))}
                    </ul>
                </CardContent>
                <CardFooter>
                    <Button size="lg" className="w-full">Subscribe Now</Button>
                </CardFooter>
            </Card>

            <div id="donate" className="space-y-6 text-center md:text-left">
                <Heart className="h-12 w-12 text-accent mx-auto md:mx-0"/>
                <h2 className="text-3xl font-bold tracking-tighter">Support Our Vision Directly</h2>
                <p className="text-lg text-muted-foreground">
                    If you prefer to make a one-time contribution, you can support our development directly. Every donation helps us innovate and build better tools for the community.
                </p>
                <Card className="bg-secondary/50">
                  <CardContent className="p-6">
                    <p className="text-muted-foreground">Send donations via Chime to:</p>
                    <p className="text-2xl font-mono font-bold text-accent mt-1">$The1tunchi</p>
                  </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </div>
  );
}
