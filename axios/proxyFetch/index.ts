import axios from "axios";

const originalFetch = window.fetch
const originalHR = XMLHttpRequest.prototype.open


 const proxy = {
        host: 'baba.redstargenesis.com',
        port: 3333
}


const addFetchProxy = () => {
    window.fetch = async (url, options) => {
        // console.log("fetch", url, options)
        return originalFetch(url, options)
    }
    // (function() {
    //     const originalOpen = XMLHttpRequest.prototype.open;
    //     const originalSend = XMLHttpRequest.prototype.send;
    //
    //     XMLHttpRequest.prototype.open = function(method, url) {
    //         console.log('📡 拦截到 XMLHttpRequest:', method, url);
    //
    //         // 记录 URL，供 send 方法使用
    //         this._interceptedUrl = url;
    //
    //         // @ts-ignore
    //         return originalOpen.apply(this, arguments);
    //     };
    //
    //     XMLHttpRequest.prototype.send = function(body) {
    //         console.log('📤 发送请求:', this._interceptedUrl, 'Body:', body);
    //         // @ts-ignore
    //         return originalSend.apply(this, arguments);
    //     };
    // })();
    (function() {
        const originalOpen = XMLHttpRequest.prototype.open;
        const originalSend = XMLHttpRequest.prototype.send;

        XMLHttpRequest.prototype.open = function(method, url, async = true) {
            console.log('📡 拦截到 XMLHttpRequest:', method, url);

            // 这里存储请求的 URL，后续 send() 需要用到
            this._requestMethod = method;
            this._requestUrl = url;
            this._isIntercepted = true; // 标记请求已被拦截

            // @ts-ignore
            return originalOpen.apply(this, arguments);
        };

        XMLHttpRequest.prototype.send = function(body) {
            if (this._isIntercepted) {
                console.log('🚀 使用 axios 代理请求:', this._requestMethod, this._requestUrl);


                // 通过 axios 转发请求
                axios({
                    method: this._requestMethod,
                    url: this._requestUrl,
                    data: body,
                    headers: { 'Content-Type': 'application/json' }, // 视具体情况而定
                    proxy: proxy
                })
                    .then(response => {
                        console.log('✅ 代理请求成功:', response.data);

                        // 模拟 XMLHttpRequest 的 onload 事件
                        this.status = response.status;
                        this.responseText = JSON.stringify(response.data);
                        this.onload && this.onload();
                    })
                    .catch(error => {
                        console.error('❌ 代理请求失败:', error);
                        this.onerror && this.onerror(error);
                    });

                return;
            }

            return originalSend.apply(this, arguments);
        };
    })();
}


export { addFetchProxy }
