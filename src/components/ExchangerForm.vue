<template>
    <div class="wrapper-form">
        <h1>{{ this.translate('headerContent') }}</h1>
        <form>
            <md-field>
                <label>{{ this.translate('textGIVE') }}</label>
                <md-select v-model="valutaFrom">
                    <md-option v-for="rate in ratesFrom" :value="rate" :key="rate">{{ rate }}</md-option>
                </md-select>
            </md-field>

            <md-field>
                <label>{{ this.translate('textForAmount') }}</label>
                <md-input type="number" min="0" v-model="amountFrom" />
            </md-field>

            <div @click="change()" class="button-change"><h1>↻</h1></div>

            <md-field>
                <label>{{ this.translate('textGET') }}</label>
                <md-select v-model="valutaTo">
                    <md-option v-for="rate in ratesTo" :value="rate" :key="rate">{{ rate }}</md-option>
                </md-select>
            </md-field>

            <md-field :class="messageClass">
                <label>{{ this.translate('textForAmount') }}</label>
                <md-input type="number" min="0" v-model="amountTo" />
                <span class="md-error">{{ this.translate('errorMessage') }}</span>
            </md-field>
        </form>
        <md-button @click="route" class="md-raised btn-exchage" :disabled="disabledButton">{{ this.translate('textButton.false').toUpperCase() }}</md-button>
    </div>
</template>

<script>
import axios from 'axios';
import translateMixin from '../plugins/translateMixin';
export default {
    name: 'ExchangerForm',
    mixins: [translateMixin],
    data() {
        return {
            rates: ['BTC', 'UAH'],
            valutaFrom: '',
            valutaTo: '',
            buyBitcoin: '',
            sellBitcoin: '',
            disabledButton: true,
            hasMessages: false
        }
    },
    computed: {
        ratesFrom() {
            let arr = [];
            for(let item of this.rates) {
                if(item !== this.$store.getters.valutaTo) {
                    arr.push(item);
                }
            }
            return arr;
        },
        ratesTo() {
            let arr = [];
            for(let item of this.rates) {
                if(item !== this.$store.getters.valutaFrom) {
                    arr.push(item);
                }
            }
            return arr;
        },
        amountFrom: {    
            get() {
                return this.$store.getters.amountFrom;
            },
            set(newValue) {
                if(this.$store.getters.valutaFrom === 'UAH') {
                    let result = Number(newValue) / Number(this.sellBitcoin);
                    this.$store.commit('setAmountTo', parseFloat(result.toFixed(2)));
                } else if(this.$store.getters.valutaFrom === 'BTC') {
                    let result = Number(newValue) * Number(this.buyBitcoin);
                    this.$store.commit('setAmountTo', parseFloat(result.toFixed(2)));
                }
            }
        },
        amountTo: {
            get() {
                return this.$store.getters.amountTo;
            },
            set(newValue) {
                if(this.$store.getters.valutaTo === 'UAH') {
                    let result = Number(newValue) / Number(this.buyBitcoin);
                    this.$store.commit('setAmountFrom', parseFloat(result.toFixed(2)));
                } else if(this.$store.getters.valutaTo === 'BTC') {
                    let result = Number(newValue) * Number(this.sellBitcoin);
                    this.$store.commit('setAmountFrom', parseFloat(result.toFixed(2)));
                }
            }
        },
        messageClass () {
            return {
                'md-invalid': this.hasMessages
            }
        },
        reserve() {
            let result;
            if(this.valutaFrom === 'BTC') {
                result = this.$store.getters.reserveUAH + 'UAH';
            } else if(this.valutaFrom === 'UAH') {
                result = this.$store.getters.reserveBTC + 'BTC';
            }   
            return result; 
        },
    },
    mounted() {
        axios.get('https://kuna.io/api/v2/tickers/btcuah')
        .then(
            result => {
                this.buyBitcoin = result.data.ticker.buy;
                this.sellBitcoin = result.data.ticker.sell;
            }
        )
    },
    updated() {
        if(this.valutaFrom.length > 0) {
            this.$store.commit('setValutaFrom', this.valutaFrom);
        }
        if(this.valutaTo.length > 0) {
            this.$store.commit('setValutaTo', this.valutaTo);
        }
        if(this.valutaFrom === 'BTC') {
            this.valutaTo = 'UAH'
        }
        if(this.valutaTo === 'BTC') {
            this.valutaFrom = 'UAH'
        }
        if(this.valutaFrom === 'UAH') {
            this.valutaTo = 'BTC'
        }
        if(this.valutaTo === 'UAH') {
            this.valutaFrom = 'BTC'
        }
        if(this.amountFrom.length === 0 || this.amountTo.length === 0 || Number(this.amountFrom) < 0 || Number(this.amountTo) < 0 || Number(this.amountFrom) === 0 || Number(this.amountTo) === 0) {
            document.querySelector('.btn-exchage').innerHTML = this.translate('textButton.false').toUpperCase();
            return this.disabledButton = true;
        } else if(Number(this.amountTo) > Number(this.reserve.slice(0, this.reserve.length - 3))) { 
            document.querySelector('.btn-exchage').innerHTML = this.translate('textButton.false').toUpperCase();
            this.disabledButton = true;
            return this.hasMessages = true;
        } else {
            document.querySelector('.btn-exchage').innerHTML = this.translate('textButton.true').toUpperCase();
            this.disabledButton = false;
            return this.hasMessages = false;
        }
    },
    methods: {
        change() {
            let from = this.valutaFrom;
            let to = this.valutaTo;
            this.valutaFrom = to;
            this.valutaTo = from;
            this.amountFrom = '';
            this.amountTo = '';
        },
        route() {
            this.$store.state.isRoute = true;
            this.$router.push({name: 'success'});
        }
    }
}
</script>

<style>
.wrapper-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;
}
.wrapper-form > h1 {
    margin-bottom: 30px;
}
.wrapper-form > form {
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.button-change {
    cursor: pointer;
    margin: 0 20px;
    transition: all 0.3s ease-in-out;
}
.button-change:hover {
    color: rgb(65, 67, 156);
}
.btn-exchage {
    padding: 5px 15px;
} 
</style>