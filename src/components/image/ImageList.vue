<template>
  <div class="grid grid-cols-12 gap-4 lg:gap-8">
    <template v-if="loading">
      <item-skleton
        v-for="value in 12"
        :key="value"
        class="col-span-12 sm:col-span-6 xl:col-span-3"
      />
    </template>

    <template v-else>
      <image-list-item
        v-for="(value, key) in images"
        :key="value + ':' + key"
        :image="value"
        class="col-span-12 sm:col-span-6 xl:col-span-3"
      />
    </template>
  </div>
</template>

<script>
import ImageListItem from "./ImageListItem";
import ItemSkleton from "./ItemSkleton";
import "../../plugins/fancybox";

export default {
  components: {
    ImageListItem,
    ItemSkleton
  },
  props: {
    images: {
      type: Array,
      required: true
    },

    loading: {
      type: Boolean,
      required: true
    }
  }
};
</script>
