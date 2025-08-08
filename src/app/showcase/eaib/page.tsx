
import { BattleSimulator } from "@/components/ai/battle-simulator";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function EaibPage() {
  return (
    <>
    <Header />
    <main className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-4">EAIB Battle Simulator</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Generate engaging and dynamic stories from AI-driven battle simulations. Craft the narrative of your conflicts with the power of generative AI.
      </p>
      <BattleSimulator />
    </main>
    <Footer />
    </>
  );
}
