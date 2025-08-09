"use server";

import { recommendSlippage } from "@/ai/flows/slippage-recommendation";
import { z } from "zod";

const SlippageActionInputSchema = z.object({
  tokenInSymbol: z.string(),
  tokenOutSymbol: z.string(),
  transactionSizeUSD: z.number(),
});

export async function getSlippageRecommendation(
  input: z.infer<typeof SlippageActionInputSchema>
) {
  try {
    const result = await recommendSlippage(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("AI slippage recommendation failed:", error);
    return { success: false, error: "Failed to get AI recommendation." };
  }
}
