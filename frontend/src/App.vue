<template>
  <NavigationBar />
  <router-view />
</template>

<script>
  import './style/main.scss';

  import NavigationBar from "./components/NavigationBar.vue";
  export default {
    components: {
      NavigationBar
    }
  }
</script>