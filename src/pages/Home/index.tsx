import { AbstractClient, createAbstractClient } from "@abstract-foundation/agw-client"
import ReactJsonView from "@microlink/react-json-view"
import { usePrivy } from "@privy-io/react-auth"
import { CheckIcon, CopyIcon, ExternalLink } from "lucide-react"
import { useEffect, useState } from "react"
import { encodeFunctionData, parseAbi } from "viem"
import { getGeneralPaymasterInput } from "viem/zksync"
import { useAccount, useWalletClient } from "wagmi"
import { abstractTestnet } from "wagmi/chains"

import Layout from "@/components/Layout"
import { Button } from "@/components/ui/button"
import { maskAddress } from "@/lib/address"

export default function HomePage() {
    const { user, logout } = usePrivy()
    const walletClient = useWalletClient()
    const [agwClient, setAgwClient] = useState<AbstractClient | undefined>(undefined)
    const [hashes, setHashes] = useState<string[]>([])
    const [isMinting, setMinting] = useState(false)
    const account = useAccount()
    const address = account.address
    const agwAddress = agwClient?.account.address

    async function handleClickMint() {
        if (!agwClient || isMinting) {
            return
        }

        setMinting(true)

        try {
            const data = encodeFunctionData({
                abi: parseAbi(["function mint(address,uint256) external"]),
                functionName: "mint",
                args: [agwClient.account.address, BigInt(1)],
            })

            const hash = await agwClient.sendTransaction({
                to: "0xC4822AbB9F05646A9Ce44EFa6dDcda0Bf45595AA",
                data,
                paymaster: "0x5407B5040dec3D339A9247f3654E59EEccbb6391",
                paymasterInput: getGeneralPaymasterInput({
                    innerInput: "0x",
                }),
            })

            setHashes((hashes) => [...hashes, hash])
            console.log({
                hash,
                link: `https://explorer.testnet.abs.xyz/tx/${hash}`,
            })
        } catch (e) {
            const error = e as Error
            console.log({
                error,
                from: "mint",
            })
        }

        setMinting(false)
    }

    useEffect(() => {
        if (!walletClient.data || !user) {
            setAgwClient(undefined)
            return
        }

        const run = async () => {
            const agwClient = await createAbstractClient({
                chain: abstractTestnet,
                signer: {
                    address: walletClient.data.account.address,
                    signMessage: walletClient.data.signMessage,
                    // @ts-ignore
                    signTransaction: walletClient.data.signTransaction,
                    // @ts-ignore
                    signTypedData: walletClient.data.signTypedData,
                }, // This is the AGW "owner" (the initial approved signer) of the smart contract wallet.
                // isPrivyCrossApp: true,
            })

            setAgwClient(agwClient)
        }

        run()
    }, [user, walletClient.data])

    return (
        <Layout className="flex flex-col p-4 gap-4">
            <div className="my-4 flex justify-center items-center">
                <span className="text-xl font-semibold">Test Privy + Abstract Global Wallet</span>
            </div>

            {user && (
                <div>
                    <Button onClick={logout}>Logout</Button>
                </div>
            )}

            <div className="w-full flex flex-col gap-1 overflow-hidden max-h-[480px]">
                <span className="text-sm font-semibold text-secondary">User</span>
                <ReactJsonView
                    src={user ? { user } : {}}
                    theme="summerfruit"
                    style={{
                        overflow: "scroll",
                    }}
                    displayDataTypes={false}
                    displayArrayKey={false}
                    displayObjectSize={false}
                />
            </div>

            <div className="w-full flex flex-col gap-1">
                <span className="text-sm font-semibold text-secondary">Privy embedded wallet</span>
                <span className="text-sm font-medium">{address}</span>
                <div className="flex gap-2 text-secondary text-sm font-medium">
                    <CopyButton content={address} />
                    <span>|</span>
                    <button
                        onClick={() => {
                            openInNewTab(`https://explorer.testnet.abs.xyz/address/${address}`)
                        }}
                        className="flex-none flex items-center gap-1 w-fit"
                    >
                        View on Explorer <ExternalLink className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="w-full flex flex-col gap-1">
                <span className="text-sm font-semibold text-secondary">Abstract Global Wallet</span>
                <span className="text-sm font-medium">{agwAddress}</span>
                <div className="flex gap-2 text-secondary text-sm font-medium">
                    <CopyButton content={agwAddress} />
                    <span>|</span>
                    <button
                        onClick={() => {
                            openInNewTab(`https://explorer.testnet.abs.xyz/address/${agwAddress}`)
                        }}
                        className="flex-none flex items-center gap-1 w-fit"
                    >
                        View on Explorer <ExternalLink className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <Button size="lg" variant="primary" className="w-fit" onClick={handleClickMint}>
                Mint NFT
            </Button>

            <div className="w-full h-0 border-b-2" />

            <div className="w-full flex flex-col gap-4">
                <span className="text-sm font-semibold text-secondary">Transactions</span>
                {hashes.map((hash) => {
                    return (
                        <div key={hash} className="w-full flex flex-col gap-1">
                            <span className="text-sm font-medium">{maskAddress(hash, 24)}</span>
                            <div className="flex gap-2 text-secondary text-sm font-medium">
                                <CopyButton content={hash} />
                                <span>|</span>
                                <button
                                    onClick={() => {
                                        openInNewTab(`https://explorer.testnet.abs.xyz/tx/${hash}`)
                                    }}
                                    className="flex-none flex items-center gap-1 w-fit"
                                >
                                    View on Explorer <ExternalLink className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Layout>
    )
}

function openInNewTab(url: string) {
    window.open(url, "_blank")?.focus()
}

function CopyButton({ content }: React.PropsWithChildren<{ content?: string }>) {
    const [copied, setCopied] = useState(false)
    return (
        <button
            onClick={async () => {
                if (!content) {
                    return
                }

                await navigator.clipboard.writeText(content)
                setCopied(true)
                setTimeout(() => {
                    setCopied(false)
                }, 600)
            }}
            className="flex-none flex items-center gap-1"
        >
            Copy
            {copied ? (
                <CheckIcon className="flex-none w-4 h-4 stroke-[2]" />
            ) : (
                <CopyIcon className="flex-none w-4 h-4 stroke-[2]" />
            )}
        </button>
    )
}
