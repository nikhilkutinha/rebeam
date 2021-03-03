<template>
  <article
    class="bg-gray-800 rounded-sm shadow-md transform hover:-translate-y-1 transition-transform duration-100 ease-in"
  >
    <router-link :to="{ name: 'RoverShow', params: { id: rover.id } }">
      <figure class="aspect-w-1 aspect-h-1 overflow-hidden">
        <img
          :src="require(`@/assets/rovers/${rover.image}`)"
          class="object-cover"
        >
      </figure>
      <div class="py-4 px-5 text-gray-200 space-y-2">
        <p class="flex items-center justify-between">
          <icon-hash size="5" />
          <span>
            {{ rover.name }}
          </span>
        </p>
      </div>
    </router-link>
  </article>
</template>

<script>
export default {
  props: {
    rover: {
      type: Object,
      required: true
    }
  }
};
</script>
