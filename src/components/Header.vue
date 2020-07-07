<template>
    <header class="header">
        <router-link to="/"><h1>DLExchanger</h1></router-link>   
        <div>
            <button v-for="language in arrayLanguages" :key="language" @click="setLocale(language)"><country-flag :country="language" size="big" /></button>    
        </div>
    </header>
</template>

<script>
import CountryFlag from 'vue-country-flag'
export default {
    name: 'Header',
    data() {
        return {
            arrayLanguages: ['ru', 'ua', 'gb']
        }
    },
    methods: {
        setLocale: function(lang) {
            return this.$i18n.locale = lang;
        }
    },
    components: {
        CountryFlag
    }
}
</script>

<style scoped>
.header {
    background-color: rgb(65, 67, 156); 
    width: 100vw;
    height: 10vh;   
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 30px;
}
.header > a > h1 {
    color: white;
}
.header > a:hover {
    text-decoration: none;
}
.header > div {
    display: flex;
}
.header > div > button {
    margin-right: 10px;
}
.header > div > button:last-child {
    margin-right: 0;
}
</style>