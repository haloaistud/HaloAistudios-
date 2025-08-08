import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { Subscription } from "@/components/sections/subscription";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <div className="container mx-auto text-center my-8">
          <Button asChild size="lg">
            <Link href="/showcase">
              View App Showcase
            </Link>
          </Button>
        </div>
        <Features />
        <Subscription />
      </main>
      <Footer />
    </div>
  );
}
