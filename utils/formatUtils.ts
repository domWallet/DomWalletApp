

export function formatAllPrice(num: number) {
    let str = formatPrice(num)
    return str
}

export function formatPrice(num: number) {
    return num.toLocaleString()
}

