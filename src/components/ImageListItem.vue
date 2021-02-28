<template>
  <article
    class="bg-gray-800 rounded-sm bg-white shadow-md transform hover:-translate-y-1 transition-transform duration-100 ease-in"
  >
    <figure class="aspect-w-1 aspect-h-1 overflow-hidden">
      <img
        :src="image.img_src"
        class="object-cover transform scale-125"
      >
    </figure>
    <div class="py-4 px-5 text-gray-200 space-y-2">
      <p class="flex items-center justify-between">
        <svg
          class="h-5 w-auto"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <span>
          {{ image.camera.name }}
        </span>
      </p>

      <p class="flex items-center justify-between">
        <svg
          class="h-5 w-auto"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>

        <span>
          {{ image.earth_date }}
        </span>
      </p>

      <p class="flex items-center justify-between">
        <svg
          class="h-5 w-auto"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>

        <span>
          {{ image.sol }}
        </span>
      </p>
    </div>
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
