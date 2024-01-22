<template>
  <div class="absolute bottom-0 right-70 h-100 w-0">
    <input type="date" v-model="selectedDate" @input="handleDateChange" />
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

