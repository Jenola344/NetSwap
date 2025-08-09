import type { Chain, Token } from "@/lib/types";
import { Ethereum, Base, Celo, Usdc, Usdt, Dai } from "@/components/icons";

const CHAINS_MAINNET: Chain[] = [
  { id: 'eth-mainnet', name: "Ethereum", logo: Ethereum, networkType: "Mainnet" },
  { id: 'base-mainnet', name: "Base", logo: Base, networkType: "Mainnet" },
  { id: 'celo-mainnet', name: "Celo", logo: Celo, networkType: "Mainnet" },
];

const CHAINS_TESTNET: Chain[] = [
  { id: 'eth-sepolia', name: "Sepolia", logo: Ethereum, networkType: "Testnet" },
  { id: 'base-goerli', name: "Base Goerli", logo: Base, networkType: "Testnet" },
  { id: 'celo-alfajores', name: "Alfajores", logo: Celo, networkType: "Testnet" },
];

const TOKENS_MAINNET: Token[] = [
  { symbol: "ETH", name: "Ethereum", logo: Ethereum, chain: CHAINS_MAINNET[0], isStablecoin: false },
  { symbol: "USDC", name: "USD Coin", logo: Usdc, chain: CHAINS_MAINNET[0], isStablecoin: true },
  { symbol: "USDT", name: "Tether", logo: Usdt, chain: CHAINS_MAINNET[0], isStablecoin: true },
  { symbol: "DAI", name: "Dai", logo: Dai, chain: CHAINS_MAINNET[0], isStablecoin: true },

  { symbol: "ETH", name: "Ethereum", logo: Ethereum, chain: CHAINS_MAINNET[1], isStablecoin: false },
  { symbol: "USDC", name: "USD Coin", logo: Usdc, chain: CHAINS_MAINNET[1], isStablecoin: true },

  { symbol: "CELO", name: "Celo", logo: Celo, chain: CHAINS_MAINNET[2], isStablecoin: false },
  { symbol: "cUSD", name: "Celo Dollar", logo: Usdc, chain: CHAINS_MAINNET[2], isStablecoin: true },
];

const TOKENS_TESTNET: Token[] = [
    { symbol: "ETH", name: "Sepolia ETH", logo: Ethereum, chain: CHAINS_TESTNET[0], isStablecoin: false },
    { symbol: "USDC", name: "Sepolia USDC", logo: Usdc, chain: CHAINS_TESTNET[0], isStablecoin: true },

    { symbol: "ETH", name: "Base Goerli ETH", logo: Ethereum, chain: CHAINS_TESTNET[1], isStablecoin: false },

    { symbol: "CELO", name: "Alfajores CELO", logo: Celo, chain: CHAINS_TESTNET[2], isStablecoin: false },
];

export const ALL_TOKENS = [...TOKENS_MAINNET, ...TOKENS_TESTNET];
