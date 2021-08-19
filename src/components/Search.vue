<template>
  <div class="text-h4">{{cityName}}</div>

</template>

<script lang="ts">
import {defineComponent} from "vue";
import tt from "@tomtom-international/web-sdk-services";

export default defineComponent({
  name: 'search',
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
  mounted() {
    tt.services.fuzzySearch({
      key: this.apiKey,
      query: this.city
    }).then((res) => {
      console.log(res)
      this.$emit('cityFound', res.results[0].position)
      this.cityName = `${res.results[0].address?.freeformAddress} ${res.results[0].address?.country}`
    })
  },
  data() {
    return {
      cityName: 'hello I am searching...'
    }
  }
});


</script>

