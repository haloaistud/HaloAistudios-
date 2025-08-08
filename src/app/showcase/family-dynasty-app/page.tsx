
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function FamilyDynastyAppPage() {
  return (
    <>
    <Header />
    <main className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-4">Family Dynasty App</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Build and manage your family's legacy through generations.
      </p>
      <div className="text-center text-2xl font-bold text-accent p-8 border rounded-lg">
          Content coming soon...
      </div>
    </main>
    <Footer />
    </>
  );
}
