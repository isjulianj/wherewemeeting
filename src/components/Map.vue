<template>
<div id="map" class="window-height">
  <Search :city="city" :api-key="apiKey" @cityFound="handleSearchResult"></Search>
</div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import tt from "@tomtom-international/web-sdk-maps";
import Search from "components/Search.vue";


export default defineComponent({
  name: 'Map',
  components: {Search},
  props: {
    city: {
      type: String,
      default: ''
    },
    apiKey: {
      type: String,
      default: '',
      required: true
    }
  },
  methods: {
    handleSearchResult (location) {
      this.map.easeTo({
        center: location,
        zoom: 16
      })
    }
  },
  mounted() {
    console.log('hello')
    this.map = tt.map({
      container: 'map',
      key: this.apiKey
    })
  }, data() {
    return {
      Map: undefined
    }
  }
});
</script>
