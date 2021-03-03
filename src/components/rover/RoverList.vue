<template>
  <div class="grid grid-cols-12 gap-4 lg:gap-8">
    <rover-list-item
      v-for="(value, key) in rovers"
      :key="value + ':' + key"
      :rover="value"
      class="col-span-12 sm:col-span-6 xl:col-span-3"
    />
  </div>
</template>

<script>
import RoverListItem from "./RoverListItem";

export default {
  components: {
    RoverListItem
  },
  props: {
    rovers: {
      type: Array,
      required: true
    }
  }
};
</script>
