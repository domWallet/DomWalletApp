

export function formatAddress(address: string, indexStart: number, indexEnd: number){
    return `${address.slice(0, indexStart)}...${address.slice(-indexEnd, address.length)}`
}



