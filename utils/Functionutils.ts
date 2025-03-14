
// 防抖函数
export const Debounce = <T extends (...args: any[]) => void>(
    func: T,
    wait: number,
    immediate: boolean = false
): T => {
    let timeout: any;

    return function (this: any, ...args: any[]) {
        const context = this;

        const later = () => {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        };

        const callNow = immediate && !timeout;

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);

        if (callNow) {
            func.apply(context, args);
        }
    } as T;
};

// 节流函数
export const Throttling = <T extends (...args: any[]) => void>(
    func: T,
    wait: number,
    immediate: boolean = false
): T => {
    let timeout: any;
    let previous = 0;

    return function (this: any, ...args: any[]) {
        const context = this;
        const now = Date.now();
        const remaining = wait - (now - previous);

        if (remaining <= 0) {
            clearTimeout(timeout);
            func.apply(context, args);
            previous = now;
        } else if (!timeout) {
            if (immediate) {
                func.apply(context, args);
            }
            timeout = setTimeout(() => {
                timeout = null;
                if (!immediate) {
                    func.apply(context, args);
                }
                previous = Date.now();
            }, remaining);
        }
    } as T;
};