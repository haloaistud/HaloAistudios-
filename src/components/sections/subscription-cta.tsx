import Link from "next/link";
import { Button } from "../ui/button";

export function SubscriptionCta() {
  return (
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
            Full Access for $1/month
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
            Get unlimited access to all apps, instant updates, exclusive features, and early access to betas.
        </p>
        <div className="mt-8">
          <Button size="lg" asChild>
            <Link href="/subscription">
              Subscribe Now
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
