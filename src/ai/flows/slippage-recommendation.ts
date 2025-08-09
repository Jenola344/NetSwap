'use server';

/**
 * @fileOverview This file defines a Genkit flow for recommending optimal slippage tolerance for token swaps.
 *
 * - recommendSlippage - A function that takes token pair and transaction size as input and returns a slippage tolerance recommendation.
 * - SlippageRecommendationInput - The input type for the recommendSlippage function.
 * - SlippageRecommendationOutput - The return type for the recommendSlippage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SlippageRecommendationInputSchema = z.object({
  tokenInSymbol: z.string().describe('The symbol of the input token (e.g., ETH, USDC).'),
  tokenOutSymbol: z.string().describe('The symbol of the output token (e.g., DAI, WBTC).'),
  transactionSizeUSD: z.number().describe('The size of the transaction in USD.'),
});
export type SlippageRecommendationInput = z.infer<
  typeof SlippageRecommendationInputSchema
>;

const SlippageRecommendationOutputSchema = z.object({
  slippageTolerance: z
    .number()
    .describe(
      'The recommended slippage tolerance as a percentage (e.g., 0.005 for 0.5%).'
    ),
  reasoning: z
    .string()
    .describe(
      'The reasoning behind the slippage tolerance recommendation, considering volatility, liquidity, and transaction size.'
    ),
});
export type SlippageRecommendationOutput = z.infer<
  typeof SlippageRecommendationOutputSchema
>;

export async function recommendSlippage(
  input: SlippageRecommendationInput
): Promise<SlippageRecommendationOutput> {
  return slippageRecommendationFlow(input);
}

const slippageRecommendationPrompt = ai.definePrompt({
  name: 'slippageRecommendationPrompt',
  input: {schema: SlippageRecommendationInputSchema},
  output: {schema: SlippageRecommendationOutputSchema},
  prompt: `You are a DeFi expert advising users on optimal slippage tolerance for token swaps.

  Given the following information about a proposed token swap, recommend a slippage tolerance percentage and explain your reasoning.

  Token In: {{{tokenInSymbol}}}
  Token Out: {{{tokenOutSymbol}}}
  Transaction Size (USD): {{{transactionSizeUSD}}}

  Consider factors such as the volatility of the tokens involved, the liquidity of the trading pair, and the size of the transaction relative to the available liquidity.

  The slippage tolerance should be a percentage (e.g., 0.005 for 0.5%).  Provide a brief explanation of your reasoning.
  `,
});

const slippageRecommendationFlow = ai.defineFlow(
  {
    name: 'slippageRecommendationFlow',
    inputSchema: SlippageRecommendationInputSchema,
    outputSchema: SlippageRecommendationOutputSchema,
  },
  async input => {
    const {output} = await slippageRecommendationPrompt(input);
    return output!;
  }
);
