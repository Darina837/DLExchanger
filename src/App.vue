<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import translateMixin from './plugins/translateMixin';
export default {
  name: 'App',
  mixins: [translateMixin]
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
@media (max-width: 905px) {
  .wrapper-form > form {
    flex-direction: column;
  }
}
</style>