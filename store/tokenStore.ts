import { create } from 'zustand'

// interface Token {
//     name: string
//     symbol: string
//     address: string
//     decimals: number
//     showDecimals: number
//     usd: string
//     changes: string
//     icon: string
// }

interface TokenState {
    network: string
    tokens: any[]
}

interface TokenAction {
    setNetwork: (network: string) => void
    setTokens: (tokens: any[]) => void
}

// @ts-ignore
export const useTokenStore = create<TokenState & TokenAction>((set) => ({
   network: 'Tron',
   tokens: [],
   setNetwork: (network) => set({ network: network }),
   setTokens: (tokens) => set({ tokens: tokens })
}))


