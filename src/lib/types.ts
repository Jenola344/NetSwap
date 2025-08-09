import type React from "react";

export type NetworkType = "Mainnet" | "Testnet";

export interface Chain {
  id: string;
  name: string;
  logo: React.ComponentType<{ className?: string }>;
  networkType: NetworkType;
}

export interface Token {
  symbol: string;
  name: string;
  logo: React.ComponentType<{ className?: string }>;
  chain: Chain;
  isStablecoin: boolean;
}
