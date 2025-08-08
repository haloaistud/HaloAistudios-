'use server';
/**
 * @fileOverview A battle narrative generation AI agent.
 *
 * - generateBattleNarrative - A function that handles the battle narrative generation process.
 * - GenerateBattleNarrativeInput - The input type for the generateBattleNarrative function.
 * - GenerateBattleNarrativeOutput - The return type for the generateBattleNarrative function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBattleNarrativeInputSchema = z.object({
  simulationOutcome: z.string().describe('The outcome of the battle simulation.'),
  characters: z.array(z.string()).describe('List of involved characters in the battle.'),
  setting: z.string().describe('The setting or environment of the battle.'),
});
export type GenerateBattleNarrativeInput = z.infer<typeof GenerateBattleNarrativeInputSchema>;

const GenerateBattleNarrativeOutputSchema = z.object({
  narrative: z.string().describe('The generated narrative of the battle.'),
});
export type GenerateBattleNarrativeOutput = z.infer<typeof GenerateBattleNarrativeOutputSchema>;

export async function generateBattleNarrative(input: GenerateBattleNarrativeInput): Promise<GenerateBattleNarrativeOutput> {
  return generateBattleNarrativeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBattleNarrativePrompt',
  input: {schema: GenerateBattleNarrativeInputSchema},
  output: {schema: GenerateBattleNarrativeOutputSchema},
  prompt: `You are a creative storyteller specializing in crafting engaging narratives based on battle simulations.

  Based on the simulation outcome, characters, and setting, generate a dynamic story that adds depth to the gameplay experience.

  Simulation Outcome: {{{simulationOutcome}}}
  Characters: {{#each characters}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  Setting: {{{setting}}}
  `,
});

const generateBattleNarrativeFlow = ai.defineFlow(
  {
    name: 'generateBattleNarrativeFlow',
    inputSchema: GenerateBattleNarrativeInputSchema,
    outputSchema: GenerateBattleNarrativeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
