<template>
  <div class="container mx-auto px-2 sm:px-6 lg:px-8">
    <form
      class="space-y-3 lg:flex lg:space-y-0 lg:space-x-5 py-12"
      @submit.prevent="loadAsyncData"
    >
      <select
        v-model="rover"
        required
        class="bg-gray-800 text-gray-300 block w-full px-3 py-2 border border-gray-700 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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

      <select
        v-model="filters.camera"
        :disabled="!cameras.length"
        autocomplete="off"
        required
        class="bg-gray-800 text-gray-300 block w-full px-3 py-2 border border-gray-700 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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

      <input
        v-if="isMobile"
        v-model="filters.earth_date"
        type="text"
        :min="minDate"
        :max="maxDate"
        required
        :disabled="!enable.length"
        :enable="enable"
        placeholder="Choose a date"
        class="disabled:opacity-75  bg-gray-800 text-gray-300 placeholder-gray-300 block w-full px-3 py-2 border border-gray-700 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        @focus="({ target }) => (target.type = 'date')"
      >

      <base-datepicker
        v-else
        v-model="filters.earth_date"
        required
        :enable="enable"
        :disabled="!enable.length"
        :min-date="minDate"
        :max-date="maxDate"
        placeholder="Choose a date"
        class="disabled:opacity-75  bg-gray-800 text-gray-300 placeholder-gray-300 block w-full px-3 py-2 border border-gray-700 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />

      <button
        class="w-full py-2.5 px-6 bg-indigo-500 text-white rounded lg:w-auto"
        type="submit"
      >
        Search
      </button>
    </form>

    <div
      v-if="isEmpty"
      class="bg-yellow-300 text-yellow-800 py-5 px-6 rounded"
    >
      Your current selection did not yield results, please try re-searching.
    </div>

    <image-list
      ref="scrollable"
      class="pb-12"
      :loading="loading"
      :images="images"
    />
  </div>
</template>

<script>
import _ from "lodash";
import ImageList from "../components/ImageList";
import { ImageService, ManifestService } from "../services/api.service";
import BaseDatepicker from "../components/BaseDatepicker";
import { isMobile } from "../utils/helpers";

export default {
  name: "Home",

  components: {
    ImageList,
    BaseDatepicker
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

      console.log("hello");

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
