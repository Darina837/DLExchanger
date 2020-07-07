import Vue from 'vue';
import VueI18n from 'vue-i18n';
import ru from './languages/ru.json';
import ua from './languages/ua.json';
import gb from './languages/gb.json';

Vue.use(VueI18n);

export const i18n = new VueI18n({
    locale: 'ru',
    messages: { 
        ru,
        ua,
        gb
    }
})