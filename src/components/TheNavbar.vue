<template>
  <nav class="bg-gray-800">
    <div class="container mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <button
            type="button"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded="false"
            @click="toggleMobileMenu"
          >
            <span class="sr-only">Open main menu</span>
            <!-- Icon when menu is closed. -->
            <!--
            Heroicon name: outline/menu

            Menu open: "hidden", Menu closed: "block"
          -->
            <svg
              v-if="isMobileMenuActive"
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>

            <svg
              v-else
              class="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <div
          class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-between"
        >
          <div class="flex-shrink-0 flex items-center">
            <img
              class="block sm:hidden h-12 w-auto"
              src="@/assets/logo.png"
              alt="Workflow"
            >

            <div class="hidden sm:flex items-center">
              <img
                class="h-12 w-auto"
                src="@/assets/logo.png"
                alt="Workflow"
              >
              <span
                class="text-white text-2xl font-semibold ml-2.5"
              >rebeam</span>
            </div>
          </div>
          <div class="hidden  items-center sm:flex  sm:ml-6">
            <div class="flex space-x-4">
              <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
              <router-link
                :to="{ name: 'Home' }"
                class="text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Gallery
              </router-link>
              <a
                target="blank"
                href="https://github.com/nikhilkutinha/rebeam"
                class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >About</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div
      v-if="isMobileMenuActive"
      id="mobile-menu"
      class="sm:hidden"
    >
      <div class="px-2 pt-2 pb-3 space-y-1">
        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
        <router-link
          :to="{ name: 'Home' }"
          class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
        >
          Gallery
        </router-link>
        <a
          target="blank"
          href="https://github.com/nikhilkutinha/rebeam"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
        >About</a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isMobileMenuActive: false
    };
  },

  methods: {
    toggleMobileMenu() {
      this.isMobileMenuActive = !this.isMobileMenuActive;
    }
  }
};
</script>
<style></style>
