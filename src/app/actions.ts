
"use server";

import { z } from "zod";
import { summarizeMessageAndReply } from "@/ai/flows/summarize-message-and-reply";
import { generateBattleNarrative } from "@/ai/flows/generate-battle-narrative";

const summarizeSchema = z.object({
  message: z.string().min(10, "Message must be at least 10 characters long."),
});

export async function handleSummarize(formData: FormData) {
  const unsafeData = { message: formData.get("message") };
  const validated = summarizeSchema.safeParse(unsafeData);

  if (!validated.success) {
    return { error: validated.error.flatten().fieldErrors.message?.[0] };
  }

  try {
    const result = await summarizeMessageAndReply(validated.data);
    return { data: result };
  } catch (e) {
    return { error: "Failed to process the message. Please try again." };
  }
}

const narrativeSchema = z.object({
    simulationOutcome: z.string(),
    characters: z.string().min(1, "Please enter at least one character."),
    setting: z.string().min(3, "Setting must be at least 3 characters long."),
});

export async function handleGenerateNarrative(formData: FormData) {
  const unsafeData = {
    simulationOutcome: formData.get("simulationOutcome"),
    characters: formData.get("characters"),
    setting: formData.get("setting"),
  };

  const validated = narrativeSchema.safeParse(unsafeData);

  if (!validated.success) {
    return { error: "Invalid form data.", details: validated.error.flatten().fieldErrors };
  }
  
  try {
    const charactersArray = validated.data.characters.split(',').map(c => c.trim());
    const result = await generateBattleNarrative({
        ...validated.data,
        characters: charactersArray
    });
    return { data: result };
  } catch (e) {
    return { error: "Failed to generate narrative. Please try again." };
  }
}
