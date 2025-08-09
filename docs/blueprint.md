# **App Name**: NetSwap

## Core Features:

- Network Mode Toggle: Enable users to toggle between Testnet and Mainnet modes via a single UI switch, dynamically adjusting available swap options based on the selected mode.
- Auto-Network Detection: Automatically detect the user's current network and filter available swaps to display only compatible options.
- Real-Time Quotes: Integrate real-time quote functionality using 0x API or 1inch aggregator to provide users with up-to-date swap rates.
- Same-Network Swaps: Facilitate token swaps within the same network type (Testnet↔Testnet or Mainnet↔Mainnet) for Ethereum, Base, and Celo chains, using Uniswap V3-style concentrated liquidity.
- Stablecoin Swaps: Support stablecoin swaps (USDC, USDT, DAI) with enforced 1:1 pegging, reverting transactions if a stablecoin depegs beyond a set threshold (e.g., 2%).
- Security & Gas Optimization: Implement EIP-2612 (permit) for gasless token approvals, reentrancy guards for security, multisig admin for upgrades, and gas refunds for failed swaps.
- AI-Powered Slippage: Use a generative AI "tool" to recommend optimal slippage tolerances for various token pairs, improving transaction success rates while managing risk.

## Style Guidelines:

- Primary color: Use a vibrant blue (#29ABE2) to represent trust and reliability within decentralized finance. It gives the user a safe and energetic impression.
- Background color: Choose a light gray (#F5F5F5) to provide a clean, modern backdrop that ensures readability and reduces eye strain.
- Accent color: Apply a bright green (#90EE90) for interactive elements, CTAs, and success states to guide user actions and enhance the interface.
- Font pairing: Use 'Space Grotesk' (sans-serif) for headlines and 'Inter' (sans-serif) for body text, providing a modern and readable feel.
- Employ minimalist, line-based icons for intuitive navigation, representing various tokens and functions within the swap interface.
- Design a clean, intuitive layout with a focus on ease of use, incorporating clear visual hierarchy and consistent spacing.
- Incorporate subtle animations for loading states and confirmations, providing feedback and enhancing user engagement.