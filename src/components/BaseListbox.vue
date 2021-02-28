<template>
  <Listbox v-slot="{ open }" v-model="value">
    <div class="relative">
      <ListboxButton
        class="w-full text-gray-300 py-2 px-3 shadow-inner border border-gray-700 bg-gray-800 rounded text-left focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
      >
        <span class="block truncate">
          {{ value }}
        </span>
        <span
          class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
        >
          <!-- <icon-selector
            :size="4"
            class="text-gray-500"
          /> -->
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="open"
          class="absolute z-50 mt-1 w-full rounded bg-white shadow-lg"
        >
          <ListboxOptions
            static
            class="max-h-60 rounded py-1 text-base leading-6 shadow-2xl overflow-auto  focus:outline-none sm:text-sm sm:leading-5"
          >
            <ListboxOption
              v-for="option in options"
              :key="option"
              v-slot="{ selected, active }"
              :value="option"
            >
              <div
                :class="
                  `${
                    active ? 'text-white bg-indigo-500' : 'text-gray-900'
                  } text-white cursor-default select-none relative py-2 pl-8 pr-4`
                "
              >
                <span
                  :class="
                    `${
                      selected ? 'font-semibold' : 'font-normal'
                    } block truncate`
                  "
                >
                  {{ option }}
                </span>
                <span
                  v-if="selected"
                  :class="
                    `${
                      active ? 'text-white' : 'text-indigo-500'
                    } absolute inset-y-0 left-0 flex items-center pl-1.5`
                  "
                >
                  <svg
                    class="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </ListboxOption>
          </ListboxOptions>
        </div>
      </transition>
    </div>
  </Listbox>
</template>

<script>
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions
} from "@headlessui/vue";

export default {
  name: "BaseListbox",

  components: {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions
  },
  props: {
    modelValue: {
      type: String,
      default: ""
    },

    options: {
      type: Array,
      default: () => []
    }
  },

  emits: ["update:modelValue"],

  data() {
    return {
      inputValue: null
    };
  },

  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      }
    }
  },

  mounted() {
    if (!this.modelValue && this.options.length) this.value = this.options[0];
  }
};
</script>
