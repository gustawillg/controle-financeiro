<template>
  <div class="absolute bottom-0 right-70 h-215 w-0 
  2xl:bottom-100 2xl:right-40 2xl:h-115
  xl:bottom-100 xl:right-40 xl:h-70 
  lg:bottom-100 lg:right-40 lg:h-70">
    <input  type="date" v-model="selectedDate" @input="handleDateChange" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Calendar',
  data() {
    return {
      selectedDate: new Date().toISOString().split('T')[0],
    };
  },
  methods: {
    handleDateChange() {
      
      this.$emit('dateSelected', new Date(this.selectedDate));
    },
  },
});
</script>

