<template>
  <div class="container mx-auto mt-12 px-2 sm:px-6 lg:px-8">
    <rover-list :rovers="rovers" />
  </div>
</template>

<script>
import { RoverService } from "../../services/rover.service";
import RoverList from "@/components/rover/RoverList";

export default {
  components: {
    RoverList
  },

  data() {
    return {
      rovers: []
    };
  },

  mounted() {
    this.rovers = RoverService.query();
  }
};
</script>
