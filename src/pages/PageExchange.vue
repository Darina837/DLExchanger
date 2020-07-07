<template>
    <div>
        <Header />
        <main class="main-content">
            <ExchangerForm />
            <ExchangerRates />
        </main>
    </div>
</template>

<script>
import Header from '../components/Header.vue';
import ExchangerForm from '../components/ExchangerForm.vue';
import ExchangerRates from '../components/ExchangerRates.vue';

export default {
    name: 'PageExchange',
    components: {
        Header,
        ExchangerForm,
        ExchangerRates
    }
}
</script>

<style>
.main-content {
    height: calc(100vh - 10vh);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>