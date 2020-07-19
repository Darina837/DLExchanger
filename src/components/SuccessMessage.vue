<template>
    <main class="main-content">
        <h1>{{ 'successMessage' | translate }} <span>{{ amountFrom }}{{ valutaFrom }} &#8594; {{ amountTo }}{{ valutaTo }}</span></h1>
    </main>
</template>

<script>


export default {
    name: 'SuccessMessage',

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