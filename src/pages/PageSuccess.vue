<template>
    <div>
        <Header />
        <SuccessMessage />
    </div>   
</template>

<script>
import Header from '../components/Header.vue';
import SuccessMessage from '../components/SuccessMessage.vue';
export default {
    name: 'PageSuccess',
    components: {
        Header,
        SuccessMessage
    },
    mounted() {
        setTimeout(() => {
            this.$store.state.amountFrom = '';
            this.$store.state.amountTo = '';
            this.$store.state.valutaFrom = '';
            this.$store.state.valutaTo= '';
            this.$store.state.isRoute = false;
            this.$router.push({name: 'home'});
        }, 3000);
    }
}
</script>