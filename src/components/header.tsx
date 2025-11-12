"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import type { NetworkType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/use-wallet";
import { truncateAddress } from "@/lib/utils";


interface HeaderProps {
  networkMode: NetworkType;
  onNetworkChange: (mode: NetworkType) => void;
}

export function Header({ networkMode, onNetworkChange }: HeaderProps) {
  const { connectWallet, disconnectWallet, address, isConnecting } = useWallet();
  const isTestnet = networkMode === "Testnet";

  const handleConnect = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  return (
    <header className="p-4 border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-headline font-bold text-primary">
          NetSwap
        </h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Label htmlFor="network-mode" className={isTestnet ? 'text-muted-foreground' : 'text-foreground'}>
              Mainnet
            </Label>
            <Switch
              id="network-mode"
              checked={isTestnet}
              onCheckedChange={(checked) => onNetworkChange(checked ? "Testnet" : "Mainnet")}
              aria-label="Toggle between Mainnet and Testnet"
            />
            <Label htmlFor="network-mode" className={!isTestnet ? 'text-muted-foreground' : 'text-foreground'}>
              Testnet
            </Label>
          </div>
          {address ? (
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono bg-muted px-2 py-1 rounded-md">{truncateAddress(address)}</span>
              <Button variant="outline" size="sm" onClick={disconnectWallet}>Disconnect</Button>
            </div>
          ) : (
            <Button onClick={handleConnect} disabled={isConnecting}>
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
