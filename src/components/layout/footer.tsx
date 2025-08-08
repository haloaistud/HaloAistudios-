export function Footer() {
  return (
    <footer className="border-t border-border/40 py-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} HaloAiStudios. All rights reserved.
        </p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Twitter</a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">GitHub</a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
