import { create } from 'zustand'

type accountState = {
    accountName: string
    accountAddress: string
    accountPrivateKey: string
    balance: number
    transactionHistoryIDs: any[]
    otherAccounts: any[]
}

type accountAction = {
    setAccountName: (accountName: string) => void
    setAccountAddress: (accountAddress: string) => void
    setAccountPrivateKey: (accountPrivateKey: string) => void
    setBalance: (balance: number) => void
    setTransactionHistoryIDs: (transactionHistoryIDs: any[]) => void
    setOtherAccounts: (otherAccounts: any[]) => void
}
// @ts-ignore
const useAccountStore = create<accountState & accountAction>((set) => ({
    accountName: '',
    accountAddress: '',
    balance: 0,
    transactionHistoryIDs: [],
    otherAccounts: [],
    setAccountName: (accountName: string) => set((state) => ({accountName: accountName})),
    setAccountAddress: (accountAddress: string) => set((state) => ({accountAddress: accountAddress})),
    setAccountPrivateKey: (accountPrivateKey: string) => set((state) => ({accountPrivateKey: accountPrivateKey})),
    setBalance: (balance: number) => set((state) => ({balance: balance})),
    setTransactionHistoryIDs: (transactionHistoryIDs: any[]) => set((state) => ({transactionHistoryIDs: transactionHistoryIDs})),
    setOtherAccounts: (otherAccounts: any[]) => set((state) => ({otherAccounts: otherAccounts})),
}))


export default useAccountStore