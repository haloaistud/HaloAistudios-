import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Mail } from "lucide-react";

export function Subscription() {
  return (
    <section id="subscribe" className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div id="support">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
            Support Our Vision
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our innovation is fueled by our community. Your support allows us to continue building the next generation of AI tools.
          </p>
          <div className="mt-6">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Heart className="mr-2 h-5 w-5" />
              Make a Donation
            </Button>
          </div>
        </div>

        <Card className="bg-card/50 backdrop-blur-lg border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl">Stay in the Loop</CardTitle>
            <CardDescription>
              Subscribe to our newsletter for the latest product updates, announcements, and exclusive insights.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex gap-4">
              <input 
                type="email" 
                placeholder="you@example.com" 
                className="flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
              <Button type="submit" size="lg">
                <Mail className="mr-2 h-5 w-5" />
                Subscribe
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
