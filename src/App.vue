<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
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