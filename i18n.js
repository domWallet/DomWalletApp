// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 导入模块翻译文件
import En from './locales/en/index';
import Zh from './locales/zh/index'

const resources = {
    en: En,
    zh: Zh,
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en',
        defaultNS: 'home', // 设置默认命名空间
        ns: ['home', 'header', 'import', 'create'], // 设置命名空间列表
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;