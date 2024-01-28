<template>
  <div class="absolute bottom-0 right-70 h-215 w-0 
  2xl:bottom-100 2xl:right-40 2xl:h-115
  xl:bottom-100 xl:right-40 xl:h-70 
  lg:bottom-100 lg:right-40 lg:h-70
  ">
    <input type="date" v-model="selectedDate" @change="handleDateChange" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Calendar',
  data() {
    return {
      selectedDate: this.formatDate(new Date()), // Inicializa a data atual
    };
  },
  methods: {
    handleDateChange(event: Event) {
      const input = event.target as HTMLInputElement;
      const selectedDate = new Date(input.value);
      this.$emit('dateSelected', selectedDate);
    },
    formatDate(date: Date): string {
      const year = date.getFullYear();
      const month = `${date.getMonth() + 1}`.padStart(2, '0');
      const day = `${date.getDate()}`.padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
  },
});
</script>
