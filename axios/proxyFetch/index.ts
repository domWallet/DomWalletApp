import axios from "axios";

const originalFetch = window.fetch
const originalHR = XMLHttpRequest.prototype.open


 const proxy = {
        host: 'baba.redstargenesis.com',
        port: 3333
}


const addFetchProxy = () => {
    window.fetch = async (url, options) => {
        return originalFetch(url, options)
    }

}


export { addFetchProxy }
