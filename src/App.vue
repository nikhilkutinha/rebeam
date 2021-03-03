<template>
  <div
    id="app"
    class="m-h-screen bg-gray-900"
  >
    <the-navbar />
    <router-view />
  </div>
</template>

<script>
import TheNavbar from "./components/layout/TheNavbar";

export default {
  components: {
    TheNavbar
  }
};
</script>

<style lang="scss">
@import "@/assets/app.scss";

#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  min-height: 100vh;
}
</style>
