<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <Prefetch v-bind:url="'/edg-api/api/character'">
      <router-link v-bind:to="'/characters'">Characters</router-link>
    </Prefetch>
  </nav>
  <router-view />
</template>

<script>
  import Prefetch from '@edgio/vue/Prefetch'
  export default {
    name: 'HomeView',
    components: {
      Prefetch,
    },
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
