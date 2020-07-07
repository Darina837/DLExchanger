import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        valutaFrom: '',
        amountFrom: '0',
        valutaTo: '',
        amountTo: '0',
        reserveBTC: 100,
        reserveUAH: 300000,
        isRoute: false
    },
    getters: {
        valutaFrom: state => {
            return state.valutaFrom;
        },
        amountFrom: state => {
            return state.amountFrom;
        },
        valutaTo: state => {
            return state.valutaTo;
        },
        amountTo: state => {
            return state.amountTo;
        },
        reserveBTC: state => {
            return state.reserveBTC;
        },
        reserveUAH: state => {
            return state.reserveUAH;
        }
    },
    mutations: {
        setValutaFrom: (state, newValue) => {
            return state.valutaFrom = newValue;
        },
        setAmountFrom: (state, newValue) => {
            state.amountFrom = newValue;
        },
        setValutaTo: (state, newValue) => {
            state.valutaTo = newValue;
        },
        setAmountTo: (state, newValue) => {
            state.amountTo = newValue;
        },
        setReserveBTC: (state, newValue) => {
            state.reserveBTC = newValue;
        },
        setReserveUAH: (state, newValue) => {
            state.reserveBTC = newValue;
        }
    }
})