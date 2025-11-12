"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  ArrowDownUp,
  Settings,
  ChevronDown,
  Loader2,
  Sparkles,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { ALL_TOKENS } from "@/lib/tokens";
import type { NetworkType, Token } from "@/lib/types";
import { getSlippageRecommendation } from "@/lib/actions";
import type { SlippageRecommendationOutput } from "@/ai/flows/slippage-recommendation";
import { useWallet } from "@/hooks/use-wallet";

interface SwapCardProps {
  networkMode: NetworkType;
}

const TokenSelectItem = ({ token }: { token: Token }) => (
  <div className="flex items-center gap-2">
    <token.logo className="w-6 h-6" />
    <div className="flex flex-col">
      <span className="font-medium">{token.symbol}</span>
      <span className="text-xs text-muted-foreground">{token.chain.name}</span>
    </div>
  </div>
);

export function SwapCard({ networkMode }: SwapCardProps) {
  const { toast } = useToast();
  const { isConnected, connectWallet } = useWallet();
  const availableTokens = useMemo(
    () => ALL_TOKENS.filter((t) => t.chain.networkType === networkMode),
    [networkMode]
  );

  const [tokenIn, setTokenIn] = useState<Token | undefined>(availableTokens[0]);
  const [tokenOut, setTokenOut] = useState<Token | undefined>(availableTokens[1]);

  const [amountIn, setAmountIn] = useState<string>("");
  const [amountOut, setAmountOut] = useState<string>("");

  const [isLoadingQuote, setIsLoadingQuote] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);

  const [slippage, setSlippage] = useState("0.5");
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [aiRecommendation, setAiRecommendation] = useState<SlippageRecommendationOutput | null>(null);

  useEffect(() => {
    // Reset state on network change
    setTokenIn(availableTokens[0]);
    setTokenOut(availableTokens[1]);
    setAmountIn("");
    setAmountOut("");
    setAiRecommendation(null);
  }, [networkMode, availableTokens]);

  useEffect(() => {
    if (parseFloat(amountIn) > 0 && tokenIn && tokenOut) {
      setIsLoadingQuote(true);
      const timeoutId = setTimeout(() => {
        const rate =
          tokenIn.isStablecoin && tokenOut.isStablecoin
            ? 1
            : 0.98 + Math.random() * 0.04;
        setAmountOut((parseFloat(amountIn) * rate).toFixed(5));
        setIsLoadingQuote(false);
      }, 800);
      return () => clearTimeout(timeoutId);
    } else {
      setAmountOut("");
    }
  }, [amountIn, tokenIn, tokenOut]);

  const handleTokenSwap = useCallback(() => {
    setTokenIn(tokenOut);
    setTokenOut(tokenIn);
    setAmountIn(amountOut);
    setAmountOut(amountIn);
    setAiRecommendation(null);
  }, [tokenIn, tokenOut, amountIn, amountOut]);

  const handleSelectToken = (
    type: "in" | "out",
    symbol: string,
    chainId: string
  ) => {
    const selectedToken = availableTokens.find(
      (t) => t.symbol === symbol && t.chain.id === chainId
    );
    if (type === "in") {
      if (selectedToken?.symbol === tokenOut?.symbol && selectedToken?.chain.id === tokenOut?.chain.id) {
        handleTokenSwap();
      } else {
        setTokenIn(selectedToken);
      }
    } else {
      if (selectedToken?.symbol === tokenIn?.symbol && selectedToken?.chain.id === tokenIn?.chain.id) {
        handleTokenSwap();
      } else {
        setTokenOut(selectedToken);
      }
    }
    setAiRecommendation(null);
  };

  const handleGetAiRecommendation = async () => {
    if (!tokenIn || !tokenOut) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select both tokens.",
      });
      return;
    }
    setIsLoadingAi(true);
    setAiRecommendation(null);
    const result = await getSlippageRecommendation({
      tokenInSymbol: tokenIn.symbol,
      tokenOutSymbol: tokenOut.symbol,
      transactionSizeUSD: parseFloat(amountIn || "1000"),
    });
    setIsLoadingAi(false);
    if (result.success && result.data) {
      setAiRecommendation(result.data);
      setSlippage((result.data.slippageTolerance * 100).toFixed(2));
      toast({
        title: "AI Recommendation",
        description: "Slippage updated based on AI analysis.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "AI Error",
        description: result.error,
      });
    }
  };

  const handleSwap = () => {
    if (!isConnected) {
      connectWallet().catch(err => console.error("Failed to connect wallet", err));
      return;
    }
    setIsSwapping(true);
    setTimeout(() => {
      setIsSwapping(false);
      toast({
        title: "Swap Successful!",
        description: `You swapped ${amountIn} ${tokenIn?.symbol} for ${amountOut} ${tokenOut?.symbol}.`,
        className: "bg-accent text-accent-foreground border-green-500",
      });
      setAmountIn("");
      setAmountOut("");
    }, 1500);
  };

  const selectedTokenValue = (token?: Token) => token ? `${token.symbol}-${token.chain.id}` : undefined;

  const swapButtonText = !isConnected
    ? "Connect Wallet"
    : isSwapping
    ? "Swapping..."
    : "Swap";

  return (
    <Card className="w-full max-w-md shadow-2xl bg-card/80 backdrop-blur-lg border-2 border-primary/20">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="font-headline text-2xl">Swap Tokens</CardTitle>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Slippage Tolerance</h4>
                <p className="text-sm text-muted-foreground">
                  Your transaction will revert if the price changes unfavorably
                  by more than this percentage.
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="slippage">Slippage</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="slippage"
                    value={slippage}
                    onChange={(e) => setSlippage(e.target.value)}
                    className="flex-1"
                    placeholder="0.5"
                  />
                  <span className="text-muted-foreground">%</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleGetAiRecommendation}
                    disabled={isLoadingAi}
                    className="text-primary hover:text-primary"
                  >
                    {isLoadingAi ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Sparkles className="h-4 w-4" />
                    )}
                    <span className="sr-only">Get AI Recommendation</span>
                  </Button>
                  {aiRecommendation && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                           <Button variant="ghost" size="icon" className="cursor-help">
                              <Info className="h-4 w-4 text-primary" />
                           </Button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="font-bold">AI Reasoning:</p>
                          <p>{aiRecommendation.reasoning}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </CardHeader>
      <CardContent className="space-y-1 relative">
        <div className="grid gap-2 p-4 border rounded-lg bg-background/50">
          <Label>You Pay</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="0.0"
              className="text-2xl h-auto flex-1 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
              value={amountIn}
              onChange={(e) => setAmountIn(e.target.value)}
            />
            <Select
              onValueChange={(val) => handleSelectToken("in", ...val.split('-'))}
              value={selectedTokenValue(tokenIn)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select token" >
                    {tokenIn && <TokenSelectItem token={tokenIn} />}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {availableTokens.map((token) => (
                  <SelectItem key={`${token.symbol}-${token.chain.id}`} value={`${token.symbol}-${token.chain.id}`}>
                    <TokenSelectItem token={token} />
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-center my-[-1rem] z-10">
            <Button variant="outline" size="icon" className="rounded-full bg-card" onClick={handleTokenSwap}>
                <ArrowDownUp className="h-4 w-4" />
            </Button>
        </div>

        <div className="grid gap-2 p-4 border rounded-lg bg-background/50">
          <Label>You Receive</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="0.0"
              className="text-2xl h-auto flex-1 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
              value={amountOut}
              readOnly
            />
            {isLoadingQuote ? (
              <Skeleton className="w-[180px] h-10" />
            ) : (
              <Select
                onValueChange={(val) => handleSelectToken("out", ...val.split('-'))}
                value={selectedTokenValue(tokenOut)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select token" >
                    {tokenOut && <TokenSelectItem token={tokenOut} />}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {availableTokens.map((token) => (
                    <SelectItem key={`${token.symbol}-${token.chain.id}`} value={`${token.symbol}-${token.chain.id}`}>
                      <TokenSelectItem token={token} />
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full text-lg h-12 bg-accent hover:bg-accent/90 text-accent-foreground"
          onClick={handleSwap}
          disabled={isSwapping || isLoadingQuote || !parseFloat(amountIn) || !tokenIn || !tokenOut}
        >
          {isSwapping ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : null}
          {swapButtonText}
        </Button>
      </CardFooter>
    </Card>
  );
}
