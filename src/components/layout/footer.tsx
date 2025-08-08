import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-6 mt-20">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} HaloAiStudios. All rights reserved.
        </p>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <Link href="/subscription#donate" className="text-sm text-accent hover:text-accent/80 transition-colors font-semibold">
            Donation Link
          </Link>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Twitter</a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">GitHub</a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
