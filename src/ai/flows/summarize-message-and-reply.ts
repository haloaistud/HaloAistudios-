// Use server directive.
'use server';

/**
 * @fileOverview MotivaBot AI for summarizing messages and providing contextually relevant replies.
 *
 * - summarizeMessageAndReply - A function that summarizes user messages and provides replies.
 * - SummarizeMessageAndReplyInput - The input type for the summarizeMessageAndReply function.
 * - SummarizeMessageAndReplyOutput - The return type for the SummarizeMessageAndReply function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeMessageAndReplyInputSchema = z.object({
  message: z.string().describe('The user message to summarize and reply to.'),
});
export type SummarizeMessageAndReplyInput = z.infer<
  typeof SummarizeMessageAndReplyInputSchema
>;

const SummarizeMessageAndReplyOutputSchema = z.object({
  summary: z.string().describe('The summary of the user message.'),
  reply: z.string().describe('The contextually appropriate reply to the user message.'),
});
export type SummarizeMessageAndReplyOutput = z.infer<
  typeof SummarizeMessageAndReplyOutputSchema
>;

export async function summarizeMessageAndReply(
  input: SummarizeMessageAndReplyInput
): Promise<SummarizeMessageAndReplyOutput> {
  return summarizeMessageAndReplyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeMessageAndReplyPrompt',
  input: {schema: SummarizeMessageAndReplyInputSchema},
  output: {schema: SummarizeMessageAndReplyOutputSchema},
  prompt: `You are MotivaBot, a conversational AI. Summarize the following user message and provide a contextually appropriate reply.

User Message: {{{message}}}

Summary:
Reply:
`,
});

const summarizeMessageAndReplyFlow = ai.defineFlow(
  {
    name: 'summarizeMessageAndReplyFlow',
    inputSchema: SummarizeMessageAndReplyInputSchema,
    outputSchema: SummarizeMessageAndReplyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
