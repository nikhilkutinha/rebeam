<template>
  <flat-pickr
    v-model="value"
    :config="config"
  />
</template>

<script>
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import _ from "lodash";

export default {
  components: {
    flatPickr
  },
  props: {
    modelValue: {
      type: String,
      default: ""
    },

    enable: {
      type: Array,
      default: undefined
    },

    options: {
      type: Array,
      default: () => []
    },

    minDate: {
      type: String,
      default: ""
    },

    maxDate: {
      type: String,
      default: ""
    }
  },

  emits: ["update:modelValue"],
  data() {
    return {
      date: null
    };
  },

  computed: {
    config() {
      const config = {
        maxDate: this.maxDate,
        minDate: this.minDate,
        allowInput: true
      };

      if (_.isEmpty(this.enable)) {
        return config;
      } else {
        return {
          ...config,
          enable: this.enable
        };
      }
    },

    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      }
    }
  }
};
</script>

<style>
.flatpickr-calendar {
  margin-top: 0.25rem !important;
}
</style>
