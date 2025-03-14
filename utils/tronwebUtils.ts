
export function getNowTronResourcePrice(bandPrices: string){
    const prices = {};
    bandPrices.split(',').forEach(item => {
        const [timestamp, price] = item.split(':');
        // @ts-ignore
        prices[timestamp] = parseInt(price);
    });

    const now = Date.now();

    let currentPrice = 0;
    let maxTimestamp = 0;
    for (const timestamp in prices) {
        if (parseInt(timestamp) <= now && parseInt(timestamp) >= maxTimestamp) {
            maxTimestamp = parseInt(timestamp);
            // @ts-ignore
            currentPrice = prices[timestamp];
        }
    }

    return currentPrice;
}






