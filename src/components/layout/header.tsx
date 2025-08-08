import { Rocket } from "lucide-react";

export function Header() {
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 border-b border-border/40">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Rocket className="h-7 w-7 text-primary" />
          <h1 className="text-xl font-bold tracking-tighter text-foreground">
            HaloAiStudios Hub
          </h1>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#subscribe" className="text-muted-foreground hover:text-foreground transition-colors">Subscribe</a>
          <a href="#support" className="text-muted-foreground hover:text-foreground transition-colors">Support</a>
        </nav>
      </div>
    </header>
  );
}
