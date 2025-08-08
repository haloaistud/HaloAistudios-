import { Rocket } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 border-b border-border/40 sticky top-0 bg-background/80 backdrop-blur-lg z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Rocket className="h-7 w-7 text-primary" />
          <h1 className="text-xl font-bold tracking-tighter text-foreground">
            HaloAiStudios Hub
          </h1>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
          <Link href="/showcase" className="text-muted-foreground hover:text-foreground transition-colors">Showcase</Link>
          <Link href="/subscription" className="text-muted-foreground hover:text-foreground transition-colors">Subscription</Link>
          <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link>
          <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
