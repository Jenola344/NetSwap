# NetSwap

A decentralized token swap interface supporting both mainnet and testnet environments. Built for developers who need to test contracts and traders who want a unified swapping experience.

## What This Does

NetSwap provides a simple interface for swapping ERC-20 tokens across multiple blockchain networks. The main feature is dual environment support—you can swap real tokens on mainnet or test your integrations on testnet networks without switching apps.

## Why Use This

If you're developing DApps, you need to test token swaps before going live. NetSwap lets you do that on testnets with the same interface you'd use in production. For traders, it's a straightforward DEX that works across multiple chains.

## Getting Started

### Requirements

- MetaMask or another Web3 wallet

Get these credentials from:
- Infura: https://infura.io (free tier available)
- Alchemy: https://alchemy.com (free tier available)
- WalletConnect: https://cloud.walletconnect.com

## Supported Networks

**Production:**
- Ethereum (ETH)
- Polygon (MATIC)
- Binance Smart Chain (BSC)
- Arbitrum
- Optimism

**Testing:**
- Goerli (Ethereum testnet)
- Mumbai (Polygon testnet)
- Sepolia (Ethereum testnet)
- Arbitrum Goerli
- Optimism Goerli

## How to Use

**Basic Swap:**
1. Connect your wallet
2. Make sure you're on the right network
3. Select tokens and enter amount
4. Check the exchange rate and slippage
5. Confirm in your wallet

**For Developers:**
1. Switch to a testnet in your wallet
2. Get testnet tokens from a faucet
3. Test your swap logic
4. When ready, switch to mainnet

**Settings:**
- Slippage tolerance: 0.1% to 1% (default 0.5%)
- Transaction deadline: 10-30 minutes
- Expert mode: Skip confirmation screens (be careful with this)


## Tech Stack

**Frontend:**
- React with TypeScript
- Ethers.js for blockchain interaction
- Wagmi for React hooks
- Tailwind CSS for styling

**Infrastructure:**
- Infura/Alchemy for node access
- The Graph for transaction history
- WalletConnect for mobile wallets
- IPFS for decentralized hosting

**Smart Contracts:**
- Swap router for token exchanges
- Price oracle for real-time rates
- Custom liquidity pools

## Important Security Notes

**Testnet:**
- Testnet tokens are worthless
- Networks can reset without notice
- Always verify you're on testnet before testing
- Don't send real tokens to testnet addresses

**Mainnet:**
- Always verify token contract addresses
- Start with small amounts for unfamiliar tokens
- Check slippage settings
- Review gas fees before confirming
- Use a hardware wallet for large amounts

**General:**
- Never share your private keys or seed phrase
- Double-check URLs (watch for phishing sites)
- Verify contract addresses on Etherscan
- Keep your wallet software updated

## Getting Testnet Tokens

You'll need testnet ETH or MATIC to test:

- Goerli ETH: https://goerlifaucet.com
- Mumbai MATIC: https://faucet.polygon.technology
- Sepolia ETH: https://sepoliafaucet.com

Most faucets give you enough for several test transactions.

## Common Issues

**"Insufficient funds for gas"**
- Get more testnet/mainnet tokens
- Lower the gas price if network isn't congested

**"Transaction failed"**
- Check you have enough of the input token
- Increase slippage tolerance
- Make sure you're on the correct network

**"Cannot read properties of undefined"**
- Wallet not connected
- Wrong network selected
- RPC endpoint issue (try switching networks)

## Contributing

Fork the repo, make changes, and open a pull request. Please:
- Write clear commit messages
- Add tests for new features
- Update documentation as needed
- Follow the existing code style

## License

MIT License - see LICENSE file

## Need Help?

- Check the [Issues](https://github.com/Jenola344/NetSwap/issues) page
- Read the [Wiki](https://github.com/Jenola344/NetSwap/wiki) for detailed guides
- Ask in [Discussions](https://github.com/Jenola344/NetSwap/discussions)

## Disclaimer

This is experimental software. Always verify transactions before confirming. The developers are not responsible for lost funds due to user error, bugs, or smart contract vulnerabilities. Never trade more than you can afford to lose.
