<template>
  <div class="characters">
    <h1>Characters</h1>
    <div style="float: left; width: 50%;" v-bind:key="item.id" v-for="(item, index) in listItems">
      <div v-if="index < 7">
        <img loading="eager" fetchpriority="high" :src=item.image style="display: inline-block; max-width: 100%" />
        <h4 style="display: inline-block;">{{ item.name }}</h4>
      </div>
      <div v-else>
        <img loading="lazy" fetchpriority="low" :src=item.image style="display: inline-block; max-width: 100%" />
        <h4 style="display: inline-block;">{{ item.name }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        listItems: []
      }
    },
    methods: {
      async getData() {
        const res = await fetch("/edg-api/api/character");
        const finalRes = await res.json();
        this.listItems = finalRes.results;
      }
    },
    mounted() {
      this.getData()
    }
  }
</script>
