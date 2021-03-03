<template>
  <div class="container mx-auto pb-12 px-2 sm:px-6 lg:px-8">
    <section
      class="bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 bg-center relative"
    >
      <div class="absolute inset-0 bg-black bg-opacity-50" />

      <div
        class="mx-auto h-28 p-4 sm:p-6 lg:px-8 flex justify-between items-center"
      >
        <p class="text-2xl sm:text-3xl font-semibold text-white absolute">
          {{ rover.name }}
        </p>
      </div>
    </section>

    <rover-3d-viewer
      v-if="loaded"
      :src="rover.glb"
    />

    <div class="bg-gray-800 text-gray-300 rounded-sm  grid grid-cols-12 p-3">
      <div class="col-span-12 lg:col-span-6 py-4 px-5">
        <p class="font-semibold text-gray-100">
          Launched
        </p>
        <p class="mt-0.5">
          {{ humanizeDate(rover.launch, "MMM Do YYYY") }}
        </p>
      </div>

      <div class="col-span-12 lg:col-span-6 py-4 px-5">
        <p class="font-semibold text-gray-100">
          Landed
        </p>

        <p class="mt-0.5">
          {{ humanizeDate(rover.landing, "MMM Do YYYY") }}
        </p>
      </div>

      <div class="col-span-12 lg:col-span-6 py-4 px-5">
        <p class="font-semibold text-gray-100">
          Status
        </p>

        <p class="mt-0.5">
          {{ rover.status }}
        </p>
      </div>

      <div class="col-span-12 lg:col-span-6 py-4 px-5">
        <p class="font-semibold text-gray-100">
          Mass
        </p>

        <p class="mt-0.5">
          {{ rover.weight }} KGs
        </p>
      </div>

      <div class="col-span-12 py-4 px-5">
        <p class="font-semibold text-gray-100">
          Goal
        </p>

        <p class="mt-0.5 whitespace-pre-wrap">
          {{ rover.goal }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Rover3DViewer from "@/components/rover/Rover3DViewer";
import { RoverService } from "../../services/rover.service";

export default {
  components: {
    Rover3dViewer: Rover3DViewer
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      rover: {},
      loaded: false
    };
  },

  mounted() {
    this.rover = RoverService.get(this.id);
    this.loaded = true;
  },

  methods: {
    humanizeDate: function(value, format) {
      return moment(value).format(format);
    }
  }
};
</script>
