
"use client";

import { useState } from "react";
import type { NetworkType } from "@/lib/types";
import { Header } from "@/components/header";
import { SwapCard } from "@/components/swap-card";

export default function Home() {
  const [networkMode, setNetworkMode] = useState<NetworkType>("Mainnet");

  return (
    <div className="flex flex-col min-h-screen bg-background font-body text-foreground">
      <Header networkMode={networkMode} onNetworkChange={setNetworkMode} />
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 md:p-8">
        <SwapCard key={networkMode} networkMode={networkMode} />
      </main>
      <footer className="text-center p-4 text-sm text-muted-foreground">
        <p>This is a demo application. Do not use with real assets.</p>
      </footer>
    </div>
  );
}
