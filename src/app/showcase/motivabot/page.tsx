
import { MotivaBot } from "@/components/ai/motivabot";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function MotivabotPage() {
  return (
    <>
    <Header />
    <main className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-4">MotivaBot AI Companion</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Your personal conversational AI. Summarize messages, get context-aware replies, and streamline your communication with an intelligent assistant.
      </p>
      <MotivaBot />
    </main>
    <Footer />
    </>
  );
}
