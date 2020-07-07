<template>
    <main class="main-content">
        <h1>{{ this.translate('successMessage') }} <span>{{ amountFrom }}{{ valutaFrom }} &#8594; {{ amountTo }}{{ valutaTo }}</span></h1>
    </main>
</template>

<script>
import translateMixin from '../plugins/translateMixin';
export default {
    name: 'SuccessMessage',
    mixins: [translateMixin],
    computed: {
        valutaFrom: function() {
            return this.$store.getters.valutaFrom;
        }, 
        valutaTo: function() {
            return this.$store.getters.valutaTo;
        }, 
        amountFrom: function() {
            return this.$store.getters.amountFrom;
        }, 
        amountTo: function() {
            return this.$store.getters.amountTo;
        } 
    }
}
</script>

<style scoped>
span {
    color: rgb(65, 67, 156);
}
</style>