
"use client";

import { useState, useRef } from "react";
import { useFormStatus } from "react-dom";
import { handleGenerateNarrative } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollText, Loader } from "lucide-react";
import { Typewriter } from "../typewriter";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader className="mr-2 h-4 w-4 animate-spin" />
          Weaving the tale...
        </>
      ) : (
        <>
          <ScrollText className="mr-2 h-4 w-4" />
          Generate Narrative
        </>
      )}
    </Button>
  );
}

export function BattleSimulator() {
  const [narrative, setNarrative] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const action = async (formData: FormData) => {
    setNarrative(null);
    setError(null);
    const { data, error } = await handleGenerateNarrative(formData);
    if (error) {
      setError(error);
    } else if (data) {
      setNarrative(data.narrative);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <form ref={formRef} action={action} className="space-y-4">
        <div>
          <Label htmlFor="simulationOutcome">Outcome</Label>
          <Select name="simulationOutcome" defaultValue="Victory" required>
            <SelectTrigger id="simulationOutcome" className="bg-background">
              <SelectValue placeholder="Select battle outcome" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Victory">Victory</SelectItem>
              <SelectItem value="Defeat">Defeat</SelectItem>
              <SelectItem value="Stalemate">Stalemate</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="characters">Characters (comma-separated)</Label>
          <Input id="characters" name="characters" placeholder="e.g. Commander Eva, Rogue Bot X7" required className="bg-background" />
        </div>
        <div>
          <Label htmlFor="setting">Setting</Label>
          <Input id="setting" name="setting" placeholder="e.g. Neon-drenched alleyways of Neo-Kyoto" required className="bg-background" />
        </div>
        <SubmitButton />
        {error && <p className="text-destructive text-sm pt-2">{error}</p>}
      </form>
      
      <Card className="bg-secondary/50 min-h-[250px]">
        <CardHeader>
          <CardTitle className="text-lg">Battle Narrative</CardTitle>
        </CardHeader>
        <CardContent>
          {narrative ? (
            <Typewriter text={narrative} />
          ) : (
            <div className="flex items-center justify-center h-full min-h-[150px]">
              <p className="text-muted-foreground italic">Your generated story will appear here...</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
