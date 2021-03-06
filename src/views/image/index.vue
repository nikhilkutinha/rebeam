<template>
  <div class="container mx-auto px-2 sm:px-6 lg:px-8">
    <form
      class="space-y-4 lg:flex lg:space-y-0 lg:space-x-5 py-6 sm:py-12"
      @submit.prevent="loadAsyncData"
    >
      <div class="w-full">
        <label
          for="rover"
          class="text-gray-300 block font-bold mb-1.5"
        >Rover</label>
        <div class="w-full relative flex items-center">
          <select
            id="rover"
            v-model="rover"
            required
            class="bg-gray-800 text-gray-300 block w-full px-3 py-2 border border-gray-700 rounded focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            @change="onRover"
          >
            <option
              value=""
              disabled
              selected
              hidden
            >
              Choose a rover
            </option>

            <option value="perseverance">
              Perseverance
            </option>
            <option value="curiosity">
              Curiosity
            </option>
            <option value="opportunity">
              Opportunity
            </option>
            <option value="spirit">
              Spirit
            </option>
          </select>

          <icon-selector
            class="absolute right-2 text-gray-500"
            size="5"
          />
        </div>
      </div>
      <div class="w-full">
        <label
          for="camera"
          class="text-gray-300 block font-bold mb-1.5"
        >Camera</label>

        <div class="w-full relative flex items-center">
          <select
            id="camera"
            v-model="filters.camera"
            :disabled="!cameras.length"
            autocomplete="off"
            required
            class="disabled:opacity-50 bg-gray-800 text-gray-300 block w-full  px-3 py-2 border border-gray-700 rounded focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            @change="onCamera"
          >
            <option
              value=""
              disabled
              selected
              hidden
            >
              Choose a camera
            </option>

            <option
              v-for="(value, key) in cameras"
              :key="key + ':' + value"
              :value="value"
            >
              {{ value }}
            </option>
          </select>

          <icon-loading
            v-if="!cameras.length && rover"
            class="absolute right-1 text-gray-300"
            size="5"
          />

          <icon-selector
            v-else
            class="absolute right-2 text-gray-500"
            :class="{ 'text-opacity-50': !cameras.length }"
            size="5"
          />
        </div>
      </div>
      <div class="w-full">
        <label
          for="date"
          class="text-gray-300 block font-bold mb-1.5"
        >Date</label>

        <input
          v-if="isMobile"
          id="date"
          v-model="filters.earth_date"
          type="date"
          :min="minDate"
          :max="maxDate"
          required
          :disabled="!enable.length"
          class="disabled:opacity-50  bg-gray-800 text-gray-300 placeholder-gray-300 block w-full px-3 py-2 border border-gray-700 rounded focus:outline-none focus:ring-orange-500 focus:border-orange-500"
        >
        <div
          v-else
          class="w-full relative flex items-center"
        >
          <base-datepicker
            id="date"
            v-model="filters.earth_date"
            autocomplete="off"
            required
            :enable="enable"
            :disabled="!enable.length"
            :min-date="minDate"
            :max-date="maxDate"
            placeholder="Choose a date"
            class="disabled:opacity-50  bg-gray-800 text-gray-300 placeholder-gray-300 block w-full px-3 py-2 border border-gray-700 rounded focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
          <icon-loading
            v-if="!cameras.length && rover"
            class="absolute right-1 text-gray-300"
            size="5"
          />

          <icon-calendar
            v-else
            class="absolute right-3 text-gray-500"
            :class="{ 'text-opacity-50': !cameras.length }"
            size="5"
          />
        </div>
      </div>

      <div class="flex items-end">
        <button
          class="w-full py-2.5 px-6 bg-orange-500 text-white rounded lg:w-auto focus:outline-none"
          type="submit"
        >
          Search
        </button>
      </div>
    </form>

    <div
      v-if="isEmpty"
      class="bg-yellow-300 text-yellow-800 py-5 px-6 rounded"
    >
      Your current selection did not yield results, please try re-searching.
    </div>

    <image-list
      ref="scrollable"
      class="pb-12 mt-3"
      :loading="loading"
      :images="images"
    />
  </div>
</template>

<script>
import _ from "lodash";
import ImageList from "@/components/image/ImageList";
import { ImageService, ManifestService } from "@/services/api.service";
import { isMobile } from "@/utils/helpers";

export default {
  name: "Home",

  components: {
    ImageList
  },

  data() {
    return {
      loading: true,
      troubleshooting: false,

      images: [],
      manifest: null,

      // form
      filters: {
        earth_date: "",
        camera: ""
      },
      rover: ""
    };
  },

  computed: {
    isMobile() {
      if (isMobile.any()) return true;
      return false;
    },

    isEmpty() {
      return !this.loading && !this.images.length;
    },

    minDate() {
      if (!this.enable.length) return;
      return this.enable[0];
    },

    maxDate() {
      if (!this.enable.length) return;

      return _.last(this.enable);
    },

    cameras() {
      if (!this.manifest) return [];

      const { photos } = this.manifest;

      return _.chain(photos)
        .map("cameras")
        .flatten()
        .uniq()
        .value();
    },

    enable() {
      if (!this.manifest) return [];

      if (!this.filters.camera) {
        return this.manifest.photos.map(value => value.earth_date);
      }

      return this.manifest.photos
        .filter(value => {
          return value.cameras.includes(this.filters.camera);
        })
        .map(value => value.earth_date);
    }
  },

  mounted() {
    ImageService.latest()
      .then(({ data }) => {
        this.loading = true;
        this.images = data.latest_photos.reverse();
      })
      .finally(() => {
        this.loading = false;
      });
  },

  methods: {
    loadAsyncData() {
      this.loading = true;

      ImageService.query(this.rover, { ...this.filters })
        .then(({ data }) => {
          this.images = data.photos;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    onCamera() {
      this.filters.earth_date = "";
    },

    onRover() {
      this.filters.earth_date = "";
      this.filters.camera = "";
      this.manifest = null;

      ManifestService.get(this.rover).then(({ data }) => {
        this.manifest = data.photo_manifest;
      });
    }
  }
};
</script>

<style>
select {
  background-image: none;
}
</style>
