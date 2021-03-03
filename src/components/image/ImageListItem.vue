<template>
  <article
    class="bg-gray-800 rounded-sm bg-white shadow-md transform hover:-translate-y-1 transition-transform duration-100 ease-in"
  >
    <a
      data-fancybox="gallery"
      :href="image.img_src"
    >
      <figure class="aspect-w-1 aspect-h-1 overflow-hidden">
        <img
          :src="image.img_src"
          class="object-cover"
        >
      </figure>
      <div class="py-4 px-5 text-gray-200 space-y-2">
        <p class="flex items-center justify-between">
          <icon-camera size="5" />
          <span>
            {{ image.camera.name }}
          </span>
        </p>

        <p class="flex items-center justify-between">
          <icon-calendar size="5" />
          <span>
            {{ image.earth_date }}
          </span>
        </p>

        <p class="flex items-center justify-between">
          <icon-sun size="5" />
          <span>
            {{ image.sol }}
          </span>
        </p>
      </div>
    </a>
  </article>
</template>

<script>
export default {
  props: {
    image: {
      type: Object,
      required: true
    }
  }
};
</script>
