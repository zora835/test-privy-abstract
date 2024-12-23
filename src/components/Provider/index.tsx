import { PrivyProvider } from "@privy-io/react-auth"
// Make sure to import `createConfig` from `@privy-io/wagmi`, not `wagmi`
import { WagmiProvider, createConfig } from "@privy-io/wagmi"
import { QueryClientProvider } from "@tanstack/react-query"
import { TonConnectUIProvider } from "@tonconnect/ui-react"
import { http } from "viem"
import { abstractTestnet, mainnet, polygon, sepolia } from "wagmi/chains"

import queryClient from "@/configs/queryClient"
import { appEnv } from "@/env"

export const config = createConfig({
    chains: [mainnet, sepolia, abstractTestnet, polygon], // Pass your required chains as an array
    transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http(),
        [abstractTestnet.id]: http(),
        [polygon.id]: http(),
        // For each of your required chains, add an entry to `transports` with
        // a key of the chain's `id` and a value of `http()`
    },
})

export default function Provider({ children }: React.PropsWithChildren) {
    return (
        <PrivyProvider
            appId={appEnv.PRIVY_APP_ID}
            clientId={appEnv.PRIVY_CLIENT_ID}
            onSuccess={(user) => console.log(`User ${user.id} logged in!`)}
            config={{
                embeddedWallets: {
                    createOnLogin: "users-without-wallets",
                },
                supportedChains: [abstractTestnet],
            }}
        >
            <QueryClientProvider client={queryClient}>
                <WagmiProvider config={config}>
                    <TonConnectUIProvider manifestUrl={`${appEnv.APP_URL}/connect-manifest.json`}>
                        {children}
                    </TonConnectUIProvider>
                </WagmiProvider>
            </QueryClientProvider>
        </PrivyProvider>
    )
}
