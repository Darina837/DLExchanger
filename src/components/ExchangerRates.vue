<template>
    <div class='bottom-content'>
        <div v-if="valutaFrom">
            <md-table md-card class="table-rates">
                <md-table-toolbar>
                    <h1 class="md-title">{{ this.translate('textAt') }} {{showDate}}</h1>
                </md-table-toolbar>
                <md-table-row>
                    <md-table-head v-if="valutaFrom === 'UAH'">{{ this.translate('textSell') }}</md-table-head>
                    <md-table-head v-else>{{ this.translate('textBuy') }}</md-table-head>
                    <md-table-head>{{ this.translate('textLow') }}</md-table-head>
                    <md-table-head>{{ this.translate('textHigh') }}</md-table-head>
                    <md-table-head>{{ this.translate('textLast') }}</md-table-head>
                    <md-table-head>{{ this.translate('reserve') }}</md-table-head>
                </md-table-row>
                <md-table-row>
                    <md-table-cell v-if="valutaFrom === 'UAH'">{{ sell }}</md-table-cell>
                    <md-table-cell v-else>{{ buy }}</md-table-cell>
                    <md-table-cell>{{ low }}</md-table-cell>
                    <md-table-cell>{{ high }}</md-table-cell>
                    <md-table-cell>{{ last }}</md-table-cell>
                    <md-table-cell>{{ reserve }}</md-table-cell>
                </md-table-row>
            </md-table>    
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import translateMixin from '../plugins/translateMixin';
export default {
    name: 'ExchangerRates',
    mixins: [translateMixin],
    data() {
        return {
            at: '',
            buy: '',
            sell: '',
            low: '',
            high: '',
            last: ''
        }
    },
    computed: {
        valutaFrom() {
            return this.$store.getters.valutaFrom;
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
        showDate() {
            let tmp;
            if(this.at) {
                let h, m, s;
                if(this.at.getHours() < 10) {
                    h = '0' + this.at.getHours();
                } else {
                    h = this.at.getHours();
                }
                if(this.at.getMinutes() < 10) {
                    m = '0' + this.at.getMinutes();
                } else {
                    m = this.at.getMinutes();
                }
                if(this.at.getSeconds() < 10) {
                    s = '0' + this.at.getSeconds();
                } else {
                    s = this.at.getSeconds();
                }
                tmp = `${h}:${m}:${s}`;    
            }
            return tmp;
        }
    },
    mounted() {
        axios.get('https://kuna.io/api/v2/tickers/btcuah')
        .then(
            result => {
                this.buy = result.data.ticker.buy;
                this.sell = result.data.ticker.sell;
                this.low = result.data.ticker.low;
                this.high = result.data.ticker.high;
                this.last = result.data.ticker.last;
                this.at = new Date(result.data.at * 1000);
            }
        )
    },
}
</script>

<style scoped>
.table-rates {
    width: 90vw;
}
td, th {
    text-align: center;
}
</style>